import Action from "../../UI/Actions.jsx";
import RecordView from "../../UI/RecordView.jsx";
import "./EmployeeView.scss";

function EmployeeView({ employee, onModify, onDelete, onDismiss }) {
  const labels = {
    UserFirstname: "First name",
    UserLastname: "Last name",
    UserDateofbirth: "Date of birth",
    UserImageURL: "Image URL",
    UserUsertypeName: "User type",
    UserRoleName: "Role",
    UserEmail: "Email",
    UserGuestofID: "Guest of",
  };

  return (
    <div className="EmployeeView">
      <h3>{`${employee.UserID} ${employee.UserFirstname}`}</h3>
      <RecordView record={employee} labels={labels} />
      <Action.Tray>
        <Action.Modify showText buttonText={"Modify"} onClick={onModify} />
        <Action.Delete showText buttonText={"Delete"} onClick={onDelete} />
        <Action.Dismiss showText buttonText={"Dismiss"} onClick={onDismiss} />
      </Action.Tray>
    </div>
  );
}

export default EmployeeView;
