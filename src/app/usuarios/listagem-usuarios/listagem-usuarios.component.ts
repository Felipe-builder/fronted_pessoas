import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { UsuariosService } from 'src/app/core/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Router } from '@angular/router';

@Component({
  selector: 'person-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.scss']
})
export class ListagemUsuariosComponent implements OnInit {
  readonly semFoto = 'https://filestore.community.support.microsoft.com/api/images/6061bd47-2818-4f2b-b04a-5a9ddb6f6467?upload=true';

  config: ConfigParams = { };
  usuarios: Usuario[] = [];
  filtrosListagem: FormGroup;
  nome: string;

  constructor(
    private usuariosService: UsuariosService,
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

    this.listarUsuarios();
  }

  onScroll(): void {
    this.listarUsuarios();
  }

  abrir(_id: string): void {
    this.router.navigateByUrl('/usuarios/' + _id);
  }

  private listarUsuarios(): void {
    this.config.pagina++;
    this.usuariosService.listar(this.config)
                        .subscribe((usuarios: Usuario[]) => this.usuarios.push(...usuarios));
  }

  private resetarConsulta(): void {
    this.config.pagina = 0;
    this.usuarios = [];
    this.listarUsuarios();
  }

}
