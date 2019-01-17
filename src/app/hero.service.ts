import { HttpClient, HttpHeaders } from '@angular/common/http'; // needed http symbols

import { Injectable } from '@angular/core';
import { MessageService } from './message.service';


import { Hero } from './hero';
import { HEROES } from './mock-heroes';

import { Observable, throwError, of} from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';




@Injectable({ providedIn: 'root' })

export class HeroService {
    private heroesUrl = 'api/heroes'; // URL to web portal
    // url of the form :base/collectionName with address of heroes resource on the server


    
    
    constructor(private messageService: MessageService) { }

    getHero(id: number): Observable<Hero> {
        // TODO: send the message _after_ fetching the hero
        this.messageService.add(`HeroService: fetched hero id=${id}`);
        return of(HEROES.find(hero => hero.id === id));
    }
    getHeroes(): Observable<Hero[]> {
        this.messageService.add('HeroService: fetched heroes')
        return of(HEROES);
    }
    // getHeroes (): Observable<Hero[]> {
    //     return this.http.get<Hero[]>(this.heroesUrl).pipe(
    //         catchError(this.handleError('getHeroes', []))
    //     );
    // } 
    


    // /** ERROR HANDLING
    //  * Handle Http operation that failed.
    //  * Let the app continue.
    //  * @param operation - name of the operation that failed
    //  * @param result - optional value to return as the observable result
    //  */
    // private handleError<T> (operation = 'operation', result?: T) {
    //     return (error: any): Observable<T> => {

    //     // TODO: send the error to remote logging infrastructure
    //     console.error(error); // log to console instead

    //     // TODO: better job of transforming error for user consumption
    //     this.log(`${operation} failed: ${error.message}`);

    //     // Let the app keep running by returning an empty result.
    //     return of(result as T);
    //     };
    // }
    
    
    
    
    
    // /** Log a HeroService message with the MessageService */
    // private log(message: string) {
    //     this.messageService.add(`HeroService: ${message}`);
    // }


}
