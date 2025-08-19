import { ListContainer, HeaderContainer } from "../../UI/ListContainer";

export default function AttendeeTable({ attendees, tableNumber }) {
  if (!attendees) return <p>Loading</p>;

  if (attendees.length === 0) return <p>No attendees found</p>;

  return (
    <ListContainer>
      <HeaderContainer>
        <p>Table {tableNumber}</p>
      </HeaderContainer>

      {attendees.map((attendee) => (
        <div key={attendee.ID} className="attendeeItem">
          <p>{attendee.AttendeeName || "N/A"}</p>
        </div>
      ))}
    </ListContainer>
  );
}
