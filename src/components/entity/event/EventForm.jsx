import PropTypes from "prop-types";
import Form from "../../UI/Form.jsx";
import "./EventForm.scss";
import { eventConformance } from "../../../utils/eventConformance.jsx";

const initialEvent = {
  EventID: "",
  EventName: "",
  EventDescription: "",
  EventDatetime: "",
  EventLocationID: "",
  EventLocationName: "",
};

function EventForm({ onSubmit, onCancel, dropdowns }) {
  const validation = {
    isValid: {
      EventID: (id) => Number(id) > 0,
      EventName: (name) => name && name.length > 1,
      EventDescription: (desc) => desc && desc.length > 1,
      EventDatetime: (date) => date,
      EventLocationID: (id) => id > 0,
      EventLocationName: (name) => name,
    },
    errorMessage: {
      EventName: "Event name must be at least 2 characters long",
      EventDescription: "Event description is required",
      EventDatetime: "Event date is required",
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

  // View --------------------------------
  const locations = dropdowns.locations;

  return (
    <Form className="formTray" onSubmit={handleSubmit} onCancel={onCancel}>
      <div className="eventLeft">
        <Form.Item label="Event Name" error={errors.EventName}>
          <input
            type="text"
            name="EventName"
            value={eventConformance.js2html["EventName"](event.EventName)}
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
      </div>

      <div className="eventRight">
        <Form.Item label="Event Date" error={errors.EventDatetime}>
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
          {!locations.list ? (
            <p>{locations.loadingMessage}</p>
          ) : locations.list.length === 0 ? (
            <p>No locations available</p>
          ) : (
            <select
              name="EventLocationID"
              value={eventConformance.js2html["EventLocationID"](
                event.EventLocationID
              )}
              onChange={handleChange}
            >
              <option value="">-- Select Location --</option>
              {locations.list.map((loc) => (
                <option key={loc.LocationID} value={loc.LocationID}>
                  {loc.LocationName}
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
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,

};

export default EventForm;
