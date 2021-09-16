import { Component, Input, OnInit } from '@angular/core';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: ChatMessage;
  messageContent: string;
  userName: string;
  email: string;
  date: string;
  isOwnMessage: boolean;
  ownEmail: string;

  constructor(private authService: AuthService) {
    authService.authUser().subscribe(user => {
      this.ownEmail = user.email;
      this.isOwnMessage = this.ownEmail === this.email;
    });
  }

  ngOnInit(): void {
    this.messageContent = this.chatMessage.message;
    this.userName = this.chatMessage.userName;
    this.email = this.chatMessage.email;
    this.date = this.chatMessage.timeSent;
  }

}
