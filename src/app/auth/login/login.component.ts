import { Component, AfterViewInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn: ElementRef;

  public formSubmitted = false;
  // email: ['test@terra.com', [ Validators.required, Validators.minLength(3), Validators.email ]],

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.minLength(3), Validators.email ]],
    password: ['', [ Validators.required ]],
    remember: [ false, Validators.requiredTrue ]
  });

  constructor(private router: Router,
              private fb: FormBuilder,
              private usuarioService: UserService,
              private ngZone: NgZone ) { }

  login(){

    this.usuarioService.login(this.loginForm.value)
        .subscribe( resp => {
          if ( this.loginForm.get('remember')?.value) {
            localStorage.setItem('email', this.loginForm.get('email')?.value );
          } else {
            localStorage.removeItem('email');
          }
          // navegar al Dashboard
          this.router.navigateByUrl('/');

        }, (err) => {
          Swal.fire('Error', err.error.message, 'error')
        });
    // console.log(this.loginForm.value);
    // this.router.navigateByUrl('/');
  }

  ngAfterViewInit(): void {
    this.startApp();
  }

  async startApp(){
    await this.usuarioService.googleInit();
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ){
    // console.log(response);
    // console.log("Encoded JWT ID Token: " + response.credential);
    this.usuarioService.loginGoogle(response.credential)
        .subscribe( resp => {
          // navegar al Dashboard
          this.ngZone.run( () => {
          this.router.navigateByUrl('/');
          });
        })
  }

}
