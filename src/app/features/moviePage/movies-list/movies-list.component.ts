import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CardMovieComponent } from '../../card-movie/card-movie.component';
import { CommonModule } from '@angular/common';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../shared/models/movie.model';
import { Router } from '@angular/router';
import { debounceTime, of, switchMap } from 'rxjs';

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
  movieData = signal<Movie[]>([]);  // Signal for movie list
  currentPage = signal(1);  // Signal for current page
  moviesPerPage = 12;
  totalMovies = signal(0);  // Signal for total movies
  searchTerm = signal('');  // Signal for search term
  availableGenres = signal<string[]>([]);  // Signal for available genres
  selectedGenres = signal<string[]>([]);  // Signal for selected genres

  constructor(private movieService: MovieService, private router: Router) {
    this.loadMovies();
  }

  // Load movies from API
  private loadMovies(): void {
    this.movieService.getAll$().subscribe((movies) => {
      this.movieData.set(movies);  
      this.totalMovies.set(movies.length);  

      // Set available genres from movies
      const genres = new Set<string>();
      movies.forEach(movie => movie.genres.forEach(genre => genres.add(genre)));
      this.availableGenres.set(Array.from(genres));  // Set genres list
    });
  }

  // Get total number of pages based on filtered movies
  get totalPages(): number {
    const filteredMovies = this.filteredMovies; // Use filtered movies here for accurate page count
    return Math.ceil(filteredMovies.length / this.moviesPerPage);
  }

  // Get filtered movies based on search term and selected genres
  get filteredMovies(): Movie[] {
    let filteredMovies = this.movieData(); // Start with all movies

    // Filter movies by search term
    if (this.searchTerm()) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchTerm().toLowerCase())
      );
    }

    // Filter movies by selected genres
    if (this.selectedGenres().length > 0) {
      filteredMovies = filteredMovies.filter(movie =>
        this.selectedGenres().some(genre => movie.genres.map(g => g.toLowerCase()).includes(genre.toLowerCase()))
      );
    }

    return filteredMovies; // Return filtered list of movies
  }

  // Get movies for the current page
  get paginatedMovies(): Movie[] {
    const filteredMovies = this.filteredMovies; // Use filtered movies

    const start = (this.currentPage() - 1) * this.moviesPerPage;
    const end = start + this.moviesPerPage;

    return filteredMovies.slice(start, end); // Slice the filtered movies based on current page
  }

  // Go to next page
  nextPage(): void {
    if (this.currentPage() < this.totalPages) {
      this.currentPage.set(this.currentPage() + 1);
    }
  }

  // Go to previous page
  prevPage(): void {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
    }
  }

  // Handle input event for search with debounce
  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);  // Set the search term to the signal

    // Apply debounce with 500ms delay before performing the search
    of(input.value).pipe(
      debounceTime(500),
      switchMap(() => of(input.value))
    ).subscribe(search => {
      this.searchTerm.set(search);  // Update the search term signal
    });

    // Reset the current page to 1 when a new search term is set
    this.currentPage.set(1);
  }

  // Handle genre selection
  onGenreSelect(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;  // Hacemos el casting correcto
    const selectedOptions = Array.from(selectElement.selectedOptions);  // Obtenemos las opciones seleccionadas
    const selectedGenres = selectedOptions.map(option => option.value);  // Extraemos los valores de cada opción seleccionada

    this.selectedGenres.set(selectedGenres);  // Actualizamos la señal con los géneros seleccionados

    // Actualizar la URL con los géneros seleccionados
    this.router.navigate([], {
      queryParams: { genres: selectedGenres.join(',') }, // Pasamos los géneros como parámetros de consulta
      queryParamsHandling: 'merge' // Mantener otros parámetros
    });

    // Reset the current page to 1 when genres are changed
    this.currentPage.set(1);
  }

}
