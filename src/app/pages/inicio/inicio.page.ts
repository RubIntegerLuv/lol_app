import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';  // Importa NavController para la navegación

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  constructor(private navCtrl: NavController) { }  // Inyectamos el servicio NavController

  ngOnInit() {
  }

  // Método que se ejecutará cuando el usuario haga clic en "Ingresar"
  ingresar() {
    // Redirige a la página de campeones
    this.navCtrl.navigateForward('/login');  // Redirige a la ruta '/campeones'
  }

}
