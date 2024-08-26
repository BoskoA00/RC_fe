import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sesijaTermin',
})
export class SesijaTerminPipe implements PipeTransform {
  transform(value: string): string {
    let v = value.substring(0, 16);

    let datum = v.substring(0, 10);
    datum = datum.split('-').reverse().join('-');
    let vreme = v.substring(10, v.length);
    v = `${datum}--${vreme}`;

    return v;
  }
}
