import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingMascotPipe } from '../../pipes/rating-mascot.pipe';

@Component({
  selector: 'app-rating-badge',
  templateUrl: './rating-badge.component.html',
  styleUrls: ['./rating-badge.component.scss'],
  standalone: true,
  imports: [CommonModule, RatingMascotPipe],
})
export class RatingBadgeComponent {
  @Input() rating: number = 0;
  @Input() label: string = '';
  // Controls size: sm (cards), lg (detail)
  @Input() size: 'sm' | 'lg' = 'sm';
}