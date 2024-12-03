import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RiotApiService } from 'src/app/services/riot-api.service';
import { Champion } from 'src/app/models/champion.interface';

@Component({
  selector: 'app-campeones',
  templateUrl: './campeones.page.html',
  styleUrls: ['./campeones.page.scss'],
})
export class CampeonesPage implements OnInit {
  campeones: Champion[] = [];
  filtro: string = ''; // Añade esta propiedad para enlazar con el filtro de búsqueda

  constructor(
    private riotApiService: RiotApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.riotApiService.getChampions().subscribe(
      (response: any) => {
        this.campeones = Object.values(response.data).map((campeon: any) => {
          return {
            ...campeon,
            habilidades: campeon.spells, // Habilidades del campeón
          };
        });
        console.log(this.campeones); // Para verificar si los campeones no tienen la región
      },
      (error: any) => {
        console.error('Error al cargar los campeones:', error);
      }
    );
  }

  verCampeon(id: string) {
    this.router.navigate(['/detalle-campeon', id]);  // Redirigir a la página de detalles con el ID del campeón
  }
}
