import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import { CustomDatePipePipe } from '../../shared/pipes/custume-date.pipe';
import { MessageWallComponent } from './message-wall/message-wall.component'
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UserNameByEmailPipe} from "../../shared/pipes/user-name-by-email.pipe";

@NgModule({
  declarations: [
    MainComponent,
    CustomDatePipePipe,
    UserNameByEmailPipe,
    MessageWallComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class MainModule {
  constructor() {
    console.log("Main")
  }
}
