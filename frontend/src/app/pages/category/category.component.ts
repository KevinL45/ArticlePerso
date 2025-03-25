import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/Category';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoryService, 
    private userService: UserService,
    private router:Router) {}

  ngOnInit(): void {
    this.allCategories();
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

  isAuthenticated(): boolean {
    return this.userService.isAuthenticated();
  }

  updateCategory(category: Category) {
    return this.router.navigate(['categories/modification',category.id])
  }

  removeCategory(cat : Category): void {
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      this.categoryService.deleteCategroy(Number(cat.id)).subscribe(() => {
        this.categories = this.categories.filter(category => category.id !== cat.id);
      });
    }
  }
}
