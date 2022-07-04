import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'history'
})
export class HistoryPipe implements PipeTransform {

  transform(value: any, searchVal: any) {
    return value.filter(function(search :any){
      return search.vDate.toLowerCase().indexOf(searchVal.toLowerCase()) > -1
    })

    return value.filter(function(search :any){
      return search.vMobile.toLowerCase().indexOf(searchVal.toLowerCase()) > -1
    })
    
  }

  

}


