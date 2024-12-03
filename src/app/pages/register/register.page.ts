import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/firebase/firebase.service';
import { UtilsService } from 'src/app/firebase/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    rank: new FormControl('', [Validators.required]), // Campo para el rango
    rol: new FormControl('', [Validators.required]) // Campo para el rol
  });

  firebaseSvc = inject(FirebaseService); // Servicio para Firebase
  utilsSvc = inject(UtilsService); // Servicio para utilidades
  isLoading = false; // Propiedad para manejar el estado de carga

  ngOnInit() {}

  // Método para registrar usuario
  async submit() {
    if (this.form.valid) {
      this.isLoading = true; // Inicia el estado de carga
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc
        .signUp(this.form.value as user)
        .then(async res => {
          const uid = res.user.uid;
          this.form.controls.uid.setValue(uid);

          await this.setUserInfo(uid); // Guardar información en Firebase

          this.utilsSvc.routerLink('/login');
        })
        .catch(error => {
          console.error('Error al registrar:', error);
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-crescent',
          });
        })
        .finally(() => {
          this.isLoading = false; // Finaliza el estado de carga
          loading.dismiss();
        });
    }
  }

  // Método para guardar información del usuario en Firestore
  async setUserInfo(uid: string) {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      const path = `users/${uid}`;
      const userInfo = { ...this.form.value }; // Crear una copia del formulario
      delete userInfo.password; // No guardar la contraseña

      this.firebaseSvc
        .setDocument(path, userInfo)
        .then(async () => {
          this.utilsSvc.saveInLocalStorage('users', userInfo); // Guardar en almacenamiento local
          this.form.reset(); // Limpiar el formulario
        })
        .catch(error => {
          console.error('Error al guardar información:', error);
          this.utilsSvc.presentToast({
            message: error.message,
            duration: 2500,
            color: 'primary',
            position: 'middle',
            icon: 'alert-circle-crescent',
          });
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}
