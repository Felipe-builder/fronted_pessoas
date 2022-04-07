import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosModule } from './usuarios/usuarios.module';
import { CadastroUsuariosComponent } from './usuarios/cadastro-usuarios/cadastro-usuarios.component';
import { ListagemUsuariosComponent } from './usuarios/listagem-usuarios/listagem-usuarios.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full'
},
{
  path: 'usuarios',
  children: [
    {
      path: '',
      component: ListagemUsuariosComponent
    },
    {
      path: 'cadastro',
      component: CadastroUsuariosComponent,
      pathMatch: 'full'
    }
  ]
},
{ path: '**', redirectTo: 'usuarios' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UsuariosModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
