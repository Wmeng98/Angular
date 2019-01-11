import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService }  from './in-memory-data.service';
import { HeroesComponent } from './heroes/heroes.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,

      // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }



// NOTES:
// **************************************************
// The HeroService GETS hero data with HTTP requests.
// Users can add, edit, and delete heroes and save these changes OVER HTTP.
// Users can search for heroes by name.

// in-memory-web api, intercepts HttpClient responses and apply them to an in-memory data store
//    returns simualated responses, therefore won't have to set up a server


