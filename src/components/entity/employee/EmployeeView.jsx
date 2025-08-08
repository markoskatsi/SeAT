import Action from "../../UI/Actions.jsx";
import RecordView from "../../UI/RecordView.jsx";
import "./EmployeeView.scss";

function EmployeeView({ employee, onModify, onDelete, onDismiss }) {
  const labels = {
    Name: "Full Name",
    Title: "Title",
    Position: "Position",
    AgeGroup: "Age Group",
    PartnerGuestName: "Partner/Guest Name",
    Location: "Location",
  };

  return (
    <div className="employeeView">
      <h3>{employee.Name}</h3>
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
