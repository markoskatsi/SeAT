import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EventInfo.scss";
import API from "../api/API.js";
import apiEndpoints from "../api/apiEndpoints.js";
import { HeaderContainer, ListContainer } from "../UI/ListContainer.jsx";
import { filterRecords } from "../../utils/filtering.jsx";
import SearchBar from "../../utils/search.jsx";
import useLoad from "../api/useLoad.js";
import AttendeeModal from "../entity/guest/AttendeeModal.jsx";
import { AttendeeItem } from "../entity/guest/AttendeeItem.jsx";

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useLoad(apiEndpoints.EVENT_BY_ID(eventId));
  const [attendees, setAttendees, loadingAttendeesMessage, loadAttendees] =
    useLoad(apiEndpoints.ATTENDEES(eventId));

  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

  const [selectedAttendee, setSelectedAttendee] = useState(null);
  const [showAttendeeModal, setShowAttendeeModal] = useState(false);
  const [attendeeSuccess, setAttendeeSuccess] = useState(false);

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
  const handleClick = (attendee) => {
    console.log("Attendee clicked:", attendee.AttendeeUserName);
    setSelectedAttendee(attendee);
    setShowAttendeeModal(true);
    console.log("Modal should be open now");
  };

  const handleAttendeeModalClose = () => {
    setShowAttendeeModal(false);
    setSelectedAttendee(null);
  };

  const handleAttendeeSuccess = async () => {
    setAttendeeSuccess(true);
    await loadAttendees(apiEndpoints.ATTENDEES(eventId));
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
                  <AttendeeItem
                    attendee={attendee}
                    key={attendee.AttendeeID}
                    onClick={() => handleClick(attendee)}
                  />
                );
              }
            })
          )}
        </ListContainer>
        <AttendeeModal
          attendee={selectedAttendee}
          isOpen={showAttendeeModal}
          onClose={handleAttendeeModalClose}
          onSuccess={handleAttendeeSuccess}
        />
      </div>
    </>
  );
}

export default EventInfo;
