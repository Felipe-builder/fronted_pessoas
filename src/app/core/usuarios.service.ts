import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../shared/models/usuario';
import { ConfigPrams } from '../shared/models/config-params';
import { ConfigParamsService } from './config-params.service';

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

  listar(config: ConfigPrams): Observable<Usuario[]> {
    const configPrams = this.configService.configurarParametros(config);

    return this.http.get<Usuario[]>(url, {params: configPrams});
  }

  visualizar(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(url + id);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
