import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CamposModule } from '../shared/components/campos/campos.module';
import { MaterialModule } from '../shared/material/material.module';

import { ListagemJobsComponent } from './listagem-jobs/listagem-jobs.component';
import { CadastroJobsComponent } from './cadastro-jobs/cadastro-jobs.component';


@NgModule({
  declarations: [
    ListagemJobsComponent,
    CadastroJobsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    CamposModule,
  ]
})
export class JobsModule { }
