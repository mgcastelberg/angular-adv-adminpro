import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesa',
  templateUrl: './promesa.component.html',
  styles: [
  ]
})
export class PromesaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise(( resolve, reject ) => {
    //   // resolve('Hola Manuel')
    //   if (false) {
    //     resolve('Hola Manuel');
    //   } else {
    //     reject('Algo salio mal');
    //   }
    // })
    // .catch( error => console.log('Error en mi promesa', error));

    // promesa.then( ( mensaje ) => {
    //   console.log(mensaje);
    // });

    // console.log('Fin Init');

    // this.getUsuarios();
    this.getUsuarios().then( usuarios => {
      console.log(usuarios);
    });

  }

  getUsuarios() {

    const promesa = new Promise( resolve => {

      fetch('https://reqres.in/api/users')
          .then( resp => resp.json() )
          .then( body =>resolve( body.data ))

    });

    return promesa;

    // fetch('https://reqres.in/api/users')
    //     .then( resp => resp.json() )
    //     .then( body => console.log( body.data ))
      // .then( resp => {
      //     resp.json().then( body => console.log(body))
      // });
      // .then( resp => console.log( resp )); // si imprimimos solo el response trae los datos de lapeticion status, headers etc
  }

}
