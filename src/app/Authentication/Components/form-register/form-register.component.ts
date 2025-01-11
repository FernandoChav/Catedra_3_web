import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { LocalStorageService } from '../../Services/local-storage.service';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.css'
})
export class FormRegisterComponent {
  router = inject(Router);
  authService = inject(AuthService);
  storageService = inject(LocalStorageService);
  form! : FormGroup;
  RegisterAlert: boolean = false;
  error : boolean = false;
  errorMesage : string[] = [];

  constructor(private fb : FormBuilder) {
    this.formulario();
  }
  formulario(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  };

  get emailValidate() { return this.form.get('email')?.invalid && this.form.get('email')?.touched; }

  get passwordValidate() { return this.form.get('password')?.invalid && this.form.get('password')?.touched; }

  async register(){
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      return;
    }
    try {
      const response = await this.authService.register(this.form.value);
      if (response.$id != "") {
        this.RegisterAlert = true;
        this.error = false;
        this.errorMesage = [];
        this.errorMesage.push("Registro exitoso");

        if (response.$id != "") {
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 2000);
        }
      }
    } catch (error: any) {
      console.log(error);
      this.error = true;
      this.errorMesage = error.error;
    }
  }
}
