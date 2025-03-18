import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticleComponent } from './pages/article/article.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryFormComponent } from './form/category-form/category-form.component';
import { ArticleFormComponent } from './form/article-form/article-form.component';
import { GalleryFormComponent } from './form/gallery-form/gallery-form.component';
import { AddArticleComponent } from './pages/add-article/add-article.component';
import { UpdateArticleComponent } from './pages/update-article/update-article.component';
import { UpdateCategoryComponent } from './pages/update-category/update-category.component';
import { AddCategoryComponent } from './pages/add-category/add-category.component';
import { DetailsArticleComponent } from './pages/details-article/details-article.component';

export const routes: Routes = [
  { path: 'accueil', component: HomeComponent }, 
  { path: 'connexion', component: LoginComponent },
  // { path: 'inscription', component: RegisterComponent }, 
 
  
  { path: 'categories', component: CategoryComponent }, 
  { path: 'categories/creation', component: AddCategoryComponent }, 
  { path: 'categories/modification/:id', component: UpdateCategoryComponent }, 

  { path: 'articles', component: ArticleComponent }, 
  { path: 'articles/creation', component: AddArticleComponent }, 
  { path: 'articles/modification/:id', component: UpdateArticleComponent }, 
  { path: 'articles/details/:id', component: DetailsArticleComponent }, 


  // { path: 'galerie', component: GalleryComponent },
  // { path: 'galerie/creation', component: GalleryFormComponent }, 

  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: '/accueil' } // Redirection pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
