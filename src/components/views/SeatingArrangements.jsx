import { useState } from "react";
import CSVImportButton from "../../utils/CSVImportButton.jsx";
import Action from "../UI/Actions.jsx";
import { ListContainer, HeaderContainer } from "../UI/ListContainer.jsx";
import { normaliseParticipants, groupParticipantsWithGuests } from "../../utils/employeeConformance.jsx";
import "./SeatingArrangements.scss";

function assignSeats(groupedParticipants, tableSize = 8, tableShape = "round") {
  const tables = [];
  let tableNumber = 1;

  groupedParticipants.forEach((group) => {
    let placed = false;
    for (let tIdx = 0; tIdx < tables.length; tIdx++) {
      const candidateTable = tables[tIdx];
      if (hasAdjacencyConflict(candidateTable, group, tableShape)) {
        continue;
      }
      if (candidateTable.length + group.length <= tableSize) {
        group.forEach((p) => {
          candidateTable.push({
            ...p,
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
      group.forEach((p) => {
        table.push({
          ...p,
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

  // NEED TO CHECK ACROSS FOR RECTANGULAR TABLES

  return false;
}

function SeatingArrangements() {
  const [participants, setParticipants] = useState([]);
  const [tables, setTables] = useState([]);
  const [tableSize, setTableSize] = useState(8);
  const [tableShape, setTableShape] = useState("round");
  const [importStatus, setImportStatus] = useState("");

  const handleCSVImport = (rawData) => {
    try {
      const normalised = normaliseParticipants(rawData);
      const grouped = groupParticipantsWithGuests(normalised);
      setParticipants(normalised);
      setImportStatus(`Imported ${normalised.length} participants.`);
    } catch (e) {
      setImportStatus("There was an error importing the CSV.");
    }
  };

  const handleArrange = () => {
    const grouped = groupParticipantsWithGuests(participants);
    setTables(assignSeats(grouped, tableSize, tableShape));
  };

  return (
    <div className="seatingArrangements">
      <h1>Seating Arrangements</h1>
      <CSVImportButton onImport={handleCSVImport} buttonText="Import Seating CSV" />
      <Action.Tray>
        <Action.Add showText buttonText="Arrange Seats" onClick={handleArrange} />
        <Action.Cancel showText buttonText="Clear Tables" onClick={() => setTables([])} />
      </Action.Tray>
      <div className="controls">
        <label>
          Table Size:
          <input
            type="number"
            min={6}
            max={20}
            value={tableSize}
            onChange={e => setTableSize(Number(e.target.value))}
          />
        </label>
        <label>
          Table Shape:
          <select value={tableShape} onChange={e => setTableShape(e.target.value)}>
            <option value="round">Round</option>
            <option value="rectangular">Rectangular</option>
          </select>
        </label>
      </div>
      {importStatus && <p className="importStatus">{importStatus}</p>}
      {tables.length === 0 && <p className="noTables">No seating arrangement yet. Import participants and click "Arrange Seats".</p>}
      {tables.map((table, idx) => (
        <div key={idx} className="tableBlock">
          <h2>Table {idx + 1}</h2>
          <HeaderContainer>
            <p>Seat</p>
            <p>Name</p>
            <p>Role</p>
            <p>Age Category</p>
            <p>Gender</p>
          </HeaderContainer>
          <ListContainer>
            {table.map((p, seatIdx) => (
              <div key={seatIdx} className="tableRow">
                <p>{p.seat}</p>
                <p>{p.UserFirstname} {p.UserLastname}</p>
                <p>{p.UserRoleName}</p>
                <p>{p.AgeCategory || "-"}</p>
                <p>{p.Gender || "-"}</p>
              </div>
            ))}
          </ListContainer>
        </div>
      ))}
    </div>
  );
}

export default SeatingArrangements;