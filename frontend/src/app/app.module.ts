import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routes'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArrayPipe } from './pipes/array.pipe';
import { CeilPipe } from './pipes/ceil.pipe';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    ArrayPipe,
    CeilPipe,
    RouterModule
  ],
})
export class AppModule { }
