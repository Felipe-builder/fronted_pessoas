import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { InputTextComponent } from './input-text/input-text.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputEmailComponent } from './input-email/input-email.component';
import { InputPasswordComponent } from './input-password/input-password.component';
import { InputFoneComponent } from './input-fone/input-fone.component';
import { InputSelectComponent } from './input-select/input-select.component';
import { InputDateComponent } from './input-date/input-date.component';
import { InputHoursComponent } from './input-hours/input-hours.component';



@NgModule({
  declarations: [
    InputTextComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputFoneComponent,
    InputSelectComponent,
    InputDateComponent,
    InputHoursComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaterialTimepickerModule
  ],
  exports: [
    InputTextComponent,
    InputEmailComponent,
    InputPasswordComponent,
    InputFoneComponent,
    InputSelectComponent,
    InputDateComponent,
    InputHoursComponent
  ]
})
export class CamposModule { }
