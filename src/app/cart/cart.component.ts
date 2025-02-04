import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../service/api.service';
import { Router, RouterLink } from '@angular/router';
import { count } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cart: any = [];
  numberOfItems: number = 0;
  totalPrice: number = 0;
  itemPrice: number = 0;
  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.getAllCart();
  }

  getAllCart() {
    this.api.getAllCart().subscribe((res: any) => {
      this.cart = res;
      // console.log(this.cart);
      this.numberOfItems = this.cart.length;
      this.totalPrice = this.cart
        .map((item: any) => item.price * item.count)
        .reduce((a: any, b: any) => a + b, 0);
      // console.log(this.totalPrice);
    });
  }

  decrementCount(item: any) {
    if (item.count > 1) {
      const updateCount = item.count - 1;
      this.updateProductCount(item._id, updateCount);
    }
  }
  incrementCount(item: any) {
    const updateCount = item.count + 1;

    this.updateProductCount(item._id, updateCount);
  }
  updateProductCount(productId: string, count: number) {
    this.api
      .updateProductCountApi(productId, { count })
      .subscribe((res: any) => {
        this.getAllCart();
      });
  }
  emptyCart() {
    this.api.emptyCartProudctsApi().subscribe((res: any) => {
      alert('Your Cart is Empty');
      this.getAllCart();
    });
  }

  removeProductFromCart(id: string) {
    this.api.removeProductCartApi(id).subscribe((res: any) => {
      alert('Remove Product from Cart');
      this.getAllCart();
    });
  }
  addToWishlist(id: string, item: any) {
    this.api.addToWishlist(id, item).subscribe({
      next: (res: any) => {
        alert('Product Added Successfully');
        this.router.navigateByUrl('/wishlist');
      },
      error: (reason: any) => {
        alert(reason.error);
      },
    });
  }
  toPlaceOrder() {
    
    this.router.navigate(['/checkout'],{state:{data:this.cart}})
  }
}
