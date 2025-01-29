import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TieredMenu } from 'primeng/tieredmenu';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, TieredMenu, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
  isLoggedin: boolean = false;
  loginUsername: string = '';
  homeButton: MenuItem[] | undefined;

  ngOnInit() {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {
      this.isLoggedin = true;
      this.loginUsername = JSON.parse(
        sessionStorage.getItem('user') || ''
      ).username;
    } else {
      this.isLoggedin = false;
      this.loginUsername = '';
    }

    this.items = [
      {
        label: 'All Products',
        icon: 'pi pi-shop',
        routerLink: '/all-products',
      },
      {
        label: 'Wishlist',
        icon: 'pi pi-heart',
        routerLink: '/wishlist',
      },
      {
        label: 'Cart',
        icon: 'pi pi-shopping-cart',
        routerLink: '/viewcart',
      },
      {
        label: 'Orders',
        icon: 'pi pi-box',
        routerLink: '/orders',
      },
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/profile',
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        },
      },
    ];

    this.homeButton = [
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        routerLink: '/login',
      },
      {
        label: 'Register',
        icon: 'pi pi-user-plus',
        routerLink: '/register',
      },
    ];
  }

  constructor(private router: Router) {}

  logout() {
    sessionStorage.clear();
    localStorage.clear();
    this.isLoggedin = false;
    this.loginUsername = '';
    this.router.navigateByUrl('/');
  }
}
