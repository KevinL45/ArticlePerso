import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ArticleComponent } from './pages/article/article.component';
import { GalleryComponent } from './pages/gallery/gallery.component';

export const routes: Routes = [
  { path: 'accueil', component: HomeComponent }, 
  { path: 'inscription', component: RegisterComponent }, 
  { path: 'connexion', component: LoginComponent }, 
  { path: 'article', component: ArticleComponent }, 
  { path: 'galerie', component: GalleryComponent }, 
  { path: '', redirectTo: '/accueil', pathMatch: 'full' }, // Redirection par défaut
  { path: '**', redirectTo: '/accueil' } // Redirection pour les routes inconnues
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
