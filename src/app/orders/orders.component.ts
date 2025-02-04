import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../service/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent {
  orderDetails:any = [];
  numberOfItems:number = 0
  constructor(private api:ApiService, private http:HttpClient){}
  ngOnInit(){
    this.getAllOrders()
  }
  getAllOrders(){
    this.api.getAllOrderDetailsApi().subscribe({
      next:(res:any)=>{
        this.orderDetails = res
        this.numberOfItems = res.length
      }
    })
  }
}
