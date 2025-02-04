import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userForm!: FormGroup;

  user: any = {};
  ngOnInit() {
    this.getuser();
  }
  constructor(private api: ApiService, private fb: FormBuilder) {}
  getuser() {
    this.api.getUserDetailsApi().subscribe({
      next: (res: any) => {
        this.user = res;
        this.initializeData();
      },
    });
  }

  initializeData() {
    this.userForm = this.fb.group({
      firstname: [this.user.firstname || ''],
      lastname: [this.user.lastname || ''],
      username: [this.user.username || ''],
      email: [this.user.email || ''],
      mobilenumber: [this.user.mobilenumber || ''],
      housename: [this.user.address?.country || ''],
      street: [this.user.address?.street || ''],
      city: [this.user.address?.city || ''],
      state: [this.user.address?.state || ''],
      postalcode: [this.user.address?.postalCode || ''],
    });
  }

  updateUser() {
    const userData = this.userForm.value;
    const updatedUserData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email,
      mobilenumber: userData.mobilenumber,
      address: {
        street: userData.street,
        country: userData.housename, // Ensure this matches the backend schema
        city: userData.city,
        state: userData.state,
        postalCode: userData.postalcode,
      },
    };
    this.api.updateUserDetailsApi(updatedUserData).subscribe({
      next: (res: any) => {
        alert('Update Successfully');
      },
    });
  }
}
