import { environment } from '../../environments/environment';

const base_url = environment.base_url;
export class User {

  constructor(
    public name: string,
    public email: string,
    public password?: string,
    public img?: string,
    public google?: boolean,
    public role?: 'ADMIN_ROLE' | 'USER_ROLE' | undefined,
    public uid?: string,
  ){}

  get imagenUrl() {
    // console.log(this.img);

    if( !this.img ){
      return `${base_url}/upload/users/no-image`;
    } else if (this.img?.includes('https')) {
      return this.img;
    } else if ( this.img ) {
      return  `${base_url}/upload/users/${ this.img }`;
    } else {
      return  `${base_url}/upload/users/no-image`;
    }
  }

  imprimirUsuario(){
    console.log( this.name );
  }
}
