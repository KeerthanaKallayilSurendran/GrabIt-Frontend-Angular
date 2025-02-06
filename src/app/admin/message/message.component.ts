import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  allMessage:any = []

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllMessage()
  }

  getAllMessage(){
    this.api.getAllMessageApi().subscribe({
      next:(res:any)=>{
        this.allMessage = res
      }
    })
  }
}
