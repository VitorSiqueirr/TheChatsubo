import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchAttendantsAction } from "./redux/thunks/fetchAttendantAction";
import { fetchMessagesAction } from "./redux/thunks/fetchMessageAction";
import AttendantForm from "./components/AddAttendantForm/AttendantForm";
import MessageForm from "./components/AddMessageForm/MessageForm";
import Messages from "./components/Messages/Messages";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const [toggleModal, setToggleModal] = useState(false);

  const showModal = () => {
    setToggleModal(true);
  };

  const hideModal = () => {
    setToggleModal(false);
  };

  useEffect(() => {
    dispatch(fetchMessagesAction());
    dispatch(fetchAttendantsAction());
  }, []);

  return (
    <>
      <div className="container">
        <Messages />
        <MessageForm showModal={showModal} />
        {toggleModal && <AttendantForm hideModal={hideModal} />}
      </div>
    </>
  );
}

export default App;
