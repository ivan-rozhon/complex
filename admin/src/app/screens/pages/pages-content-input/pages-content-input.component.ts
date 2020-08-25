import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { MediaSelectors } from '@cx/state/media';

import { SharedService } from '@cx/core/services/shared.service';

import { PickItemPipe } from '@cx/shared/pipes';
import { Gallery } from '@cx/shared/types';

@Component({
  selector: 'cx-pages-content-input',
  templateUrl: 'pages-content-input.component.html',
  styleUrls: ['pages-content-input.component.scss'],
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
  @Input() contentMetadata: any;

  @Output() inputValueChange = new EventEmitter<any>();

  // inputValue model setter
  set inputValue(value: any) {
    this.inputValueModel = value;
    this.inputValueChange.emit(this.inputValueModel);
  }

  constructor(
    private store$: Store,
    private pickItem: PickItemPipe,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    // galleries
    this.galleries$ = this.store$.select(MediaSelectors.selectGalleries);
  }

  /**
   * add arr item group
   * @param index index where request to add comes from
   * @param add model of object (group) to add
   */
  addArrayItem(index: number, add: { [x: string]: any }): void {
    // add new item (from 'add' array) after the item from which comes event
    this.inputValue.splice(index + 1, 0, { ...add });
  }

  /**
   * move arr item in array
   * @param direction up/down (increase/decrease) index
   * @param index current index of arr item
   */
  moveItem(direction: 'up' | 'down', index: number): void {
    // get new index according to direction of move
    const newIndex =
      direction === 'up' ? index - 1 : direction === 'down' ? index + 1 : null;

    // do not anything if newIndex doesn`t exists
    if (newIndex === null) {
      return;
    }

    // reorder items in array
    this.inputValue = this.sharedService.moveArrayItem(
      this.inputValue,
      index,
      newIndex
    );
  }

  /**
   * delete array item
   * @param index index of array item to delete
   */
  deleteArrayItem(index: number): void {
    this.inputValue.splice(index, 1);
  }

  /**
   * update content input model (two-way data binding)
   * @param value updated value
   * @param index index of object of content input to update
   */
  updateInput(value, index, itemIndex): void {
    this.inputValue[index][
      // use pickItemPipe to get proper key
      this.pickItem.transform(this.inputValue[index], 'key', itemIndex)
    ] = value;
  }
}
