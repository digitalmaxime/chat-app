import { Component, OnInit, OnChanges } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ChatMessage } from 'src/app/models/chat-message.model';
import { Observable } from 'rxjs';
import { AngularFireList } from '@angular/fire/database';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit, OnChanges {
  feed: ChatMessage[];

  constructor(private chatService: ChatService ) { 

  }

  ngOnInit(): void {
    this.chatService.getMessages().valueChanges().subscribe(obs => {
      this.feed = obs;
    });
  }

  ngOnChanges(): void {
    // this.feed = this.chatService.getMessages();
    this.chatService.getMessages().valueChanges().subscribe(obs => {
      this.feed = obs;
    });
  }

}
