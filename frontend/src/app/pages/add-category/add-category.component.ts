import { Component } from '@angular/core';
import { CategoryFormComponent } from '../../form/category-form/category-form.component';
import { CategoryComponent } from "../category/category.component";

@Component({
  selector: 'app-add-category',
  imports: [CategoryFormComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

}
