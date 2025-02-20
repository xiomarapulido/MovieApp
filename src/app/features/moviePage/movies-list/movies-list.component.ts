import { ChangeDetectionStrategy, Component, signal, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardMovieComponent } from '../../card-movie/card-movie.component';
import { MovieService } from '../../../core/services/movie.service';
import { Movie } from '../../../shared/models/movie.model';
import { Router } from '@angular/router';
import { debounceTime, of, switchMap } from 'rxjs';
import { PaginatorComponent } from '../paginator/paginator.component';
import { SearcherComponent } from '../searcher/searcher.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [
    CommonModule, 
    CardMovieComponent, 
    PaginatorComponent,
    SearcherComponent,
    FilterComponent],
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
  host: { class: 'app-movies-list' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent {

  movieData = signal<Movie[]>([]); // Signal to store all movies
  currentPage = signal(1);         // Signal to store current page
  moviesPerPage = 12;              // Number of movies per page
  totalMovies = signal(0);         // Signal to store the total number of movies
  searchTerm: WritableSignal<string> = signal('');       // Signal to store the search term
  availableGenres = signal<string[]>([]); // Signal to store available genres
  selectedGenres = signal<string[]>([]);  // Signal to store selected genres

  constructor(private movieService: MovieService, private router: Router) {
    this.loadMovies(); // Fetch movies when the component initializes
  }

  /**
   * Fetches all movies from the service and extracts available genres.
   */
  private loadMovies(): void {
    this.movieService.getAll$().subscribe((movies) => {
      this.movieData.set(movies);  // Set the movies signal
      this.totalMovies.set(movies.length);  // Set the total movies count
      this.getGenres(movies);  // Extract available genres from the movies
    });
  }

  /**
   * Extracts unique genres from the movie list and stores them.
   * @param movies List of movies
   */
  getGenres(movies: Movie[]) {
    const genres = new Set<string>();
    movies.forEach(movie => movie.genres.forEach(genre => genres.add(genre)));
    this.availableGenres.set(Array.from(genres));  // Update the available genres signal
  }

  /**
   * Calculates the total number of pages based on filtered movies.
   */
  get totalPages(): number {
    return Math.ceil(this.filteredMovies.length / this.moviesPerPage); // Calculate total pages
  }

  /**
   * Filters movies based on the search term and selected genres.
   */
  get filteredMovies(): Movie[] {
    let filteredMovies = this.movieData();

    // Filter movies based on the search term
    if (this.searchTerm()) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(this.searchTerm().toLowerCase())
      );
    }

    // Filter movies based on the selected genres
    if (this.selectedGenres().length > 0) {
      filteredMovies = filteredMovies.filter(movie =>
        this.selectedGenres().some(genre => movie.genres.map(g => g.toLowerCase()).includes(genre.toLowerCase()))
      );
    }

    return filteredMovies;  // Return the filtered movie list
  }

  /**
   * Returns the list of paginated movies based on the current page.
   */
  get paginatedMovies(): Movie[] {
    const start = (this.currentPage() - 1) * this.moviesPerPage;
    return this.filteredMovies.slice(start, start + this.moviesPerPage);  // Return paginated movies
  }

  /**
   * Updates the current page when the user changes it.
   * @param newPage The new selected page
   */
  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);  // Set the new current page
  }

  /**
   * Handles user input in the search field with debounce effect.
   * @param searchTerm The search term entered by the user
   */
  onSearch(searchTerm: string): void {
    this.searchTerm.set(searchTerm);  // Update the search term signal
    this.currentPage.set(1);  // Reset to the first page when the search term changes
  }

  /**
   * Handles genre selection and updates URL parameters.
   * @param selectedGenres The genres selected by the user
   */
  onGenreChange(selectedGenres: string[]): void {
    this.selectedGenres.set(selectedGenres);  // Update the selected genres signal

    // Update the URL with the selected genres as query parameters
    this.router.navigate([], {
      queryParams: { genres: selectedGenres.join(',') },
      queryParamsHandling: 'merge'
    });

    this.currentPage.set(1);  // Reset to the first page when genres are changed
  }
}
