import PropTypes from "prop-types";
import "./EventItem.scss";
export function EventItem({ event }) {
  return (
    <div className="eventItem">
      <p>{event.EventID}</p>
      <p>{event.EventName}</p>
      <p>{event.EventDescription}</p>
      <p>{event.EventDatetime}</p>
      <p>{event.EventLocationID}</p>
      <p>{event.EventLocationName}</p>
    </div>
  );
}
EventItem.propTypes = {
  event: PropTypes.shape({
    EventID: PropTypes.string.isRequired,
    EventName: PropTypes.string.isRequired,
    EventDescription: PropTypes.string.isRequired,
    EventDatetime: PropTypes.string.isRequired,
    EventLocationID: PropTypes.string.isRequired,
    EventLocationName: PropTypes.string.isRequired,
  }).isRequired,
};
