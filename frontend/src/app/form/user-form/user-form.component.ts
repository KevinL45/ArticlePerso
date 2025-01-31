import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ){
    this.userForm =  this.fb.group({
      pseudo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordsMatch });
  }
    
    passwordsMatch(group: FormGroup) {
      const password = group.get('password')?.value;
      const confirmPassword = group.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { notMatching: true };
    }

    onSubmit() {
      if (this.userForm.valid) {
        const userData = new User(
          this.userForm.value.email,
          this.userForm.value.password,
          this.userForm.value.pseudo
        );
        this.userService.register(userData).subscribe(
          (response)=>{
            console.log('Utilisateur inscrit avec succès:', userData);
          },
          (error)=>{
            console.error('Erreur lors de l\'inscription:', error);
          }
          )    
              }

    
  }

}
