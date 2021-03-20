import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';
import { HomeRoutingModule } from './home-routing.module';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';


@NgModule({
  declarations: [ListComponent, DetailComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NzTableModule,
    NzSelectModule,
    FormsModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzFormModule
  ]
})
export class HomeModule { }
