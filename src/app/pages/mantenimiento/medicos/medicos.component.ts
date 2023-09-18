import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import Swal from 'sweetalert2';
import { Doctor } from 'src/app/models/doctor.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { DoctorService } from 'src/app/services/doctor.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit, OnDestroy {

  public cargando: boolean = false;
  public doctors: Doctor[];
  public imgSubs: Subscription;

  constructor( private doctorService: DoctorService,
              private modalImagenService: ModalImagenService,
              private busquedasService: BusquedasService ) { }

  ngOnInit(): void {
    this.cargarMedicos();
    this.imgSubs = this.modalImagenService.nuevaImagen
    .pipe( delay(500) )
    .subscribe( img => this.cargarMedicos() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarMedicos(){

    this.cargando = true;

    this.doctorService.cargarMedicos()
      .subscribe( doctors => {
        console.log("docs", doctors);
        this.cargando = false;
        this.doctors = doctors;
      });
  }

  abrirModal( doctor: Doctor){
    // console.log(usuario);
    this.modalImagenService.abrirModal('doctors', doctor._id, doctor.img);
  }

  buscar( termino: string){
    // console.log(termino);

    if( termino.length === 0 ){
      // return this.hospitales = this.hospitalesTemp;
      return this.cargarMedicos();
    }

    this.busquedasService.buscar('medicos', termino)
      .subscribe( resp => {
        console.log(resp);
        // Casteo
        this.doctors = resp as Doctor[];
      });

      return true;
  }

  borrarDoctor(doctor: Doctor){

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta apunto de borrar ${doctor.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.doctorService.borrarDoctor( doctor._id! )
          .subscribe( resp =>{
            Swal.fire('Usuario borrado',`${doctor.name} fue eliminado correctamente`,'success');
            this.cargarMedicos();
          });
        // console.log(usuario);

      }
    });
    return;
  }

}
