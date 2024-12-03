import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { UtilsService } from 'src/app/firebase/utils.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  menuCtrl = inject(MenuController);

  constructor(
    private router: Router,
    private firebaseService: FirebaseService
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }

  async getUserInfo() {
    try {
      const user = await this.firebaseService.getCurrentUser();
      if (user) {
        const userDoc = await this.firebaseService.getDocument(
          `users/${user.uid}`
        );
        this.userName = userDoc?.name || 'Invitado';
      }
    } catch (error) {
      console.log('Error al obtener el nombre del usuario', error);
    }
  }

  goToInicio() {
    this.router.navigate(['/inicio']); // Navega a la ruta de inicio
  }

  goToCampeones() {
    this.router.navigate(['/campeones']);
  }

  goToPerfil() {
    this.router.navigate(['/mi-perfil']);
  }

  async logout() {
    const loading = await this.utilsSvc.loading();
    await loading.present();

    try {
      await this.firebaseSvc.auth.signOut();
      localStorage.removeItem('userRole');
      this.utilsSvc.routerLink('/login');
      this.utilsSvc.presentToast({
        message: 'Sesión cerrada exitosamente',
        duration: 1500,
        color: 'success',
        position: 'middle',
        icon: 'checkmark-circle-outline',
      });
    } catch (error) {
      console.log(error);
      this.utilsSvc.presentToast({
        message: (error as Error).message,
        duration: 2500,
        color: 'primary',
        position: 'middle',
        icon: 'alert-circle-outline',
      });
    } finally {
      loading.dismiss();
    }
  }

  toggleMenu() {
    this.menuCtrl.toggle();
  }
}
