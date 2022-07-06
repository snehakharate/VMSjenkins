import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchVal: any): any {
    return value.filter((search :any) =>
    search.vName.toLowerCase().indexOf(searchVal) > -1 ||
    search.empName.toLowerCase().indexOf(searchVal) > -1 ||
    search.vMobile.toLowerCase().indexOf(searchVal) > -1 ||
    search.vPov.toLowerCase().indexOf(searchVal) > -1) 
 
  }

}
