import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routes'; // Assurez-vous que ce module est importé

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,  // Importation du module de routage
  ],
})
export class AppModule { }
