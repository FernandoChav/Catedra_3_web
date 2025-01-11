import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../../Services/local-storage.service';
import e from 'express';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.css'
})
export class FormLoginComponent {
  router = inject(Router);
  authService = inject(AuthService);
  form! : FormGroup;
  private storageService = inject(LocalStorageService);
  loginAlert: boolean = false;
  error : boolean = false;
  errorMesage : string[] = [];

  constructor(private fb: FormBuilder) {
    this.formulario();
  }
  formulario(){
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] 
    });
  }
  get emailValidate() { return this.form.get('email')?.invalid && this.form.get('email')?.touched; }

  get passwordValidate() { return this.form.get('password')?.invalid && this.form.get('password')?.touched; }

  async login(){
    console.log(this.form.invalid);
    if (this.form.invalid) {
       Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
      console.log(this.form.value);
      console.log("Formulario invalido");
      return;
    }
    try {
      console.log(this.form.value);
      const response = await this.authService.login(this.form.value);
      
      

      if (response.token != "") {
        this.storageService.setVar('token', response.token);
        this.storageService.setVar('email', response.email);
        this.loginAlert = true;
        this.error = false;
        this.errorMesage = [];
        this.errorMesage.push("Login exitoso");

        // Retarda la redirección para que el usuario vea el mensaje
        setTimeout(() => {
          if (this.storageService.getVar('token') != "") {
            this.router.navigate(['home']);
          } else {
            this.router.navigate(['']);
          }
        }, 2000);

      } 
    } catch (error: any) {
      console.log(error);
      if (error.status === 401) {
        this.error = true;
        this.loginAlert = false;
        this.errorMesage = [error.error.message]; // Mensaje específico del backend
      } else {
        // Si es un error no esperado, muestra un mensaje genérico
        this.error = true;
        this.loginAlert = false;
        this.errorMesage = ["Error interno del servidor"];
      }
    }
  }
  clearPassword() {
    this.form.controls['password'].setValue('');
  }
}
