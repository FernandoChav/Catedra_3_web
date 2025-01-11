import { Component } from '@angular/core';
import { FormRegisterComponent } from "../../Components/form-register/form-register.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormRegisterComponent,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
