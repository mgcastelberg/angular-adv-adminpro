import { Component, OnInit } from '@angular/core';
import { Observable, retry, interval } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit {

  constructor() {

    // obs$.pipe(
    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('suscripcion:', valor),
    //   error => console.warn('Error:', error),
    //   () => console.log('Observer terminado')
    // );

    this.retornaIntervalo()
        .subscribe();

  }

  ngOnInit(): void {
  }

  retornaIntervalo(){
    const intervalo$ = interval(1000);
    return intervalo$;
  }


  retornaObservable(): Observable<number>{

    let i= -1;

    return new Observable<number>( observer => {

      const intervalo = setInterval(()=>{
        i++;
        observer.next(i);

        if( i === 4 ){
          clearInterval(intervalo);
          observer.complete();
        }

        if( i === 2 ){
          // console.log('suscripcion:', i);
          observer.error('i llego al valor de 2');
        }

      }, 1000);

    });

  }

}


// constructor() {

//   let i= -1;

//   const obs$ = new Observable<number>( observer => {

//     const intervalo = setInterval(()=>{
//       // console.log('tick');
//       i++;
//       observer.next(i);

//       if( i === 4){
//         clearInterval(intervalo);
//         observer.complete();
//       }

//       if( i === 2){
//         i=0;
//         observer.error('i llego al valor de 2');
//       }

//     }, 1000);

//   });

//   obs$.pipe(
//     retry(2)
//   ).subscribe(
//     valor => console.log('suscripcion:', valor),
//     error => console.warn('Error:', error),
//     () => console.log('Observer terminado')
//   );

// }
