import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../shared/models/movie.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: { class: 'app-home' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  
  movieData = signal<Movie[]>([]);

  constructor(private movieService: MovieService) {
    this.loadMovies();
  }

  private loadMovies() {
    this.movieService.getAll$().subscribe((movies) => {
      this.movieData.set(movies); 
    });
  }
}
