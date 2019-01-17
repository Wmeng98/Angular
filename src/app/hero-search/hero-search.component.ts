import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}




// Chaining RxJS Operators EXPLAINED...
// *****************************

// Passing a new search term directly to the searchHeroes() after every user keystroke would create an excessive amount of HTTP requests, taxing server resources and burning through the cellular network data plan.

// Instead, the ngOnInit() method pipes the searchTerms observable through a sequence of RxJS operators that reduce the number of calls to the searchHeroes(), ultimately returning an observable of timely hero search results (each a Hero[]).

// Here's the code.

// content_copy
// this.heroes$ = this.searchTerms.pipe(
//   // wait 300ms after each keystroke before considering the term
//   debounceTime(300),

//   // ignore new term if same as previous term
//   distinctUntilChanged(),

//   // switch to new search observable each time the term changes
//   switchMap((term: string) => this.heroService.searchHeroes(term)),
// );
// debounceTime(300) waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string. You'll never make requests more frequently than 300ms.
// distinctUntilChanged() ensures that a request is sent only if the filter text changed.
// switchMap() calls the search service for each search term that makes it through debounce and distinctUntilChanged. It cancels and discards previous search observables, returning only the latest search service observable.
// With the switchMap operator, every qualifying key event can trigger an HttpClient.get() method call. Even with a 300ms pause between requests, you could have multiple HTTP requests in flight and they may not return in the order sent.

// switchMap() preserves the original request order while returning only the observable from the most recent HTTP method call. Results from prior calls are canceled and discarded.

// Note that canceling a previous searchHeroes() Observable doesn't actually abort a pending HTTP request. Unwanted results are simply discarded before they reach your application code.

// Remember that the component class does not subscribe to the heroes$ observable. That's the job of the AsyncPipe in the template.







// HTTP Module Summary:

// You're at the end of your journey, and you've accomplished a lot.

// You added the necessary dependencies to use HTTP in the app.
// You refactored HeroService to load heroes from a web API.
// You extended HeroService to support post(), put(), and delete() methods.
// You updated the components to allow adding, editing, and deleting of heroes.
// You configured an in-memory web API.
// You learned how to use observables.