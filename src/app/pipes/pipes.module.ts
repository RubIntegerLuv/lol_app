import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterCampeonesPipe } from './filter-campeones.pipe'; // Importa el pipe

@NgModule({
  declarations: [FilterCampeonesPipe], // Declara el pipe aquí
  imports: [CommonModule], // Asegúrate de importar CommonModule
  exports: [FilterCampeonesPipe], // Exporta el pipe para que se pueda usar en otros módulos
})
export class PipesModule {}
