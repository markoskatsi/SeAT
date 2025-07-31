import PropTypes from "prop-types";
import { eventConformance } from "../../../utils/eventConformance.jsx";
import Form from "../../UI/Form.jsx";

const initialEvent = {
  EventID: "",
  EventName: "",
  EventDescription: "",
  EventDatetime: "",
  EventLocationID: "",
  EventLocationName: "",
};

function EventForm({ onSubmit, onCancel, dropdowns }) {
  // Initialisation --------------------

  const validation = {
    isValid: {
      EventName: (name) => name && name.length > 1,
      EventDescription: (name) => name && name.length > 1,
      EventDatetime: (date) => date,
      EventLocationID: (id) => id > 0,
  },
    errorMessage: {
      EventName: "Event name must be at least 2 characters long",
      EventDescription: "Event description must be at least 2 characters long",
      EventDatetime: "Event date and time is required",
      EventLocationID: "Event location must be selected",
    },
  };

  // State ------------------------------

  const [event, errors, handleChange, handleSubmit] = Form.useForm(
    initialEvent,
    eventConformance,
    validation,
    onSubmit
  );

  // Handlers ---------------------------
  // View --------------------------------
  const locations = dropdowns.locations;
  return (
    <Form className="formTray" onSubmit={handleSubmit} onCancel={onCancel}>
      <div className="employeeLeft">
        <Form.Item label="Event Name" error={errors.EventName}>
          <input
            type="text"
            name="EventName"
            value={eventConformance.js2html["EventName"](
              event.EventName
            )}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Event Description" error={errors.EventDescription}>
          <input
            type="text"
            name="EventDescription"
            value={eventConformance.js2html["EventDescription"](
              event.EventDescription
            )}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Event Date and Time" error={errors.EventDatetime}>
          <input
            type="datetime-local"
            name="EventDatetime"
            value={eventConformance.js2html["EventDatetime"](
              event.EventDatetime
            )}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Event Location" error={errors.EventLocationID}>
          {!locations ? (
            <p>Loading locations...</p>
          ) : locations.length === 0 ? (
            <p>No locations available</p>
          ) : (
            <select
              name="EventLocationID"
              value={eventConformance.js2html["EventLocationID"](
                event.EventLocationID
              )}
              onChange={handleChange}
            >
              <option value="0">None selected</option>
              {locations.list.map((location) => (
                <option key={location.LocationID} value={location.LocationID}>
                  {location.LocationName}
                </option>
              ))}
            </select>
          )}
        </Form.Item>
      </div>
    </Form>
  );
}

EventForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  dropdowns: PropTypes.shape({
    locations: PropTypes.shape({
      list: PropTypes.array.isRequired,
      loadingMessage: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default EventForm;