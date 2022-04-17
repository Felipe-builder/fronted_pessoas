import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { JobsService } from 'src/app/core/jobs.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'person-cadastro-jobs',
  templateUrl: './cadastro-jobs.component.html',
  styleUrls: ['./cadastro-jobs.component.scss']
})
export class CadastroJobsComponent implements OnInit {

  usuarioId: string;
  id: string;
  cadastro: FormGroup;
  status: Array<string>;
  tipoRecorrencia: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private jobsService: JobsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  get f () {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.activatedRoute.queryParams.subscribe((params) => {
      this.usuarioId = params.id;
    });
    if (this.id) {
      this.jobsService.visualizar(this.id)
        .subscribe((job: Job) => this.criarFormulario(job));
    } else {
      this.criarFormulario(this.criarJobsEmBranco());
    }

    this.status = ['ATIVO', 'INATIVO'];
    this.tipoRecorrencia = ['INTERVALO', 'HORÁRIO FIXO'];
  }

  submit(): void {
    this.cadastro.markAllAsTouched();

    if (this.cadastro.invalid) {
      return;
    }
    const job = this.cadastro.getRawValue() as Job;
    if (this.id) {
      job._id = this.id;
      this.editar(job);
    } else {
      this.salvar(job);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(job: Job): void {
    this.cadastro = this.fb.group({
      nome: [job.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      usuario: [this.usuarioId, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      status: [job.status, [Validators.required]],
      tipoRecorrencia: [job.tipoRecorrencia, [Validators.required]],
      valorHorarioFixo: [job.valorHorarioFixo],
      valorIntervalo: [job.valorIntervalo]
    });
  }

  private criarJobsEmBranco(): Job {
    return {
      _id: null,
      nome: null,
      usuario: null,
      status: null,
      tipoRecorrencia: null,
      valorHorarioFixo: null,
      valorIntervalo: null,
      createdAt: null,
      updatedAt: null,
      __v: null
    } as Job;
  }

  private salvar(jobs: Job): void {
    this.jobsService.salvar(jobs).subscribe(() => {
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo usuário',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) {
          this.router.navigateByUrl('jobs');
        } else {
          this.reiniciarForm();
        }
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(job: Job): void {
    this.jobsService.editar(job).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registro foi atualizado com sucesso!',
          btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => this.router.navigateByUrl('jobs'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }
}
