import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ 
  name: 'array',  
  standalone: true
})
export class ArrayPipe implements PipeTransform {
  transform(value: number): number[] {
    return Array.from({ length: value }, (_, i) => i + 1);
  }
}
