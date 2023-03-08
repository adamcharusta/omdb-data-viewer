import { MatPaginatorIntlCroService } from './mat-paginator-intl-cro.service';
import { CapitalizePipe } from '../pipes/capitalize.pipe';

describe('MatPaginatorIntlCroService', () => {
  let service: MatPaginatorIntlCroService;

  const text = 'translated string';
  const expectedText = new CapitalizePipe().transform(text);

  beforeEach(() => {
    const translocoServiceSpy = jasmine.createSpyObj('TranslocoService', [
      'translate',
    ]);
    translocoServiceSpy.translate.and.returnValue(text);

    service = new MatPaginatorIntlCroService(translocoServiceSpy);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set labels in constructor', () => {
    console.log(service.firstPageLabel);

    expect(service.firstPageLabel).toBe(expectedText);
    expect(service.lastPageLabel).toBe(expectedText);
    expect(service.nextPageLabel).toBe(expectedText);
    expect(service.previousPageLabel).toBe(expectedText);
  });

  it('should get range label', () => {
    const rangeLabel = service.getRangeLabel(0, 10, 100);
    expect(rangeLabel).toBe(`1 - 10 ${text} 100`);
  });
});
