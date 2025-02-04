import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiService } from '../service/api.service';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FooterComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  newProducts: any = [];
  topProducts: any = [];

  ngOnInit() {
    this.getAllProducts();
  }

  constructor(private api: ApiService) {}
  getAllProducts() {
    this.api.getAllProductsApi().subscribe((res: any) => {
      this.newProducts = res.slice(res.length - 8);
      // console.log(this.newProducts);
      this.topProducts = res.slice(0, 8);
      // console.log(this.topProducts);
    });
  }
  viewProduct() {}
}
