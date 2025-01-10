import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../../envarioment';
import { TokenResponse } from '../Interfaces/TokenResponse';
import { firstValueFrom } from 'rxjs';
import { RegisterResponse } from '../Interfaces/RegisterResponse';
import { resolve } from 'path';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = '';

  /**
   * The HTTP Handler
   */

  private http = inject(HttpClient);

  constructor() { 
    this.baseUrl = enviroment.apiUrl;
  }

  /**
   * Make a authentication requets using http 
   * @param form a set information for make the authenticaiton
   * @returns  a response about if the authentication is succesful 
   */

  async login(form : any): Promise<TokenResponse> {
    try {
      const response = await  firstValueFrom(this.http.post<TokenResponse>(`${this.baseUrl}api/auth/login`, form));
      return Promise.resolve(response);
    }
    catch (error) {
      return Promise.reject(error);
    }
    
  }

  /**
   * Register a new user from data
   * @param form the data for register
   * @returns a boolean if registered sucessful or no
   */

  async register(form: any): Promise<RegisterResponse> {
    try {
        const response = await firstValueFrom(this.http.post<RegisterResponse>(`${this.baseUrl}/api/register`, form));
        return Promise.resolve(response) 
      // Devuelve true si la respuesta es "OK".
    } catch (error) {
      return Promise.reject(error); // Maneja errores.
    }
  }
}
