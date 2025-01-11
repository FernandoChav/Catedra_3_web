import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../envarioment';
import { firstValueFrom } from 'rxjs';
import { GetAllPostResponse } from '../Interfaces/GetAllResponse';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private baseUrl = '';

  private http = inject(HttpClient);
  constructor() { 
    this.baseUrl = enviroment.apiUrl;
   
  }

  async getPosts(): Promise<GetAllPostResponse> {
    try {
      const response = await firstValueFrom(this.http.get<GetAllPostResponse>(`${this.baseUrl}api/posts`));
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createPost(post: any): Promise<any> {
    try {
      const response = await firstValueFrom(this.http.post(`${this.baseUrl}api/posts`, post));
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
