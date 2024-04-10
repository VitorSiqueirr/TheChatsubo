import { Dispatch } from "redux";
import {
  Attendant,
  AttendantActions,
  ExtraArgument,
} from "../../interface/AttendantInterface";
import { addAttendant } from "../actions/attendantActions";
import {
  addLoading,
  errorLoading,
  finishedLoading,
} from "../actions/loadingActions";
import {
  LoadingActions,
  LoadingInterface,
} from "../../interface/LoadingInterface";

export const fetchAttendantsAction = () => {
  const fetchAttendantThunk = (
    dispatch: Dispatch<AttendantActions | LoadingActions>,
    _: unknown,
    { fetchAttendants }: ExtraArgument
  ) => {
    dispatch(addLoading());

    return fetchAttendants()
      .then((data: Array<Attendant>) => {
        data.map((attendants) => {
          dispatch(addAttendant(attendants));
        });
        dispatch(finishedLoading());
      })
      .catch(() => {
        const errorData: LoadingInterface = {
          loading: false,
          error: "Error while loading attendants",
        };
        dispatch(errorLoading(errorData));
      });
  };

  return fetchAttendantThunk;
};
