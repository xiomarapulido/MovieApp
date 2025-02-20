import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardMovieComponent } from '../../card-movie/card-movie.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-movies-list',
  standalone: true,
 imports: [CommonModule, CardMovieComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
  host: { class: 'app-movies-list' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {
  movieData = signal<Movie[]>([]);
  
    constructor(private movieService: MovieService) {
      this.loadAllMovies();
    }
  
    private loadAllMovies() {
      this.movieService.getAll$().subscribe((movies) => {
        this.movieData.set(movies);  
      });
    }

}
