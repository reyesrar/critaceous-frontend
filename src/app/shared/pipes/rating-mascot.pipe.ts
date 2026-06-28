import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'ratingMascot', standalone: true })
export class RatingMascotPipe implements PipeTransform {
  transform(rating: number): string {
    // poor: below 4.5 | mascot: 4.5-7.4 | amazing: 7.5+
    if (rating < 4.5) return 'assets/mascot/poor.png';
    if (rating >= 7.5) return 'assets/mascot/amazing.png';
    return 'assets/mascot/mascot.png';
  }
}