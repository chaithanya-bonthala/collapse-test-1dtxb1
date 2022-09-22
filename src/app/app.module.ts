import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {CollapseComponent} from './collapse/collapse.component'

@NgModule({
  imports:      [ BrowserModule, FormsModule,BrowserAnimationsModule ],
  declarations: [ AppComponent, HelloComponent,CollapseComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
