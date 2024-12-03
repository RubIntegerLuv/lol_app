import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampeonesPage } from './campeones.page';

const routes: Routes = [
  {
    path: '',
    component: CampeonesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampeonesPageRoutingModule {}
