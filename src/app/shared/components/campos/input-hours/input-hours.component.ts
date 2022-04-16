import { Component, Input } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'person-input-hours',
  templateUrl: './input-hours.component.html',
  styleUrls: ['./input-hours.component.scss']
})
export class InputHoursComponent {
  @Input() titulo: string;
  @Input() formGroup: FormGroup;
  @Input() controlName: string;

  novaData: Date;
  data: any;
  formControlItem: FormControl = new FormControl("");


  constructor(
    public validacao: ValidarCamposService
  ) { }

  get formControl(): AbstractControl {
    this.novaData = new Date();
    this.data = this.formGroup.controls[this.controlName].value;
    if (typeof this.data === 'string') {
      this.data = this.data.split(':');
      this.novaData.setHours(this.data[0], this.data[1]);
      console.log(this.formGroup.controls[this.controlName].value);
    }
    return this.formGroup.controls[this.controlName];
  }

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formGroup.controls[this.controlName].disabled) {
      timepicker.open();
    }
  }

  onClear($event: Event) {
    this.formGroup.controls[this.controlName].setValue(null);
  }
}
