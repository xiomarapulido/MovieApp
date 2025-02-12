import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from '../../shared/models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly dataURL = 'assets/mock/movie.mock-data.json';

	constructor(private http: HttpClient) {}

	getAll$(): Observable<Movie[]> {
		return this.http.get<Movie[]>(this.dataURL);
	}

}


