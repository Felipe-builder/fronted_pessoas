import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../shared/models/usuario';
import { ConfigPrams } from '../shared/models/config-params';
import { ConfigParamsService } from './config-params.service';
declare var require: any;
const moment = require('moment');

const url = 'http://localhost:3000/usuarios/';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(
    private http: HttpClient,
    private configService: ConfigParamsService
  ) { }

  salvar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(url, usuario);
  }

  editar(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(url + usuario._id, usuario);
  }

  listar(config: ConfigPrams): Observable<Usuario[]> {
    const configPrams = this.configService.configurarParametros(config);
    if (config.rt === "busca-data") {
      return this.http.get<Usuario[]>(url + config.rt, {params: configPrams});
    } else {
      return this.http.get<Usuario[]>(url, {params: configPrams});
    }
  }

  listarPorDataCriacao(dataCriacao: Date): Observable<Usuario> {
    const data = moment(dataCriacao).format('yyyy-MM-dd');
    return this.http.get<Usuario>(`${url}busca-data?dt_criacao=${data}`);
  }

  visualizar(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(url + id);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
