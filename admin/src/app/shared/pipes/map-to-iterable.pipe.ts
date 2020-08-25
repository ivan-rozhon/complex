import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cxMapToIterable',
})
export class MapToIterablePipe implements PipeTransform {
  transform(value: { [x: string]: any }): any {
    return value
      ? // map object and return it as array - to be iterable
        Object.keys(value).map((key) => {
          return { [key]: value[key] };
        })
      : [];
  }
}
