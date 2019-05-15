import { Action } from '@ngrx/store';
import { IsoDate } from '../components/chat/models';
import { ChatEntity } from '../reducers/chat.reducer';


export const CHAT_SENT = '[chat] chat sent';
export class SentChat implements Action {
  readonly type = CHAT_SENT;
  at: IsoDate;
  constructor(public by: string, public message: string) {
    this.at = new Date().toISOString();
  }
}

export const CHAT_RECIEVED = '[chat] chat recieved';
export class RecievedChat implements Action {
  readonly type = CHAT_RECIEVED;
  constructor(public item: ChatEntity) { }
}




export type ALL =
  SentChat
  | RecievedChat;
