import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userForm:FormGroup

  constructor(private fb:FormBuilder, private api:ApiService, private router:Router){
    this.userForm = this.fb.group({
      username: ["", [Validators.required, Validators.pattern("[a-zA-Z]*")]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
    })
  }

  addUser(){
    if(this.userForm.valid){
      const username = this.userForm.value.username
      const email = this.userForm.value.email
      const password = this.userForm.value.password
      this.api.addUserApi({username, email, password}).subscribe({
        next:(res:any)=>{
          alert(`Welcome ${username}. Please Login to Purchase Your Products`)
          this.router.navigateByUrl('/login')
          this.userForm.reset()
        },
        error:(reason:any)=>{
          alert(reason.error)
          this.userForm.reset()
        }
      })
    }else{
      alert("Invalid Form")
    }
  }
}
