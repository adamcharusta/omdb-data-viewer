import { Component } from '@angular/core';
import { SearchFormType, SearchParametersType } from '../../app.types';
import { OmdbApiService } from '../../services/omdb-api.service';
import { environment } from '../../../environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { startWith, switchMap } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  public searchForm = new FormGroup<SearchFormType>({
    searchedText: new FormControl(environment.START_SEARCH_TEXT_VALUE, {
      nonNullable: true,
    }),
    year: new FormControl(null, { nonNullable: true }),
    type: new FormControl('', { nonNullable: true }),
    page: new FormControl(0, { nonNullable: true }),
  });

  omdbData$ = this.searchForm.valueChanges.pipe(
    startWith(this.searchForm.value),
    switchMap(params =>
      this.omdbApiService.getMovies(params as SearchParametersType)
    )
  );

  constructor(private omdbApiService: OmdbApiService) {}

  getMovieData(imdbID: string) {
    this.omdbApiService.getMovieByImdbID(imdbID).subscribe();
  }

  handleChangePage($event: PageEvent) {
    this.searchForm.controls.page.setValue($event.pageIndex);
  }
}
