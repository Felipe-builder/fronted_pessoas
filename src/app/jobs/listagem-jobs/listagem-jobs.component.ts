import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { JobsService } from 'src/app/core/jobs.service';
import { ConfigPrams } from 'src/app/shared/models/config-params';
import { Jobs } from 'src/app/shared/models/jobs';

@Component({
  selector: 'person-listagem-jobs',
  templateUrl: './listagem-jobs.component.html',
  styleUrls: ['./listagem-jobs.component.scss']
})
export class ListagemJobsComponent implements OnInit {


  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };
  jobs: Jobs[] = [];
  filtrosListagem: FormGroup;
  nome: string;

  constructor(
    private jobsService: JobsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      texto: [''],
      dataCriacao: ['']
    });

    this.filtrosListagem.get('texto').valueChanges
        .pipe(debounceTime(300))
        .subscribe((val: string) => {
          this.config.pesquisa = val;
          this.resetarConsulta();
        });

    this.filtrosListagem.get('dataCriacao').valueChanges.subscribe((val: string) => {
      this.config.campo = {tipo: 'dataCriacao', valor: val};
      this.resetarConsulta();
    });

    this.listarJobs();
  }

  onScroll(): void {
    this.listarJobs();
  }

  private listarJobs(): void {
    this.config.pagina++;
    this.jobsService.listar(this.config)
                        .subscribe((jobs: Jobs[]) => this.jobs.push(...jobs));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.jobs = [];
    this.listarJobs();
  }

}
