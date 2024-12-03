import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // Asegúrate de que IonicModule esté importado aquí

import { InicioPageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  // Aquí importamos el módulo de Ionic
    InicioPageRoutingModule,
    SharedModule  // Módulo de enrutamiento para esta página
  ],
  declarations: [InicioPage]  // Declaramos la página InicioPage
})
export class InicioPageModule {}
