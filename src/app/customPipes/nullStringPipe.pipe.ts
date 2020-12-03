import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cambiarStringNullValue' })
export class NullStringPipe implements PipeTransform {
  transform(value: string, txt: string) {
    return value != null || value == "" ? value : txt ? txt : 'Ninguno';
  }
}
