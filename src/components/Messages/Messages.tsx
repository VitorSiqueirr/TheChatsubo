import { useSelector } from "react-redux";
import { getMessages } from "../../redux/selectors/messagesSelector";
import { getLoading } from "../../redux/selectors/loadingSelector";
import { getAttendants } from "../../redux/selectors/attendantsSelector";
import { fetchAttendantsAction } from "../../redux/thunks/fetchAttendantAction";
import { fetchMessagesAction } from "../../redux/thunks/fetchMessageAction";
import { useDispatch } from "react-redux";
import moment from "moment";
import "./Messages.css";
import { CapitalizeFirstLetter } from "../../aux/auxFunctions";

export default function Messages() {
  const dispatch = useDispatch();
  const messages = useSelector(getMessages);
  const loading = useSelector(getLoading);
  const attendants = useSelector(getAttendants);
  const attendantsById = {};

  const handleRetry = () => {
    dispatch(fetchMessagesAction());
    dispatch(fetchAttendantsAction());
  };

  if (attendants.length > 0) {
    attendants.forEach((attendant) => {
      attendantsById[attendant.id] = attendant;
    });
  }

  return (
    <>
      <div className="box-messages">
        <h1>The Chatsubo</h1>
        <div className="display-messages">
          <div className="messages">
            {loading.loading ? (
              <div className="loading-container">
                <div className="loading"></div>
              </div>
            ) : (
              <>
                {messages.map((message, index) => {
                  const attendant = attendantsById[message.attendantId];
                  return (
                    <div key={index}>
                      <p className="message" role="message">
                        {message.text}
                      </p>
                      <p className="name" role="name">
                        {attendant
                          ? CapitalizeFirstLetter(attendant.name)
                          : "Loading..."}
                        ,{" "}
                        <span className="date">
                          {moment(message.sentAt).format("DD, MMMM, HH:mm")}
                        </span>
                      </p>
                    </div>
                  );
                })}

                {loading.error && (
                  <div className="error">
                    <span className="error-message">{loading.error}</span>
                    <button
                      className="button retry-button"
                      onClick={() => handleRetry()}>
                      Retry Fetch
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
