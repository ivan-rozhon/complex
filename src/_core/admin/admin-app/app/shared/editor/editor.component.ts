import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash/lodash';
import * as $ from 'jquery';

import * as fromBoard from './../../board/board-reducers';
import { ContentEditableDirective } from './../directives/content-editable.directive';
import { Image } from '../../board/board.model';
import { ImageData } from '../shared.model';

@Component({
    selector: 'ca-editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.scss']
})
export class EditorComponent implements OnInit {
    editorContentValue: string;
    contenteditable = true;
    contenteditableView = true;
    imageData = new ImageData();
    // media streams
    images$: Observable<Image[]>;

    @Input() foreColors: string[] = [];
    @Input() backColors: string[] = [];
    @Input()
    get editorContent() {
        // get editorContent value aside of itself into another private variable
        return this.editorContentValue;
    }

    @Output() editorContentChange: EventEmitter<string> = new EventEmitter();
    set editorContent(val) {
        // update variable with editorContent value
        this.editorContentValue = val;
        // emit changes in editorContent
        this.editorContentChange.emit(this.editorContentValue);
    }

    @ViewChild('caContentEditable') contentEditableElementRef: ContentEditableDirective;

    constructor(private store: Store<fromBoard.State>) { }

    ngOnInit(): void {
        // images store stream
        this.images$ = this.store.select(fromBoard.getImages);
    }

    /** Execute command via execCommand... */
    execCommand(commandId: string, value?: any): void {
        // ...on document object
        document.execCommand(commandId, false, value ? value : null);

        // do refresh model & view
        this.refreshView();
    }

    // update model and refresh view
    refreshView() {
        // refresh view via ContentEditableDirective (emit changes from inside of directive)
        this.contentEditableElementRef.emitChanges(
            this.contentEditableElementRef.elementRef.nativeElement.innerHTML
        );
    }

    /** Handle before 'createLink' command */
    createLink(): void {
        // get user link via prompt window
        const url = prompt('Insert link: ', '');

        // check if user fill link
        if (url) {
            this.execCommand('createLink', url);
        }
    }

    /**
     * Handle before 'insertImage' command
     * @param selectedImage name of selected image
     */
    insertImage(imageData: ImageData): void {
        // select native element of content editable element
        const contentEditableNativeEl = this.contentEditableElementRef.elementRef.nativeElement;

        // focus content editable element again
        contentEditableNativeEl.focus();

        // create template according to if is image is clickable like gallery image
        const htmlTemplate = imageData.clickableImage
            ?
            `<div class="containter">
                <div id="links">
                    <a class="gallery-thumb" href="_source/media/images/${imageData.selectedImage}"
                        title="${imageData.imageTitle}" data-gallery>
                        <img src="_source/media/images/thumb/thumb_${imageData.selectedImage}" alt="${imageData.selectedImage}">
                    </a>
                </div>
            </div>`
            : imageData.linkImage
                ? `
                    <div class="sub-inner-banner">
                        <a href="${imageData.imageLink}" target="_blank">
                            <img src="_source/media/images/${imageData.selectedImage}">
                        </a>
                    </div>`
                : `<img class="inner-img" src="_source/media/images/${imageData.selectedImage}">`;

        // insert image tag with selected image
        this.execCommand('insertHTML', htmlTemplate);
    }

    /** Handle inserting table by 'insertHtml' command */
    insertTable(): void {
        // get number of rows
        const rows = Number(prompt('Rows: ', ''));

        // if inputs are not numbers od 'zero' - do not continue
        if (typeof rows !== 'number' || !rows) { return; }

        // get number of columns
        const columns = Number(prompt('Columns: ', ''));

        // if inputs are not numbers od 'zero' - do not continue
        if (typeof columns !== 'number' || !columns) { return; }

        // table body template
        let tableBodyHTML = '';

        // create rows and columns depending on number of it
        for (let r = 0; r < rows; r++) {
            tableBodyHTML += '<tr>';

            for (let c = 0; c < columns; c++) {
                tableBodyHTML += '<td></td>';
            }

            tableBodyHTML += '</tr>';
        }

        // prepare table HTML string
        const tableHTML = `
            <table class="table">
                <tbody>
                    ${tableBodyHTML}
                </tbody>
            </table>
        `;

        // insert html table via 'insertHTML' command
        this.execCommand('insertHTML', tableHTML);
    }

    /** Insert text in `<code></code>` tag via prompt window */
    insertCode(): void {
        // get user code via prompt window
        const code = prompt('Insert code: ', '');

        // escape HTML chars
        const codeEscape = _.escape(code);

        // check if user fill link
        if (code) {
            this.execCommand('insertHTML', `<code>${codeEscape}</code>`);
        }
    }

    /**
     * Insert/remove - row/column; Do/Undo - rowspan/colspan
     * @param type type of modification - row, column, rowspan, colspan
     * @param remove will be removed or added
     */
    editTable(type: string, remove?: boolean): void {
        // current selection in 'contentEditable'
        const selection = window.getSelection ? window.getSelection() : null;

        // if no selection - don`t continue
        if (!selection) { return; }

        // selected cell & row
        const selectedCell = $(selection.getRangeAt(0).commonAncestorContainer);
        const selectedRow = $(selection.getRangeAt(0).commonAncestorContainer).closest('tr');
        const selectedTableBody = $(selection.getRangeAt(0).commonAncestorContainer).closest('tbody');

        // if some selected element missing - don`t continue
        if (
            !selectedCell || !selectedCell.get(0) ||
            !selectedRow || !selectedRow.get(0) ||
            !selectedTableBody || !selectedTableBody.get(0)
        ) { return; }

        // get index of selected row and cell
        const selectedCellIndex = selectedCell.index();
        const selectedRowIndex = selectedRow.index();

        // get colspan and rowspan of selected cell
        const selectedCellColspan = selectedCell.attr('colspan') ? Number(selectedCell.attr('colspan')) : null;
        const selectedCellRowspan = selectedCell.attr('rowspan') ? Number(selectedCell.attr('rowspan')) : null;

        // count number of rows in table
        const rowsCount = selectedTableBody.find('tr').length;

        // get first row in table
        const firstRow = selectedTableBody.find('tr').eq(0);

        // count number of columns in table - including colspan/rowspan
        // https://goo.gl/f757fp
        const columnsCount = [].reduce.call(firstRow.find('td'), (p, c) => {
            const colspan = c.getAttribute('colspan') || 1;
            return p + +colspan;
        }, 0);

        // execute action according to type of action (row/column) and type of element (insert/remove)
        switch (type) {
            // insert/remove row
            case 'row': {
                if (remove) {
                    // remove selected row if available - at least 2 rows must be in table
                    const removedRow = selectedTableBody.get(0) && rowsCount > 1
                        ? selectedTableBody.get(0).deleteRow(selectedRowIndex)
                        : null;

                    // don`t continue (row has been deleted)
                    break;
                }

                // insert row
                // const insertedRow = selectedTableBody.get(0) ? selectedTableBody.get(0).insertRow(selectedRowIndex + 1) : null;
                // TODO... handle add row in rowspan columns
                const insertedRow = selectedTableBody.get(0) ? selectedTableBody.get(0).insertRow(-1) : null;

                // if no inserted row - don`t continue
                if (!insertedRow) { return; }

                // insert one cell for each column
                for (let i = columnsCount; i > 0; i--) {
                    insertedRow.insertCell(-1);
                }

                break;
            }

            // do/undo rowspan
            case 'rowspan': {
                // can`t apply rowspan to colspan
                if (selectedCellColspan && selectedCellColspan > 1) { return; }

                // get next row
                const nextRow = selectedCellRowspan
                    // if cell has rowspan get next row after 'rowspanned' row
                    ? selectedTableBody.find('tr').eq(selectedRowIndex + selectedCellRowspan)
                    : selectedRow.next();

                // initial selected cell position
                let selectedCellPosition = 0;

                // get true position of cell including colspan
                selectedRow.find('td').each(index => {
                    // get current cell and its colspan
                    const currentCell = selectedRow.find('td').eq(index);
                    const currentCellColspan = currentCell.attr('colspan') ? Number(currentCell.attr('colspan')) : null;

                    if (selectedCellIndex > index) {
                        // replace index with colspan if it set on cell
                        selectedCellPosition += currentCellColspan ? currentCellColspan : 1;
                    }
                });

                if (remove) {
                    // exit if selected cell has no cellspan
                    if (!selectedCellRowspan || selectedCellRowspan < 2) { return; }

                    // row to insert cell
                    const nextRowToInsert = selectedTableBody.find('tr').eq(selectedRowIndex + selectedCellRowspan - 1);

                    // index of next cell to insert
                    let nextCellToInsertIndex;
                    let nextCellToInsertPosition = 0;

                    // get index of corresponding cell
                    nextRow.find('td').each(index => {
                        // get current cell and its colspan
                        const currentCell = nextRow.find('td').eq(index);
                        const currentCellColspan = currentCell.attr('colspan') ? Number(currentCell.attr('colspan')) : null;

                        // increase position by colspan/index until it reaches selected cell position
                        if (nextCellToInsertPosition <= selectedCellPosition) {
                            nextCellToInsertIndex = index;
                            nextCellToInsertPosition += currentCellColspan ? currentCellColspan : 1;
                        }
                    });

                    // add cell on missing place
                    nextRowToInsert.get(0).insertCell(nextCellToInsertIndex - 1);

                    // decrease 'rowspan' of selected cell
                    selectedCell.attr(
                        'rowspan',
                        selectedCellRowspan - 1
                    );

                    // colspan of updated selected cell
                    const actualCellRowspan = selectedCell.attr('rowspan') ? Number(selectedCell.attr('rowspan')) : null;

                    // remove colspan if is '1'
                    if (actualCellRowspan === 1) {
                        selectedCell.removeAttr('rowspan');
                    }

                    break;
                }

                // check if next cell exists
                if (!nextRow || !nextRow.get().length) { return; }

                // index of next cell to delete
                let nextCellIndex;
                let nextCellPosition = 0;

                // get index of corresponding cell
                nextRow.find('td').each(index => {
                    // get current cell and its colspan
                    const currentCell = nextRow.find('td').eq(index);
                    const currentCellColspan = currentCell.attr('colspan') ? Number(currentCell.attr('colspan')) : null;

                    // increase position by colspan/index until it reaches selected cell position
                    if (nextCellPosition <= selectedCellPosition) {
                        nextCellIndex = index;
                        nextCellPosition += currentCellColspan ? currentCellColspan : 1;
                    }
                });

                // get next cell index & colspan & rowspan if exists
                const nextCell = nextRow.find('td').eq(nextCellIndex);
                const nextCellColspan = nextCell.attr('colspan') ? Number(nextCell.attr('colspan')) : null;
                const nextCellRowspan = nextCell.attr('rowspan') ? Number(nextCell.attr('rowspan')) : null;

                // can`t apply rowspan to colspan
                if (nextCellColspan && nextCellColspan > 1) { return; }

                // delete cell on next row
                nextRow.get(0).deleteCell(nextCellIndex);

                if (nextCellRowspan && nextCellRowspan > 1) {
                    // increase 'rowspan' of selected cell by 'rowspan' of selected cell
                    selectedCell.attr(
                        'rowspan',
                        selectedCellRowspan ? selectedCellRowspan + nextCellRowspan : nextCellRowspan + 1
                    );
                } else {
                    // add rowspan attr to selected cell
                    selectedCell.attr(
                        'rowspan',
                        selectedCellRowspan ? selectedCellRowspan + 1 : 2
                    );
                }

                break;
            }

            // insert/remove column
            case 'column': {
                if (remove) {
                    // don`t remove column if number of columns is lower than 2
                    if (columnsCount < 2) { return; }

                    // temporary helper variable for recognizing cells in rowspan
                    let rowspan;

                    // remove one cell from each row or decrease colspan attr
                    selectedTableBody.find('tr').each((index) => {
                        // get current row
                        const currentRow = selectedTableBody.find('tr').eq(index);

                        // check if last column in row has 'colspan' attr
                        const colspan = currentRow.find('td').last().attr('colspan');

                        // get current cell
                        const currentCell = currentRow.find('td').last();

                        if (colspan && colspan > 1) {
                            // decrease colspan
                            currentCell.attr('colspan', colspan - 1);

                            // colspan of current updated cell
                            const currentCellColspan = currentCell.attr('colspan')
                                ? Number(currentCell.attr('colspan'))
                                : null;

                            // remove colspan if is '1'
                            if (currentCellColspan === 1) {
                                currentCell.removeAttr('colspan');
                            }
                        } else {
                            // rowspan of current updated cell
                            const currentCellRowspan = currentCell.attr('rowspan')
                                ? Number(currentCell.attr('rowspan'))
                                : null;

                            // no 'colspan' - just remove cell
                            const removedCell = currentRow.get(0) && !rowspan ? currentRow.get(0).deleteCell(-1) : null;

                            // get temporary rowspan in exists for next iteration (cell will not be deleted)
                            rowspan = currentCellRowspan
                                ? currentCellRowspan - 1
                                : rowspan ? rowspan - 1 : rowspan;
                        }
                    });

                    // don`t continue (column has been deleted)
                    break;
                }

                // insert one cell to each row (so, add whole column)
                selectedTableBody.find('tr').each((index) => {
                    selectedTableBody.find('tr').eq(index).get(0).insertCell(-1);
                });

                break;
            }

            // do/undo colspan
            case 'colspan': {
                // can`t apply colspan to rowspan
                if (selectedCellRowspan && selectedCellRowspan > 1) { return; }

                if (remove) {
                    // exit if selected cell has no cellspan
                    if (!selectedCellColspan || selectedCellColspan < 2) { return; }

                    // add cell immediately after selected cell
                    selectedRow.get(0).insertCell(selectedCellIndex + 1);

                    // decrease 'colspan' of selected cell
                    selectedCell.attr(
                        'colspan',
                        selectedCellColspan - 1
                    );

                    // colspan of updated selected cell
                    const actualCellColspan = selectedCell.attr('colspan') ? Number(selectedCell.attr('colspan')) : null;

                    // remove colspan if is '1'
                    if (actualCellColspan === 1) {
                        selectedCell.removeAttr('colspan');
                    }

                    break;
                }

                // get next cell
                const nextCell = selectedCell.next();

                // check if next cell exists
                if (!nextCell || !nextCell.get().length) { return; }

                // get next cell rowspan and colspan
                const nextCellRowspan = nextCell.attr('rowspan') ? Number(nextCell.attr('rowspan')) : null;
                const nextCellColspan = nextCell.attr('colspan') ? Number(nextCell.attr('colspan')) : null;

                // can`t apply colspan to rowspan
                if (nextCellRowspan && nextCellRowspan > 1) { return; }

                // remove next cell
                selectedRow.get(0).deleteCell(selectedCellIndex + 1);

                if (nextCellColspan && nextCellColspan > 1) {
                    // increase 'colspan' of selected cell
                    selectedCell.attr(
                        'colspan',
                        selectedCellColspan ? selectedCellColspan + nextCellColspan : nextCellColspan + 1
                    );
                } else {
                    // just increase 'colspan'
                    selectedCell.attr(
                        'colspan',
                        selectedCellColspan ? selectedCellColspan + 1 : 2
                    );
                }

                break;
            }

            default:
                break;
        }

        // do refresh model & view
        this.refreshView();
    }
}
