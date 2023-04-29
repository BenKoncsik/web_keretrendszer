import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../shared/models/User";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  public users: User[] = [];
  public selectedUser: User[] = [];
  public searchControl: FormControl<any> = new FormControl();
  public filteredUsers: Observable<User[]>;
  private loggedUser: User = JSON.parse(localStorage.getItem('user') as string);
  @ViewChild('auto') auto!: ElementRef;


  constructor(private userService: UserService) {
    this.filteredUsers = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUsers(value))
    );
  }



  selectItem(item: User) {
    if (!this.selectedUser.includes(item)) {
      this.selectedUser.push(item);
      this.searchControl.reset('');
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedValue: User = event.option.value as User;
    if (!this.selectedUser.includes(selectedValue)) {
      this.selectedUser.push(selectedValue);
      setTimeout(() => {
        this.searchControl.reset(null);
        this.searchControl.setValue(null)
      }, 0);
      this.searchControl.clearValidators();

    }
  }

  private _filterUsers(value: string): User[] {
    const filterValue: string = value.toLowerCase();
    return this.users.filter(user =>
      (user.email.toLowerCase().includes(filterValue) ||
        user.name.toLowerCase().includes(filterValue)) &&
      !this.selectedUser.includes(user)
    );
  }

  ngOnInit(): void {
    this.userService.getAll().subscribe(user => {
      this.users = user.filter(u => u.email != this.loggedUser.email);
    });


  }

  displayUser(user: User): string {
    return user ? user.name + " - " + user.email : '';
  }
}
