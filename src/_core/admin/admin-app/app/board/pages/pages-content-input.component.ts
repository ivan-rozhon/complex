import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import * as fromBoard from './../board-reducers';

import { Gallery } from './../board.model';

@Component({
    selector: 'ca-pages-content-input',
    templateUrl: 'pages-content-input.component.html'
})

export class PagesContentInputComponent implements OnInit {
    inputValueModel: any;
    // media streams
    galleries$: Observable<Gallery[]>;

    @Input() inputKey: string;
    @Input()
    get inputValue(): any {
        return this.inputValueModel;
    }
    @Input() inputMetadata: any;

    @Output() inputValueChange = new EventEmitter<any>();

    // inputValue model setter
    set inputValue(value: any) {
        this.inputValueModel = value;
        this.inputValueChange.emit(this.inputValueModel);
    }

    constructor(
        private store: Store<fromBoard.State>,
    ) { }

    ngOnInit(): void {
        // galleries
        this.galleries$ = this.store.select(fromBoard.getGalleries);
    }
}
