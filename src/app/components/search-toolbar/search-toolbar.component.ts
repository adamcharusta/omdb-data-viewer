import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SearchFormType, SearchParametersType } from '../../app.types';
import { environment } from '../../../environments/environment';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
  styleUrls: ['./search-toolbar.component.scss'],
})
export class SearchToolbarComponent {
  @Output() search = new EventEmitter<SearchParametersType>();
  constructor(private translocoService: TranslocoService) {}
  public searchForm = new FormGroup<SearchFormType>({
    searchedText: new FormControl(environment.START_SEARCH_TEXT_VALUE, {
      nonNullable: true,
    }),
    year: new FormControl(null, { nonNullable: true }),
    type: new FormControl('', { nonNullable: true }),
  });

  public typeOptions = [
    {
      name: this.translocoService.translate(
        'home-page.search-form.fields.type.options.movie'
      ),
      value: 'movie',
    },
    {
      name: this.translocoService.translate(
        'home-page.search-form.fields.type.options.series'
      ),
      value: 'series',
    },
    {
      name: this.translocoService.translate(
        'home-page.search-form.fields.type.options.episode'
      ),
      value: 'episode',
    },
    {
      name: this.translocoService.translate(
        'home-page.search-form.fields.type.options.game'
      ),
      value: 'game',
    },
  ];

  onChange() {
    this.search.emit(this.searchForm.getRawValue());
  }
}
