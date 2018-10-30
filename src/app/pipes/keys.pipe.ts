import { Pipe, PipeTransform } from '@angular/core';
import { pureArrayDef } from '@angular/core/src/view';

@Pipe({
  name: 'keys',
  pure: false
})
export class KeysPipe implements PipeTransform {

  transform(value: any): any {

    let keys = [];

    // tslint:disable-next-line:forin
    for ( const key in value ) {
      keys.push(key);
    }

    return keys;
  }

}
