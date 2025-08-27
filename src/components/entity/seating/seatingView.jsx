import React from "react";
import "./SeatingView.scss";
import { useState } from "react";
import { Alert, Confirm, Error } from "../../UI/Notifications.jsx";
import { Modal, useModal } from "../../UI/Modal.jsx";
import Action from "../../UI/Actions.jsx";
import AttendeeTable from "./AttendeeTable.jsx";
import useLoad from "../../api/useLoad.js";
import apiEndpoints from "../../api/apiEndpoints.js";
const SeatingView = ({ eventId }) => {
  const [size, setSize] = useState(6);
  const [tables, setTables] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const storedUsers = localStorage.getItem("users");
  const [showError, ErrorContent, openError, closeError] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);
  const [attendees, setAttendees, loadingAttendeesMessage, loadAttendees] =
    useLoad(apiEndpoints.ATTENDEES);
  const [dbImportRequested, setDbImportRequested] = useState(false);

  const tableOptions = () => {
    const options = [];
    for (let i = 6; i <= 20; i++) {
      options.push(i);
    }
    return options;
  };
  const splitIntoTables = (attendees, size, randomize = false) => {
    let tables = [];
    // Always use backend table/seat assignments if available
    if (
      !randomize &&
      attendees.length > 0 &&
      attendees[0].AttendeeTable !== undefined
    ) {
      const tablesMap = attendees.reduce((acc, attendee) => {
        const tableNumber = attendee.AttendeeTable;
        if (!acc[tableNumber]) acc[tableNumber] = [];
        acc[tableNumber].push(attendee);
        return acc;
      }, {});
      for (const tableNumber in tablesMap) {
        tablesMap[tableNumber].sort((a, b) => a.AttendeeSeat - b.AttendeeSeat);
        tables.push({
          tableNumber: Number(tableNumber),
          attendees: tablesMap[tableNumber],
        });
      }
    } else if (size > 0) {
      // Randomly shuffle attendees for CSV import and assign table/seat numbers
      const shuffled = [...attendees];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      for (let i = 0; i < shuffled.length; i += size) {
        const tableAttendees = shuffled
          .slice(i, i + size)
          .map((attendee, idx) => ({
            ...attendee,
            AttendeeTable: tables.length + 1,
            AttendeeSeat: idx + 1,
          }));
        tables.push({
          tableNumber: tables.length + 1,
          attendees: tableAttendees,
        });
      }
    }
    return tables;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // If attendees are from CSV, reshuffle on apply
    if (attendees.length > 0 && attendees[0].AttendeeTable === undefined) {
      setTables(splitIntoTables(attendees, size, true));
    } else {
      setTables(splitIntoTables(attendees, size));
    }
  };
  const handleUserSave = () => {
    // Flatten all attendees from tables
    const allAttendees = tables.flatMap((table) =>
      table.attendees.map((att) => ({
        name: att.AttendeeName || att.AttendeeUserName || "",
        table: att.AttendeeTable || table.tableNumber,
        seat: att.AttendeeSeat || "",
      }))
    );
    // CSV header
    const header = ["Name", "Table Number", "Seat Number"];
    // CSV rows
    const rows = allAttendees.map((a) => [a.name, a.table, a.seat]);
    // Build CSV string
    const csvContent = [header, ...rows]
      .map((row) =>
        row
          .map(String)
          .map((s) => `"${s.replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\r\n");
    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "attendees.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  const filterByAttendeeID = (attendeeEventId) => {
    return attendees.filter(
      (attendee) => Number(attendee.AttendeeEventID) === Number(attendeeEventId)
    );
  };

  const handleUserDBImport = async () => {
    setDbImportRequested(true);
    await loadAttendees(apiEndpoints.ATTENDEES);
  };

  // When dbImportRequested is true and attendees update, render backend tables
  React.useEffect(() => {
    if (dbImportRequested) {
      if (!attendees || attendees.length === 0) {
        openError("No attendees found in the database.");
        setDbImportRequested(false);
        return;
      }
      const filtered = attendees.filter(
        (attendee) =>
          Number(attendee.AttendeeEventID) === Number(eventId) &&
          (Number(attendee.AttendeeStatusID) === 2 ||
            Number(attendee.AttendeeStatusID) === 5)
      );

      if (filtered.length === 0) {
        openError("No attendees found for the selected event.");
        setDbImportRequested(false);
        return;
      }
      setAttendees(filtered);
      setFilteredAttendees(filtered);
      setTables(splitIntoTables(filtered, 0, false));
      setDbImportRequested(false);
    }
  }, [attendees, dbImportRequested, eventId]);

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
      setTables(splitIntoTables(attendeesFromUsers, size, true));
      openAlert(`Imported ${attendeesFromUsers.length} entries as attendees.`);
    }
  };
  return (
    <div className="seatingViewContainer">
      <Action.Tray>
        <Action.Import
          showText
          buttonText={"Import CSV Data"}
          onClick={() => {
            handleUserImport();
            setShowForm(true);
          }}
        />
        <Action.Import
          showText
          buttonText={"Import From Database"}
          onClick={() => {
            handleUserDBImport();
            setShowForm(false);
          }}
        />
        {tables.length > 0 && (
          <Action.Save
            showText
            buttonText={"Save As CSV"}
            onClick={handleUserSave}
          />
        )}
      </Action.Tray>

      <div className="tablesContainer">
        {tables.length > 0 || tables ? (
          <>
            {showForm && (
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
            )}

            {tables.map(({ tableNumber, attendees }) => (
              <AttendeeTable
                key={tableNumber}
                tableNumber={tableNumber}
                attendees={attendees}
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
export default SeatingView;
