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
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './form-post.component.html',
  styleUrl: './form-post.component.css',
})
export class FormPostComponent {
  router = inject(Router);
  postService = inject(PostService);
  postForm!: FormGroup;
  private storageService = inject(LocalStorageService);
  loginAlert = false;
  error = false;
  errorMesage: string[] = [];
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder) {
    this.formulario();
  }

  formulario() {
    const userEmail = this.storageService.getVar('email');
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(5)]],
      email: [{ value: userEmail, disabled: true }, [Validators.required, Validators.email]], // Campo deshabilitado
      imageUrl: [null, [Validators.required]],
    });
  }

  get titleValidate() {
    return this.postForm.get('title')?.invalid && this.postForm.get('title')?.touched;
  }

  get imageUrlValidate() {
    return this.postForm.get('imageUrl')?.invalid && this.postForm.get('imageUrl')?.touched;
  }

  async createPost() {
    if (this.postForm.invalid) {
      Object.values(this.postForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    const formData = new FormData();
    formData.append('title', this.postForm.get('title')?.value);
    formData.append('email', this.storageService.getVar('email'));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    try {
      const response = await this.postService.createPost(formData);
      this.loginAlert = true;
      this.error = false;
      this.errorMesage = ['Post creado exitosamente.'];
    } catch (error: any) {
      this.error = true;
      this.errorMesage = error.errors || ['Ocurrió un error al crear el post.'];
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
