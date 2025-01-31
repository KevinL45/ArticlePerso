import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-article-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss'],
})
export class ArticleFormComponent implements OnInit {
  articleForm: FormGroup;
  categories: any[] = [];

  constructor(
    private categoryService: CategoryService,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image_url: ['', [Validators.required]],
      category: [null, [Validators.required]],
      user: [userService.getIdUser(), Validators.required],
      created_date: [''],
      updated_date: [''],
      delete_date: [''],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
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

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        this.articleForm.patchValue({
          image_url: base64String,
        });
      };

      reader.onerror = (error) => {
        console.error('Erreur lors de la lecture du fichier :', error);
      };

      reader.readAsDataURL(file);
    }
  }

  save(): void {
    if (this.articleForm.valid) {
      const articleData = this.articleForm.value;
      console.log('Données de l\'article :', articleData);

      this.articleService.save(articleData).subscribe(
        (response) => {
          console.log('Article ajouté avec succès');
          this.router.navigate(['/articles']);
        },
        (error) => {
          console.error('Erreur lors de l\'ajout de l\'article :', error);
        }
      );
    } else {
      console.warn('Le formulaire est invalide. Veuillez corriger les erreurs.');
    }
  }
}
