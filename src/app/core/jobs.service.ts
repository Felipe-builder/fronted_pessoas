import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigPrams } from '../shared/models/config-params';
import { Jobs } from '../shared/models/jobs';
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

  salvar(jobs: Jobs): Observable<Jobs> {
    return this.http.post<Jobs>(url, jobs);
  }

  listar(config: ConfigPrams): Observable<Jobs[]> {
    const configPrams = this.configService.configurarParametros(config);

    return this.http.get<Jobs[]>(url, {params: configPrams});
  }
}
