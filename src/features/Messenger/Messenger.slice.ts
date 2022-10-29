import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TDialog, TMessage } from "src/features/Messenger/Messenger.types";
import { AppThunk } from "src/redux/store";

export interface IMessengerState {
  dialogs: TDialog[];
  chat: {
    companion: {
      id: number;
      name: string;
      lastOnline: number;
    };
    messages: TMessage[];
    messageText: string;
  };
}

const initialState: IMessengerState = {
  dialogs: [
    {
      id: 1,
      userName: "Donkey",
      lastMessage: "Uh, Shrek",
      isSenderUser: false,
    },
  ],
  chat: {
    companion: {
      id: 1,
      name: "Donkey",
      lastOnline: 1000000,
    },
    messages: [
      {
        id: 1,
        text: "Oh, that’s great. Really. — Man, it’s good to be free.",
        isSenderUser: false,
      },
      {
        id: 2,
        text: "Now, why don’t you go celebrate your freedom with your own friends? Hmm?",
        isSenderUser: true,
      },
      {
        id: 3,
        text: "But, uh, I don’t have any friends. And I’m not goin’ out there by myself. Hey, wait a minute! I got a great idea! I’ll stick with you. You’re mean, green, fightin’ machine. Together we’ll scare the spit out of anybody that crosses us.",
        isSenderUser: false,
      },
      {
        id: 4,
        text: "Oh, wow! That was really scary. If you don’t mind me sayin’, if that don’t work, your breath certainly will get the job done, ’cause you definitely need some Tic Tacs or something, ’cause you breath stinks! You almost burned the hair outta my nose, just like the time.. then I ate some rotten berries. I had strong gases leaking out of my butt that day.",
        isSenderUser: false,
      },
      {
        id: 5,
        text: "Why are you following me?",
        isSenderUser: true,
      },
      {
        id: 6,
        text: "I’ll tell you why. ‘Cause I’m all alone, There’s no one here beside me, My problems have all gone, There’s no one to deride me, But you gotta have faith…",
        isSenderUser: false,
      },
      {
        id: 7,
        text: "Stop singing! It’s no wonder you don’t have any friends.",
        isSenderUser: true,
      },
      {
        id: 8,
        text: "Wow. Only a true friend would be that cruelly honest.",
        isSenderUser: false,
      },
      {
        id: 9,
        text: "Listen, little donkey. Take a look at me. What am I?",
        isSenderUser: true,
      },
      {
        id: 10,
        text: "Uh …really tall?",
        isSenderUser: false,
      },
      {
        id: 11,
        text: "No! I’m an ogre! You know. «Grab your torch and pitchforks». Doesn’t that bother you?",
        isSenderUser: true,
      },
      {
        id: 12,
        text: "Nope.",
        isSenderUser: false,
      },
      {
        id: 13,
        text: "Really?",
        isSenderUser: true,
      },
      {
        id: 14,
        text: "Really, really.",
        isSenderUser: false,
      },
      {
        id: 15,
        text: "Oh.",
        isSenderUser: true,
      },
      {
        id: 16,
        text: "Man, I like you. What’s your name?",
        isSenderUser: false,
      },
      {
        id: 17,
        text: "Uh, Shrek.",
        isSenderUser: true,
      },
    ],
    messageText: "",
  },
};

export const messengerSlice = createSlice({
  name: "messenger",
  initialState,
  reducers: {
    setMessageText: (state, action: PayloadAction<string>) => {
      state.chat.messageText = action.payload;
    },
    addMessage: (state, action: PayloadAction<string>) => {
      const messages = state.chat.messages;
      if (!messages) return;

      state.chat.messages.push({
        id: messages[messages.length - 1].id + 1,
        text: action.payload,
        isSenderUser: true,
      });
    },
  },
});

export const { setMessageText } = messengerSlice.actions;
const { addMessage } = messengerSlice.actions;

export const sendMessage = (text: string): AppThunk => {
  return (dispatch) => {
    dispatch(addMessage(text));
    dispatch(setMessageText(""));
  };
};

export default messengerSlice.reducer;
