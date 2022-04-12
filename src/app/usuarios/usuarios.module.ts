import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { InfiniteScrollModule } from "ngx-infinite-scroll";

import { ListagemUsuariosComponent } from './listagem-usuarios/listagem-usuarios.component';
import { CadastroUsuariosComponent } from './cadastro-usuarios/cadastro-usuarios.component';
import { MaterialModule } from '../shared/material/material.module';
import { CamposModule } from '../shared/components/campos/campos.module';
import { VisualizarUsuariosComponent } from './visualizar-usuarios/visualizar-usuarios.component';



@NgModule({
  declarations: [
    ListagemUsuariosComponent,
    CadastroUsuariosComponent,
    VisualizarUsuariosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CamposModule,
    InfiniteScrollModule
  ]
})
export class UsuariosModule { }
