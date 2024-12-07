import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from '../firebase/firebase.service';
import { UtilsService } from '../firebase/utils.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private utilsService: UtilsService
  ) {}

  canActivate(): Observable<boolean> {
    return this.firebaseService.auth.authState.pipe(
      take(1), // Toma el estado inicial del usuario
      map((user) => {
        if (user) {
          return true; // Usuario autenticado
        } else {
          // Usuario no autenticado
          this.utilsService.presentToast({
            message: 'Debes iniciar sesión para acceder a esta página',
            duration: 2000,
            color: 'danger',
          });
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }
}
