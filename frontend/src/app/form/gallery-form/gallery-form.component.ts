import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-gallery-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss'],
})
export class GalleryFormComponent {
  galleryForm: FormGroup;

  constructor(
    private galleryService: GalleryService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.galleryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      logo: ['', [Validators.required]],
      background: ['', [Validators.required]],
      user_id: [this.userService.getUserCurrent(), Validators.required],
      created_date: [new Date().toISOString()],
      updated_date: [new Date().toISOString()],
      delete_date: [null],
    });
  }

  save(): void {
    if (this.galleryForm.valid) {
      const galleryData = this.galleryForm.value;
      console.log('Gallery crée :', galleryData);

      this.galleryService.save(galleryData).subscribe(
        (response) => {
          console.log('Galerie ajoutée avec succès', response);
          this.router.navigate(['/galerie']);
        },
        (error) => {
          console.error("Erreur lors de l'ajout d'une galerie :", error);
        }
      );
    } else {
      console.warn("Formulaire invalide, veuillez vérifier les champs.");
    }
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;

    if (input && input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result as string;
        this.galleryForm.patchValue({
          [controlName]: base64String,
        });
      };

      reader.onerror = (error) => {
        console.error('Erreur lors de la lecture du fichier :', error);
      };

      reader.readAsDataURL(file);
    }
  }
}
