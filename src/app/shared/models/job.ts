import { Usuario } from './usuario';

export interface Job {
  _id?: string;
  nome: string;
  usuario: Usuario;
  status: string;
  tipoRecorrencia: string;
  valorHorarioFixo?: Date;
  valorIntervalo?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
