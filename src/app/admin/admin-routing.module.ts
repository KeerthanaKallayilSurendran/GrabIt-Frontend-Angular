import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MessageComponent } from './message/message.component';
import { ManagePrdouctComponent } from './manage-prdouct/manage-prdouct.component';
import { OrderListComponent } from './order-list/order-list.component';

const routes: Routes = [
  // http://localhost:4200/admin
  {
    path: '',
    component: DashboardComponent,
    title: 'Admin Dashboard',
  },
  {
    path: 'product',
    component: ProductComponent,
    title: 'Product List',
  },
  {
    path: 'user-list',
    component: UsersListComponent,
    title: 'User List',
  },
  {
    path: 'message',
    component: MessageComponent,
    title: 'Messages',
  },
  {
    path:'product/add',
    component:ManagePrdouctComponent,
    title:"Add Product"
  },
  {
    path:'product/:id/edit',
    component:ManagePrdouctComponent,
    title:"Edit Product"
  },
  {
    path:'order-list',
    component:OrderListComponent,
    title:"Order List"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
