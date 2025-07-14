import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./AttendeeModal.scss";
import Action from "../../UI/Actions.jsx";
import API from "../../api/API.js";
import apiEndpoints from "../../api/apiEndpoints.js";

function AttendeeModal({ attendee, isOpen, onClose, onSuccess }) {
  const [selectedEventID, setSelectedEventID] = useState("");
  const [selectedStatusID, setSelectedStatusID] = useState("");
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
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

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) {
    return null;
  }

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
              <strong>Employee:</strong> {attendee.AttendeeUserName}
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
        </div>

        <div className="modal-footer">
          <Action.Tray>
            <Action.Submit
              showText
              buttonText={loading ? "ADDING GUEST..." : "ADD PLUS ONE"}
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
