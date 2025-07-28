import PropTypes from "prop-types";
import "./EventItem.scss";
export function EventItem({ event }) {
  return (
    <div className="eventItem">
      <div>
        <h3>{event.EventName}</h3>
        <p>{event.EventDescription}</p>
      </div>
      <div className="eventLocationDate">
        <p>{event.EventLocationName}</p>
        <p>
          {new Date(event.EventDatetime).toLocaleString([], {
            dateStyle: "short",
            timeStyle: "short",
          })}
        </p>
      </div>
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
