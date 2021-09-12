import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// FIREBASE !!
// import { AngularFireModule } from 'angularfire2';
import { AngularFireModule } from '@angular/fire';
// import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabaseModule } from '@angular/fire/database';
// import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';

// import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatFormComponent } from './components/chat-form/chat-form.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { FeedComponent } from './components/feed/feed.component';
import { MessageComponent } from './components/message/message.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserItemComponent } from './components/user-item/user-item.component';

import { ChatService } from './services/chat.service';
import { AuthService } from './services/auth.service';

// import { appRoutes } from 'src/routes';
import { environment } from '../environments/environment';
@NgModule({
  declarations: [
    AppComponent,
    ChatFormComponent,
    ChatroomComponent,
    FeedComponent,
    MessageComponent,
    LoginFormComponent,
    SignupFormComponent,
    NavbarComponent,
    UserListComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    // AngularFireModule.initializeApp(environment.firebaseConfig),
  ],
  providers: [AuthService, ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
