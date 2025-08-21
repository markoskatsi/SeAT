import "./SeatingView.scss";
import { useState } from "react";
import { Alert, Confirm, Error } from "../../UI/Notifications.jsx";
import { Modal, useModal } from "../../UI/Modal.jsx";
import Action from "../../UI/Actions.jsx";
import AttendeeTable from "./AttendeeTable.jsx";
import { groupParticipantsWithGuests } from "../../utils/employeeConformance.jsx";

const SeatingView = ({ eventId }) => {
  const [attendees, setAttendees] = useState([]);
  const [size, setSize] = useState(6);
  const [tables, setTables] = useState([]);
  const [tableShape, setTableShape] = useState("round");
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
        AttendeeID: index + 1,
        AttendeeName: user.Name || "",
        AttendeeEventID: eventId,
        AttendeeStatusID: 1,
        AttendeeUserName: user.Name || "",
        AttendeeTitle: user["Job Title/ Position"] || "",
        AttendeePosition: user["Job Title/ Position"] || "",
        AttendeeLocation: user["Location (Onshore or Offshore)"] || "",
        AttendeeAgeGroup: user["Age Group"] || "",
        AttendeePartnerGuestName: user["Partner's Name"] || "",
      }));

      setAttendees(attendeesFromUsers);
      setTables(splitIntoTables(attendeesFromUsers, size));
      openAlert(`Imported ${attendeesFromUsers.length} entries as attendees.`);
    }
  };
  const handleArrange = () => {
    const grouped = groupParticipantsWithGuests(attendees);
    setTables(assignSeats(grouped, size, tableShape));
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

      <div className="tablesContainer">
        {tables.length > 0 ? (
          <>
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
              <button
                type="submit"
                className="applyButton"
                onClick={handleSubmit}
              >
                Apply
              </button>
            </form>
            {tables.map((table, index) => (
              <AttendeeTable
                key={index}
                attendees={table}
                tableNumber={index + 1}
              />
            ))}
          </>
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

function assignSeats(groupedAttendees, tableSize = 8, tableShape = "round") {
  const tables = [];
  let tableNumber = 1;

  groupedAttendees.forEach((group) => {
    let placed = false;
    for (let tIdx = 0; tIdx < tables.length; tIdx++) {
      const candidateTable = tables[tIdx];
      if (hasAdjacencyConflict(candidateTable, group, tableShape)) {
        continue;
      }
      if (candidateTable.length + group.length <= tableSize) {
        group.forEach((a) => {
          candidateTable.push({
            ...a,
            seat: candidateTable.length + 1,
            table: tIdx + 1,
          });
        });
        placed = true;
        break;
      }
    }
    if (!placed) {
      let table = [];
      let seatNumber = 1;
      group.forEach((a) => {
        table.push({
          ...a,
          seat: seatNumber,
          table: tableNumber,
        });
        seatNumber++;
      });
      tables.push(table);
      tableNumber++;
    }
  });

  // Remove tables smaller than 6
  for (let i = 0; i < tables.length - 1; i++) {
    if (tables[i].length < 6) {
      tables[i + 1] = [...tables[i], ...tables[i + 1]];
      tables[i] = [];
    }
  }
  return tables.filter((t) => t.length > 0);
}

function hasAdjacencyConflict(table, group, tableShape) {
  if (table.length === 0) return false;

  // Check left adjacency (last person in table with first in group)
  const lastPerson = table[table.length - 1];
  const firstPerson = group[0];
  if (
    lastPerson.previousNeighbors?.includes(firstPerson.id) ||
    firstPerson.previousNeighbors?.includes(lastPerson.id)
  ) {
    return true;
  }

  // For round tables, check right adjacency (if table will be full after adding group)
  if (tableShape === "round" && table.length + group.length === table.length) {
    const firstTablePerson = table[0];
    const lastGroupPerson = group[group.length - 1];
    if (
      firstTablePerson.previousNeighbors?.includes(lastGroupPerson.id) ||
      lastGroupPerson.previousNeighbors?.includes(firstTablePerson.id)
    ) {
      return true;
    }
  }

  // RECTANGULAR TABLE LOGIC

  return false;
}

export default SeatingView;
