import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  OmdbMovieDetailsType,
  OmdbMovieType,
  OmdbSearchResponseType,
  SearchParametersType,
} from '../app.types';
import { map, Observable, tap, zip } from 'rxjs';
import { environment } from '../../environments/environment';
import { RecentlyViewedService } from './recently-viewed.service';

@Injectable({
  providedIn: 'root',
})
export class OmdbApiService {
  constructor(
    private httpClient: HttpClient,
    private recentlyViewedService: RecentlyViewedService
  ) {}

  getMovies(payload: SearchParametersType): Observable<OmdbSearchResponseType> {
    const params = new HttpParams()
      .set('s', payload.searchedText)
      .set('y', payload.year ? payload.year : '')
      .set('type', payload.type)
      .set('page', payload.page + 1);

    return this.httpClient.get<OmdbSearchResponseType>(environment.API_URL, {
      params,
    });
  }

  getMovieByImdbID(imdbID: string): Observable<OmdbMovieDetailsType> {
    const params = new HttpParams().set('i', imdbID).set('plot', 'full');

    return this.httpClient.get<OmdbMovieDetailsType>(environment.API_URL, {
      params,
    });
  }

  getRecentlyViewedMovies(): Observable<OmdbMovieType[]> {
    const ids = this.recentlyViewedService.getRecentlyViewed();
    const movieQueryList = ids.map(id => this.getMovieByImdbID(id));

    return zip(movieQueryList).pipe(
      map(res =>
        res.map(({ Title, Year, imdbID, Poster, Type }) => ({
          Title,
          Year,
          imdbID,
          Poster,
          Type,
        }))
      ),
      tap(console.log)
    );
  }
}
