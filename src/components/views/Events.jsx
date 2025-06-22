import { Card, CardContainer } from "../UI/Card.jsx";
import "./Events.scss";
import { useState, useEffect } from "react";
import Action from "../UI/Actions.jsx";
import EventForm from "../entity/event/EventForm.jsx";

function Events() {
  /* const eventlist = [
    {
      EventID: 1,
      EventName: "Christmas Party 2025",
      Description: "A jolly good time",
      Date: "2025-12-23",
      EventImageURL:
        "https://images.freeimages.com/images/small-previews/9b8/electronic-components-2-1242738.jpg",
    },
    {
      EventID: 2,
      EventName: "Christmas Party 2026",
      Description: "A jolly good time, but next year!",
      Date: "2026-12-23",
      EventImageURL:
        "https://images.freeimages.com/images/small-previews/411/light-of-technology-1510575.jpg",
    },
    {
      EventID: 3,
      EventName: "Christmas Party 2027",
      Description: "A jolly good time, but in 2 years!",
      Date: "2027-12-23",
      EventImageURL:
        "https://images.freeimages.com/images/small-previews/64b/vla-1-1315506.jpg",
    },
    {
      EventID: 4,
      EventName: "Christmas Party 2028",
      Description: "A jolly good time, but in 3!",
      Date: "2028-12-23",
      EventImageURL:
        "https://images.freeimages.com/images/small-previews/293/cable-4-1243085.jpg",
    },
    {
      EventID: 5,
      EventName: "Christmas Party 2029",
      Description:
        "A jolly good time, but in 4 years! You can never be too safe!",
      Date: "2029-12-23",
      EventImageURL:
        "https://images.freeimages.com/images/small-previews/fa1/cable-5-1243077.jpg",
    },
  ]; */

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
          <Action.Add showText buttonText="Add new event" onClick={handleAdd} />
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
                <h3>{event.EventName}</h3>
                <p>{event.Description}</p>
                <p>
                  Date: {new Date(event.EventDatetime).toLocaleDateString()}
                </p>
                <img src={event.EventImageURL} alt={event.EventName} />
              </Card>
            </div>
          ))}
        </CardContainer>
      )}
    </>
  );
}

export default Events;
