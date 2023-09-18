import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Doctor, DoctorAlone, DoctorInterface } from '../models/doctor.model';
import { map } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor(private http:HttpClient) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos(){
    // TODO paginación
    // const url = `${ base_url }/hospitals?page=${ desde }`;
    const url = `${ base_url }/doctors`;
    return this.http.get<DoctorInterface>( url, this.headers )
        .pipe(
          map( (resp: DoctorInterface) => resp.data.doctors )
        );
  }

  obtenerDoctorPorId( id: string ){
    const url = `${ base_url }/doctors/${ id }`;
    return this.http.get<DoctorAlone>( url, this.headers )
        .pipe(
          map( (resp: DoctorAlone) => resp.data )
        );
  }

  crearDoctor(doctor: {name: string, hospital:string}){
    const url = `${ base_url }/doctors`;
    return this.http.post( url, doctor, this.headers );
  }

  actualizarDoctor(doctor: Doctor){
    const url = `${ base_url }/doctors/${ doctor._id }`;
    return this.http.put( url, doctor, this.headers );
  }

  borrarDoctor(_id: string){
    const url = `${ base_url }/doctors/${ _id }`;
    return this.http.delete( url, this.headers );
  }




}
