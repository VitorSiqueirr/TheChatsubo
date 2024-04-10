export interface Message {
  id: number;
  attendantId: number;
  sentAt: string;
  text: string;
}

export interface ActionMessage {
  type: string;
  payload: Message;
}

export interface MessageFormProps {
  showModal: () => void;
}

export type ExtraArgument = {
  fetchMessages: () => Promise<Array<Message>>;
};

export type MessageActions = { type: "ADD_MESSAGE"; payload: Message };
