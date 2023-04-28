import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import {MatCardModule} from "@angular/material/card";
import {FirestoreDatePipe} from "../../shared/pipes/firestore-date-pipe.pipe";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  declarations: [
    MainComponent,
    FirestoreDatePipe
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MatCardModule,
    FlexLayoutModule
  ]
})
export class MainModule {
  constructor() {
    console.log("Main")
  }
}
