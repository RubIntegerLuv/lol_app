import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { FirebaseService } from './firebase/firebase.service';
import { UtilsService } from './firebase/utils.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private menuCtrl: MenuController,
    private firebaseSvc: FirebaseService,
    private utilsSvc: UtilsService
  ) {}

  // Función para cerrar sesión
  async logout() {
    try {
      await this.firebaseSvc.auth.signOut();
      localStorage.removeItem('userRole');
      this.utilsSvc.routerLink('/login'); // Redirigir al login
      this.utilsSvc.presentToast({
        message: 'Sesión cerrada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      this.utilsSvc.presentToast({
        message: 'Error al cerrar sesión. Intenta de nuevo.',
        duration: 2500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline',
      });
    }
  }
}
