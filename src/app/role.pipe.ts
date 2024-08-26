import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'role',
})
export class RolePipe implements PipeTransform {
  transform(value: number): string | undefined {
    if (value === 0) return 'Pacijent';
    if (value === 1) return 'Terapeut';
    if (value === 2) return 'Admin';
    else return 'Nedefinisano';
  }
}
