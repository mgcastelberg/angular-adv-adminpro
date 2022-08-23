import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { FileUploadService } from '../../services/file-upload.service';
import { User } from '../../models/usuario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: User;
  public imagenSubir: File;
  public imgTemp: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder,
              private usuarioService: UserService,
              private fileUploadService: FileUploadService ) {
      this.usuario = this.usuarioService.usuario;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      name: [ this.usuario.name, Validators.required ],
      email: [ this.usuario.email, [Validators.required, Validators.email] ]
    });
  }

  actualizarPerfil(){
    // console.log(this.perfilForm.value);
    this.usuarioService.actualizarPerfil( this.perfilForm.value )
      .subscribe( resp => {
        // console.log(resp);
        const { name, email} = this.perfilForm.value;
        this.usuario.name = name;
        this.usuario.email = email;

        Swal.fire('Guardado','Cambios fueron guardados', 'success');
      }, (err) => {
        Swal.fire('Error',err.error.message, 'error');
        console.log(err.error.message);
      });

  }

  // actualizarFoto

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
    this.fileUploadService.actualizarFoto( this.imagenSubir, 'users', this.usuario.uid)
    .then( img => {
      this.usuario.img = img;
      Swal.fire('Guardado','Imagen de usuario actualizada', 'success');
    }).catch( err => {
        Swal.fire('Error','No fue posible subir la imagen', 'error');
        console.log(err.error.message);
      }
    );
    // .then( img => console.log(img));
  }

  // cambiarImagen( event: any ){
  //   console.log(event);
  // }

}
