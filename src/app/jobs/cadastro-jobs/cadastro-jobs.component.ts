import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/core/jobs.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Jobs } from 'src/app/shared/models/jobs';

@Component({
  selector: 'person-cadastro-jobs',
  templateUrl: './cadastro-jobs.component.html',
  styleUrls: ['./cadastro-jobs.component.scss']
})
export class CadastroJobsComponent implements OnInit {

  cadastro: FormGroup;
  status: Array<string>;
  tipoRecorrencia: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private jobsService: JobsService,
    private router: Router
  ) { }

  get f () {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.cadastro = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      usuario: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      status: ['', [Validators.required]],
      tipoRecorrencia: ['', [Validators.required]],
      valorRecorrencia: ['', [Validators.required]]
    });

    this.status = ['ATIVO', 'INATIVO'];
    this.tipoRecorrencia = ['Intervalo', 'Horário Fixo'];
  }


  submit(): void {
    this.cadastro.markAllAsTouched();

    console.log('Entrou');
    if (this.cadastro.invalid) {
      return;
    }
    const jobs = this.cadastro.getRawValue() as Jobs;
    this.salvar(jobs);
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(jobs: Jobs): void {
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
}
