import { Component, Input } from '@angular/core';
import { Value } from '../../Interfaces/Value';
import { NgModule } from '@angular/core';



import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-card-post',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './card-post.component.html',
  styleUrl: './card-post.component.css'
})
export class CardPostComponent {
  @Input() post!: Value;
}
