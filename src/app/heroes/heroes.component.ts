import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  // selectedHero: Hero;


  heroes: Hero[];


  // Simultaneously defines a private heroService property and identifies it as a HeroService injection site
  // When angulR creates a hero component, hte dependency injection system sets the heroService param to the singleton instance of HeroService
  constructor(private heroService: HeroService) { 
    // Reserve the constructor for simple initialization such as wiring constructor parameters to properties. The constructor shouldn't do anything. It certainly shouldn't call a function that makes HTTP requests to a remote server as a real data service would.
  }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }




  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }


  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }


  // When the given name is non-blank, the handler creates a Hero-like object from the name (it's only missing the id) and passes it to the services addHero() method.

  // When addHero saves successfully, the subscribe callback receives the new hero and pushes it into to the heroes list for display.
  
  // You'll write HeroService.addHero in the next section.



  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  // }

}
