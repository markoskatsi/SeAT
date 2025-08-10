import "./AttendeeList.scss";

function AttendeeList({
  attendees,
  loadingMessage,
  onSelect,
  selectedAttendee,
}) {
  if (!attendees) return <p>{loadingMessage}</p>;
  if (attendees.length === 0) return <p>No attendees found!</p>;
  return (
    <div className="attendeeList">
      {attendees.map((attendee) => (
        <div
          key={attendee.AttendeeID}
          className={`attendeeListItem${
            selectedAttendee &&
            selectedAttendee.AttendeeID === attendee.AttendeeID
              ? " selected"
              : ""
          }`}
          onClick={() => onSelect(attendee)}
        >
          <div className="attendeeListTitle">
            <span>
              {attendee.AttendeeName || attendee.AttendeeUserName || "No name"}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AttendeeList;
