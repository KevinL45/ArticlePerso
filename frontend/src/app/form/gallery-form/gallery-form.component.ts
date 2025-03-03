import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GalleryService } from '../../services/gallery.service';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Gallery } from '../../models/Gallery';
import { User } from '../../models/User';

@Component({
  selector: 'app-gallery-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.scss'],
})
export class GalleryFormComponent implements OnInit{
  galleryForm: FormGroup;
  logo: File | null = null; 
  background: File | null = null; 
  user:User = new User;


  constructor(
    private galleryService: GalleryService,
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    this.galleryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      user_id: [this.userService.getUserCurrent(), Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.userService.isAuthenticated()){
      console.log("Vous êtes connecté !")
     }else{
      this.router.navigate(['/home'])
      console.log("Vous êtes pas connecté ! Retour à la page d'accueil.")
     }  
  }

  loadUser(): void {    
    this.userService.findUser(Number(this.userService.getUserCurrent())).subscribe(
      (data) => {
        this.user = data
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'utilisateur :', error);
      }
    )
}

  save(): void {
    if (this.galleryForm.valid) {
      const galleryData = new Gallery(
        this.galleryForm.value.name,
        this.galleryForm.value.
        description,
        "",
        "",
        this.user)

      console.log('Gallery crée :', galleryData);

      this.galleryService.save(galleryData, this.logo!, this.background!).subscribe(
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

  
   // Méthode mise à jour pour stocker le fichier sélectionné
   onFileLogo(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.logo) {
      if (this.logo.size > 10 * 1024 * 1024) { // 10 Mo
        alert("Fichier trop volumineux ! La taille maximale autorisée est de 10 Mo.");
        return;
      }
    }
    if (input && input.files && input.files.length > 0) {
      this.logo = input.files[0]; // Stocke l'image dans la variable `file`
      console.log('Logo sélectionnée :', this.logo);
    }

  }

  
   // Méthode mise à jour pour stocker le fichier sélectionné
   onFileBackground(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (this.background) {
      if (this.background.size > 10 * 1024 * 1024) { // 10 Mo
        alert("Fichier trop volumineux ! La taille maximale autorisée est de 10 Mo.");
        return;
      }
    }
    if (input && input.files && input.files.length > 0) {
      this.background = input.files[0]; // Stocke l'image dans la variable `file`
      console.log('Background sélectionnée :', this.background);
    }

  }
}
