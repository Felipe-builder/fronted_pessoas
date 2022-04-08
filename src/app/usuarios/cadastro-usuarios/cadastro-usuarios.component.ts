import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'per-cadastro-usuarios',
  templateUrl: './cadastro-usuarios.component.html',
  styleUrls: ['./cadastro-usuarios.component.scss']
})
export class CadastroUsuariosComponent implements OnInit {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  cadastro: FormGroup;

  constructor(private fb: FormBuilder) { }

  get f() {
    return this.cadastro.controls;
  }
  ngOnInit(): void {

    this.cadastro = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      confirmaSenha: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      telefone: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Digite seu email';
    }

    return this.email.hasError('email') ? 'Email inválido' : '';
  }

  salvar(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    alert('SUCESSO!!\n\n' + JSON.stringify(this.cadastro.value, null, 4));
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

}
