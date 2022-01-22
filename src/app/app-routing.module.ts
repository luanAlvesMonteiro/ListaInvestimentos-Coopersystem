import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaInvestimentoComponent } from './lista-investimento/lista-investimento.component';
import { ResgatePersonalizadoComponent } from './resgate-personalizado/resgate-personalizado.component';

const routes: Routes = [
  {
    path: 'home',
    component: ListaInvestimentoComponent
  },
  {
    path: 'resgate/:index',
    component: ResgatePersonalizadoComponent
  },  
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
