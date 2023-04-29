import {NgModule, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import {ActivatedRoute} from "@angular/router";
import {MatListModule} from "@angular/material/list";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { ChatMenuComponent } from './chat-menu/chat-menu.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ExtendedModule} from "@angular/flex-layout";
import { SettingsComponent } from './settings/settings.component';
import { MessageComponent } from './message/message.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    ChatComponent,
    ChatMenuComponent,
    SettingsComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    ExtendedModule,
    MatTabsModule,
    MatDialogModule,
    MatCardModule
  ]
})
export class ChatModule{



}
