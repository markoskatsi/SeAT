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
  const [visibleEvents, setVisibleEvents] = useState(10);

  const handleLoadMore = () => {
    setVisibleEvents((prev) => prev + 10);
  };

  const loadRecords = async () => {
    const response = await API.get(`${apiEndpoints.EVENTS}?limit=10`);
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
    loadRecords();
  }, []);

  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);
  const handleSuccess = () => {
    handleCancel();
    loadRecords();
  };

  return (
    <>
      <Action.Tray>
        {!showForm && (
          <Action.Add showText buttonText="ADD NEW EVENT" onClick={handleAdd} />
        )}
      </Action.Tray>

      {showForm && (
        <EventForm onCancel={handleCancel} onSuccess={handleSuccess} />
      )}

      {events === null ? (
        <p>Loading records...</p>
      ) : events.length === 0 ? (
        <p>No records found</p>
      ) : (
        <>
          <CardContainer>
            {events.slice(0, visibleEvents).map((event) => (
              <Link
                to={`/events/${event.EventID}`}
                className="eventCardLink"
                key={event.EventID}
              >
                <div className="eventCard" key={event.EventID}>
                  <Card>
                    <div>
                      <h3>{event.EventName}</h3>
                      <p>{event.EventDescription}</p>
                    </div>
                    <p>{new Date(event.EventDatetime).toLocaleDateString()}</p>
                  </Card>
                </div>
              </Link>
            ))}
          </CardContainer>
          {visibleEvents < events.length && (
            <div className="buttonContainer"><button onClick={handleLoadMore}>Load More</button></div>
          )}
        </>
      )}
    </>
  );
}

export default Events;
