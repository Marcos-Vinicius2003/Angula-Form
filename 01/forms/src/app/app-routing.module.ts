
import { TemplateFormComponent } from '../template-form/template-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataFormComponent } from 'src/data-form/data-form.component';


const routes: Routes = [
  { path: 'templateForm', component: TemplateFormComponent },
  { path: 'dataForm', component: DataFormComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dataForm' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
