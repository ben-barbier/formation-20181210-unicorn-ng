import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'magicalName',
})
export class MagicalNamePipe implements PipeTransform {

    transform(value: string): string {
        console.count('magicalName');
        return value.split('').map((char, idx) => {
            return (idx % 2) ? char.toLowerCase() : char.toUpperCase();
        }).join('');
    }

}
