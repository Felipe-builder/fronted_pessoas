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

  formControlItem: FormControl = new FormControl("");


  constructor(
    public validacao: ValidarCamposService
  ) { }

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlName];
  }

  openFromIcon(timepicker: { open: () => void }) {
    if (!this.formControlItem.disabled) {
      timepicker.open();
    }
  }

  onClear($event: Event) {
    this.formControlItem.setValue(null);
  }
}
