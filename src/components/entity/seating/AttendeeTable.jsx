import { ListContainer, HeaderContainer } from "../../UI/ListContainer";
import { Table, HeaderTable } from "../../UI/Table.jsx";

export default function AttendeeTable({ attendees, tableNumber }) {
  if (!attendees) return <p>Loading</p>;

  if (attendees.length === 0) return <p>No attendees found</p>;

  return (
    <Table>
      <HeaderTable>
        <p>{tableNumber}</p>
      </HeaderTable>

      {attendees.map((attendee) => (
        <div key={attendee.ID} className="attendeeItem">
          <p>{attendee.AttendeeName || attendee.AttendeeUserName|| "N/A"}</p>
        </div>
      ))}
    </Table>
  );
}
