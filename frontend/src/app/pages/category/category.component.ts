import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CommonModule } from '@angular/common';
import { Category } from '../../models/Category';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService, private userService: UserService) {}

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
    console.log('Modification de la catégorie :', category);
  }

  removeCategory(id: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette catégorie ?')) {
      this.categoryService.delete(id).subscribe(() => {
        this.categories = this.categories.filter(category => category.id !== id);
      });
    }
  }
}
