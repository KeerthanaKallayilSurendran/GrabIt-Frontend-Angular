import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../service/api.service';

declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    InputTextModule,
    TextareaModule,
    Select,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  chekoutForm: FormGroup;
  itemDetails: any = [];
  cities: any = [];
  totalPrice: number = 0;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private api: ApiService
  ) {
    const navigation = this.router.getCurrentNavigation();
    this.itemDetails = navigation?.extras.state?.['data'];
    this.chekoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      phonenumber: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      pincode: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      address: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]*')]],
      locality: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      city: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      state: ['', [Validators.required]],
    });
  }
  ngOnInit() {
    this.cities = [
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
    ];
    this.totalPrice = this.itemDetails
      .map((item: any) => item.price * item.count)
      .reduce((a: any, b: any) => a + b, 0);
    console.log(this.totalPrice);
    console.log(this.itemDetails);
  }

  checkoutOrder() {
    const orderData = {
      ...this.chekoutForm.value,
      itemDetails: this.itemDetails,
      amount: this.totalPrice * 100,
      currency: 'INR',
      receipt: `receipt_${Math.random()}`,
    };
    this.api.checkoutProductOrderApi(orderData).subscribe({
      next: (res: any) => {
        console.log(orderData);
        this.startRazorpayPayment(res);
      },
      error: (reason: any) => {
        console.log(reason.error);
        alert('Payment failed. Please try again.');
      },
    });
  }

  startRazorpayPayment(order: any) {
    const options = {
      key: 'rzp_test_4Y2LrH0EuP5gQn', 
      amount: order.amount,
      currency: order.currency,
      name: 'GrabIt',
      description: 'Product Purchase',
      order_id: order.id, 
      handler: (response: any) => {
        const paymentData = {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        };
        this.api.paymentValidationApi(paymentData).subscribe({
          next:(res:any)=>{
            alert(res)
            this.itemDetails = []
            this.router.navigateByUrl('/')
          }
        });
      },
      prefill: {
        name: this.chekoutForm.value.name,
        email: 'test@example.com',
        contact: this.chekoutForm.value.phonenumber,
      },
      theme: {
        color: '#3399cc',
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  }
}
