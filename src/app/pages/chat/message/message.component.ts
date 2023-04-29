import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Message_1} from "../../../shared/models/Message_1";
import {User} from "../../../shared/models/User";
import {ChatItem} from "../../../shared/models/ChatItem";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, OnChanges{
  messageInput: string = '';
  @Input() loggedUser!: User;
  @Input() chat!: ChatItem | undefined;
  @Output() sendMessageEmitter: EventEmitter<Message_1> = new EventEmitter<Message_1>();
  @ViewChild('scrollContainer', {static: false, read: ElementRef}) private scrollContainer!: ElementRef;

  constructor() {
  }

  sendMessageEmit() {
    if (this.messageInput.trim()) {
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

  ngOnInit(): void {
    window.addEventListener("keypress", e => {
      if (e.code == 'Enter') {
        this.sendMessageEmit();
      }
    });

    this.chat
  }

  scrollToBottom(): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['chat']) {
      this.scrollToBottom();
    }
  }


}
