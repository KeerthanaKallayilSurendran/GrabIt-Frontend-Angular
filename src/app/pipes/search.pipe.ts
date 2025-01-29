import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(allProducts:any[], searchKey:string): any[] {
    let result:any = []
    if(!allProducts || searchKey==''){
      return allProducts
    }
    result = allProducts.filter((item:any)=>item.title.toLowerCase().includes(searchKey.toLocaleLowerCase()))
    return result
    
  }

}
