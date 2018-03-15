import { NgModule } from '@angular/core';
import { ImportComponent } from './import.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    ImportComponent
  ]
})
export class ImportModule {}
