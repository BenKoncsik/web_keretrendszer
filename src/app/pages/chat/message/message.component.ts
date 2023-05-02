import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Message_1} from "../../../shared/models/Message_1";
import {User} from "../../../shared/models/User";
import {ChatItem} from "../../../shared/models/ChatItem";
import {UploadImageService} from "../../../shared/services/upload-image.service";
import {ActiveMessageListItem} from "../../../shared/models/ActiveMessageListItem";
import {ActiveChat} from "../../../shared/models/ActiveChat";
import {ActiveChatService} from "../../../shared/services/active-chat.service";
import {UserService} from "../../../shared/services/user.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges, OnDestroy{
  messageInput: string = '';
  @Input() loggedUser!: User;
  @Input() chat!: ChatItem | undefined;
  @Output() sendMessageEmitter: EventEmitter<Message_1> = new EventEmitter<Message_1>();
  @ViewChild('scrollContainer', {static: false, read: ElementRef}) private scrollContainer!: ElementRef;
  @ViewChild('fileInput ', {static: false, read: ElementRef}) private fileInput!: ElementRef;
  private activeChat!: ActiveChat;
  private subscriptions: Subscription[] = [];
  constructor(private uploadImageService: UploadImageService, private activeChatService: ActiveChatService,
              private userService: UserService) {
  }

  sendMessageEmit() {
    if (this.messageInput.trim()) {
      const event = this.fileInput.nativeElement.files.length ? { target: this.fileInput.nativeElement } : null;
      let img: string = "";
      if(event){
        this.subscriptions.push(
        this.uploadImageService.uploadFile(event).subscribe(url => {
          if(url) {
            url.subscribe(u => {
              const newMessage: Message_1 = {
                text: this.messageInput,
                send: new Date(),
                sender: this.loggedUser.email,
                imageUrl: u
              }
              this.sendMessageEmitter.emit(newMessage);
            })
          }else {
            const newMessage: Message_1 = {
              text: this.messageInput,
              send: new Date(),
              sender: this.loggedUser.email,
              imageUrl: ""
            }
            this.sendMessageEmitter.emit(newMessage);
          }
          this.messageInput = "";
        }));
      }else {
        const newMessage: Message_1 = {
          text: this.messageInput,
          send: new Date(),
          sender: this.loggedUser.email,
          imageUrl: ""
        }
        this.sendMessageEmitter.emit(newMessage);
      this.messageInput = "";
      }
    }
  }

  ngOnInit(): void {
    window.addEventListener("keypress", e => {
      if (e.code == 'Enter') {
        this.sendMessageEmit();
      }
    });

    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat']) {
      this.scrollToBottom();

      if (this.chat && this.activeChat) {
        let activeChatListItemIndex: number = this.activeChat.activeChats.findIndex(chat => chat.cId == this.chat?.id);
        if (activeChatListItemIndex != -1) {
          let activeChatListItem = this.activeChat.activeChats.at(activeChatListItemIndex);

          if (activeChatListItem) {
            let lastMessage: Message_1 | undefined = this.chat.messages.at(this.chat.messages.length - 1);
            if (lastMessage) {
              const currentActiveChatListItem = this.activeChat.activeChats.at(activeChatListItemIndex);
              if (currentActiveChatListItem) {
                currentActiveChatListItem.lastMessage = lastMessage.text;
                currentActiveChatListItem.lastChat = lastMessage.send.toDate();
                currentActiveChatListItem.userEmail = lastMessage.sender;
              }
            }
          }
        } else {
          const listItem: ActiveMessageListItem = {
            cId: this.chat!.id,
            userName: "",
            userEmail: "",
            lastMessage: "",
            lastChat: new Date(),
          }
          this.activeChat.activeChats.push(listItem);
        }
        this.activeChatService.update(this.activeChat);
      }

      if (this.chat) {
        this.subscriptions.push(
        this.activeChatService.getById(this.loggedUser.id).subscribe(activeChat => {
          if (activeChat) {
            this.activeChat = activeChat;
          } else {
            const listItem: ActiveMessageListItem = {
              cId: this.chat!.id,
              userName: "",
              userEmail: "",
              lastMessage: "",
              lastChat: new Date(),
            }
            const aC: ActiveChat = {
              uid: this.loggedUser.id,
              activeChats: [listItem]
            }
            this.activeChat = aC;
            this.activeChatService.addNew(aC);
          }
        }));
      }


    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
