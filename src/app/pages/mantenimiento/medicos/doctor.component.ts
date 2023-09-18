import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit {

  public doctorForm: FormGroup;
  public hospitals: Hospital[] = [];
  public hospitalSeleccionado: Hospital | undefined;
  public doctorSeleccionado: Doctor | undefined;
  // public cargando = false;
  // public doctors: Doctor[];

  constructor( private fb: FormBuilder,
               private hospitalService:HospitalService,
               private doctorService: DoctorService,
               private router: Router,
               private activatedRoute: ActivatedRoute) { }

              //  SnapShot= private activatedRoute: ActivatedRoute

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(({id}) => {
      // console.log(id);
      this.cargarDoctor( id );
    });

    this.doctorForm = this.fb.group({
      name: [ '', Validators.required ],
      hospital: [ '', Validators.required ],
    });
    this.cargarHospitales();
    // subcribirse al campo del formulario
    this.doctorForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {
          // console.log(hospitalId);
          this.hospitalSeleccionado = this.hospitals.find( h => h._id === hospitalId )
          // console.log( this.hospitalSeleccionado);
        });
  }

  cargarDoctor(id:string){

    if ( id === 'nuevo' ) {
      return;
    }

    this.doctorService.obtenerDoctorPorId(id)
        .pipe(
          delay(200)
        )
        .subscribe( data => {

          if (!data) {
            this.router.navigateByUrl(`/dashboard/medicos`);
          }

          // console.log(data);
          this.doctorSeleccionado = data.doctor;
          // console.log( data.doctor.name);
          // console.log( data.doctor.hospital._id);
          this.doctorForm.setValue({name: data.doctor.name, hospital:data.doctor.hospital._id})

        });
  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
      .subscribe( hospitals => {
        // console.log("hosp", hospitals);
        this.hospitals = hospitals;
      });
  }

  guardarDoctor(){

    const { name } = this.doctorForm.value;

    if ( this.doctorSeleccionado) {
      // Actualizar
      const data = {
        ...this.doctorForm.value,
        _id: this.doctorSeleccionado._id
      }
      this.doctorService.actualizarDoctor( data )
          .subscribe( resp => {
            Swal.fire('Actualizado', `${ name } Actualizado correctamente`, 'success');
          });
    } else {
      // Crear
      this.doctorService.crearDoctor( this.doctorForm.value )
          .subscribe( (resp: any) => {
            // console.log(resp);
            Swal.fire('Creado', `${ name } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/doctor/${ resp.data.doctorDB._id}`);
          });
    }

  }

}
