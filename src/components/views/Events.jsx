import { Card, CardContainer } from "../UI/Card.jsx";
import "./Events.scss";
import { useState, useEffect } from "react";
import Action from "../UI/Actions.jsx";
import EventForm from "../entity/event/EventForm.jsx";
import API from "../api/API.js";
import apiEndpoints from "../../components/api/apiEndpoints.js";
import { Link } from "react-router-dom";

function Events() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState(null);

  const apiGet = async () => {
    const response = await API.get(apiEndpoints.EVENTS);
    let result;
    if (response && response.isSuccess) {
      result = response.result;
    } else if (response && Array.isArray(response)) {
      result = response;
    } else {
      result = [];
    }
    setEvents(result);
    console.log(result);
  };

  useEffect(() => {
    apiGet();
  }, []);

  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);
  const handleSuccess = () => {
    handleCancel();
    apiGet();
  };

  return (
    <>
      <Action.Tray>
        {!showForm && (
          <Action.Add showText buttonText="ADD NEW EVENT" onClick={handleAdd} />
        )}
      </Action.Tray>

      {showForm && (
        <EventForm
          onCancel={handleCancel}
          onSuccess={handleSuccess}
        />
      )}

      {events === null ? (
        <p>Loading records...</p>
      ) : events.length === 0 ? (
        <p>No records found</p>
      ) : (
        <CardContainer>
          {events.map((event) => (
            <Link to={`/events/${event.EventID}`} className="eventCardLink" key={event.EventID}>
            <div className="eventCard" key={event.EventID}>
              <Card>
                <div>
                  <h3>{event.EventName}</h3>
                  <p>
                    This is a Christmas party of Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. In lacinia neque ac sapien
                    tristique pharetra.{" "}
                  </p>
                </div>
                <p>{new Date(event.EventDatetime).toLocaleDateString()}</p>
              </Card>
            </div>
            </Link>
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default Events;