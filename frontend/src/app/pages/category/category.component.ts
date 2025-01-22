import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryFormComponent } from '../../form/category-form/category-form.component';


@Component({
  selector: 'app-category',
  imports: [CommonModule, CategoryFormComponent],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent implements OnInit{

  categories: any[] = []; 

  constructor(private categoryService: CategoryService, private fb:FormBuilder){}
  
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

  update(category: any){

  }

  remove(id: number) : void{

  }

}
