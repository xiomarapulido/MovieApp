import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-movie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'app-card' }
})
export class CardMovieComponent {
  @Input() movie: Movie= {} as Movie;

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/error-movie.jpg';
  }
}
