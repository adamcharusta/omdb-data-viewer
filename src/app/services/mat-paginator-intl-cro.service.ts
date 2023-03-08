import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslocoService } from '@ngneat/transloco';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

@Injectable({
  providedIn: 'root',
})
export class MatPaginatorIntlCroService extends MatPaginatorIntl {
  private capitalize = new CapitalizePipe();

  override firstPageLabel = this.capitalize.transform(
    this.translocoService.translate('paginator.first-page')
  );
  override lastPageLabel = this.capitalize.transform(
    this.translocoService.translate('paginator.last-page')
  );
  override nextPageLabel = this.capitalize.transform(
    this.translocoService.translate('paginator.next-page')
  );
  override previousPageLabel = this.capitalize.transform(
    this.translocoService.translate('paginator.previous-page')
  );

  constructor(private translocoService: TranslocoService) {
    super();
  }
  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return '0 od ' + length;
    }

    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return (
      startIndex +
      1 +
      ' - ' +
      endIndex +
      ` ${this.translocoService.translate('paginator.range')} ` +
      length
    );
  };
}
