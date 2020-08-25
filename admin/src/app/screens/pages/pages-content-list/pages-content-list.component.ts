import { Component, Input, Output, EventEmitter } from '@angular/core';

import { SharedService } from '@cx/core/services/shared.service';

import { PickItemPipe } from '@cx/shared/pipes';

@Component({
  selector: 'cx-pages-content-list',
  templateUrl: 'pages-content-list.component.html',
  styleUrls: ['pages-content-list.component.scss'],
})
export class PagesContentListComponent {
  contentValueModel: any[];

  @Input() contentKey: string;
  @Input()
  get contentValue(): any[] {
    return this.contentValueModel;
  }
  @Input() contentMetadata: any;

  @Output() contentValueChange = new EventEmitter<any[]>();

  // contentValue model setter
  set contentValue(value: any[]) {
    this.contentValueModel = value;
    this.contentValueChange.emit(this.contentValueModel);
  }

  constructor(
    private pickItem: PickItemPipe,
    private sharedService: SharedService
  ) {}

  /**
   * add new content item
   * @param content content item to add
   * @param index index of content item from which comes event
   */
  addContent(content: { [x: string]: any }, index: number): void {
    // add new content item
    this.contentValue.splice(index + 1, 0, { ...content });
  }

  /**
   * update content input model (two-way data binding)
   * @param value updated value
   * @param index index of object of content input to update
   */
  updateInput(value, index): void {
    this.contentValue[index][
      // use pickItemPipe to get proper key
      this.pickItem.transform(this.contentValue[index], 'key')
    ] = value;
  }

  /**
   * delete content item
   * @param index index of content item to delete
   */
  deleteContent(index: number): void {
    this.contentValue.splice(index, 1);
  }

  /**
   * move page item in array of pages
   * @param direction up/down (increase/decrease) index
   * @param index current index of page item
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
    this.contentValue = this.sharedService.moveArrayItem(
      this.contentValue,
      index,
      newIndex
    );
  }

  /**
   * filter available content items according to type of content arr - common/generic and already used items
   * @param contentKey type of content arr (common/generic)
   * @param available arr of available items
   * @param used already used items
   */
  filterAvailable(contentKey: string, available: any[], used: any[]): any[] {
    return available.filter((val) =>
      contentKey === 'common'
        ? // if type of content is 'common' - look into used arr and filter already used ones
          used.findIndex(
            (value) =>
              // compare names of keys of available/used items
              Object.keys(value)[0] === Object.keys(val)[0]
          ) === -1
        : // ...in 'generic' type case - don`t filter anything
          true
    );
  }
}
