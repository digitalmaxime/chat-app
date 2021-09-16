import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user-model.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent {
  @Input() user: User;

}
