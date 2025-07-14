import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EventInfo.scss";
import API from "../api/API.js";
import apiEndpoints from "../api/apiEndpoints.js";
import AttendeeModal from "../entity/guest/AttendeeModal.jsx";
import { HeaderContainer, ListContainer } from "../UI/ListContainer.jsx";

function EventInfo() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState(null);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAttendeeModal, setShowAttendeeModal] = useState(false);
  const [attendeeSuccess, setAttendeeSuccess] = useState(false);

  const handleClick = (attendee) => {
    console.log("Attendee clicked:", attendee.AttendeeUserName);
    setSelectedEmployee(attendee);
    setShowAttendeeModal(true);
    console.log("Modal should be open now");
  };

  const handleAttendeeModalClose = () => {
    setShowAttendeeModal(false);
    setSelectedEmployee(null);
  };

  const handleAttendeeSuccess = () => {
    setAttendeeSuccess(true);
  };

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
        <ListContainer>
          <h2>Attendance</h2>
          <HeaderContainer>
            <p>Full Name</p>
            <p>Attendance Status</p>
            <p> </p>
          </HeaderContainer>

          {attendees === null ? (
            <p>Loading attendees...</p>
          ) : attendees.length === 0 ? (
            <p>No attendees found</p>
          ) : (
            attendees.map((attendee) => {
              //if (attendee.AttendeeStatusName === "Confirmed") {
              if (attendee.AttendeeEventName === event.EventName) {
                return (
                  <div className="attendeeItem" key={attendee.AttendeeID}>
                    <p>{attendee.AttendeeUserName}</p>
                    <p>
                      {!attendee.AttendeeStatusName
                        ? "Unknown"
                        : attendee.AttendeeStatusName}
                    </p>
                    {!attendee.AttendeeUserName.includes("Guest") ? (
                      <button
                        className="editButton"
                        onClick={() => handleClick(attendee)}
                      >
                        Edit Plus One
                      </button>
                    ) : (
                      <p> </p>
                    )}
                  </div>
                );
              }
              //}
            })
          )}
        </ListContainer>
        <AttendeeModal
          attendee={selectedEmployee}
          isOpen={showAttendeeModal}
          onClose={handleAttendeeModalClose}
          onSuccess={handleAttendeeSuccess}
        />
      </div>
    </>
  );
}

export default EventInfo;
