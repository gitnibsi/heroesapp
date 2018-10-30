import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router , ActivatedRoute} from '@angular/router';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-heroe',
  templateUrl: './hero.component.html',
  styles: []
})

// Start export
export class HeroComponent implements OnInit {

      private hero: Hero = {
        name: '',
        bio: '',
        house: 'Marvel'
      };

      newHero = false;
      id: string;
      saveButtonName = '';

      constructor(private _heroesService: HeroesService,
                  private router: Router,
                  private route: ActivatedRoute,
                  private _appComponent: AppComponent) {

                  this.route.params.subscribe(
                        parameters => {
                          console.log('HeroComponent - parameters');
                          console.log(parameters);
                          this.id = parameters['id'];
                          if ( this.id === 'new' ) {
                            this.saveButtonName = 'Save Hero';
                          } else {
                            console.log('HeroComponent - constructor - this.id');
                            console.log(this.id);
                            this.saveButtonName = 'Update Hero';

                            this._heroesService.getHero( this.id )
                            .subscribe( hero => this.hero = hero);

                          }
                  });

                }

      ngOnInit() {
        this._appComponent.setTitle('Hero | Heroes App');
      }

      // Start saveHero
      saveHero() {
        console.log('HeroComponent - saveHero');

        if ( this.id === 'new' ) {
          // new hero
          this._heroesService.newHero( this.hero ).subscribe(
            data => {
              this.router.navigate(['/heroes']);
            },
            error => console.error(error));
        } else {
          // updating
          this._heroesService.updateHero( this.hero, this.id ).subscribe(
            data => {
              console.log('saveHero updating');
              console.log(data);
              this.router.navigate(['/heroes']);
            },
            error => console.error(error));
        }
      }
      // End saveHero

      // Start addNewHero
      addNewHero( myForm: NgForm) {
        console.log('HeroComponent - addNewHero');

        this.router.navigate(['/hero', 'new']);
          myForm.reset({
            name: '',
            bio: '',
            house: 'Marvel'
          });
      }
      // End addNewHero

}
// End export
