import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EventForm.scss";
import Action from "../../UI/Actions.jsx";

const initialEvent = {
  EventID: "",
  EventName: "",
  EventDescription: "",
  EventDatetime: "",
  EventLocationID: "",
  EventLocationName: "",
};

function EventForm({ onSuccess, onCancel }) {
  // Initialisation --------------------

  const conformance = {
    html2js: {
      EventID: (value) => (value === "" ? null : value),
      EventName: (value) => (value === "" ? null : value),
      EventDescription: (value) => (value === "" ? null : value),
      EventDatetime: (value) => (value === "" ? null : value),
      EventLocationID: (value) => (value === "" ? null : value),
      EventLocationName: (value) => (value === "0" ? null : value),
    },
    js2html: {
      EventID: (value) => (value === null ? "" : value),
      EventName: (value) => (value === null ? "" : value),
      EventDescription: (value) => (value === null ? "" : value),
      EventDatetime: (value) => (value === null ? "" : value),
      EventLocationID: (value) => (value === null ? "" : value),
      EventLocationName: (value) => (value === null ? "0" : value),
    },
  };

  const apiURL = "https://softwarehub.uk/unibase/seat/api";
  const eventEndpoint = `${apiURL}/events`;
  const eventLocationEndpoint = `${apiURL}/locations`;

  // State ------------------------------

  const [event, setEvent] = useState(initialEvent);
  const [location, setLocation] = useState([]);

  const apiGet = async (endpoint, setState) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setState(result);
  };

  const apiPost = async (endpoint, record) => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    };

    const response = await fetch(endpoint, request);
    const result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  useEffect(() => {
    apiGet(eventEndpoint, setEvent);
  }, [eventEndpoint]);

  useEffect(() => {
    apiGet(eventLocationEndpoint, setLocation);
  }, [eventLocationEndpoint]);

  // Handlers ---------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent((prev) => ({
      ...prev,
      [name]: conformance.html2js[name](value),
    }));
  };

  const handleSubmit = async () => {
    const eventData = {
      EventName: event.EventName,
      EventDescription: event.EventDescription,
      EventDatetime: new Date(event.EventDatetime).toISOString(),
      EventLocationID: event.EventLocationID,
      EventLocationName: event.EventLocationName,
    };

    if (
      !eventData.EventName ||
      !eventData.EventDescription ||
      !eventData.EventDatetime ||
      !eventData.EventLocationID
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const result = await apiPost(eventEndpoint, eventData);

    if (result.isSuccess) {
      onSuccess();
    } else {
      alert(result.message);
    }
  };

  // View --------------------------------
  return (
    <div className="eventForm">
      <div className="formTray">
        <label>
          Event Name
          <input
            type="text"
            name="EventName"
            value={conformance.js2html["EventName"](event.EventName)}
            onChange={handleChange}
          />
        </label>

        <label>
          Event Description
          <input
            type="text"
            name="EventDescription"
            value={conformance.js2html["EventDescription"](
              event.EventDescription
            )}
            onChange={handleChange}
          />
        </label>

        <label>
          Event Date
          <input
            type="datetime-local" // Change from type="date" to type="datetime-local"
            name="EventDatetime"
            value={conformance.js2html["EventDatetime"](event.EventDatetime)}
            onChange={handleChange}
          />
        </label>

        <label>
          Event Location
          <select
            name="EventLocationID"
            value={conformance.js2html["EventLocationID"](
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

      <Action.Tray>
        <Action.Submit showText onClick={handleSubmit} />
        <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
      </Action.Tray>
    </div>
  );
}

EventForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default EventForm;
