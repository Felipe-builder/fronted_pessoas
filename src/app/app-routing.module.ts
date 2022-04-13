import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosModule } from './usuarios/usuarios.module';
import { JobsModule } from './jobs/jobs.module';
import { CadastroUsuariosComponent } from './usuarios/cadastro-usuarios/cadastro-usuarios.component';
import { ListagemUsuariosComponent } from './usuarios/listagem-usuarios/listagem-usuarios.component';
import { ListagemJobsComponent } from './jobs/listagem-jobs/listagem-jobs.component';
import { CadastroJobsComponent } from './jobs/cadastro-jobs/cadastro-jobs.component';
import { VisualizarUsuariosComponent } from './usuarios/visualizar-usuarios/visualizar-usuarios.component';
import { VisualizarJobsComponent } from './jobs/visualizar-jobs/visualizar-jobs.component';

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
      children: [
        {
          path: '',
          component: CadastroUsuariosComponent
        },
        {
          path: ':id',
          component: CadastroUsuariosComponent
        }
      ]
    },
    {
      path: ':id',
      component: VisualizarUsuariosComponent,
      pathMatch: 'full'
    }
  ]
},
{
  path: 'jobs',
  children: [
    {
      path: '',
      component: ListagemJobsComponent
    },
    {
      path: 'cadastro',
      children: [
        {
          path: '',
          component: CadastroJobsComponent
        },
        {
          path: ':id',
          component: CadastroJobsComponent
        }
      ]
    },
    {
      path: ':id',
      component: VisualizarJobsComponent,
      pathMatch: 'full'
    }
  ]
},
{ path: '**', redirectTo: 'usuarios' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    UsuariosModule,
    JobsModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
