import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import {ActivatedRoute} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatListModule,
    MatInputModule,
    FormsModule
  ]
})
export class ChatModule{



}
