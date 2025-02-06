import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  searchProduct: string = '';
  allProduct: any = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.getAllProducts();
  }

  getAllProducts() {
    this.api.getAllProductsApi().subscribe({
      next: (res: any) => {
        this.allProduct = res;
      },
    });
  }

  deleteProduct(id: any) {
    this.api.deleteProductApi(id).subscribe((res: any) => {
      alert('Product Deleted');
      this.getAllProducts();
    });
  }
}
