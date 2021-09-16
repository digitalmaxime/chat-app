import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: User[];
  
  constructor(chatService: ChatService) { 
    chatService.getUsers().valueChanges().subscribe(users => {
      this.users = users;
    });
  }

}
