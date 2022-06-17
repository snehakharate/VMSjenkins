import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import * as htmlToImage from 'html-to-image';

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

  convertDataUrlToBlob(dataUrl: any): Blob {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], {type: mime});
  }

  htmlPng(gatePass: any){
    htmlToImage.toJpeg(gatePass)
  .then(function (dataUrl) {
    var link = document.createElement('a');
    link.download = 'U-SMART-Gate Pass.jpeg';
    link.href = dataUrl;
    link.click();
  })
  .catch(function (error) {
    console.error('oops, something went wrong!', error);
  });
  }


}
