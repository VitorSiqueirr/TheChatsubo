import {
  Attendant,
  AttendantActions,
  SelectAttendantActions,
  SelectedAttendant,
} from "./AttendantInterface";
import { LoadingActions, LoadingInterface } from "./LoadingInterface";
import { Message, MessageActions } from "./MessageInterface";

export interface State {
  attendants: Attendant[];
  selectAttendant: SelectedAttendant;
  loading: LoadingInterface;
  messages: Message[];
}

export type RootAction =
  | AttendantActions
  | LoadingActions
  | MessageActions
  | SelectAttendantActions;

export interface AlertModalInterface {
  Title: string;
  Message: string;
  removeAlert: () => void;
}
