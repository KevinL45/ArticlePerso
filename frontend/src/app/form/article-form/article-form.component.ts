import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Article } from '../../models/Article';
import { Category } from '../../models/Category';
import { User } from '../../models/User';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup;
  categories: Category[] = [];
  user: User = new User;
  file: File | null = null; 

  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      category: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.loadUser();
  }

  loadCategories(): void {
    this.categoryService.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur lors du chargement des catégories :', error);
      }
    );
  }

  loadUser(): void {    
      this.userService.findUser(Number(this.userService.getUserCurrent())).subscribe(
        (data) => {
          this.user = data
        },
        (error) => {
          console.error('Erreur lors du chargement de l\'utilisateur :', error);
        }
      )
  }

   // Méthode mise à jour pour stocker le fichier sélectionné
   onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.file) {
      if (this.file.size > 10 * 1024 * 1024) { // 10 Mo
        alert("Fichier trop volumineux ! La taille maximale autorisée est de 10 Mo.");
        return;
      }
    }
    if (input && input.files && input.files.length > 0) {
      this.file = input.files[0]; // Stocke l'image dans la variable `file`
      console.log('Image sélectionnée :', this.file);
    }

  }
  
  

  save(): void {
    if (this.articleForm.valid) {
      const selectedCategory = this.categories.find(cat => cat.id === Number(this.articleForm.value.category));
      console.log(selectedCategory)
      if (!selectedCategory) {
        console.warn('Catégorie invalide');
        return;
      }

      const articleData = new Article(
        this.articleForm.value.title,
        this.articleForm.value.description,
        '', // L'URL de l'image sera gérée côté backend
        selectedCategory, 
        this.user
      );

      console.log('Données envoyées à l\'API :', articleData);

      this.articleService.save(articleData, this.file!).subscribe(
        () => {
          console.log('Article ajouté avec succès');
          this.router.navigate(['/articles']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'article :', error);
        }
      );
    } else {
      console.warn('Le formulaire est invalide ou l\'utilisateur est introuvable.');
    }
  }
}
