import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/Article';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ArrayPipe } from '../../pipes/array.pipe';
import { CeilPipe } from '../../pipes/ceil.pipe';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  imports:[CommonModule, ArrayPipe, CeilPipe],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class ArticleComponent implements OnInit {

  articles: Article[] = [];
  currentPage: number = 1;
  articlesPerPage: number = 5;
  url:string = environment.apiUrl;

  constructor(private articleService: ArticleService, private userService:UserService) {}

  ngOnInit(): void {
    this.allArticles();
  }

  allArticles(): void {
    this.articleService.articles().subscribe(
      (data) => {
        this.articles = data;
      },
      (error) => {
        console.error('Erreur sur les articles:', error);
      }
    );
  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  updateArticle(article: Article) {
    console.log('Modification de l\'article', article);
  }

  removeArticle(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.articleService.delete(id).subscribe(() => {
        this.articles = this.articles.filter(article => article.id !== id);
      });
    }
  }

  get paginatedArticles(): Article[] {
    const start = (this.currentPage - 1) * this.articlesPerPage;
    return this.articles.slice(start, start + this.articlesPerPage);
  }

  changePage(page: number): void {
    this.currentPage = page;
  }
}
