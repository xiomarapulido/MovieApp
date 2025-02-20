import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../shared/models/movie.model';
import { CardMovieComponent } from '../../card-movie/card-movie.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardMovieComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { class: 'app-home' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  movieData = signal<Movie[]>([]);

  constructor(private movieService: MovieService) {
    this.loadPopularMovies();
  }

  private loadPopularMovies() {
    this.movieService.getTop10Popular$().subscribe((movies) => {
      this.movieData.set(movies);  
    });
  }
}
