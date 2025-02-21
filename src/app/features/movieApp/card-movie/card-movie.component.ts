import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
import { CommonModule } from '@angular/common';
import { homeRoute, moviesRoute } from '../../../shared/const/generalConst';
import { Router } from '@angular/router';

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

  @Input() originRoute = '';
  @Input() movie: Movie = {} as Movie;

  constructor(private router: Router) {
  }

  onImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'assets/images/error-movie.jpg';
  }

  onCardClick(): void {
    if (this.originRoute === homeRoute) {
      this.router.navigate([`/${homeRoute}/${this.movie.slug}`]);
    } else if (this.originRoute === moviesRoute) {
      this.router.navigate([`/${moviesRoute}/${this.movie.slug}`]);
    }
  }
}
