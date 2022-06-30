import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { ChempionsListComponent } from './pages/chempions-list/chempions-list.component';
import { ItemsListComponent } from './pages/items-list/items-list.component';
import { TeamsListComponent } from './pages/teams-list/teams-list.component';
import { TournamentsListComponent } from './pages/tournaments-list/tournaments-list.component';
import { ChempionDialogComponent } from './shared/dialogs/chempion-dialog/chempion-dialog.component';
import { ItemDialogComponent } from './shared/dialogs/item-dialog/item-dialog.component';
import { TeamDialogComponent } from './shared/dialogs/team-dialog/team-dialog.component';
import { TournamentDialogComponent } from './shared/dialogs/tournament-dialog/tournament-dialog.component';
import { InteractionDialogComponent } from './shared/dialogs/interaction-dialog/interaction-dialog.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule } from '@angular/material/button';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatRadioButton, MatRadioModule} from '@angular/material/radio'
//import { PresentLayoutComponent } from './pages/present-layout/present-layout.component'

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ChempionsListComponent,
    ItemsListComponent,
    TeamsListComponent,
    TournamentsListComponent,
    ChempionDialogComponent,
    ItemDialogComponent,
    TeamDialogComponent,
    TournamentDialogComponent,
    InteractionDialogComponent,
    //PresentLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FlexLayoutModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatButtonModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
