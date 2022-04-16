import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime } from 'rxjs';
import { JobsService } from 'src/app/core/jobs.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'person-listagem-jobs',
  templateUrl: './listagem-jobs.component.html',
  styleUrls: ['./listagem-jobs.component.scss']
})
export class ListagemJobsComponent implements OnInit {


  config: ConfigParams = {};
  jobs: Job[] = [];
  filtrosListagem: FormGroup;
  nome: string;
  status: Array<string>;
  tipoRecorrencia: Array<string>;

  constructor(
    private jobsService: JobsService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      dataCriacao: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
        .pipe(debounceTime(300))
        .subscribe((val: string) => {
          this.config.rt = 'busca-nome';
          this.config.pesquisa = val;
          this.resetarConsulta();
        });

    this.filtrosListagem.get('dataCriacao').valueChanges.subscribe((val: string) => {
      this.config.rt = 'busca-data';
      this.config.campo = {tipo: 'dt_criacao', valor: val};
      this.resetarConsulta();
    });

    this.status = ['ATIVO', 'INATIVO'];
    this.tipoRecorrencia = ['INTERVALO', 'HORÁRIO FIXO'];

    this.listarJobs();
  }

  onScroll(): void {
    this.listarJobs();
  }

  abrir(id: string): void {
    this.router.navigateByUrl('/jobs/' + id);
  }

  private listarJobs(): void {
    this.config.pagina++;
    this.jobsService.listar(this.config)
                        .subscribe((jobs: Job[]) => this.jobs.push(...jobs));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.jobs = [];
    this.listarJobs();
  }

}
