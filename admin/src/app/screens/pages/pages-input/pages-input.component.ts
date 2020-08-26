import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectorRef,
} from '@angular/core';

import { cloneDeep as _cloneDeep } from 'lodash';
import * as UIkit from 'uikit';

import { InputMetatdata } from '@cx/shared/types';
import { PickItemPipe } from '@cx/shared/pipes';

@Component({
  selector: 'cx-pages-input',
  templateUrl: 'pages-input.component.html',
  styleUrls: ['pages-input.component.scss'],
})
export class PagesInputComponent implements OnChanges {
  inputValueModel: any;
  previousInputValue: any; // last input value (before new/changed one)

  @Input() inputKey: string;
  @Input()
  get inputValue(): any {
    return this.inputValueModel;
  }
  @Input() inputMetadata: InputMetatdata;
  @Input() pageData: string;

  @Output() inputValueChange = new EventEmitter<any>();
  @Output() onDeleteContent = new EventEmitter<any>();

  // inputValue model setter
  set inputValue(value: any) {
    this.inputValueModel = value;
    this.inputValueChange.emit(this.inputValueModel);
  }

  constructor(private pickItem: PickItemPipe, private ref: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    // always save last previous input value
    this.previousInputValue = changes.inputValue
      ? _cloneDeep(changes.inputValue.currentValue)
      : this.previousInputValue;
  }

  /**
   * update input -> inputValue (inputValueModel) model (two-way data binding)
   * @param index index of input to update
   * @param value updated value
   */
  updateInput(index: number, value: any): void {
    this.inputValue[
      // use pickItemPipe to get proper key
      this.pickItem.transform(this.inputValue, 'key', index)
    ] = value;
  }

  /**
   * on select change (pick value)
   * @param event change event
   * @param inputKey key of input
   */
  selectChange(event: Event, inputKey: string): void {
    if (inputKey === 'template' && this.pageData) {
      // HOTFIX: https://github.com/angular/angular/issues/13683
      this.inputValue = this.previousInputValue;
      event.target['value'] = this.previousInputValue;

      // show info dialog before about delete content (data ID)
      UIkit.modal
        .confirm('Page content must be deleted before changing the template.')
        .then(
          () => {
            // emit event to delete content...
            this.onDeleteContent.emit();
          },
          // catch a rejection
          () => {}
        );
    }
  }
}
