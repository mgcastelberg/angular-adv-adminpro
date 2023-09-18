import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/usuario.model';
import { UserService } from 'src/app/services/user.service';
import { BusquedasService } from '../../../services/busquedas.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { Subscription, delay } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: User[] = [];
  public usuariosTemp: User[] = [];
  public totalPaginas: number = 1;
  public current_page: number = 1;
  public cargando: boolean = true;

  public imgSubs: Subscription;


  constructor( private usuarioService: UserService, private busquedasService: BusquedasService,
              private modalImageService: ModalImagenService) { }

  ngOnInit(): void {

    this.cargarUsuarios();
    // sirve para detectar evento despues de cerrar modal actualizar imagen;
    this.imgSubs = this.modalImageService.nuevaImagen
    .pipe(
      delay(500)
    )
    .subscribe( img => this.cargarUsuarios() );
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  // cargarUsuarios(){
  //   this.usuarioService.cargarUsuarios(this.current_page)
  //     .subscribe( ({data}) => {
  //       this.totalUsuarios = data.paginate.total;
  //       this.totalPaginas = data.paginate.total_pages;
  //       this.usuarios = data.users;
  //     });
  // }

  cargarUsuarios(){
    this.cargando = true;
    this.usuarioService.cargarUsuarios(this.current_page)
      .subscribe( ({paginate, users}) => {
        this.totalUsuarios = paginate.total;
        this.totalPaginas = paginate.total_pages;
        this.usuarios = users;
        this.usuariosTemp = users;
        this.cargando = false;
      });
  }

  cambiarPagina( valor: number){
      this.current_page += valor;

      console.log(this.current_page);

      if(this.current_page < 1) {
        this.current_page = 1;
      } else if (this.current_page > this.totalPaginas) {
        this.current_page -= valor;
      }

      this.cargarUsuarios();

  }

  buscar( termino: string){
    // console.log(termino);

    if( termino.length === 0 ){
      return this.usuarios = this.usuariosTemp;
    }

    this.busquedasService.buscar('usuarios', termino)
      .subscribe( resp => {
        // console.log(resp);
        // casteo necesario
        this.usuarios = resp as User[];
      });

      return true;
  }

  eliminarUsuario( usuario: User) {

    if (usuario.uid === this.usuarioService.uid) {
      return Swal.fire('Error', 'No puedes eliminarte a ti mismo');
    }

    Swal.fire({
      title: '¿Borrar Usuario?',
      text: `Esta apunto de borrar ${usuario.name}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.usuarioService.eliminarUsuario( usuario )
          .subscribe( resp =>{
            Swal.fire('Usuario borrado',`${usuario.name} fue eliminado correctamente`,'success');
            this.cargarUsuarios();
          });
        // console.log(usuario);

      }
    });
    return;
  }

  CambiarRole( usuario: User ) {
    this.usuarioService.actualizarRole(usuario)
      .subscribe( resp => {
        console.log(resp);
      });
  }

  abrirModal( usuario: User){
    console.log(usuario);
    this.modalImageService.abrirModal('users', usuario.uid, usuario.img);
  }

}
