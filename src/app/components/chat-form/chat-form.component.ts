import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message : string;

  constructor(private chatService : ChatService) { 
    this.message = 'allo'
  }

  ngOnInit(): void {
  }
  
  handleSubmit(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.send();
    }
  }

  send(): void {
    this.chatService.sendMessage(this.message);
  }

}
