import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OmdbApiService } from '../../services/omdb-api.service';
import { mergeMap, tap } from 'rxjs';
import { APP_ROUTES } from '../../app.routes';
import { RecentlyViewedService } from '../../services/recently-viewed.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
})
export class DetailsPageComponent {
  readonly HOME_ROUTE = APP_ROUTES.HOME_PAGE;
  public movie$ = this.route.params.pipe(
    mergeMap(({ imdbID }) => {
      return this.omdbApiService.getMovieByImdbID(imdbID).pipe(
        tap(data => {
          if (data.Error) {
            this.router.navigate([APP_ROUTES.HOME_PAGE]);
          } else {
            this.recentlyViewedService.add(imdbID);
          }
        })
      );
    })
  );

  public recentlyViewedMovies$ = this.route.params.pipe(
    mergeMap(() => this.omdbApiService.getRecentlyViewedMovies())
  );

  constructor(
    private route: ActivatedRoute,
    private omdbApiService: OmdbApiService,
    private recentlyViewedService: RecentlyViewedService,
    private router: Router
  ) {}

  goToRecentlyViewMovie(imdbID: string) {
    this.router.navigate([APP_ROUTES.DETAILS_PAGE, imdbID]);
  }
}
