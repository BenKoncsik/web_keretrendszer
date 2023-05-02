import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../shared/models/User";
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {UserService} from "../../../shared/services/user.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit{

  @Input() public users: User[] = [];
  public searchControl: FormControl<any> = new FormControl();
  public filteredUsers: Observable<User[]>;
  private loggedUser: User = JSON.parse(localStorage.getItem('user') as string);
  @ViewChild('auto') auto!: ElementRef;


  constructor(private userService: UserService, private router: Router) {
    this.filteredUsers = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUsers(value))
    );
  }


  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedValue: User = event.option.value as User;
    if (this.loggedUser !== selectedValue) {
      this.router.navigateByUrl('/chat?cid='+selectedValue.email+"&group=false");
    }
  }

  private _filterUsers(value: string): User[] {
    const filterValue: string = value.toLowerCase();
    return this.users.filter(user =>
      (user.email.toLowerCase().includes(filterValue) ||
        user.name.toLowerCase().includes(filterValue)) &&
      this.loggedUser !== user);
  }
  private initSearchControl(){
    this.searchControl = new FormControl();
    this.filteredUsers = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUsers(value))
    );
  }
  ngOnInit(): void {
    this.initSearchControl()

  }

  displayUser(user: User): string {
    return user ? user.name + " - " + user.email : '';
  }
}
