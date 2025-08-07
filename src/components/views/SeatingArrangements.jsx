import { useState } from "react";
import CSVImportButton from "../../utils/CSVImportButton.jsx";
import Action from "../UI/Actions.jsx";
import { ListContainer, HeaderContainer } from "../UI/ListContainer.jsx";
import { normaliseParticipants, groupParticipantsWithGuests } from "../../utils/employeeConformance.jsx";

function assignSeats(groupedParticipants, tableSize = 8) {
  const tables = [];
  let table = [];
  let seatNumber = 1;
  let tableNumber = 1;

  groupedParticipants.forEach((group, groupIdx) => {
    // Try to find a table where no one in the group will be adjacent to a previous neighbor
    let placed = false;
    for (let tIdx = 0; tIdx < tables.length; tIdx++) {
      const candidateTable = tables[tIdx];
      // Check adjacency with last person in candidateTable and first in group
      const lastPerson = candidateTable[candidateTable.length - 1];
      const firstPerson = group[0];
      if (
        lastPerson &&
        lastPerson.previousNeighbors &&
        lastPerson.previousNeighbors.includes(firstPerson.id)
      ) {
        continue; // Skip this table, adjacency conflict
      }
      // Check if adding group would exceed table size
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
      // Start a new table
      table = [];
      seatNumber = 1;
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

  // Remove tables smaller than 6 (except last table if needed)
  for (let i = 0; i < tables.length - 1; i++) {
    if (tables[i].length < 6) {
      // Move people to next table if possible
      tables[i + 1] = [...tables[i], ...tables[i + 1]];
      tables[i] = [];
    }
  }
  // Filter out empty tables
  return tables.filter((t) => t.length > 0);
}

function SeatingArrangements() {
  const [participants, setParticipants] = useState([]);
  const [tables, setTables] = useState([]);
  const [tableSize, setTableSize] = useState(8);

  const handleCSVImport = (rawData) => {
    const normalized = normaliseParticipants(rawData);
    const grouped = groupParticipantsWithGuests(normalized);
    setParticipants(normalized);
    // setTables(assignSeats(grouped)); // Example usage
  };

  const handleArrange = () => {
    setTables(assignSeats(participants));
  };

  return (
    <div>
      <h1>Seating Arrangements</h1>
      <CSVImportButton onImport={handleCSVImport} buttonText="Import Seating CSV" />
      <Action.Tray>
        <Action.Add showText buttonText="Arrange Seats" onClick={handleArrange} />
      </Action.Tray>
      <input
        type="number"
        min={6}
        max={20}
        value={tableSize}
        onChange={e => setTableSize(Number(e.target.value))}
        style={{ marginBottom: "16px" }}
      />
      {tables.map((table, idx) => (
        <div key={idx} style={{ margin: "24px 0", border: "1px solid #ccc", borderRadius: 8, padding: 16 }}>
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
              <div key={seatIdx} style={{ display: "flex", width: "100%" }}>
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