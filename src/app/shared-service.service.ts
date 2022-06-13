import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  userId = '';
  constructor(public storService: StorageService) { }

  set(userId: string){
    this.storService.set('userId',userId);
  }

  get(key:string){
    return this.storService.get(key)
  }
  

}
