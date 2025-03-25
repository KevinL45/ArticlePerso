import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../models/Article';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-details-article',
  imports: [CommonModule],
  templateUrl: './details-article.component.html',
  styleUrl: './details-article.component.scss'
})
export class DetailsArticleComponent {

  articleId: number | null = null
  article: Article | null = null;
  url:string = environment.apiUrl
  


  ngOnInit():void{

    this.route.paramMap.subscribe(params =>{
      const id = params.get("id");
      if(id){
        this.articleId = Number(id);
        this.loadArticle(this.articleId)
      }
    })

  }

  constructor(
    private route:ActivatedRoute, 
    private articleService:ArticleService,
    private location: Location,
    private router:Router,
    private userService:UserService){

  }

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  loadArticle(id : number){
    this.articleService.article(id).subscribe((data)=>{
      this.article = data;
    })
  }

  goBack() : void{
    this.location.back();
  }

  updateArticle(article : Article){
    return this.router.navigate(['/articles/modification',article.id]);
  }

  

}
