import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
    {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage)
  },
  {
    path: 'encuesta',
    loadComponent: () => import('./pages/encuesta/encuesta.page').then( m => m.EncuestaPage)
  },
  {
    path: 'camara',
    loadComponent: () => import('./pages/camara/camara.page').then( m => m.CamaraPage)
  },
 
  {
    path: 'registros',
    loadComponent: () => import('./pages/registros/registros.page').then( m => m.RegistrosPage)
  },
  {
    path: 'ubicacion',
    loadComponent: () => import('./pages/ubicacion/ubicacion.page').then( m => m.UbicacionPage)
  },

];