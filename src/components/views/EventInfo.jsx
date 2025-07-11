import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EventInfo.scss";
import API from "../api/API.js";
import apiEndpoints from "../api/apiEndpoints.js";

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState(null);

  const apiGetAttendees = async () => {
    const response = await API.get(apiEndpoints.ATTENDEES(eventId));
    let result;
    if (response && response.isSuccess) {
      result = response.result;
    } else if (response && Array.isArray(response)) {
      result = response;
    } else {
      result = [];
    }
    setAttendees(result);
    console.log(result);
  };

  useEffect(() => {
    apiGetAttendees();
  }, [eventId]);

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
    <>
      <div className="eventInfo">
        <h1>{event.EventName}</h1>
        <p>{event.EventDescription}</p>
        <p>Date: {new Date(event.EventDatetime).toLocaleString()}</p>
        <p>Location: {event.EventLocationName}</p>
      </div>

      <div className="attendeesList">
        <h2>Attendees</h2>
        {attendees === null ? (
          <p>Loading attendees...</p>
        ) : attendees.length === 0 ? (
          <p>No attendees found</p>
        ) : (
          <ul>
            {attendees.map((attendee) => {
              //if (attendee.AttendeeStatusName === "Confirmed") {
              if (attendee.AttendeeEventName === event.EventName) {
                return (
                  <li key={attendee.AttendeeID}>{attendee.AttendeeUserName}</li>
                );
              }
              //}
            })}
          </ul>
        )}
      </div>
    </>
  );
}

export default EventInfo;
