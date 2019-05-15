import { Actions, Effect, ofType } from '@ngrx/effects';
import { Socket } from 'ngx-socket-io';
import { Store } from '@ngrx/store';
import { State } from '../reducers/';
import * as chatactions from '../actions/chat.actions';
import { ChatEntity } from '../reducers/chat.reducer';
import { map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable()
export class Chateffects {


  @Effect({ dispatch: false }) chatSent$ = this.actions$
    .pipe(
      ofType(chatactions.CHAT_SENT),
      map(a => a as chatactions.SentChat),
      map(a => ({ by: a.by, at: a.at, message: a.message }) as ChatEntity),
      map(a => JSON.stringify(a)),
      tap(a => this.socket.emit('chat', a))
    );


  constructor(private actions$: Actions, private socket: Socket, store: Store<State>) {
    socket.fromEvent('chat').subscribe(s => {
      const result: any = JSON.parse(s.toString()) as ChatEntity;
      store.dispatch(new chatactions.RecievedChat(result));
    });
  }
}
