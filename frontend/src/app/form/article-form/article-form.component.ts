import { Component } from '@angular/core';
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
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {

  articleForm: FormGroup;
  categories: any[] = [];

  constructor(
    private categoryService:CategoryService,
    private articleService: ArticleService,
    private fb: FormBuilder,
    private router: Router,
    private userService:UserService) {
    this.articleForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      image: ['', [Validators.required, Validators.minLength(6)]],
      category_id: [null, [Validators.required]], 
      user_id: userService.getIdUser(),
      created_date: [new Date().toISOString()], 
      updated_date: [new Date().toISOString()], 
      delete_date: [null], 
    });

  }
  ngOnInit():void{
    this.allCategories()
  }

  allCategories(): void {
    this.categoryService.categories().subscribe(
      (data) => {
        this.categories = data;
      },
      (error) => {
        console.error('Erreur sur les catégories:', error);
      }
    );
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        // Une fois le fichier lu, on met à jour le champ `image` avec son contenu encodé en base64
        const base64String = reader.result as string;
        this.articleForm.patchValue({
          image: base64String, // Mettez ici la base64 pour l'envoyer au backend
        });
      };
  
      reader.onerror = (error) => {
        console.error('Erreur lors de la lecture du fichier :', error);
      };
  
      reader.readAsDataURL(file); // Lire le fichier en tant que base64
    }
  }
  

  save(){
    if (this.articleForm.valid) {
      const articleData = this.articleForm.value;
      console.log('Article crée : '+articleData)
      this.articleService.save(articleData).subscribe(
        (response)=>{
          console.log('Article ajouté avec succès');
          this.router.navigate(['/articles']);
        },
        (error)=>{
          console.error('Erreur lors de l\'ajoute d\'un article', error);
        }
        )    
            }

  }

  update(){

  }

  remove(){

  }
}
