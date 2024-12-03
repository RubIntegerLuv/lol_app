import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleCampeonPageRoutingModule } from './detalle-campeon-routing.module';

import { DetalleCampeonPage } from './detalle-campeon.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetalleCampeonPageRoutingModule,
    SharedModule
  ],
  declarations: [DetalleCampeonPage]
})
export class DetalleCampeonPageModule {}
