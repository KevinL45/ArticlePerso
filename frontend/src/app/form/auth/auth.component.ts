import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'; 
import { User } from '../../models/User';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {

  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router){
    this.userForm =  this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })}

    onSubmit() {
      if (this.userForm.valid) {
        const userData = new User(
          this.userForm.value.email,
          this.userForm.value.password
        )
    
        this.userService.login(userData).subscribe({
          next: (response) => {
            // Récupérer le token et l'ID de l'utilisateur
            const { token, userId } = response;
    
            if (token && userId) {
              this.userService.setUserCurrent(userId.toString())
              this.userService.setToken(token)
              console.log('Token stocké :', token);
              console.log('ID utilisateur stocké :', userId);
              this.router.navigate(['/home']);
            }
          },
          error: (err) => {
            console.error('Erreur lors de la connexion :', err);
          }
        });
      }
    }
    
    }


