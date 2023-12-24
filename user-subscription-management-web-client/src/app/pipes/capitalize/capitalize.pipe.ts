// capitalize.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value;

    return value.replace(/\w/g, (match) => match.toUpperCase());
  }
}
