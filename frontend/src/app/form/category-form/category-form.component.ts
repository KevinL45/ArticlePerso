import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Route, Router } from '@angular/router';
import { Category } from '../../models/Category';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit{
  
  categoryForm: FormGroup;

  ngOnInit(): void {
    this.userService.loadUser();
  }

  constructor(
    private categoryService: CategoryService, 
    private fb:FormBuilder, 
    private router:Router,
    private userService: UserService){
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  save(){
    if (this.categoryForm.valid) {
      const categoryData = new Category(
        this.categoryForm.value.name
      )
      this.categoryService.save(categoryData).subscribe(
        (response)=>{
          console.log('Catégorie ajouté avec succès');

          this.categoryService.categories().subscribe(categories => {
            console.log('Liste des catégories mise à jour:', categories);
          });
          this.router.navigate(['/categories']);
        },
        (error)=>{
          console.error('Erreur lors de l\'ajoute d\'une catégorie', error);
        }
        )    
            }

  }



}
