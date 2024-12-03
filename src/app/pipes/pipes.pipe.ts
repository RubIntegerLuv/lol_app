import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCampeones', // Cambiamos el nombre a algo más descriptivo
  standalone: true,        // Si quieres mantenerlo standalone
})
export class PipesPipe implements PipeTransform {

  transform(campeones: any[], filtro: string): any[] {
    if (!campeones || !filtro) {
      return campeones; // Si no hay filtro, retorna todos los campeones
    }

    filtro = filtro.toLowerCase(); // Convertir el filtro a minúsculas

    // Filtrar campeones solo por su nombre
    return campeones.filter(campeon =>
      campeon.name.toLowerCase().includes(filtro)
    );
  }
}
