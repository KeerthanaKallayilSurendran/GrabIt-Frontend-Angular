import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { WhishlistComponent } from './whishlist/whishlist.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { OrdersComponent } from './orders/orders.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { ContactpageComponent } from './contactpage/contactpage.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  // lazy loading admin
  {
    path:'admin',
    canActivate: [authGuard],
    loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },
  // http://localhost:4200/
  {
    path: '',
    component: HomeComponent,
    title: 'Home Page',
  },
  // http://localhost:4200/about
  {
    path: 'about',
    component: AboutComponent,
    title: 'About Page',
  },
  // http://localhost:4200/contact
  {
    path: 'contact',
    component: ContactpageComponent,
    title: 'Contact Page',
  },
  // http://localhost:4200/register
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register Page',
  },
  // http://localhost:4200/login
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login Page',
  },
  // http://localhost:4200/profile
  {
    path: 'profile',
    canActivate: [authGuard],
    component: ProfileComponent,
    title: 'Profile Page',
    
  },
  // http://localhost:4200/:categories/all-products
  {
    path: 'all-products',
    canActivate: [authGuard],
    component: CategoriesComponent,
    title: 'Categories',
  },
  // http://localhost:4200/products/:id/view
  {
    path: 'products/:id/view',
    canActivate: [authGuard],
    component: ProductsComponent,
    title: 'Products View',
  },
  // http://localhost:4200/wishlist
  {
    path: 'wishlist',
    canActivate: [authGuard],
    component: WhishlistComponent,
    title: 'Wishlist Page',
  },
  // http://localhost:4200/viewcart
  {
    path: 'viewcart',
    canActivate: [authGuard],
    component: CartComponent,
    title: 'Cart Page',
  },
  // http://localhost:4200/chekout
  {
    path: 'checkout',
    canActivate: [authGuard],
    component: CheckoutComponent,
    title: 'Checkout Page',
  },
  // http://localhost:4200/orders
  {
    path: 'orders',
    canActivate: [authGuard],
    component: OrdersComponent,
    title: 'Orders Page',
  },
  // http://localhost:4200/**
  {
    path: '**',
    component: PagenotfoundComponent,
    title: 'Page not Found',
  },
];
