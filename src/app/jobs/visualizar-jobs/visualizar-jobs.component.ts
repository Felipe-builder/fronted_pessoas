import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { JobsService } from 'src/app/core/jobs.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Job } from 'src/app/shared/models/job';

@Component({
  selector: 'person-visualizar-jobs',
  templateUrl: './visualizar-jobs.component.html',
  styleUrls: ['./visualizar-jobs.component.scss']
})
export class VisualizarJobsComponent implements OnInit {
  readonly semFoto = 'https://filestore.community.support.microsoft.com/api/images/6061bd47-2818-4f2b-b04a-5a9ddb6f6467?upload=true';
  job: Job;
  id: string;

  constructor(
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private jobsService: JobsService
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/jobs/cadastro/' + this.id);
  }

  excluir() {
    const config = {
      data: {
        titulo: 'Você tem certeza que deseja excluir?',
        descricao: 'Caso você tenha certceza que deseja excluir, clique no botão OK',
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.jobsService.excluir(this.id)
        .subscribe(() => this.router.navigateByUrl('/jobs'));
      }
    });
  }

  private visualizar(): void {
    this.jobsService.visualizar(this.id).subscribe((job: Job) => this.job = job);
  }

}
