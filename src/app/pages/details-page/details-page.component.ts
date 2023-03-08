import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbApiService } from '../../services/omdb-api.service';
import { switchMap } from 'rxjs';
import { APP_ROUTES } from '../../app.routes';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss'],
})
export class DetailsPageComponent {
  readonly HOME_ROUTE = APP_ROUTES.HOME_PAGE;
  public movie$ = this.route.params.pipe(
    switchMap(({ imdbID }) => this.omdbApiService.getMovieByImdbID(imdbID))
  );

  constructor(
    private route: ActivatedRoute,
    private omdbApiService: OmdbApiService
  ) {}
}
