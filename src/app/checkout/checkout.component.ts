import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    InputTextModule,
    TextareaModule,
    Select,
    ButtonModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent {
  reqBody: any = [];
  cities: any = [];
  totalPrice:number = 0
  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.reqBody = navigation?.extras.state?.['data'];
  }
  ngOnInit() {
    this.cities = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal"
    ];
    this.totalPrice = this.reqBody
        .map((item: any) => item.price * item.count)
        .reduce((a: any, b: any) => a + b, 0);
      console.log(this.totalPrice);
    console.log(this.reqBody);
  }
}
