import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EventForm.scss";
import Action from "../../UI/Actions.jsx";
import { eventConformance } from "../../../utils/eventConformance.jsx";
import EventFormFields from "./EventFormFields.jsx";

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
      [name]: eventConformance.html2js[name](value),
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
      <EventFormFields
        event={event}
        location={location}
        handleChange={handleChange}
      />
      <Action.Tray>
        <Action.Submit showText buttonText="ADD EVENT" onClick={handleSubmit} />
        <Action.Cancel showText buttonText="CANCEL" onClick={onCancel} />
      </Action.Tray>
    </div>
  );
}

EventForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default EventForm;
