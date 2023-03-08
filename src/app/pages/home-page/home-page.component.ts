import { Component } from '@angular/core';
import { SearchParametersType } from '../../app.types';
import { OmdbApiService } from '../../services/omdb-api.service';
import { BehaviorSubject, switchMap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  private searchSubject = new BehaviorSubject<SearchParametersType>({
    searchedText: environment.START_SEARCH_TEXT_VALUE,
    year: null,
    type: '',
  });
  omdbData$ = this.searchSubject.pipe(
    switchMap(params => this.omdbApiService.getMovies(params))
  );
  constructor(private omdbApiService: OmdbApiService) {}

  handleSearch(event: SearchParametersType) {
    this.searchSubject.next(event);
  }

  getMovieData(imdbID: string) {
    this.omdbApiService.getMovieByImdbID(imdbID).subscribe();
  }
}
