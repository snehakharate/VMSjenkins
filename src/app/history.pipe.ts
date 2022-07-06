import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'history'
})
export class HistoryPipe implements PipeTransform {

  transform(value: any, searchVal: any): any {
    // return value.filter(function(search :any){
    //   search.vDate.toLowerCase().indexOf(searchVal.toLowerCase()) > -1 ||
    //   search.vName.toLowerCase().indexOf(searchVal.toLowerCase()) > -1
    // })  

    if(searchVal != ""){

    console.log(searchVal)
    const search1 = searchVal.split('-')
    if(search1[1] == "01"){
      search1[1] = "Jan"
    }
    else if(search1[1] == "02"){
      search1[1] = "Feb"
    }
    else if(search1[1] == "03"){
      search1[1] = "Mar"
    }
    else if(search1[1] == "04"){
      search1[1] = "Apr"
    }
    else if(search1[1] == "05"){
      search1[1] = "May"
    }
    else if(search1[1] == "06"){
      search1[1] = "Jun"
    }
    else if(search1[1] == "07"){
      search1[1] = "Jul"
    }
    else if(search1[1] == "08"){
      search1[1] = "Aug"
    }
    else if(search1[1] == "09"){
      search1[1] = "Sep"
    }
    else if(search1[1] == "10"){
      search1[1] = "Oct"
    }
    else if(search1[1] == "11"){
      search1[1] = "Nov"
    }
    else if(search1[1] == "12"){
      search1[1] = "Dec"
    }
    const newSearch = []
    newSearch[0] = search1[1]
    newSearch[1] = search1[2]
    newSearch[2] = search1[0]
    searchVal = ''
    for(let i=0;i<3;i++){
        searchVal = searchVal + newSearch[i] + " "
    }
    searchVal = searchVal.toLowerCase()
    console.log(searchVal)
  }
  
    return value.filter((search :any) =>
    search.vDate.toLowerCase().indexOf(searchVal) > -1)
 
  }
  

}


