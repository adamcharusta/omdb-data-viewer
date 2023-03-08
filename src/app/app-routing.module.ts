import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  {
    path: APP_ROUTES.HOME_PAGE,
    component: HomePageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
