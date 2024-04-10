import { SelectedAttendant } from "../interface/AttendantInterface";
import { LoadingInterface } from "../interface/LoadingInterface";
import { State } from "../interface/interface";

export const initialState: State = {
  attendants: [],
  messages: [],
  loading: { loading: true, error: "" } as LoadingInterface,
  selectAttendant: {} as SelectedAttendant,
};
