import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusSobe',
})
export class StatusSobePipe implements PipeTransform {
  transform(value: number): string {
    switch (value) {
      case 0:
        return 'Slobodno';
        break;
      case 1:
        return 'Rezervisano';
        break;
      case 2:
        return 'Nedostupno';
        break;
      default:
        return 'Nedostupno';
        break;
    }
  }
}
