import React, { ChangeEvent, useEffect, useRef } from "react";
import classes from "./Chat.module.scss";
import Avatar from "src/components/Avatar/Avatar";
import SvgSelector from "src/components/SvgSelector/SvgSelector";
import clsx from "clsx";
import { NavLink, useNavigate } from "react-router-dom";
import Message from "src/features/Messenger/Chat/Message/Message";
import { TMessage } from "src/features/Messenger/Messenger.types";
import { useWindowSize } from "src/hooks/hooks";

type TChatProps = {
  messages: TMessage[];
  messageText: string;
  companion: {
    id: number;
    name: string;
    lastOnline: number;
  };
  onMessageChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: (text: string) => void;
};

const Chat: React.FC<TChatProps> = ({
  messages,
  messageText,
  companion,
  onMessageChange,
  onSendMessage,
}) => {
  const screenSize = useWindowSize();
  const isMobile = screenSize.x <= 480;
  const navigate = useNavigate();

  const messagesDiv = useRef<HTMLDivElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSendMessage(messageText);
  };

  useEffect(() => {
    messagesDiv.current?.scrollTo(0, messagesDiv.current.offsetHeight);
    messagesDiv.current?.classList.add(classes["smooth-scroll"]);

    const handleKeydown = (event: any) => {
      if (event.key === "Escape") navigate("/messenger");
    };
    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, []);

  useEffect(() => {
    messagesDiv.current?.scrollTo(0, messagesDiv.current.offsetHeight);
  }, [messages]);

  return (
    <div className={classes.chat}>
      <div className={classes.header}>
        <div className={"user"}>
          {isMobile && (
            <NavLink to="/messenger" className={classes.button}>
              ❮
            </NavLink>
          )}
          <Avatar src={null} />
          <div className={"text"}>
            <p className={"title"}>{companion.name}</p>
            <p className={"subtext"}>Last seen 22 minutes ago</p>
          </div>
        </div>
        <button className={clsx(classes.more, "more")}>
          <div />
        </button>
      </div>
      <div className={classes.messages} ref={messagesDiv}>
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            text={message.text}
            isSenderUser={message.isSenderUser}
          />
        ))}
      </div>
      <div className={classes.footer}>
        <button>
          <SvgSelector id="clip" />
        </button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder={"Message"}
            value={messageText}
            onChange={onMessageChange}
          />
        </form>
        <div className={classes.buttons}>
          <button>
            <SvgSelector id="photo" />
          </button>
          {messageText ? (
            <button onClick={() => onSendMessage(messageText)}>
              <SvgSelector id="send" />
            </button>
          ) : (
            <button>
              <SvgSelector id="micro" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;
