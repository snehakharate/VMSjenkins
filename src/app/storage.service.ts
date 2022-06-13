import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public set(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  public get(key: string) {
    return localStorage.getItem(key);
  }

  public erase() {
    localStorage.clear();
  }
}
