export type TDialog = {
  id: number;
  userName: string;
  lastMessage: string;
  isSenderUser: boolean;
};

export type TMessage = {
  id: number;
  text: string;
  isSenderUser: boolean;
};
