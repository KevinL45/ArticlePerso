import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [CommonModule, RouterModule] 
})
export class HeaderComponent {

  constructor(private userService: UserService){}

    logout(){
      this.userService.logout();
    }

    isAuthenticated(): boolean {
      return this.userService.isAuthenticated();
    }
  
}

