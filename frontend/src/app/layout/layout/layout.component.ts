import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component'; // Chemin vers HeaderComponent
import { FooterComponent } from '../footer/footer.component'; // Chemin vers FooterComponent
import { RouterModule } from '@angular/router'; // Nécessaire pour le <router-outlet>

@Component({
  selector: 'app-layout',
  imports: [HeaderComponent, FooterComponent, RouterModule], // Import des composants autonomes
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {}
