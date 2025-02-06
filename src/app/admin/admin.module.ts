import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { UsersListComponent } from './users-list/users-list.component';
import { MessageComponent } from './message/message.component';
import { ManagePrdouctComponent } from './manage-prdouct/manage-prdouct.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OrderListComponent } from './order-list/order-list.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../pipes/search.pipe';
import { Fluid } from 'primeng/fluid';
import { TextareaModule } from 'primeng/textarea';
import { InputNumber } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent,
    UsersListComponent,
    MessageComponent,
    ManagePrdouctComponent,
    SidebarComponent,
    OrderListComponent,
    
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    SearchPipe,
    Fluid, 
    TextareaModule,
    InputNumber
  ]
})
export class AdminModule { }
