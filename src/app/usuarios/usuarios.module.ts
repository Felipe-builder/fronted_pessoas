import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ListagemUsuariosComponent } from './listagem-usuarios/listagem-usuarios.component';
import { CadastroUsuariosComponent } from './cadastro-usuarios/cadastro-usuarios.component';
import { MaterialModule } from '../shared/material/material.module';
import { CamposModule } from '../shared/components/campos/campos.module';



@NgModule({
  declarations: [
    ListagemUsuariosComponent,
    CadastroUsuariosComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CamposModule
  ]
})
export class UsuariosModule { }
