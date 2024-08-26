import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datum',
})
export class DatumPipe implements PipeTransform {
  transform(value: string, args: number): string | undefined {
    if (args == 0) {
      let v = value.substring(0, 10);
      return v;
    } else if (args == 1) {
      let v = value.substring(value.length - 5);
      return v;
    } else {
      return undefined;
    }
  }
}
