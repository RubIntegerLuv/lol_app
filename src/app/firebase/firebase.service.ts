import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { user } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {}

  // Función para iniciar sesión
  signIn(user: user) {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Función para registrar un nuevo usuario
  signUp(user: user) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Función para actualizar el nombre de usuario
  updateUser(displayName: string) {
    const currentUser = getAuth().currentUser;
    if (currentUser) {
      return updateProfile(currentUser, { displayName });
    } else {
      throw new Error('No user is currently signed in');
    }
  }

  // Función para guardar un documento en Firestore
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // Función para obtener un documento de Firestore
  async getDocument(path: string): Promise<any> {
    const docRef = this.firestore.doc(path);
    const docSnap = await docRef.ref.get();
    return docSnap.exists ? docSnap.data() : null;
  }

  // Función para obtener el usuario actual
  getCurrentUser() {
    const currentUser = getAuth().currentUser;
    return currentUser ? currentUser : null;
  }

  // Función para obtener los datos de un usuario por su UID
  async getUserData(uid: string): Promise<user> {
    const docRef = this.firestore.doc(`users/${uid}`);
    const docSnap = await docRef.ref.get();
    if (docSnap.exists) {
      return docSnap.data() as user;
    } else {
      throw new Error('User data not found');
    }
  }

  // Función para guardar el campeón favorito del usuario
  async setFavoriteChampion(userId: string, championId: string) {
    const userDocRef = this.firestore.collection('users').doc(userId);

    // Verificar si el documento del usuario existe antes de actualizar
    const docSnap = await userDocRef.ref.get();
    if (docSnap.exists) {
      return userDocRef.update({
        favoriteChampionId: championId,
      });
    } else {
      throw new Error('User document not found');
    }
  }

  getFavoriteChampion(userId: string): Observable<string | null> {
    return this.firestore.collection('users').doc(userId).get().pipe(
      map(doc => {
        const data = doc.data() as user | undefined;  // Indicamos que los datos provienen de un tipo 'User'
        return data ? data.favoriteChampionId || null : null;  // Devuelve el campeón favorito si existe, o null
      })
    );
  }

  sendRecoveryEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

}
