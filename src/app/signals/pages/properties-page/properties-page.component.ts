import { Component, OnInit, computed, effect, signal } from '@angular/core';

import { User } from '../../interfaces/user-request.interface';

@Component({
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})
export class PropertiesPageComponent implements OnInit {

  public counter = signal(10);

  public user = signal<User>({
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  });

  public fullName = computed( () => `${ this.user().first_name } ${ this.user().last_name  }`);

  public userChangeEffect = effect( () => {

    console.log(`${this.user().first_name} - ${this.counter()}`);

  });

  ngOnInit(): void {
// esto se ejecutará a cada segundo pero se limpiará automáticamente al cambiar de componente
    setInterval( () => {
      this.counter.update( current => current + 1 );
// destruir efecto de forma manual
      if ( this.counter() == 20 ) this.userChangeEffect.destroy()
    }, 1000 );
  }

  onFieldUpdated( field: keyof User, value: string ) {

//FORMA 1
    // this.user.set({
    //   ...this.user(),
    //   [field]: value
    // });

//FORMA 2
    // this.user.update( current => {
    //   return {
    //     ...this.user(),
    //     [field]: value
    //   };
    // });

//FORMA 3
    //esta forma es más segura porque evaluamos los tipos de datos ( id )

    this.user.mutate( current => {

      switch( field ) {

        case "email":
          current.email = value;
        break;

        case "first_name":
          current.first_name = value;
        break;

        case "last_name":
          current.last_name = value;
        break;

        case "id":
          current.id = Number(value);
        break;
      }
    });
  }

  increaseBy( value: number ) {

    this.counter.update( number => number + value );
  }

}
