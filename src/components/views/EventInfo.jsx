import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EventInfo.scss";
import API from "../api/API.js";
import apiEndpoints from "../api/apiEndpoints.js";
import { HeaderContainer, ListContainer } from "../UI/ListContainer.jsx";
import { filterRecords } from "../../utils/filtering.jsx";
import SearchBar from "../../utils/search.jsx";
import useLoad from "../api/useLoad.js";

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useLoad(apiEndpoints.EVENT_BY_ID(eventId));
  const [attendees, setAttendees] = useLoad(apiEndpoints.ATTENDEES(eventId));

  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

  const attendeeFilterFn = (attendee, search, filterField) => {
    switch (filterField) {
      case "name":
        return (attendee.AttendeeUserName || "").toLowerCase().includes(search);
      case "status":
        return (attendee.AttendeeStatusName || "")
          .toLowerCase()
          .includes(search);
      default:
        return (
          (attendee.AttendeeUserName || "").toLowerCase().includes(search) ||
          (attendee.AttendeeStatusName || "").toLowerCase().includes(search)
        );
    }
  };

  const attendeeFilterOptions = [
    { value: "", label: "All Fields" },
    { value: "name", label: "Name" },
    { value: "status", label: "Status" },
  ];

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

  const filteredAttendees = attendees
    ? filterRecords(attendees, searchTerm, filterField, attendeeFilterFn)
    : [];

  return (
    <>
      <div className="eventInfo">
        <h1>{event.EventName}</h1>
        <p>{event.EventDescription}</p>
        <p>Date: {new Date(event.EventDatetime).toLocaleString()}</p>
        <p>Location: {event.EventLocationName}</p>
      </div>

      <div className="attendeesList">
        {/* Add SearchBar for attendees */}
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterField={filterField}
          setFilterField={setFilterField}
          filterOptions={attendeeFilterOptions}
          placeholder="Search attendees"
        />
        <ListContainer>
          <h2>Attendance</h2>
          <HeaderContainer>
            <p>Full Name</p>
            <p>Attendance Status</p>
            <p> </p>
          </HeaderContainer>

          {attendees === null ? (
            <p>Loading attendees...</p>
          ) : filteredAttendees.length === 0 ? (
            <p>No attendees found</p>
          ) : (
            filteredAttendees.map((attendee) => {
              if (attendee.AttendeeEventName === event.EventName) {
                return (
                  <div className="attendeeItem" key={attendee.AttendeeID}>
                    <p>{attendee.AttendeeUserName}</p>
                    <p>{attendee.AttendeeStatusName}</p>
                    {!attendee.AttendeeUserName.includes("Guest") ? (
                      <button className="editButton">Edit Plus One</button>
                    ) : (
                      <p> </p>
                    )}
                  </div>
                );
              }
            })
          )}
        </ListContainer>
      </div>
    </>
  );
}

export default EventInfo;
