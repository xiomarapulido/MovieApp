import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Movie } from '../../shared/models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {

  private readonly dataURL = 'assets/mock/movie.mock-data.json';

  constructor(private http: HttpClient) {}

  getTop10Popular$(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.dataURL).pipe(
      map((movies: Movie[]) => {
        return movies
          .filter((movie) => !isNaN(parseFloat(movie.popularity))) 
          .sort((a, b) => parseFloat(b.popularity) - parseFloat(a.popularity)) 
          .slice(0, 10); 
      })
    );
  }

  getAll$(): Observable<Movie[]> {
		return this.http.get<Movie[]>(this.dataURL);
	}
  
}
