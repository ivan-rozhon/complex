import { Component, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { ContentEditableDirective } from './../directives/content-editable.directive';

@Component({
    selector: 'ca-editor',
    templateUrl: 'editor.component.html'
})
export class EditorComponent {
    // default value of editor content
    editorContentValue: string;

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
}
