import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vreme',
})
export class VremePipe implements PipeTransform {
  transform(value: string): string {
    const vrednost = value.substring(value.length - 11, value.length - 6);
    return vrednost;
  }
}
