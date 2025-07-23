import { Card, CardContainer } from "../UI/Card.jsx";
import "./Events.scss";
import { useState, useEffect } from "react";
import Action from "../UI/Actions.jsx";
import EventForm from "../entity/event/EventForm.jsx";
import API from "../api/API.js";
import apiEndpoints from "../../components/api/apiEndpoints.js";
import { Link } from "react-router-dom";
import Actions from "../UI/Actions.jsx";
import { ListContainer, HeaderContainer } from "../UI/ListContainer.jsx";
import { filterRecords } from "../../utils/filtering.jsx";
import SearchBar from "../../utils/search.jsx";
import useLoad from "../api/useLoad.js";

function Events() {
  const [showForm, setShowForm] = useState(false);
  const [events, setEvents] = useLoad(apiEndpoints.EVENTS);
  const [visibleEvents, setVisibleEvents] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

  const eventFilterFn = (event, search, filterField) => {
    switch (filterField) {
      case "name":
        return (event.EventName || "").toLowerCase().includes(search);
      case "location":
        return (event.EventLocationName || "").toLowerCase().includes(search);
      default:
        return (
          (event.EventName || "").toLowerCase().includes(search) ||
          (event.EventLocationName || "").toLowerCase().includes(search)
        );
    }
  };

  const eventFilterOptions = [
    { value: "", label: "All Fields" },
    { value: "name", label: "Name" },
    { value: "location", label: "Location" }
  ];

  const handleLoadMore = () => {
    setVisibleEvents((prev) => prev + 10);
  };

  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);
  const handleSuccess = () => {
    handleCancel();
    loadRecords();
  };

  const filteredEvents = events
    ? filterRecords(events, searchTerm, filterField, eventFilterFn)
    : [];

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

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterField={filterField}
        setFilterField={setFilterField}
        filterOptions={eventFilterOptions}
        placeholder="Search events"
      />

      {events === null ? (
        <p>Loading records...</p>
      ) : events.length === 0 ? (
        <p>No records found</p>
      ) : (
        <>
          <CardContainer>
            {filteredEvents.slice(0, visibleEvents).map((event) => (
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
            <div className="buttonContainer">
              <button onClick={handleLoadMore}>Load More</button>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Events;
