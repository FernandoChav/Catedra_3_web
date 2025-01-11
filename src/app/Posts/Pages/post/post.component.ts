import { Component } from '@angular/core';
import { FormPostComponent } from "../../Components/form-post/form-post.component";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [FormPostComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

}
