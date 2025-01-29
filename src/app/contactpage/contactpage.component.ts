import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TextareaModule } from 'primeng/textarea';
import { ApiService } from '../service/api.service';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-contactpage',
  standalone: true,
  imports: [InputTextModule, FormsModule, CardModule, ButtonModule, TextareaModule, ReactiveFormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contactpage.component.html',
  styleUrl: './contactpage.component.css'
})
export class ContactpageComponent {
  testimonyForm:FormGroup
  constructor(private fb:FormBuilder, private api:ApiService){
    this.testimonyForm = this.fb.group({
      name: ["",[Validators.required, Validators.pattern("[A-Za-z ]*")]],
      email: ["",[Validators.required, Validators.email]],
      phone: ["",[Validators.required, Validators.pattern("[0-9]*")]],
      message: ["",[Validators.required, Validators.pattern("[A-Za-z0-9 ]*")]],
    })
  }
  addTestimony(){
    if(this.testimonyForm.valid){
      const name = this.testimonyForm.value.name
      const email = this.testimonyForm.value.email
      const phone = this.testimonyForm.value.phone
      const message = this.testimonyForm.value.message
      // alert(`${name}, ${email}, ${phone}, ${message}`)
      this.api.addTestimonyApi({name,email,phone,message}).subscribe((res:any)=>{
        alert("Thank You for Your Response")
        this.testimonyForm.reset()
      })
    }else{
      alert("Invalid Form")
    }
  }
 
}
