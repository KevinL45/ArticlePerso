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

export const routes: Routes = [
  { path: 'accueil', component: HomeComponent }, 
  { path: 'inscription', component: RegisterComponent }, 
  { path: 'connexion', component: LoginComponent }, 
  { path: 'articles', component: ArticleComponent }, 
  { path: 'categories', component: CategoryComponent }, 
  // { path: 'galerie', component: GalleryComponent },
  
  { path: 'categories/creation', component: CategoryFormComponent }, 
  // { path: 'articles/creation', component: ArticleFormComponent }, 
  { path: 'galerie/creation', component: GalleryFormComponent }, 

  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: '/accueil' } // Redirection pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
