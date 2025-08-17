import Action from "../../UI/Actions.jsx";
import RecordView from "../../UI/RecordView.jsx";
import "./UserView.scss";

function UserView({ user, onModify, onDelete, onDismiss }) {
  const labels = {
    Name: "Full Name",
    Title: "Title",
    Position: "Position",
    AgeGroup: "Age Group",
    PartnerGuestName: "Partner/Guest Name",
    Location: "Location",
  };

  return (
    <div className="userView">
      <h3>{user.Name}</h3>
      <RecordView record={user} labels={labels} />
      <Action.Tray>
        <Action.Modify showText buttonText={"Modify"} onClick={onModify} />
        <Action.Delete showText buttonText={"Delete"} onClick={onDelete} />
        <Action.Dismiss showText buttonText={"Dismiss"} onClick={onDismiss} />
      </Action.Tray>
    </div>
  );
}

export default UserView;
