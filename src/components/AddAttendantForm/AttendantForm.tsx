import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { getAttendants } from "../../redux/selectors/attendantsSelector";
import { addAttendant } from "../../redux/actions/attendantActions";
import { selectAttendant } from "../../redux/actions/selectAttendantActions";
import {
  Attendant,
  AttendantFormProps,
} from "../../interface/AttendantInterface";
import "./AttendantForm.css";
import { postAttendant } from "../../api/apiCalls";
import AlertModal from "../AlertModal/AlertModal";
import { CapitalizeFirstLetter } from "../../aux/auxFunctions";

export default function AttendantForm({ hideModal }: AttendantFormProps) {
  const [newAttendantName, setNewAttendantName] = useState("");
  const dispatch = useDispatch();
  const attendants = useSelector(getAttendants);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    title: "",
    message: "",
  });

  const handleAddAttendant = () => {
    if (newAttendantName) {
      if (
        !attendants.find(
          (a: Attendant) =>
            a.name.toLowerCase() === newAttendantName.toLowerCase()
        )
      ) {
        postAttendant(CapitalizeFirstLetter(newAttendantName)).then(
          (attendant) => {
            dispatch(addAttendant(attendant));
            dispatch(selectAttendant({ id: attendant.id }));
          }
        );
        setNewAttendantName("");
        hideModal();
      } else {
        defineAlert("Attendant name already taken!");
      }
    } else {
      defineAlert("Attendant cannot be empty!");
    }
  };

  const removeAlert = () => {
    setShowAlert(false);
  };

  const defineAlert = (message: string) => {
    setShowAlert(true);
    setAlertMessage({
      title: "MESSAGE ALERT!",
      message: message,
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
      <div className={`mask`} onClick={hideModal}></div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddAttendant();
        }}
        className={`add-attendant-form`}>
        <h1>Add a new Attendant</h1>
        <input
          className="attendant-input"
          type="text"
          value={newAttendantName}
          onChange={(e) => setNewAttendantName(e.target.value)}
          placeholder="Type the new attendant name..."
        />
        <div className="submit">
          <button className="button attendant-button-add" type="submit">
            Add Attendant
          </button>
          <button
            className="button attendant-button-cancel"
            type="button"
            onClick={hideModal}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
