import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor() {
  }

  async actualizarFoto( archivo: File, tipo: 'users' | 'doctors' | 'hospitals', id?: string){
    try {
      const url = `${ base_url }/upload/${ tipo }/${ id }`;
      const formData = new FormData();

      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();

      console.log( data );

      if ( data.status && data.status == "success" ) {
        return data.data.nombreArchivo
      } else {
        return data.data.message;
      }

    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
