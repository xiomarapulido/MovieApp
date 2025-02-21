import { ChangeDetectionStrategy, Component, Signal, signal } from '@angular/core';
import { Movie } from '../../../shared/models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../core/services/movie.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { Location } from '@angular/common';
import { moviesRoute } from '../../../shared/const/generalConst';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule],
  providers: [CurrencyPipe],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
  host: { class: 'app-movie-detail' },
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieDetailComponent {

  movie = signal<Movie | null>(null);  // Signal for movie data
  error = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private router: Router,
    private location: Location,
    private currencyPipe: CurrencyPipe
  ) { }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.loadMovie(slug);  // Fetch movie data by slug
    }
  }

  // Function to load movie data by slug
  loadMovie(slug: string): void {
    this.movieService.getMovieBySlug$(slug).subscribe((foundMovie) => {
      if (foundMovie) {
        this.movie.set(foundMovie);  // Set the movie data to the signal
      } else {
        this.error.set(true);  // Set error to true if movie is not found
      }
    });
  }

  // Method to format the budget to Euros
  formatCurrency(amount: number): string {
    return `€${amount.toLocaleString()}`;
  }

  // Method to handle the back button
  goBack(): void {
    const currentUrl = this.router.url;
    if (currentUrl.includes(`/${moviesRoute}`)) {
      this.router.navigate([`/${moviesRoute}`]);
    } else {
      this.router.navigate(['/']);
    }
  }
}
