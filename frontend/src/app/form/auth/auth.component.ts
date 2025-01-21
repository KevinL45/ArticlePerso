import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router'; 

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
      if(this.userForm.valid){
        const token = this.userForm.value;
        this.userService.login(token).subscribe(
          (response)=>{
            console.log('Vous êtes connecté !');
            localStorage.setItem('token', token);
            this.router.navigate(['/home']);
          },
          (error)=>{
            console.error('Erreur lors de la connexion:', error);
          }
        )
      }
    }

}
