import { Component, inject } from '@angular/core';
import { Value } from '../../Interfaces/Value';
import { Router } from '@angular/router';
import { CardPostComponent } from "../../Components/card-post/card-post.component";
import { CommonModule } from '@angular/common';
import { PostService } from '../../Services/post.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardPostComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  posts: Value[] = []; 
  postService = inject(PostService);
  constructor(private router: Router) {}

  navigateToCreatePost(): void {
    this.router.navigate(['post']); // Cambia la ruta según tu configuración
  }

  async ngOnInit() {
    this.postService.getPosts().then((response) => {
      console.log('La respuesta es: ', response);
      this.posts = response.$values;
      console.log('Post cargados', this.posts);
    }).catch((error) => {
      console.log('Error al cargar los posts', error);
    });
  }
}
