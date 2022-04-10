export interface Usuario {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  telefone: number;
  createdAt?: Date;
  updatedAt?: Date;
  v?: number;
}
