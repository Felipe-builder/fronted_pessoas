import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/core/usuarios.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'person-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {
  id: string;
  cadastro: FormGroup;

  constructor(
    public validacao: ValidarCamposService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private usuariosService: UsuariosService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  get f () {
    return this.cadastro.controls;
  }

  ngOnInit(): void {
    this.id = this.activateRoute.snapshot.params['id'];
    if (this.id) {
      this.usuariosService.visualizar(this.id).subscribe((usuario: Usuario) => this.criarFormulario(usuario));
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }
  }

  submit(): void {
    this.cadastro.markAllAsTouched();

    console.log('Entrou');
    if (this.cadastro.invalid) {
      return;
    }
    const usuario = this.cadastro.getRawValue() as Usuario;
    if (this.id) {
      usuario._id = this.id;
      this.editar(usuario);
    } else {
      this.salvar(usuario);
    }
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private criarFormulario(usuario: Usuario): void {
    this.cadastro = this.fb.group({
      nome: [usuario.nome, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      email: [usuario.email, [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      // confirmaSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      telefone: [usuario.telefone, [Validators.required, Validators.minLength(8)]]
    });
  }

  private criarFilmeEmBranco(): Usuario {
    return {
      _id: null,
      nome: null,
      email: null,
      senha: null,
      telefone: null
    };
  }

  private salvar(usuario: Usuario): void {
    this.usuariosService.salvar(usuario).subscribe(() => {
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
          this.router.navigateByUrl('usuarios');
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

  private editar(usuario: Usuario): void {
    this.usuariosService.editar(usuario).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu regristro foi atualizado com sucesso',
          corBtnCancelar: 'Ir para listagem'
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => this.router.navigateByUrl('usuarios'));
    },
    () => {
      const config = {
        data: {
          titulo: 'Erro ao editar o registro!',
          descricao: 'Não conseguimos editar seu registro, favor tentar novamente mais tarde',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar'
        } as Alerta
      };
      this.dialog.open(AlertaComponent, config);
    });
  }
}
