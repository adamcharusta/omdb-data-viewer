import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchFormType, SearchParametersType } from '../../app.types';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-search-toolbar',
  templateUrl: './search-toolbar.component.html',
})
export class SearchToolbarComponent {
  @Output() search = new EventEmitter<SearchParametersType>();

  @Input() searchForm!: FormGroup<SearchFormType>;

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

  constructor(private translocoService: TranslocoService) {}

  onChange() {
    this.searchForm.controls.page.setValue(0);
  }
}
