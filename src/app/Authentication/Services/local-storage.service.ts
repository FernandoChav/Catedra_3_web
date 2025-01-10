import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  /**
   * Set a new value to loal storege
   * @param key the key
   * @param value the value
   */

  setVar(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get value from local storage
   * @param key the key
   * @returns the value
   */

  getVar(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  /**
   * Remove a value from local storage
   * @param key the key for remove
   */

  removeVar(key: string) {
    localStorage.removeItem(key);
  }

  /**
   * Delete many elements from local storage
   * @param keys the keys
   */

  deleteMany(...keys : string[]) {
      keys.forEach(key => this.removeVar(key));
  }
}
