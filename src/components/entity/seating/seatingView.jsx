import "./SeatingView.scss";
import { useState } from "react";
import { Alert, Confirm, Error } from "../../UI/Notifications.jsx";
import { Modal, useModal } from "../../UI/Modal.jsx";
import Action from "../../UI/Actions.jsx";
import AttendeeTable from "./AttendeeTable.jsx";
const SeatingView = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);
  const [size, setSize] = useState(6);
  const [tables, setTables] = useState([]);
  const storedUsers = localStorage.getItem("users");
  const [showError, ErrorContent, openError, closeError] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);

  const [showConfirm, ConfirmContent, openConfirm, closeConfirm] =
    useModal(false);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const tableOptions = () => {
    const options = [];
    for (let i = 6; i <= 20; i++) {
      options.push(i);
    }
    return options;
  };
  const splitIntoTables = (attendees, size) => {
    const tables = [];
    for (let i = 0; i < attendees.length; i += size) {
      tables.push(attendees.slice(i, i + size));
    }
    return tables;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTables(splitIntoTables(attendees, size));
  };
  const handleUserSave = () => {};
  const handleUserImport = () => {
    if (!storedUsers || storedUsers.length === 0) {
      openError(
        "No CSV data available. Import a CSV file from the ‘Manage CSV Data’ page."
      );
    } else {
      const users = JSON.parse(storedUsers);

      if (users.length === 0) {
        openError(
          "No CSV data available. Import a CSV file from the ‘Manage CSV Data’ page."
        );
        return;
      }
      // Convert users to attendees format
      const attendeesFromUsers = users.map((user, index) => ({
        AttendeeID: attendees.length + index + 1,
        AttendeeName: user.Name || "",
        AttendeeEventID: eventId,
        AttendeeStatusID: 1,
        AttendeeUserName: user.Name || "",
        AttendeeTitle: user.Title || "",
        AttendeePosition: user.Position || "",
        AttendeeLocation: user.Location || "",
        AttendeeAgeGroup: user.AgeGroup || "",
        AttendeePartnerGuestName: user.PartnerGuestName || "",
      }));

      setAttendees(attendeesFromUsers);
      setTables(splitIntoTables(attendeesFromUsers, size));
      openAlert(`Imported ${attendeesFromUsers.length} entries as attendees.`);
    }
  };
  return (
    <div className="seatingViewContainer">
      <Action.Tray>
        <Action.Import
          showText
          buttonText={"Import CSV Data"}
          onClick={handleUserImport}
        />
        <Action.Save
          showText
          buttonText={"Save Attendees"}
          onClick={handleUserSave}
        />
      </Action.Tray>
      <form method="post" onSubmit={handleSubmit}>
        <div>
          <p>Number Of People In Each Table:</p>
          <select
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          >
            {tableOptions().map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="applyButton" onClick={handleSubmit}>
          Apply
        </button>
      </form>
      <div className="tablesContainer">
        {tables.length > 0 ? (
          tables.map((table, index) => (
            <AttendeeTable
              key={index}
              attendees={table}
              tableNumber={index + 1}
            />
          ))
        ) : (
          <p>
            No attendees found. Please import a CSV file on the "Manage CSV
            Data" page.
          </p>
        )}
      </div>
      <Alert show={showAlert} message={alertContent} onDismiss={closeAlert} />
      <Error show={showError} message={ErrorContent} onDismiss={closeError} />
    </div>
  );
};
export default SeatingView;
