import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital, HospitalInterface } from '../models/hospital.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})

export class HospitalService {

  constructor( private http:HttpClient ) { }

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

  cargarHospitales(){
    // TODO paginación
    // const url = `${ base_url }/hospitals?page=${ desde }`;
    const url = `${ base_url }/hospitals`;
    return this.http.get<HospitalInterface>( url, this.headers )
        .pipe(
          map( (resp: HospitalInterface) => resp.data.hospitals )
        );
  }

  crearHospital(name: string){
    const url = `${ base_url }/hospitals`;
    return this.http.post( url, {name}, this.headers );
  }

  actualizarHospital(_id: string, name: string){
    const url = `${ base_url }/hospitals/${ _id }`;
    return this.http.put( url, {name}, this.headers );
  }

  borrarHospital(_id: string){
    const url = `${ base_url }/hospitals/${ _id }`;
    return this.http.delete( url, this.headers );
  }


}
