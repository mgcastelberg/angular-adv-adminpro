import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BusquedasService } from 'src/app/services/busquedas.service';
import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  public usuarios: User[] = [];
  public doctores: Doctor[] = [];
  public hospitales: Hospital[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private busquedasService: BusquedasService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.activateRoute.params
    .subscribe( ({ termino }) => {
      this.busquedaGlobal(termino);

    })
  }

  busquedaGlobal(termino: string){
    this.busquedasService.busquedaGlobal(termino)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.usuarios = resp.data.usuarios;
        this.doctores = resp.data.doctores;
        this.hospitales = resp.data.hospitales;
      });
  }


}
