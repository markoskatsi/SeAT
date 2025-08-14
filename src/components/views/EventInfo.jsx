import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EventInfo.scss";
import API from "../api/API.js";
import apiEndpoints from "../api/apiEndpoints.js";
import AttendeeCrudler from "../entity/guest/AttendeeCrudler.jsx";

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const response = await API.get(apiEndpoints.EVENT_BY_ID(eventId));
      if (response.isSuccess) {
        setEvent(
          Array.isArray(response.result) ? response.result[0] : response.result
        );
      }
    };
    fetchEvent();
  }, [eventId]);

  if (!event) return <div>Loading...</div>;

  return (
    <div className="eventInfo">
      <h1>{event.EventName}</h1>
      <p>{event.EventDescription}</p>
      <p>Date: {new Date(event.EventDatetime).toLocaleString()}</p>
      <p>Location: {event.EventLocationName}</p>
      <AttendeeCrudler
        eventId={Number(eventId)}
      />
    </div>
  );
}

export default EventInfo;
