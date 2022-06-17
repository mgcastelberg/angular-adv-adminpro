import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription;

  constructor() {

    // // obs$.pipe(
    // this.retornaObservable().pipe(
    //   retry(1)
    // ).subscribe(
    //   valor => console.log('suscripcion:', valor),
    //   error => console.warn('Error:', error),
    //   () => console.log('Observer terminado')
    // );

    // this.retornaIntervalo()
    //     .subscribe( (valor) => console.log( valor ) );

    this.intervalSubs = this.retornaIntervalo().subscribe( (valor) => console.log( valor ) );

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  // retornaIntervalo(){
  //   const intervalo$ = interval(3000);
  //   return intervalo$;
  // }

  // retornaIntervalo(): Observable<string>{
  //   return interval(1000).pipe(
  //                           take(10),
  //                           map( valor => {
  //                             return `Hola mundo ${valor + 1}`;
  //                           })
  //                       );
  // }

  retornaIntervalo(): Observable<number>{
    return interval(300).pipe(
                            take(100),
                            map( valor => valor + 1),
                            filter( valor => ( valor % 2 === 0) ? true : false ),
                        );
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
