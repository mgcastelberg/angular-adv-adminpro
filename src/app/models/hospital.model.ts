import { environment } from '../../environments/environment';
const base_url = environment.base_url;

interface _HospitalUser {
  _id: string;
  nombre: string;
  img: string;
}

export class Hospital {

  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public user?: _HospitalUser,
  ){}

}

export interface HospitalInterface {
  status: string;
  data:   Data;
}

export interface Data {
  hospitals: Hospitals[];
}

export interface Hospitals {
  _id:  string;
  name: string;
  img?: string;
  user: _HospitalUser;
}
