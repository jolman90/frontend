import { Routes } from '@angular/router';
import { PaisesComponent } from './paises/paises.component';
import { CiudadesComponent } from './ciudades/ciudades.component';

export const routes: Routes = [
    {
        path: '',
        component: PaisesComponent
      },
      {
        path: 'ciudades',
        component: CiudadesComponent
      },
      {
        path: 'ciudades/:idpais',
        component: CiudadesComponent
      },
];