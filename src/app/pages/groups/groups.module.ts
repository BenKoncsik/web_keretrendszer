import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { NewGroupComponent } from './new-group/new-group.component';
import { ListGroupComponent } from './list-group/list-group.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    GroupsComponent,
    NewGroupComponent,
    ListGroupComponent
  ],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatAutocompleteModule,
    NgMultiSelectDropDownModule,
    MatSelectModule,
    MatChipsModule,
    MatLegacyChipsModule,
    MatCardModule
  ]
})
export class GroupsModule { }
