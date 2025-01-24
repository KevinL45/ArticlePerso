import { Component } from '@angular/core';
import { ArticleFormComponent } from '../../form/article-form/article-form.component';

@Component({
  selector: 'app-article',
  imports: [ArticleFormComponent],
  templateUrl: './article.component.html',
  styleUrl: './article.component.scss'
})
export class ArticleComponent {

}
