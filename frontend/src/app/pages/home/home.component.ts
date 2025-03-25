import { Component } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/Article';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  articles:Article[] = [];
  url:string = environment.apiUrl;
  // Garde en mémoire l’image actuellement affichée.
  currentIndex: number = 0;


  constructor(private articleService:ArticleService){

  }

  ngOnInit(): void {
    this.loadArticles();
    setInterval(() => this.nextSlide(), 4000); // Change toutes les 4 secondes
  }

  loadArticles(): void {
    this.articleService.articles().subscribe(
      (data) => {
        this.articles = data
          .filter(article => article.updatedDate || article.createdDate)
          .sort((a, b) => {
            console.log(a.updatedDate)
            const dateA = new Date(a.updatedDate || a.createdDate || 0).getTime();
            const dateB = new Date(b.updatedDate || b.createdDate || 0).getTime();
            return dateB - dateA; // Trier du plus récent au plus ancien
          })
          .slice(0, 3)
      },
      (error) => {
        console.error('Erreur sur les articles:', error);
      }
    );
  }
  
  
  nextSlide(): void {
    if (this.articles.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.articles.length;
    }
  }
  
  
  

}
