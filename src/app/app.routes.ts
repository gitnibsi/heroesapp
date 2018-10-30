import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './components/heroes/hero.component';
import { HeroesComponent } from './components/heroes/heroes.component';

const app_routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'hero/:id', component: HeroComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'heroes'},
];

export const APP_ROUTING = RouterModule.forRoot(app_routes);
