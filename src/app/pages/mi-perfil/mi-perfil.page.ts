import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/firebase/firebase.service'; // Servicio de Firebase
import { RiotApiService } from 'src/app/services/riot-api.service'; // Servicio para obtener datos de campeones
import { Champion } from 'src/app/models/champion.interface'; // Modelo de campeones (asegúrate de tenerlo)

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.page.html',
  styleUrls: ['./mi-perfil.page.scss'],
})
export class MiPerfilPage implements OnInit {
  // Variables de perfil del usuario
  name: string = '';
  rank: string = '';
  rol: string = '';
  userId: string = '';  // ID del usuario

  // Variables del campeón favorito
  selectedChampionId: string = '';  // ID del campeón favorito
  favoriteChampion: Champion | null = null;  // Detalles del campeón favorito
  championList: Champion[] = [];  // Lista de campeones

  constructor(
    private firebaseService: FirebaseService,
    private riotApiService: RiotApiService
  ) {}

  ngOnInit() {
    this.loadUserData();
    this.loadChampions();
  }

  // Cargar datos del usuario
  async loadUserData() {
    const currentUser = this.firebaseService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.uid;
      this.name = currentUser.displayName || currentUser.email || '';  // Si no tiene displayName, usa el email

      try {
        // Obtener los datos del usuario desde Firestore
        const userData = await this.firebaseService.getUserData(currentUser.uid);

        // Asignar datos de usuario a las variables
        this.name = userData.name || this.name;
        this.rank = userData.rank || 'Sin rank';
        this.rol = userData.rol || 'No disponible';

        // Obtener el nombre del campeón favorito desde Firestore
        this.selectedChampionId = userData.favoriteChampionId || '';

        // Cargar el campeón favorito
        if (this.selectedChampionId) {
          this.getFavoriteChampionDetails(this.selectedChampionId);
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario', error);
      }
    }
  }

  // Cargar la lista de campeones
  loadChampions() {
    this.championList = [
      { id: 'Aatrox', name: 'Aatrox', title: 'El Campeón de la Guerra', image: { full: 'https://link_a_imagen_aatrox' }, spells: [], roles: ['Fighter'], lore: 'Historia de Aatrox' },
      { id: 'Ahri', name: 'Ahri', title: 'La Zorra Encantadora', image: { full: 'https://link_a_imagen_ahri' }, spells: [], roles: ['Mage', 'Assassin'], lore: 'Historia de Ahri' },
      // Agrega más campeones aquí
    ];

    // Cargar el campeón favorito si ya tiene uno
    if (this.selectedChampionId) {
      this.getFavoriteChampionDetails(this.selectedChampionId);
    }
  }

  getFavoriteChampionDetails(championName: string) {
    this.riotApiService.getChampionDetails(championName).subscribe((champion) => {
      const champDetails = champion.data[championName];  // El objeto de datos contiene un campo con el nombre del campeón
      this.favoriteChampion = champDetails;  // Asignamos los detalles del campeón a la variable favoriteChampion
    });
  }

  selectChampion(championName: string) {
    this.selectedChampionId = championName;
    this.firebaseService.setFavoriteChampion(this.userId, championName); // Guardar en la base de datos
    this.getFavoriteChampionDetails(championName); // Obtener los detalles del campeón seleccionado
  }
}
