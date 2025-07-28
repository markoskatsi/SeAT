import PropTypes from "prop-types";
export function AttendeeItem({ attendee,  onClick}) {
  return (
    <div className="attendeeItem">
      <p>{attendee.AttendeeUserName}</p>
      {!attendee.AttendeeUserName.includes("Guest") ? (
        <button className="editButton" onClick={() => onClick(attendee)}>
          Edit Plus One
        </button>
      ) : (
        <p> </p>
      )}
    </div>
  );
}
AttendeeItem.propTypes = {
  attendee: PropTypes.shape({
    AttendeeID: PropTypes.string.isRequired,
    AttendeeUserID: PropTypes.string.isRequired,
    AttendeeEventID: PropTypes.string.isRequired,
    AttendeeStatusID: PropTypes.string.isRequired,
    AttendeeUserName: PropTypes.string.isRequired,
    AttendeeEventName: PropTypes.string.isRequired,
    AttendeeStatusName: PropTypes.string.isRequired,
  }).isRequired,
};
