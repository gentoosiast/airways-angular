import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly uniquePrefix = 'sparkteam-';

  get<T>(key: string): T | null {
    const item = localStorage.getItem(this.getKey(key));

    return item ? JSON.parse(item) : item;
  }

  set<T>(key: string, value: T) {
    localStorage.setItem(this.getKey(key), JSON.stringify(value));
  }

  delete(key: string) {
    localStorage.removeItem(this.getKey(key));
  }

  private getKey(key: string) {
    return `${this.uniquePrefix}${key}`;
  }
}
