import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SharedModule } from './../app/shared/shared.module';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { DataFormComponent } from './data-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DataFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ]
})
export class DataFormModule { }
