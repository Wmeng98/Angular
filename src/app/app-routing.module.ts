import { NgModule } from '@angular/core';

import { RouterModule, Routes } from "@angular/router";
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';


const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }


// Summary of routing module ...
// *********************************
// You added the Angular router to navigate among different components.
// You turned the AppComponent into a navigation shell with <a> links and a <router-outlet>.
// You configured the router in an AppRoutingModule
// You defined simple routes, a redirect route, and a parameterized route.
// You used the routerLink directive in anchor elements.
// You refactored a tightly-coupled master/detail view into a routed detail view.
// You used router link parameters to navigate to the detail view of a user-selected hero.
// You shared the HeroService among multiple components.