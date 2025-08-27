import React from "react";
import "./SeatingView.scss";
import { useState } from "react";
import { Alert, Confirm, Error } from "../../UI/Notifications.jsx";
import { Modal, useModal } from "../../UI/Modal.jsx";
import Action from "../../UI/Actions.jsx";
import AttendeeTable from "./AttendeeTable.jsx";
import useLoad from "../../api/useLoad.js";
import apiEndpoints from "../../api/apiEndpoints.js";
import { groupParticipantsWithGuests } from "../../../utils/employeeConformance.jsx";


const SeatingView = ({ eventId }) => {
  const [size, setSize] = useState(6);
  const [tables, setTables] = useState([]);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const storedUsers = localStorage.getItem("users");
  const [showError, ErrorContent, openError, closeError] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);
  const [attendees, setAttendees, loadingAttendeesMessage, loadAttendees] =
    useLoad(apiEndpoints.ATTENDEES);
  const [dbImportRequested, setDbImportRequested] = useState(false);
  const [tableShape, setTableShape] = useState("round");
  const [errorMsg, setErrorMsg] = useState("");
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
        (attendee) => Number(attendee.AttendeeEventID) === Number(eventId)
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
        AttendeeID: index + 1,
        AttendeeName: user.Name || "",
        AttendeeEventID: eventId,
        AttendeeStatusID: 1,
        AttendeeUserName: user.Name || "",
        AttendeeTitle: user["Job Title/ Position"] || "N/A",
        AttendeePosition: user["Job Title/ Position"] || "N/A",
        AttendeeLocation: user["Location (Onshore or Offshore)"] || "N/A",
        AttendeeAgeGroup: user["Age Group"] || "N/A",
        AttendeePartnerGuestName: user["Partner's Name"] || "",
        PreviousNeighbors: user["Previous Neighbours"]
          ? user["Previous Neighbours"]
              .split(",")
              .map((n) => n.trim())
              .filter(Boolean)
          : [],
      }));

      setAttendees(attendeesFromUsers);
      setTables(splitIntoTables(attendeesFromUsers, size, true));
      openAlert(`Imported ${attendeesFromUsers.length} entries as attendees.`);
    }
  };

  const handleArrange = () => {
    setErrorMsg(""); // Clear previous errors
    const grouped = groupParticipantsWithGuests(attendees);
    const { tables: arrangedTables, errors } = assignSeats(
      grouped,
      size,
      tableShape
    );
    setTables(arrangedTables);
    setErrorMsg(errors.join("\n"));
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
        <Action.Import
          showText
          buttonText={"Import From Database"}
          onClick={handleUserDBImport}
        />
      </Action.Tray>

    <div className="tablesContainer">
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
          <span style={{ marginLeft: "16px" }}>
            Table Shape:
            <select
              value={tableShape}
              onChange={(e) => setTableShape(e.target.value)}
              style={{ marginLeft: "8px" }}
            >
              <option value="round">Round</option>
              <option value="rectangular">Rectangular</option>
            </select>
          </span>
        </div>
        <button
          type="submit"
          className="applyButton"
          onClick={handleSubmit}
        >
          Apply
        </button>
        <button
          type="button"
          className="arrangeButton"
          style={{ marginLeft: "16px" }}
          onClick={handleArrange}
        >
          Arrange Seats
        </button>
      </form>
      {tables && tables.length > 0 ? (
        <>
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

function assignSeats(
  groupedAttendees,
  tableSize = 8,
  tableShape = "round"
) {
  const tables = [];
  let tableNumber = 1;
  const errors = [];

  for (const group of groupedAttendees) {
    // A. Group larger than table size
    if (group.length > tableSize) {
      errors.push(
        `Group (${group.map((g) => g.AttendeeName).join(", ")}) is larger than table size (${tableSize}).`
      );
      continue; // Skip this group
    }

    let placed = false;
    for (let tIdx = 0; tIdx < tables.length; tIdx++) {
      const candidateTable = tables[tIdx].attendees;
      if (hasAdjacencyConflict(candidateTable, group, tableShape, tableSize)) {
        continue;
      }
      if (candidateTable.length + group.length <= tableSize) {
        group.forEach((a) => {
          candidateTable.push({
            ...a,
            seat: candidateTable.length + 1,
            table: tables[tIdx].tableNumber,
          });
        });
        placed = true;
        break;
      }
    }
    // B. Constraints not satisfied
    if (!placed) {
      if (tables.length > 0) {
        errors.push(
          `Could not satisfy adjacency constraints for group (${group
            .map((g) => g.AttendeeName)
            .join(", ")}). Placed at new table.`
        );
      }
      let attendees = [];
      let seatNumber = 1;
      group.forEach((a) => {
        attendees.push({
          ...a,
          seat: seatNumber,
          table: tableNumber,
        });
        seatNumber++;
      });
      tables.push({ tableNumber, attendees });
      tableNumber++;
    }
  }

  // Remove tables smaller than 6 (except last table if needed)
  for (let i = 0; i < tables.length - 1; i++) {
    if (tables[i].attendees.length < 6) {
      tables[i + 1].attendees = [...tables[i].attendees, ...tables[i + 1].attendees];
      tables[i].attendees = [];
    }
  }
  if (errors.length > 0) {
    console.warn(errors.join("\n"));
  }
  return { tables: tables.filter((t) => t.attendees.length > 0), errors };
}

function hasAdjacencyConflict(table, group, tableShape, tableSize) {
  if (table.length === 0) return false;

  // Check left adjacency (last person in table with first in group)
  const lastPerson = table[table.length - 1];
  const firstPerson = group[0];
  if (
    lastPerson.PreviousNeighbors?.includes(firstPerson.AttendeeName) ||
    firstPerson.PreviousNeighbors?.includes(lastPerson.AttendeeName)
  ) {
    return true;
  }

  // For round tables, check right adjacency (if table will be full after adding group)
  if (tableShape === "round" && table.length + group.length === tableSize) {
    const firstTablePerson = table[0];
    const lastGroupPerson = group[group.length - 1];
    if (
      firstTablePerson.PreviousNeighbors?.includes(lastGroupPerson.AttendeeName) ||
      lastGroupPerson.PreviousNeighbors?.includes(firstTablePerson.AttendeeName)
    ) {
      return true;
    }
  }

  // RECTANGULAR TABLE LOGIC

  return false;
}

export default SeatingView;
