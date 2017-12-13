import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'caFirstItem'
})

export class FirstItemPipe implements PipeTransform {
    transform(value: any, type: string): any {
        // get array of keys of object
        const keys = value ? Object.keys(value) : [];

        return keys.length
            ? type === 'value'
                ? value[keys[0]]
                : type === 'key'
                    ? keys[0]
                    : value
            : value;
    }
}
