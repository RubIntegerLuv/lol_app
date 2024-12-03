import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Para redirigir después de completar
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { UtilsService } from 'src/app/firebase/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  router = inject(Router);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const email = this.form.value.email || ''; // Asegura que sea un string válido
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc
        .sendRecoveryEmail(email)
        .then(() => {
          this.utilsSvc.presentToast({
            message: 'Correo de recuperación enviado. Revisa tu bandeja de entrada.',
            duration: 2500,
            color: 'success',
            position: 'middle',
            icon: 'checkmark-circle-outline',
          });
          this.router.navigate(['/login']); // Redirige al login
        })
        .catch((error) => {
          console.error('Error al enviar el correo:', error);
          this.utilsSvc.presentToast({
            message: 'Hubo un error al enviar el correo. Intenta nuevamente.',
            duration: 2500,
            color: 'danger',
            position: 'middle',
            icon: 'alert-circle-outline',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}
