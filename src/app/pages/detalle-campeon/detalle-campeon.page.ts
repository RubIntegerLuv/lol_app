import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { RiotApiService } from 'src/app/services/riot-api.service';
import { regionMap } from 'src/app/services/region-map.service';
import { roleMap } from 'src/app/services/region-map.service';
import { Champion } from 'src/app/models/champion.interface';

@Component({
  selector: 'app-detalle-campeon',
  templateUrl: './detalle-campeon.page.html',
  styleUrls: ['./detalle-campeon.page.scss'],
})
export class DetalleCampeonPage implements OnInit {
  campeon: Champion | null = null;
  uid!: string;

  constructor(
    private route: ActivatedRoute,
    private riotApiService: RiotApiService,
    private firebaseService: FirebaseService // Servicio para interactuar con Firebase
  ) {}

  ngOnInit() {
    // Obtener el ID del campeón desde la ruta
    const campeonId = this.route.snapshot.paramMap.get('id');
    if (campeonId) {
      this.riotApiService.getChampionDetails(campeonId).subscribe(
        (response: any) => {
          const championData = response.data[campeonId];

          // Asigna la región usando el mapa
          const region = regionMap[championData.name] || 'Desconocida';

          // Asignar los detalles del campeón
          this.campeon = {
            ...championData,
            habilidades: championData.spells.map((spell: any) => ({
              name: spell.name,
              description: spell.description,
              image: spell.image,
            })),
            roles: championData.tags || [],  // Los roles se encuentran en "tags"
            lore: championData.lore || 'No disponible', // Historia del campeón
            region, // Añade la región
          };
        },
        (error: any) => {
          console.error('Error al cargar los detalles del campeón:', error);
        }
      );
    }

    // Obtener el ID del usuario actual desde el servicio Firebase
    const user = this.firebaseService.getCurrentUser();
    if (user) {
      this.uid = user.uid;  // Asigna el UID del usuario actual
    } else {
      console.log('No hay usuario autenticado');
    }
  }

  // Función para traducir roles a español
  getRoleInSpanish(role: string): string {
    return roleMap[role] || role; // Si no se encuentra el rol, devuelve el rol original
  }

  // Función para marcar un campeón como favorito
  setAsFavorite(campeon: Champion) {
    if (!this.uid || !campeon) return;  // Verifica si el usuario y el campeón existen

    // Llama al servicio para guardar el campeón favorito
    this.firebaseService.setFavoriteChampion(this.uid, campeon.id)
      .then(() => {
        console.log('Campeón favorito guardado');
      })
      .catch((error) => {
        console.error('Error al guardar el campeón favorito:', error);
      });
  }
}
