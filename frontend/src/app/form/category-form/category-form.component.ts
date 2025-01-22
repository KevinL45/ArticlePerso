import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent {
  
  categoryForm: FormGroup;

  constructor(
    private categoryService: CategoryService, 
    private fb:FormBuilder, 
    private router:Router){
    this.categoryForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save(){
    if (this.categoryForm.valid) {
      const categoryData = this.categoryForm.value;
      this.categoryService.save(categoryData).subscribe(
        (response)=>{
          console.log('Catégorie ajouté avec succès:', this.categoryForm);
          this.router.navigate(['/categories']);
        },
        (error)=>{
          console.error('Erreur lors de l\'ajoute d\'une catégorie', error);
        }
        )    
            }

  }

  update(){

  }



}
