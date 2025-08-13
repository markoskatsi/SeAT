import Action from "../../UI/Actions.jsx";
import RecordView from "../../UI/RecordView.jsx";
import "./AttendeeView.scss";

function AttendeeView({ attendee, onModify, onDismiss, onDelete }) {
  if (!attendee) return null;
  const labels = {
    AttendeeName: "Name",
    AttendeeEmail: "Email",
    AttendeeUserName: "User Name",
    AttendeeEventName: "Event Name",
    AttendeeStatusName: "Status",
  };
  return (
    <div className="attendeeView">
      <h3>{attendee.AttendeeUserName}</h3>
      <RecordView record={attendee} labels={labels} />
      <Action.Tray>
        <Action.Modify showText buttonText={"Modify"} onClick={onModify} />
        <Action.Delete
          showText
          buttonText={"Delete"}
          onClick={() => onDelete(attendee)}
        />
        <Action.Dismiss showText buttonText={"Dismiss"} onClick={onDismiss} />
      </Action.Tray>
    </div>
  );
}

export default AttendeeView;
