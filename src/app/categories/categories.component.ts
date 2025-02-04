import { Component } from '@angular/core';
import { ApiService } from '../service/api.service';
import { SearchPipe } from '../pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'
import { Router } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [SearchPipe, FormsModule, NgxPaginationModule, FooterComponent, HeaderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {

  p: number = 1;
  searchKey:string = ''
  allProducts:any = []
  categoriesArray:any = []
  dummyAllProducts:any = []

  ngOnInit(){
    this.getAllProducts()
  }
  constructor(private api:ApiService, private router:Router){}

  getAllProducts(){
    this.api.getAllProductsApi().subscribe((res:any)=>{
      this.allProducts = res
      this.dummyAllProducts = this.allProducts
      this.allProducts.forEach((product:any)=>{
        !this.categoriesArray.includes(product.category) && this.categoriesArray.push(product.category)
      })
      // console.log(this.allProducts);
      // console.log(this.categoriesArray);
    })
  }

  getProdctsByCategory(key:string, value:string){
    this.api.getAllProductsApi().subscribe((res:any)=>{
      this.allProducts = this.dummyAllProducts.filter((item:any)=>item[key].includes(value))

    })
  }

  viewProduct(productId:string){
    this.router.navigateByUrl(`/products/${productId}/view`)
  }



}
