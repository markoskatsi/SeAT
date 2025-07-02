import { Card, CardContainer } from "../UI/Card.jsx";
import "./Events.scss";
import { useState, useEffect } from "react";
import Action from "../UI/Actions.jsx";
import EventForm from "../entity/event/EventForm.jsx";

function Events() {
  const apiURL = "https://softwarehub.uk/unibase/seat/api";
  const eventListEndpoint = `${apiURL}/events`;

  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useState([]);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setEvents(result);
    //console.log(result);
  };

  useEffect(() => {
    apiGet(eventListEndpoint);
  }, [eventListEndpoint]);

  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);
  const handleSuccess = () => {
    handleCancel();
    apiGet(eventListEndpoint);
  };

  return (
    <>
      <h1>Events</h1>

      <Action.Tray>
        {!showForm && (
          <Action.Add showText buttonText="ADD NEW EVENT" onClick={handleAdd} />
        )}
      </Action.Tray>

      {showForm && (
        <EventForm
          onCancel={handleCancel}
          onSuccess={handleSuccess}
          apiURL={apiURL}
        />
      )}

      {!events ? (
        <p>Loading records...</p>
      ) : events.length === 0 ? (
        <p>No records found</p>
      ) : (
        <CardContainer>
          {events.map((event) => (
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
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default Events;
