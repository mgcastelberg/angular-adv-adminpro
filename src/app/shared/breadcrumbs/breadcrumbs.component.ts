import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string = "";
  public tituloSubs$:any = Subscription;
  // public intervalSubs: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getArgumentosRuta();
  }

  ngOnDestroy(): void {
    document.title = `AdminPro`;
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){
    return this.router.events
      .pipe(
        filter( (event: any) =>
            event instanceof ActivationEnd &&
            event.snapshot.firstChild === null &&
            event.snapshot.data != null),
        map((event: ActivationEnd) => event.snapshot.data )
      ).subscribe( ({ titulo }) => {
        // console.log(data);
        // console.log(titulo);
        this.titulo = titulo || "Detalle";
        document.title = `AdminPro - ${titulo || "Detalle"}`;
      });
  }

  // getArgumentosRuta(){
  //   this.router.events
  //     .pipe(
  //       filter( (event: any) =>
  //           event instanceof ActivationEnd &&
  //           event.snapshot.firstChild === null &&
  //           event.snapshot.data != null),
  //       map((event: ActivationEnd) => event.snapshot.data )
  //     )
  //     .subscribe( ({ titulo }) => {
  //       // console.log(data);
  //       // console.log(titulo);
  //       this.titulo = titulo || "Detalle"
  //       document.title = `AdminPro - ${titulo || "Detalle"}`
  //     })
  // }

}
