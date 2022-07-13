import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['Manuel Gomez', [ Validators.required, Validators.minLength(3) ]],
    email: ['test@terra.com', [ Validators.required, Validators.minLength(3), Validators.email ]],
    password: ['', [ Validators.required ]],
    password2: ['', [ Validators.required ]],
    terms: [ false, Validators.requiredTrue ],
  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(public fb: FormBuilder,
              private usuarioService: UserService,
              private router: Router ) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true;
    // console.log( this.registerForm.value );
    if (this.registerForm.invalid) {
      return;
    }

    // Realizar posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
        .subscribe( resp => {
          // console.log('Usuario Creado');
          // console.log(resp);
          this.router.navigateByUrl('/');
        }, (err) => {
          //Cachar error del backend
          Swal.fire('Error', err.error.message, 'error')
        });


    // this.usuarioService.crearUsuario( this.registerForm.value )
    //     .subscribe( resp => {
    //       console.log('Usuario Creado');
    //       console.log(resp);
    //     }, (err) => console.warn( err.error.message ));

  }

  campoNoValido(campo: string): boolean {

    if ( !this.registerForm.get(campo)?.valid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos(): boolean{
    return !this.registerForm.get('terms')?.value && this.formSubmitted;
  }

  passwordNoValido(){
    const pass = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if (pass !== pass2 && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales( pass1Name: string, pass2Name: string) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null)
      } else {
        pass2Control?.setErrors({ noEsIgual: true})
      }

    }
  }

}
