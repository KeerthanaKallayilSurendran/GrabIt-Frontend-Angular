import { Component, Input } from '@angular/core';
import { productModel } from '../Model/productModel';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-prdouct',
  templateUrl: './manage-prdouct.component.html',
  styleUrl: './manage-prdouct.component.css',
})
export class ManagePrdouctComponent {
  @Input() id !: string
  productDetails: productModel = {};

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(){
    if(this.id){
      this.getProductDetails()
    }
  }

  addProduct() {
    console.log(this.productDetails);
    if (
      this.productDetails.title &&
      this.productDetails.description &&
      this.productDetails.price &&
      this.productDetails.returnPolicy &&
      this.productDetails.thumbnail
    ) {
      this.api.addProductApi(this.productDetails).subscribe({
        next: (res: any) => {
          alert('Product Add Successfully');
          this.productDetails = {};
          this.router.navigateByUrl('/admin/product');
          console.log(this.productDetails);
        },
        error: (reason: any) => {
          alert(reason.error);
          this.productDetails = {};
        },
      });
    } else {
      alert('Please fill the form Completely');
    }
  }

  getProductDetails(){
      this.api.viewProductApi(this.id).subscribe((res:any)=>{
        this.productDetails = res
        console.log(this.productDetails);
      })
  }

  editProduct(){
    this.api.updateProductApi(this.id, this.productDetails).subscribe((res:any)=>{
      alert("Product Update Successfully")
      this.productDetails = {}
      this.router.navigateByUrl('/admin/product')
    })
  }

}
