import { FormDebugComponent } from './shared/form-debug/form-debug.component';
import { TemplateFormComponent } from '../template-form/template-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataFormModule } from 'src/data-form/data-form.module';

@NgModule({
  declarations: [
    AppComponent,
    TemplateFormComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    DataFormModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
