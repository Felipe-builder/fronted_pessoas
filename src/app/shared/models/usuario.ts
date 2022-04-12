export interface Usuario {
  _id?: string;
  nome: string;
  email: string;
  senha: string;
  telefone: number;
  urlFoto?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
