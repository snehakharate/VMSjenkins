import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  userId = '';
  constructor(public storService: StorageService) { }

  set(key: string,userId: string){
    this.storService.set(key,userId);
  }

  get(key:string){
    return this.storService.get(key)
  }

  erase(){
    this.storService.erase();
  }

}
