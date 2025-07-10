import PropTypes from "prop-types";
import { eventConformance } from "../../../utils/eventConformance.jsx";

function EventFormFields({ event, location, handleChange }) {
  return (
    <div className="formTray">
      <div className="eventLeft">
        <label>
          Event Name
          <input
            type="text"
            name="EventName"
            value={eventConformance.js2html["EventName"](event.EventName)}
            onChange={handleChange}
          />
        </label>

        <label>
          Event Description
          <input
            type="text"
            name="EventDescription"
            value={eventConformance.js2html["EventDescription"](
              event.EventDescription
            )}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="eventRight">
        <label>
          Event Date
          <input
            type="datetime-local"
            name="EventDatetime"
            value={eventConformance.js2html["EventDatetime"](
              event.EventDatetime
            )}
            onChange={handleChange}
          />
        </label>

        <label>
          Event Location
          <select
            name="EventLocationID"
            value={eventConformance.js2html["EventLocationID"](
              event.EventLocationID
            )}
            onChange={handleChange}
          >
            <option value="">-- Select Location --</option>
            {location.map((loc) => (
              <option key={loc.LocationID} value={loc.LocationID}>
                {loc.LocationName}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}

EventFormFields.propTypes = {
  event: PropTypes.object.isRequired,
  location: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default EventFormFields;
