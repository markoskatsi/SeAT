import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EventForm.scss";
import Action from "../../UI/Actions.jsx";
import { eventConformance } from "../../../utils/eventConformance.jsx";
import EventFormFields from "./EventFormFields.jsx";
import API from "../../api/API.js";
import apiEndpoints from "../../api/apiEndpoints.js";

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

  // State ------------------------------
  const [event, setEvent] = useState(initialEvent);
  const [location, setLocation] = useState([]);

  const apiGetLocations = async () => {
    const response = await API.get(apiEndpoints.EVENT_LOCATIONS);
    if (response.isSuccess) {
      setLocation(response.result);
    } else {
      setLocation([]);
    }
  };

  const apiPost = async (record) => {
    const response = await API.post(apiEndpoints.EVENTS, record);
    return response;
  };

  useEffect(() => {
    apiGetLocations();
  }, []);

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

    const result = await apiPost(eventData);

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
