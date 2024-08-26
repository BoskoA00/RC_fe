import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'izvestaj',
})
export class IzvestajPipe implements PipeTransform {
  transform(value: string): string {
    value = value.substring(0, 15) + '...';
    return value;
  }
}
