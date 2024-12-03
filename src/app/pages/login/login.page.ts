import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';  // Inyectamos Router para redirigir
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { UtilsService } from 'src/app/firebase/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router = inject(Router);  // Inyectamos Router para redirigir

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc
        .signIn(this.form.value as user)
        .then(async (res) => {
          // Si la autenticación es exitosa, redirigimos a la página de campeones
          this.router.navigate(['/campeones']);
        })
        .catch((error) => {
          console.log('Error al iniciar sesión:', error);

          this.utilsSvc.presentToast({
            message: error.message || 'Ocurrió un error al iniciar sesión.',
            duration: 2500,
            color: 'danger',  // Cambié el color a 'danger' para errores
            position: 'middle',
            icon: 'alert-circle-crescent',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    } else {
      // Validar si el formulario tiene errores y mostrar un mensaje general
      this.utilsSvc.presentToast({
        message: 'Por favor, ingresa tus credenciales correctamente.',
        duration: 2500,
        color: 'warning',
        position: 'middle',
        icon: 'alert-circle-outline',
      });
    }
  }

  // Método para redirigir al usuario a la página de recuperación de contraseña
  goToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
