import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Hero } from '../interfaces/hero.interface';
// Operators
import 'rxjs/add/operator/map';
/*
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/toPromise';
*/

@Injectable()

export class HeroesService {

        fireBaseHeroesURL = 'https://heroesapp-ac7f0.firebaseio.com/heroes.json';
        fireBaseHeroURL = 'https://heroesapp-ac7f0.firebaseio.com/heroes/'

        constructor( private http: Http ) {}

        // Start getHeros
        getHeros () {
          return this.http.get( this.fireBaseHeroesURL )
              .map( res => {
                console.log('HeroesService - getHeros - res.json');
                console.log(res.json());
                return res.json();
              });
        }
        // End getHeros

        // Start getHero
        getHero ( key$: string) {
          const firebaseUpdateURL = `${this.fireBaseHeroURL}/${key$}.json`;
          return this.http.get( firebaseUpdateURL )
              .map( res => {
                console.log('HeroesService - getHero');
                return res.json();
              });
        }
        // End getHero

        // Start newHero
        newHero( hero: Hero ) {

              console.log('HeroesService - newHero');

              const body = JSON.stringify( hero );
              const headers  = new Headers({
                  'Content-Type': 'application/json'
              });

              return this.http.post( this.fireBaseHeroesURL, body, { headers } )
                  .map( res => {
                        console.log('HeroesService - newHero');
                        console.log(res.json());
                        return res.json();
              });

        }
        // End newHero

        // Start updateHero
        updateHero( hero: Hero, key$: string ) {

              console.log('HeroesService - updateHero');

              const body = JSON.stringify( hero );
              const headers  = new Headers({
                  'Content-Type': 'application/json'
              });

              const firebaseUpdateURL = `${this.fireBaseHeroURL}/${key$}.json`;

              return this.http.put( firebaseUpdateURL, body, { headers } )
                  .map( res => {
                    console.log('heroes.service - updateHero');
                    console.log(res.json());
                    return res.json();
              });

        }
        // End updateHero

        // Start deleteHero
        deleteHero ( key$: string) {
              console.log('HeroesService - deleteHero');
              const firebaseUpdateURL = `${this.fireBaseHeroURL}/${key$}.json`;
              return this.http.delete( firebaseUpdateURL )
                  .map( res => res.json());
        }
        // End deleteHero

}
// End export
