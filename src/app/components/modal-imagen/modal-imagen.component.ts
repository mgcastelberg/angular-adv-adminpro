import { Component, OnInit } from '@angular/core';
import { ModalImagenService } from '../../services/modal-imagen.service';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/models/usuario.model';
import { FileUploadService } from '../../services/file-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styles: [
  ]
})
export class ModalImagenComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: User;
  public imagenSubir: File;
  public imgTemp: string | ArrayBuffer | null = null;

  constructor(public modalImageService: ModalImagenService,
              public fileUploadService:FileUploadService ) { }

  ngOnInit(): void {
  }

  cerrarModal(){
    this.imgTemp = null;
    this.modalImageService.cerrarModal();
  }

  cambiarImagen( file: any ):any{

    if (file?.target?.files[0]) {
      this.imagenSubir = file?.target?.files[0];
      // console.log(this.imagenSubir);
      const reader = new FileReader();

      if (this.imagenSubir && this.imagenSubir.type.match('image.*')) {
        reader.readAsDataURL(this.imagenSubir);
        reader.onloadend = () => {
          this.imgTemp = reader.result;
        }
      } else {
        console.log('sin imagen');
        this.imgTemp = null;
        return false;
      }


    }
  }

  subirImagen(){

    const id = this.modalImageService.id;
    const tipo = this.modalImageService.tipo;


    this.fileUploadService.actualizarFoto( this.imagenSubir, tipo, id)
    .then( img => {
      Swal.fire('Guardado','Imagen de usuario actualizada', 'success');
      this.modalImageService.nuevaImagen.emit(img);
      this.cerrarModal();
    }).catch( err => {
        Swal.fire('Error','No fue posible subir la imagen', 'error');
        console.log(err.error.message);
      }
    );
    // .then( img => console.log(img));
  }

}
