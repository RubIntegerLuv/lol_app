import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Asegúrate de importar IonicModule
import { CampeonesPageRoutingModule } from './campeones-routing.module';
import { CampeonesPage } from './campeones.page';
import { PipesModule } from 'src/app/pipes/pipes.module'; // Importa el módulo de pipes
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Asegúrate de incluir IonicModule aquí
    CampeonesPageRoutingModule,
    PipesModule,
    SharedModule
  ],
  declarations: [CampeonesPage],
})
export class CampeonesPageModule {}
