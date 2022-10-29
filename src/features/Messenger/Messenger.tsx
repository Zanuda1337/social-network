import React, { ChangeEvent } from "react";
import classes from "./Messenger.module.scss";
import clsx from "clsx";
import Dialogs from "src/features/Messenger/Dialogs/Dialogs";
import Chat from "src/features/Messenger/Chat/Chat";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { sendMessage, setMessageText } from "./Messenger.slice";

const Messenger: React.FC = () => {
  const dialogs = useAppSelector((state) => state.messenger.dialogs);
  const chat = useAppSelector((state) => state.messenger.chat);

  const dispatch = useAppDispatch();

  const handleMessageTextChange = (event: ChangeEvent<HTMLInputElement>) =>
    dispatch(setMessageText(event.target.value));

  const handleSendMessage = (text: string) => dispatch(sendMessage(text));

  return (
    <div className={clsx(classes.container, classes.main)}>
      <div className={classes.wrapper}>
        <Dialogs dialogs={dialogs} />
        <Routes>
          <Route
            path={":id"}
            element={
              <Chat
                messages={chat.messages}
                messageText={chat.messageText}
                companion={chat.companion}
                onMessageChange={handleMessageTextChange}
                onSendMessage={handleSendMessage}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Messenger;
