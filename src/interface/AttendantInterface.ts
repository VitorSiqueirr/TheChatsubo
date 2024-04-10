export interface Attendant {
  id: number;
  name: string;
}

export interface SelectedAttendant {
  id: number;
}

export interface ActionSelectAttendant {
  type: string;
  payload: SelectedAttendant;
}

export interface ActionAttendant {
  type: string;
  payload: Attendant;
}

export interface AttendantFormProps {
  hideModal: () => void;
}

export type ExtraArgument = {
  fetchAttendants: () => Promise<Array<Attendant>>;
};

export type AttendantActions = { type: "ADD_ATTENDANT"; payload: Attendant };

export type SelectAttendantActions = {
  type: "SELECT_ATTENDANT";
  payload: SelectedAttendant;
};
