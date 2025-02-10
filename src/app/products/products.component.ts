import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink,
    Dialog,
    InputTextModule,
    DatePicker,
    FormsModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  review: any = {
    rating: '',
    comment: '',
    date: '',
    reviewerName: '',
    reviewerEmail: '',
  };
  allRelatedProducts: any = [];
  product: any = {};
  numberofReviews: number = 0;
  productId: string = '';
  isTokenAvailable: boolean = false;
  visible: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}
  ngOnInit() {
    this.isTokenAvailable = !!sessionStorage.getItem('token');
    this.route.params.subscribe((res: any) => {
      this.productId = res.id;
      console.log(this.productId);
      this.getProductDetails(this.productId);
    });
  }

  showDialog() {
    this.visible = true;
  }

  getProductDetails(productId: string) {
    this.api.viewProductApi(productId).subscribe((res: any) => {
      this.product = res;
      // console.log(this.product);
      // console.log(this.product.reviews);

      // this.numberofReviews = this.product.reviews.length;
      // console.log(this.numberofReviews);
      this.getAllRelatedProdutcs(this.product.category);
    });
  }

  getAllRelatedProdutcs(category: string) {
    this.api.relatedProductApi(category).subscribe((res: any) => {
      if (res.length > 1) {
        this.allRelatedProducts = res.filter(
          (item: any) => item.title != this.product.title
        );
        // console.log(this.allRelatedProducts);
      } else {
        this.allRelatedProducts = [];
      }
    });
  }
  addWishlist() {
    this.api.addToWishlist(this.productId, this.product).subscribe({
      next: (res: any) => {
        alert('Product Added Successfully');
        this.router.navigateByUrl('/wishlist');
      },
      error: (reason: any) => {
        alert(reason.error);
      },
    });
  }

  addCart() {
    this.api.addToCartApi(this.productId, this.product).subscribe({
      next: (res: any) => {
        alert('Product Added Successfully');
        this.router.navigateByUrl('/viewcart');
      },
      error: (reason: any) => {
        alert(reason.error);
      },
    });
  }

  addReview() {
    this.api.addReviewApi(this.productId, this.review).subscribe((res: any) => {
      alert('Thank you for Your Review');
      this.getProductDetails(this.productId);
      this.review = {};
      this.visible = false;
    });
  }
}
