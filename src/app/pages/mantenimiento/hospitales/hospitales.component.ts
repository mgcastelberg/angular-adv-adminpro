import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, delay } from 'rxjs';
import { Hospital, HospitalInterface } from 'src/app/models/hospital.model';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public hospitalesTemp: Hospital[] = [];
  public imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalImageService:ModalImagenService,
              private busquedasService: BusquedasService) { }

  ngOnInit(): void {
    this.cargarHospitales();

    this.imgSubs = this.modalImageService.nuevaImagen
    .pipe( delay(500) )
    .subscribe( img => this.cargarHospitales() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  cargarHospitales(){

    this.cargando = true;

    this.hospitalService.cargarHospitales()
      .subscribe( hospitals => {
        // console.log("hosp", hospitals);
        this.cargando = false;
        this.hospitales = hospitals;
      });
  }

  guardarCambios( hospital: Hospital ){
    // console.log(hospital);
    this.hospitalService.actualizarHospital( hospital._id!, hospital.name)
        .subscribe( resp => {
          Swal.fire('Actualizado', hospital.name, 'success');
        });
  }

  eliminarHospital( hospital: Hospital ){
    // console.log(hospital);
    this.hospitalService.borrarHospital( hospital._id!)
        .subscribe( resp => {
          this.cargarHospitales();
          Swal.fire('Borrado', hospital.name, 'success');
        });
  }

  async abrirSweetModal(){
    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Ingrese Nombre del nuevo Hospital',
      inputPlaceholder: 'Nombre del Hospital',
      showCancelButton: true
    })

    // console.log( value );
    if (value) {
      this.hospitalService.crearHospital( value )
      .subscribe( (resp: any) => {
            Swal.fire(`¡Hospital Creado!`, value, 'success')
            this.hospitales.push( resp.data.hospital )
            // this.cargarHospitales();
        });
    }
  }

  abrirModal( hospital: Hospital){
    // console.log(usuario);
    this.modalImageService.abrirModal('hospitals', hospital._id, hospital.img);
  }

  buscar( termino: string){
    // console.log(termino);

    if( termino.length === 0 ){
      // return this.hospitales = this.hospitalesTemp;
      return this.cargarHospitales();
    }

    this.busquedasService.buscar('hospitales', termino)
      .subscribe( resp => {
        // console.log(resp);
        // Casteo
        this.hospitales = resp as Hospital[];
      });

      return true;
  }



}
