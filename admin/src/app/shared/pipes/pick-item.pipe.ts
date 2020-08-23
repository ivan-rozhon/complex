import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxPickItem',
})
export class PickItemPipe implements PipeTransform {
  transform(value: any, type: string, index?: number): any {
    // get array of keys of object
    const keys = value ? Object.keys(value) : [];

    // default index is 0
    index = index ? index : 0;

    return keys.length
      ? type === 'value'
        ? value[keys[index]]
        : type === 'key'
        ? keys[index]
        : value
      : value;
  }
}
