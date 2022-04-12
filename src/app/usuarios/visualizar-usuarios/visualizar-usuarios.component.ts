import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { UsuariosService } from 'src/app/core/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { Alerta } from 'src/app/shared/models/alerta';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';

@Component({
  selector: 'person-visualizar-usuarios',
  templateUrl: './visualizar-usuarios.component.html',
  styleUrls: ['./visualizar-usuarios.component.scss']
})
export class VisualizarUsuariosComponent implements OnInit {
  readonly semFoto = 'https://filestore.community.support.microsoft.com/api/images/6061bd47-2818-4f2b-b04a-5a9ddb6f6467?upload=true';
  usuario: Usuario;
  id: string;

  constructor(
    public dialog: MatDialog,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private usuariosServices: UsuariosService
  ) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params['id'];
    this.visualizar();
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
        this.usuariosServices.excluir(this.id)
        .subscribe(() => this.router.navigateByUrl('/usuarios'));
      }
    });
  }

  private visualizar(): void {
    this.usuariosServices.visualizar(this.id).subscribe((usuario: Usuario) => this.usuario = usuario);
  }

}
