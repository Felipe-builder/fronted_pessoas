import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputEmailComponent } from './input-email/input-email.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputFoneComponent } from './input-fone/input-fone.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputDateComponent } from './input-date/input-date.component';



@NgModule({
  declarations: [
    InputTextComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputFoneComponent,
    InputSelectComponent,
    InputDateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    InputTextComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputFoneComponent,
    InputSelectComponent,
    InputDateComponent
  ]
})
export class CamposModule { }
