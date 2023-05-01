import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";
import {User} from "../../../shared/models/User";
import {UserService} from "../../../shared/services/user.service";
import {map, Observable, startWith} from "rxjs";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ChatItem} from "../../../shared/models/ChatItem";
import {Message_1} from "../../../shared/models/Message_1";
import {ChatService} from "../../../shared/services/chat.service";



@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit{
  @Input() public title: string = '';
  public groupName: FormControl<string | null> = new FormControl(this.title);
  public users: User[] = [];
  @Input() public selectedUser: User[] = [];
  @Output() public selectedUserOut: EventEmitter<User[]> = new EventEmitter<User[]>()
  public searchControl: FormControl<any> = new FormControl();
  public filteredUsers!: Observable<User[]>;
  private loggedUser: User = JSON.parse(localStorage.getItem('user') as string);

  @Input() public isGroup: boolean = true;
  @Input() public changeSettings: boolean = false;
  @Output() public groupNameOut: EventEmitter<string> = new EventEmitter<string>();

  constructor(private userService: UserService, private _snackBar: MatSnackBar, private chatService: ChatService) {
   this.initSearchControl();
  }

  private initSearchControl(){
    this.searchControl = new FormControl();
    this.filteredUsers = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterUsers(value))
    );
  }
  createNewGroup() {
      if(this.groupName == null || this.groupName.getRawValue() === undefined || this.groupName.getRawValue() === ""){
          this._snackBar.open("Need a name for the group!" ,"Close");
          return;
      }
      if(this.selectedUser === null || this.selectedUser === undefined || this.selectedUser.length < 2){
        this._snackBar.open("Need at least 2 users!" ,"Close");
        return;
      }
    this.selectedUser.push(this.loggedUser);
    let newChet: ChatItem = {
      id: "",
      name: this.groupName.getRawValue() as string,
      members: this.selectedUser.map(u => u.email) as string[],
      messages: [],
      group: true
    }
      this.chatService.addNew(newChet);
    this._snackBar.open("Successful create new group chat!" ,"Close");
    this.selectedUser = [];
    this.groupName.setValue("");
  }
  selectItem(item: User) {
    if (!this.selectedUser.includes(item)) {
      this.selectedUser.push(item);
      this.searchControl.reset('');
      this.selectedUserOut.emit(this.selectedUser);
    }
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedValue: User = event.option.value as User;
    if(!this.selectedUser.includes(selectedValue)) {
      this.selectedUser.push(selectedValue);
      this.searchControl.reset(null);
      this.searchControl.setValue(null)
      this.initSearchControl();
      this.selectedUserOut.emit(this.selectedUser);
    }
  }
  private _filterUsers(value: string): User[] {
    if (typeof value !== 'string') return [];
    const filterValue: string = value.toLowerCase();
    return this.users.filter(user =>
      (user.email.toLowerCase().includes(filterValue) ||
      user.name.toLowerCase().includes(filterValue)) &&
      !this.selectedUser.includes(user)
    );
  }
  removeSelectedItem(item: User) {
    const index = this.selectedUser.indexOf(item);
    if (index > -1) {
      this.selectedUser.splice(index, 1);
        this.searchControl.reset('');
        this.searchControl.setValue(null);
        this.selectedUserOut.emit(this.selectedUser);
      this.searchControl.clearValidators();
    }
  }


  ngOnInit(): void {
    this.userService.getAll().subscribe(user =>{
      this.users = user.filter(u => u.email != this.loggedUser.email);
    });
    this.groupName.setValue(this.title);

    this.groupName.valueChanges.subscribe(name => {
      if (name) {
        this.groupNameOut.emit(name);
      }
    });

  }

  onItemSelect(item: any) {
    console.log(item);
  }

  displayUser(user: User): string {
    return user ? user.name + " - " + user.email : '';
  }




}
