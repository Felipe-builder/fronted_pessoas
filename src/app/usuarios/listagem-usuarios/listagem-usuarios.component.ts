import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UsuariosService } from 'src/app/core/usuarios.service';
import { Usuario } from 'src/app/shared/models/usuario';
import { ConfigPrams } from 'src/app/shared/models/config-params';

@Component({
  selector: 'person-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.scss']
})
export class ListagemUsuariosComponent implements OnInit {

  config: ConfigPrams = {
    pagina: 0,
    limite: 4
  };
  usuarios: Usuario[] = [];
  filtrosListagem: FormGroup;

  constructor(private usuariosService: UsuariosService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.filtrosListagem = this.fb.group({
      email: ['']
    });

    // this.filtrosListagem.get('email').valueChanges.subscribe((val: string) => {
    //   this.config.pesquisa = val;
    //   this.resetarConsulta();
    // });

    // this.filtrosListagem.get('createdAt').valueChanges.subscribe((val: string) => {
    //   this.config.campo = {tipo: 'createdAt', valor: val};
    //   this.resetarConsulta();
    // });

    this.listarUsuarios();
  }

  onScroll(): void {
    this.listarUsuarios();
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
