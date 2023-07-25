import { User } from "../models/usuario.model";

// export interface CargarUsuario {
//   total: number;
//   usuarios: User[];
// }


export interface CargarUsuario {
  status: string;
  data:   DataResponse;
}

export interface DataResponse {
  users:    User[];
  paginate: Paginate;
}

export interface Paginate {
  total:        number;
  per_page:     number;
  current_page: number;
  total_pages:  number;
}
