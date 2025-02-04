import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-whishlist',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './whishlist.component.html',
  styleUrl: './whishlist.component.css'
})
export class WhishlistComponent {

  wishlist:any = []
  numberOfItem:number = 0

  constructor(private api:ApiService){}

  ngOnInit(){
    this.getAllWishlist()
  }

  getAllWishlist(){
    this.api.getAllWishlist().subscribe((res:any)=>{
      this.wishlist = res
      // console.log(this.wishlist);
      this.numberOfItem = this.wishlist.length
      
    })
  }

  removeFromWishlist(id:string){
    this.api.removeProductWishlistApi(id).subscribe((res:any)=>{
      this.getAllWishlist()
    })
    
  }

}
