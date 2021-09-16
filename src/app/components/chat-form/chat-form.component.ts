import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent {
  message : string;

  constructor(private chatService : ChatService) { 
    this.message = ''
  }
  
  handleSubmit(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      this.send();
    }
  }

  send(): void {
    this.chatService.sendMessage(this.message);
    this.message = '';
  }

}
