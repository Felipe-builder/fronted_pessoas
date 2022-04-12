export interface Jobs {
  _id?: string;
  nome: string;
  usuario: any;
  status: string;
  tipoRecorrencia: string;
  valorHorarioFixo?: Date;
  valorIntervalo?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
