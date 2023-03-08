import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OmdbMovieType } from '../../app.types';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { ImageNonPosterDirective } from '../../directives/image-non-poster.directive';
import { MovieCardComponent } from './movie-card.component';
import { CardComponent } from '../card/card.component';
import { MatCardModule, MatCardSubtitle } from '@angular/material/card';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  const movie: OmdbMovieType = {
    imdbID: '1',
    Title: 'Test Movie',
    Year: '2021',
    Type: 'movie',
    Poster: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MovieCardComponent,
        CardComponent,
        CapitalizePipe,
        ImageNonPosterDirective,
      ],
      imports: [MatCardModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = movie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie title, year, and type in the subtitle', () => {
    const subtitleEl = fixture.debugElement.query(
      By.directive(MatCardSubtitle)
    ).nativeElement;
    expect(subtitleEl.textContent).toContain(`"${movie.Title}"`);
    expect(subtitleEl.textContent).toContain(`(${movie.Year})`);
    expect(subtitleEl.textContent).toContain(`Movie`);
  });

  it('should emit a click event when the card is clicked', () => {
    spyOn(component.clickCard, 'emit');
    const cardEl = fixture.debugElement.query(
      By.directive(CardComponent)
    ).nativeElement;
    cardEl.click();
    expect(component.clickCard.emit).toHaveBeenCalled();
  });

  it('should set alt text on the image', () => {
    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.getAttribute('alt')).toEqual(`Photo of ${movie.Title}`);
  });

  it('should set the image source to the movie poster', () => {
    component.movie.Poster = 'https://example.com/poster.jpg';
    fixture.detectChanges();
    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    expect(imgEl.getAttribute('src')).toEqual('https://example.com/poster.jpg');
  });

  it('should set the image source to a placeholder if there is no movie poster', () => {
    const imgEl = fixture.debugElement.query(By.css('img')).nativeElement;
    imgEl.dispatchEvent(new Event('error'));

    expect(imgEl.getAttribute('src')).toContain(
      'https://images.placeholders.dev'
    );
  });

  it('should set the placeholder value to the capitalized movie type', () => {
    const imgDirective = fixture.debugElement
      .query(By.directive(ImageNonPosterDirective))
      .injector.get(ImageNonPosterDirective);
    expect(imgDirective.placeholder).toEqual('Movie');
  });
});
