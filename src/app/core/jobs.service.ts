import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigPrams } from '../shared/models/config-params';
import { Job } from '../shared/models/job';
import { ConfigParamsService } from './config-params.service';

const url = 'http://localhost:3000/jobs/';


@Injectable({
  providedIn: 'root'
})
export class JobsService {
  constructor(
    private http: HttpClient,
    private configService: ConfigParamsService
  ) { }

  salvar(job: Job): Observable<Job> {
    return this.http.post<Job>(url, job);
  }

  editar(job: Job): Observable<Job> {
    return this.http.put<Job>(url + job._id, job);
  }

  listar(config: ConfigPrams): Observable<Job[]> {
    const configPrams = this.configService.configurarParametros(config);

    if (config.rt === "busca-data") {
      return this.http.get<Job[]>(url + config.rt, {params: configPrams});
    } else {
      return this.http.get<Job[]>(url, {params: configPrams});
    }
  }

  visualizar(id: string): Observable<Job> {
    return this.http.get<Job>(url + id);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}
