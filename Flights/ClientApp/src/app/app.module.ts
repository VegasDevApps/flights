import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SearchFlightsComponent } from './search-flights/search-flights.component';
import { BookFlightComponent } from './book-flight/book-flight.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { BookFlightResolver } from './book-flight/book-flight.resolver';
import { RegisterPassengerComponent } from './register-passenger/register-passenger.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SearchFlightsComponent,
    BookFlightComponent,
    NotFoundComponent,
    RegisterPassengerComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: SearchFlightsComponent, pathMatch: 'full' },
      { path: 'search-flights', component: SearchFlightsComponent },
      { path: 'book-flight/:flightId', component: BookFlightComponent, resolve: {flight: BookFlightResolver} },
      { path: 'register-passenger', component: RegisterPassengerComponent },
      { path: '**', component: NotFoundComponent },
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

