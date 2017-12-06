import {
    Directive,
    OnChanges,
    SimpleChanges,
    Input,
    Output,
    EventEmitter,
    ElementRef,
    HostListener,
    Sanitizer,
    SecurityContext
} from '@angular/core';

@Directive({
    selector: '[caContentEditable]',
    exportAs: 'caContentEditable'
})
export class ContentEditableDirective implements OnChanges {
    @Input() editorModel: string;
    @Output() editorModelChange: EventEmitter<string> = new EventEmitter();

    constructor(
        public elementRef: ElementRef,
        private sanitizer: Sanitizer
    ) { }

    @HostListener('keyup', ['$event'])
    onkeyup($event: KeyboardEvent) {
        // emit changes in HTML content of 'contentEditable' element
        this.onEvent(this.elementRef.nativeElement.innerHTML);
    }

    @HostListener('input', ['$event'])
    oninput($event: Event) {
        // emit changes in HTML content of 'contentEditable' element
        this.onEvent(this.elementRef.nativeElement.innerHTML);
    }

    @HostListener('blur', ['$event'])
    onblur($event: FocusEvent) {
        // emit changes in HTML content of 'contentEditable' element
        this.onEvent(this.elementRef.nativeElement.innerHTML);
    }

    ngOnChanges(changes: SimpleChanges): void {
        // check if changes comes from editor model
        if (changes.editorModel) {
            // get current changes value
            const currentValue = changes.editorModel.currentValue;

            // dont change it if changes as same as current value
            if (this.sanitize(this.elementRef.nativeElement.innerHTML) !== currentValue) {
                // change inner text value according to changes
                this.elementRef.nativeElement.innerHTML = changes.editorModel.currentValue;
            }
        }
    }

    /** propagate changes on events (keyup/input) */
    onEvent(innerHTML: string): void {
        // filter (remove) remaining '<br>'/'<div><br></div>' tag if remains
        innerHTML = innerHTML === '<br>' || innerHTML === '<div><br></div>' ? '' : innerHTML;

        // emit changes (update model)
        this.emitChanges(innerHTML);
    }

    /** emit changes in model */
    emitChanges(content: string) {
        this.editorModelChange.emit(
            this.sanitize(content)
        );
    }

    /** sanitize editor`s HTML content */
    sanitize(content: string): string {
        return this.sanitizer.sanitize(SecurityContext.NONE, content);
    }
}
