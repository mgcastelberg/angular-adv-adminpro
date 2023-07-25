import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/usuario.model';
import { UserService } from 'src/app/services/user.service';
import { BusquedasService } from '../../../services/busquedas.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit {

  public totalUsuarios: number = 0;
  public usuarios: User[] = [];
  public usuariosTemp: User[] = [];
  public totalPaginas: number = 1;
  public current_page: number = 1;
  public cargando: boolean = true;


  constructor( private usuarioService: UserService, private busquedasService: BusquedasService ) { }

  ngOnInit(): void {

    this.cargarUsuarios();
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
        this.usuarios = resp;
      });

      return true;
  }

}
