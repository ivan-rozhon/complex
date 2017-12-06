import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import * as _ from 'lodash/lodash';

import { ContentEditableDirective } from './../directives/content-editable.directive';

@Component({
    selector: 'ca-editor',
    templateUrl: 'editor.component.html',
    styleUrls: ['editor.component.scss']
})
export class EditorComponent {
    editorContentValue: string;
    contenteditable = true;

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

    constructor() { }

    /** Execute command via execCommand... */
    execCommand(commandId: string, value?: any): void {
        // ...on document object
        document.execCommand(commandId, false, value ? value : null);

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

    /** Handle before 'insertImage' command */
    insertImage(): void {

    }

    /** Handle inserting table by 'insertHtml' command */
    insertTable(): void {
        // prepare table HTML string
        const tableHTML = `
            <table style="border-collapse: collapse; border-spacing: 0; width: 100%; ">
                <tbody>
                    <tr>
                        <td style="border: 1px solid #e5e5e5;"></td>
                        <td style="border: 1px solid #e5e5e5;"></td>
                    </tr>
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

    insertHtml(): void {
        // const selection = window.getSelection ? window.getSelection() : null;
        // console.log(selection);
        // console.log(selection.getRangeAt(0).commonAncestorContainer);
        // console.log(selection.getRangeAt(0).commonAncestorContainer.parentNode);

        // // selection.getRangeAt(0).commonAncestorContainer.parentNode.insertBefore(
        // //     selection.getRangeAt(0).commonAncestorContainer,
        // //     selection.getRangeAt(0).commonAncestorContainer.parentNode.nextSibling
        // // );

        // // Get a reference to the element in which we want to insert a new node
        // const parentElement = selection.getRangeAt(0).commonAncestorContainer.parentNode;
        // // Get a reference to the first child
        // const theFirstChild = parentElement.firstChild;

        // // Create a new element
        // const newElement = document.createElement('div');

        // // Insert the new element before the first child
        // parentElement.insertBefore(newElement, theFirstChild);
    }
}
