import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AttendeeModal.scss";
import Action from "../../UI/Actions.jsx";
import API from "../../api/API.js";
import apiEndpoints from "../../api/apiEndpoints.js";

function AttendeeModal({ employee, isOpen, onClose, onSuccess }) {
  const [events, setEvents] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [selectedEventID, setSelectedEventID] = useState("");
  const [selectedStatusID, setSelectedStatusID] = useState("");
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadEvents();
      loadStatuses();
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setSelectedEventID("");
    setSelectedStatusID("");
    setGuestFirstName("");
    setGuestLastName("");
    setGuestEmail("");
  };

  const loadEvents = async () => {
    const response = await API.get(apiEndpoints.EVENTS);
    if (response.isSuccess) {
      setEvents(response.result);
    } else {
      setEvents([]);
    }
  };

  const loadStatuses = async () => {
    const response = await API.get(apiEndpoints.STATUS);
    if (response.isSuccess) {
      setStatuses(response.result);
      const invitedStatus = response.result.find(
        (status) => status.StatusName.toLowerCase() === "invited"
      );
      if (invitedStatus) {
        setSelectedStatusID(invitedStatus.StatusID.toString());
      }
    } else {
      setStatuses([]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedEventID) {
      alert("Please select an event");
      return;
    }
    if (!guestFirstName.trim()) {
      alert("Please enter guest's first name");
      return;
    }
    if (!guestLastName.trim()) {
      alert("Please enter guest's last name");
      return;
    }
    if (!guestEmail.trim()) {
      alert("Please enter guest's email");
      return;
    }

    setLoading(true);

    try {
      const guestUserData = {
        UserFirstname: guestFirstName.trim(),
        UserLastname: guestLastName.trim(),
        UserEmail: guestEmail.trim(),
        UserDateofbirth: new Date().toISOString(),
        UserImageURL:
          "https://images.generated.photos/m8Sph5rhjkIsOiVIp4zbvIuFl43F6BWIwhkkY86z2Ms/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODU4MTE5LmpwZw.jpg",
        UserUsertypeID: "3", 
        UserRoleID: null,
        UserGuestofID: employee.UserID, 
      };

      const userResult = await API.post(apiEndpoints.USERS, guestUserData);

      if (!userResult.isSuccess) {
        alert(userResult.message || "Failed to create guest user");
        setLoading(false);
        return;
      }

      const attendeeData = {
        AttendeeUserID: userResult.result.UserID || userResult.result.insertId, 
        AttendeeEventID: parseInt(selectedEventID),
        AttendeeStatusID: selectedStatusID ? parseInt(selectedStatusID) : null,
      };

      const attendeeResult = await API.post(
        apiEndpoints.ATTENDEES,
        attendeeData
      );

      if (attendeeResult.isSuccess) {
        onSuccess();
        handleClose();
      } else {
        alert(attendeeResult.message || "Failed to add guest to event");
      }
    } catch (error) {
      alert("An error occurred while adding the guest");
      console.error(error);
    }

    setLoading(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Plus One</h2>
          <button className="close-button" onClick={handleClose}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <div className="employee-info">
            <h3>Adding Plus One For</h3>
            <p>
              <strong>Employee:</strong> {employee.UserFirstname}{" "}
              {employee.UserLastname}
            </p>
            <p>
              <strong>Role:</strong> {employee.UserRoleName || "None"}
            </p>
            <p>
              <strong>Type:</strong> {employee.UserUsertypeName || "None"}
            </p>
          </div>

          <div className="guest-form">
            <h3>Guest Information</h3>

            <div className="form-row">
              <label>
                First Name *
                <input
                  type="text"
                  value={guestFirstName}
                  onChange={(e) => setGuestFirstName(e.target.value)}
                  placeholder="Guest's first name"
                />
              </label>

              <label>
                Last Name *
                <input
                  type="text"
                  value={guestLastName}
                  onChange={(e) => setGuestLastName(e.target.value)}
                  placeholder="Guest's last name"
                />
              </label>
            </div>

            <label>
              Email *
              <input
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                placeholder="Guest's email address"
              />
            </label>
          </div>

          <div className="event-form">
            <h3>Event Details</h3>

            <label>
              Select Event *
              <select
                value={selectedEventID}
                onChange={(e) => setSelectedEventID(e.target.value)}
              >
                <option value="">-- Select Event --</option>
                {events.map((event) => (
                  <option key={event.EventID} value={event.EventID}>
                    {event.EventName} - {formatDate(event.EventDatetime)}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Attendance Status
              <select
                value={selectedStatusID}
                onChange={(e) => setSelectedStatusID(e.target.value)}
              >
                <option value="">-- No Status --</option>
                {statuses.map((status) => (
                  <option key={status.StatusID} value={status.StatusID}>
                    {status.StatusName}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <Action.Tray>
            <Action.Submit
              showText
              buttonText={loading ? "ADDING GUEST..." : "ADD PLUS ONE"}
              onClick={handleSubmit}
              disabled={loading}
            />
            <Action.Cancel showText buttonText="CANCEL" onClick={handleClose} />
          </Action.Tray>
        </div>
      </div>
    </div>
  );
}

AttendeeModal.propTypes = {
  employee: PropTypes.object,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default AttendeeModal;
