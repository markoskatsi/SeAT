import "./AttendeeList.scss";
import { ListContainer, HeaderContainer } from "../../UI/ListContainer.jsx";

function AttendeeList({
  attendees,
  loadingMessage,
  onSelect,
  selectedAttendee,
}) {
  if (!attendees) return <p>{loadingMessage}</p>;
  if (attendees.length === 0) return <p>No attendees found!</p>;
  return (
      <ListContainer>
        <HeaderContainer>
          <p>Name</p>
          <p>Title</p>
          <p>Position</p>
          <p>Age Group</p>
          <p>Partner Name</p>
          <p>Location</p>
        </HeaderContainer>
        {attendees.map((attendee, idx) => (
          <AttendeeListItem
            key={attendee.ID || idx}
            attendee={attendee}
            onSelect={onSelect}
            selected={
              selectedAttendee &&
              (selectedAttendee.ID === attendee.ID ||
                selectedAttendee === attendee)
            }
            className={idx === 0 && selectedAttendee ? "animate-push" : ""}
          />
        ))}
      </ListContainer>
    );
}

function AttendeeListItem({ attendee, onSelect, selected, className = "" }) {
  const handleSelect = () => {
    onSelect(attendee);
  };
  return (
    <div
      className={`attendeeItem${selected ? " selected" : ""}${
        className ? " " + className : ""
      }`}
      onClick={handleSelect}
    >
      <p>{attendee.AttendeeName || "N/A"}</p>
      <p>{attendee.AttendeeTitle || "N/A"}</p>
      <p>{attendee.AttendeePosition || "N/A"}</p>
      <p>{attendee.AttendeeAgeGroup || "N/A"}</p>
      <p>{attendee.AttendeePartnerGuestName || ""}</p>
      <p>{attendee.AttendeeLocation || "N/A"}</p>
    </div>
  );
}

export default AttendeeList;
