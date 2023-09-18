import { environment } from '../../environments/environment';
import { Hospital } from './hospital.model';
const base_url = environment.base_url;

interface _DoctorUser {
  _id: string;
  name: string;
  img: string;
}

export class Doctor {

  constructor(
    public name: string,
    public _id?: string,
    public img?: string,
    public user?: _DoctorUser,
    public hospital?: Hospital,
  ){}

}

export interface DoctorInterface {
  status: string;
  data:   Data;
}

export interface Data {
  doctors: Doctors[];
}

export interface Doctors {
  _id:  string;
  name: string;
  img?: string;
  user: _DoctorUser;
}

// DoctorX

export interface DoctorAlone {
  status: string;
  data:   DataX;
}

export interface DataX {
  doctor: Doctorx;
}

export interface Doctorx {
  _id:      string;
  name:     string;
  hospital: HospitalX;
  img:      string;
}

export interface HospitalX {
  _id:  string;
  name: string;
  img:  string;
}

export interface User {
  _id:  string;
  name: string;
}
