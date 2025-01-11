import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../Authentication/Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LocalStorageService } from '../../../Authentication/Services/local-storage.service';
import { CommonModule } from '@angular/common';
import { PostService } from '../../Services/post.service';

@Component({
  selector: 'app-form-post',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-post.component.html',
  styleUrl: './form-post.component.css'
})
export class FormPostComponent {
  router = inject(Router);
  postService = inject(PostService);
  postForm! : FormGroup;
  private storageService = inject(LocalStorageService);
  loginAlert: boolean = false;
  error : boolean = false;
  errorMesage : string[] = [];
  userEmail: string | null = null;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder) {
    this.formulario();
    this.userEmail = this.storageService.getVar('email');
  }
  formulario(){
    this.postForm = this.fb.group({
      title: ['',[Validators.required, Validators.maxLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      imageUrl: ['',[Validators.required]],
    });
  }
  get titleValidate() { return this.postForm.get('title')?.invalid && this.postForm.get('title')?.touched; }

  get emailValidate() { return this.postForm.get('email')?.invalid && this.postForm.get('email')?.touched; }

  get imageUrlValidate() { return this.postForm.get('imageUrl')?.invalid && this.postForm.get('imageUrl')?.touched; }

  
  async createPost(){
    console.log(this.postForm.invalid);
    if (this.postForm.invalid) {
       Object.values(this.postForm.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log(this.postForm.value);
      console.log("Formulario invalido");
      return;
    }
    try {
      console.log(this.postForm.value);
      const response = await this.postService.createPost(this.postForm.value);
      if (response) {
        this.loginAlert = true;
        this.error = false;
        this.errorMesage = [];
        this.errorMesage.push("Post creado exitosamente");
      }
    } catch (error: any) {
      console.log(error);
      this.error = true;
      this.errorMesage = error.errors;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
