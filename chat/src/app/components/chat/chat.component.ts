import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatItem } from './models';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State, selectChatMessages, selectUserName } from 'src/app/reducers';
import { SentChat } from 'src/app/actions/chat.actions';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {


  chats$: Observable<ChatItem[]>;
  userName$: Observable<string>;
  userName: string;
  subscription: Subscription;
  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.chats$ = this.store.select(selectChatMessages);
    this.userName$ = this.store.select(selectUserName);

    this.subscription = this.userName$.subscribe(name => this.userName = name);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  sendChat(message: HTMLInputElement) {
    this.store.dispatch(new SentChat(this.userName, message.value));
    message.value = '';
    message.focus();
  }

}
