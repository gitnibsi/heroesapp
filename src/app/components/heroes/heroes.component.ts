import { Title } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Hero } from '../../interfaces/hero.interface';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {


      heroes: any[] = [];
      loading = true;

      constructor(private _heroesService: HeroesService,
                  private _appComponent: AppComponent) {

                    this.getHeros();
       }

      ngOnInit() {
        this._appComponent.setTitle('Heroes | Heroes App');
      }

      // Start getHeroes
      getHeros() {
        console.log('HeroesComponent - getHeros');

        this._heroesService.getHeros()
        .subscribe( data => {
          console.log(data);

          // tslint:disable-next-line:forin
          /*
          for (const key$ in data) {
            let hero = data[key$];
            hero.key$ = key$;
            this.heroes.push( data[key$]);
          }
          */

          // console.log( this.heroes );
          setTimeout( () => {
            this.heroes = data;
            this.loading = false;
          }, 1500 );

        });
      }

      deleteHero( key$: string) {
        console.log('HeroesComponent - deleteHero');

        this._heroesService.deleteHero(key$)
        .subscribe( response => {
          console.log(response);

          if (response) {
            console.error(response);
          } else {
            // delete success
            console.log('delete success');
            delete this.heroes[key$];
          }

        });
      }

}
// End export
