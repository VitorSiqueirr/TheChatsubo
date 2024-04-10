import { getSelectAttendantId } from "../../redux/selectors/selectedAttendantSelector";
import { selectAttendant } from "../../redux/actions/selectAttendantActions";
import { getAttendants } from "../../redux/selectors/attendantsSelector";
import { MessageFormProps } from "../../interface/MessageInterface";
import { addMessage } from "../../redux/actions/messageActions";
import { Attendant } from "../../interface/AttendantInterface";
import { useDispatch, useSelector } from "react-redux";
import { postMessage } from "../../api/apiCalls";
import { useState } from "react";
import "./MessageForm.css";
import AlertModal from "../AlertModal/AlertModal";
import { CapitalizeFirstLetter } from "../../aux/auxFunctions";

export default function MessageForm({ showModal }: MessageFormProps) {
  const dispatch = useDispatch();
  const selectedAttendantId = useSelector(getSelectAttendantId);
  const attendants = useSelector(getAttendants);
  const [message, setMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
  });
  const check = attendants.length >= 3;

  const handleMessage = () => {
    if (message != "" && selectedAttendantId) {
      postMessage(selectedAttendantId, message).then((d) => {
        dispatch(addMessage(d));
      });
      setMessage("");
    } else {
      defineAlert();
    }
  };

  const removeAlert = () => {
    setShowAlert(false);
  };

  const defineAlert = () => {
    setShowAlert(true);
    setAlertMessage({
      title: "MESSAGE ALERT!",
      message: "Message cannot be empty!",
    });
  };

  return (
    <>
      {showAlert ? (
        <>
          <AlertModal
            Title={alertMessage.title}
            Message={alertMessage.message}
            removeAlert={removeAlert}
          />
        </>
      ) : (
        <></>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleMessage();
        }}
        className="message-form">
        <div className="input-message">
          <input
            type="text"
            name="message"
            id="message"
            value={message}
            placeholder="Type Here..."
            className="message-input"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            className={`button send-button ${check ? "able" : "disable"}`}
            disabled={!check}
            type="submit">
            Send
          </button>
        </div>
        <div className="attendant">
          <select
            name="attendant"
            id="attendant"
            value={selectedAttendantId}
            onChange={(e) =>
              dispatch(selectAttendant({ id: Number(e.target.value) }))
            }>
            {attendants.map((attendant: Attendant, index) => (
              <option key={index} value={attendant.id}>
                {CapitalizeFirstLetter(attendant.name)}
              </option>
            ))}
          </select>

          <button
            className="button add-attendant-button"
            type="button"
            onClick={showModal}>
            Add New Attendant
          </button>
        </div>
      </form>
    </>
  );
}
