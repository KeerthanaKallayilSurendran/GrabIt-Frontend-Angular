import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent {
  allOrders:any = []
  
  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllOrders()
  }

  getAllOrders(){
    this.api.getAllOrderApi().subscribe({
      next:(res:any)=>{
        console.log(res);
        this.allOrders = res
      }
    })
  }

}
