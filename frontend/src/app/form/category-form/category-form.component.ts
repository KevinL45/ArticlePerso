import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Category } from '../../models/Category';
import { UserService } from '../../services/user.service';
import { User } from '../../models/User';


@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss',
})
export class CategoryFormComponent implements OnInit{
  
  categoryForm: FormGroup;
  categoryId: number | null = null; // Pour savoir si on est en modification
  isEditMode: boolean = false; // Indique si on est en mode modification
  categoryToEdit!: Category;
  user: User = new User;
  

  ngOnInit(): void {
    this.loadUser();
    this.route.paramMap.subscribe(params =>{
      const id = params.get("id");

      if(id){
        console.log ("Id de la catégorie : "+id);
        this.categoryId = Number(id);
        this.isEditMode = true;
        this.loadCategory(this.categoryId)

      }

    })
  }

  constructor(
    private route:ActivatedRoute,
    private categoryService: CategoryService, 
    private fb:FormBuilder, 
    private router:Router,
    private userService: UserService){
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  loadUser(): void {    
    this.userService.findUser(Number(this.userService.getUserCurrent())).subscribe(
      (data) => {
        this.user = data
        console.log("Vous êtes connecté, vous pouvez utiliser le formulaire.")
      },
      (error) => {
        this.router.navigate(['/home'])
        console.error('Retour à la page d\'accueil, voici l\'erreur :', error);
      }
    )
}

  loadCategory(id : number) : void{

    this.categoryService.category(id).subscribe(
      (category) => {
        console.log("Catégorie récupéré depuis l'API :", category);
        this.categoryToEdit = category;
        this.categoryForm.patchValue({
          name: category.name,
        });
      },
      (error) => console.error('Erreur lors du chargement de la catégorie :', error)
    );

  }

  save(){
    if (this.categoryForm.valid) {
      const categoryData = new Category(
        this.categoryForm.value.name
      )
      if(this.isEditMode && this.categoryId){
        this.categoryService.updateCategory(this.categoryId,categoryData).subscribe(
          (response)=>{
            console.log('Catégorie modifié avec succès');
            this.categoryService.categories().subscribe(categories => {
              console.log('Liste des catégories mise à jour:', categories);
            });
            this.router.navigate(['/categories']);
          },
          (error)=>{
            console.error('Erreur lors de la modification d\'une catégorie', error);
          }
        )
  
      }else{
        this.categoryService.saveCategory(categoryData).subscribe(
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



}
