import { AlertModalInterface } from "../../interface/interface";
import "./AlertModal.css";

export default function AlertModal({
  Title,
  Message,
  removeAlert,
}: AlertModalInterface) {
  return (
    <>
      <div className="mask mask-alert"></div>
      <div className="alert-modal">
        <h1 className="alert-title">{Title}</h1>
        <p className="alert-message">{Message}</p>
        <button
          className="button alert-button"
          onClick={() => {
            removeAlert();
          }}>
          Close
        </button>
      </div>
    </>
  );
}
