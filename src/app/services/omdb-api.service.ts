import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  OmdbMovieDetailsType,
  OmdbSearchResponseType,
  SearchParametersType,
} from '../app.types';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OmdbApiService {
  constructor(private httpClient: HttpClient) {}

  getMovies(payload: SearchParametersType): Observable<OmdbSearchResponseType> {
    const params = new HttpParams()
      .set('s', payload.searchedText)
      .set('y', payload.year ? payload.year : '')
      .set('type', payload.type)
      .set('page', payload.page + 1);

    return this.httpClient.get<OmdbSearchResponseType>(environment.API_URL, {
      params,
    });
    // .pipe(tap(console.log));
  }

  getMovieByImdbID(imdbID: string): Observable<OmdbMovieDetailsType> {
    const params = new HttpParams().set('i', imdbID).set('plot', 'full');

    return this.httpClient.get<OmdbMovieDetailsType>(environment.API_URL, {
      params,
    });
    // .pipe(tap(console.log));
  }
}
