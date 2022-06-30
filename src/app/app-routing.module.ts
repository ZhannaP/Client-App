import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstants } from './core/constants/routeConstants';
import { ChempionsListComponent } from './pages/chempions-list/chempions-list.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { TeamsListComponent } from './pages/teams-list/teams-list.component';
import { TournamentsListComponent } from './pages/tournaments-list/tournaments-list.component';

const routes: Routes = [
  {path: RouteConstants.CHEMPIONS, component: ChempionsListComponent},
  {path: RouteConstants.ITEMS, component: ItemsListComponent},
  {path: RouteConstants.TEAMS, component: TeamsListComponent},
  {path: RouteConstants.TOURNAMENTS, component: TournamentsListComponent},
  { path: '**', redirectTo: `/${RouteConstants.CHEMPIONS}` }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
