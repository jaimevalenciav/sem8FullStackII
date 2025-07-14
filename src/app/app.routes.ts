import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OficinasComponent } from './pages/oficinas/oficinas.component';
import { SalasComponent } from './pages/salas/salas.component';
import { AccesoComponent } from './pages/acceso/acceso.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'oficinas', component: OficinasComponent },
  { path: 'salas', component: SalasComponent },
  { path: 'acceso', component: AccesoComponent },
  { path: '**', redirectTo: '' }
];