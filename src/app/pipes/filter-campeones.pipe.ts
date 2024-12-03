import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCampeones'
})
export class FilterCampeonesPipe implements PipeTransform {
  transform(campeones: any[], filtro: string): any[] {
    if (!campeones || !filtro) {
      return campeones; // Si no hay filtro, retorna todos los campeones
    }

    filtro = filtro.toLowerCase(); // Convertir filtro a minúsculas

    // Filtrar campeones por nombre
    return campeones.filter(campeon =>
      campeon.name.toLowerCase().includes(filtro)
    );
  }
}
