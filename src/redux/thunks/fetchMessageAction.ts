import { Dispatch } from "redux";
import { addMessage } from "../actions/messageActions";
import {
  addLoading,
  errorLoading,
  finishedLoading,
} from "../actions/loadingActions";
import {
  LoadingActions,
  LoadingInterface,
} from "../../interface/LoadingInterface";
import {
  ExtraArgument,
  Message,
  MessageActions,
} from "../../interface/MessageInterface";

export const fetchMessagesAction = () => {
  const fetchMessagesThunk = (
    dispatch: Dispatch<MessageActions | LoadingActions>,
    _: unknown,
    { fetchMessages }: ExtraArgument
  ) => {
    dispatch(addLoading());

    return fetchMessages()
      .then((data: Array<Message>) => {
        data.map((messages) => {
          dispatch(addMessage(messages));
          dispatch(finishedLoading());
        });
      })
      .catch(() => {
        const errorData: LoadingInterface = {
          loading: false,
          error: "Error while loading messages",
        };
        dispatch(errorLoading(errorData));
      });
  };

  return fetchMessagesThunk;
};
