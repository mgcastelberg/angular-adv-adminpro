import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit{

  ngOnInit(): void {
    this.btnClass = `btn ${ this.btnClass}`;
  }

  // progreso: number = 80;
  // Decorador input sirve para recibir informacion del componente padre
  // @Input() progreso: number = 80;
  @Input('valor') progreso: number = 80;
  @Input() btnClass: string = 'btn-primary';

  // EventEmitter importarlo de angular/core - Dispara un evento, <number>se debe indicar que tipo de informacion fluye en el
  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  get getPorcentaje(){
    return `${ this.progreso }%`;
  }

  cambiarValor( valor: number ){
    if (this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      return this.progreso = 100;
    }
    if (this.progreso <= 0 && valor <= 0){
      this.valorSalida.emit(0);
      return this.progreso = 0;
    }
    this.valorSalida.emit(this.progreso + valor);
    return this.progreso = this.progreso + valor;
  }

  onChange( nuevoValor: number ) {
    // console.log(nuevoValor);
    if(nuevoValor >= 100){
      this.progreso = 100;
    } else if(nuevoValor <= 0 ){
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }

    this.valorSalida.emit(this.progreso);
  }

}
