import * as fromActions from '../actions/chat.actions';
import { IsoDate } from '../components/chat/models';

export interface ChatEntity {
  by: string;
  at: IsoDate;
  message: string;
}

export interface State {
  messages: ChatEntity[];
}

const initialState: State = {
  messages: []
};

export function reducer(state: State = initialState, action: fromActions.ALL): State {
  switch (action.type) {
    case fromActions.CHAT_RECIEVED: {
      return {
        messages: [action.item, ...state.messages]
      };
    }
    case fromActions.CHAT_SENT: {
      const addMe: ChatEntity = {
        by: action.by,
        at: action.at,
        message: action.message
      };
      return {
        messages: [addMe, ...state.messages]
      };
    }
    default: {
      return state;
    }
  }
}
