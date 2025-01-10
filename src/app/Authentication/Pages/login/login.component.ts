import { Component, OnInit } from '@angular/core';
import { FormLoginComponent } from "../../Components/form-login/form-login.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLoginComponent,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  {
  
}