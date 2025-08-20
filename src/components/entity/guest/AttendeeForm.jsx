import { useState, useEffect } from "react";
import Action from "../../UI/Actions.jsx";
import API from "../../api/API.js";
import apiEndpoints from "../../api/apiEndpoints.js";
import "./AttendeeForm.scss";

function AttendeeForm({
  attendee: attendeeProp,
  eventId,
  eventName,
  statusName = "Invited",
  onSubmit,
  onCancel,
}) {
  const [guestFirstName, setGuestFirstName] = useState("");
  const [guestLastName, setGuestLastName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestDateOfBirth, setGuestDateOfBirth] = useState("1899-11-30");
  const [guestImageURL, setGuestImageURL] = useState(
    "https://example.com/images/1.jpg"
  );
  const [guestUsertypeID, setGuestUsertypeID] = useState(2);
  const [guestRoleID, setGuestRoleID] = useState(1);
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployeeID, setSelectedEmployeeID] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]);
  const [selectedStatusID, setSelectedStatusID] = useState(1);
  const [selectedStatusName, setSelectedStatusName] = useState(statusName);

  useEffect(() => {
    // Fetch status options from API
    API.get(apiEndpoints.STATUS).then((res) => {
      if (res.isSuccess) setStatusOptions(res.result);
    });
    // Fetch all employees from USERS endpoint
    API.get(apiEndpoints.USERS).then((res) => {
      if (res.isSuccess) setEmployees(res.result);
    });
    setGuestFirstName("");
    setGuestLastName("");
    setGuestEmail("");
    setGuestDateOfBirth("1899-11-30");
    setGuestImageURL("https://example.com/images/1.jpg");
    setGuestUsertypeID(2);
    setGuestRoleID(1);
    setSelectedEmployeeID("");
    setSelectedEmployee(null);
  }, []);

  useEffect(() => {
    if (Array.isArray(statusOptions)) {
      const statusObj = statusOptions.find(
        (opt) => String(opt.StatusID) === String(selectedStatusID)
      );
      setSelectedStatusName(statusObj ? statusObj.StatusName : "Invited");
    }
  }, [selectedStatusID, statusOptions]);

  useEffect(() => {
    if (selectedEmployeeID) {
      const emp = employees.find(
        (e) => String(e.UserID) === String(selectedEmployeeID)
      );
      setSelectedEmployee(emp || null);
    } else {
      setSelectedEmployee(null);
    }
  }, [selectedEmployeeID, employees]);

  const handleAdd = async (e) => {
    console.log("eventId passed to AttendeeForm:", eventId);
    if (!eventId || isNaN(Number(eventId)) || Number(eventId) < 1) {
      alert("Invalid event ID. Cannot add attendee.");
      setLoading(false);
      return;
    }
    if (!eventName || eventName.trim() === "") {
      alert("Event name is required to add attendee.");
      setLoading(false);
      return;
    }

    if (!guestFirstName.trim() || !guestLastName.trim()) {
      alert("Guest first and last name are required.");
      setLoading(false);
      return;
    }

    let validStatusID = selectedStatusID;
    let validStatusName = selectedStatusName;
    if (!validStatusID || isNaN(Number(validStatusID))) {
      validStatusID = 1;
    }
    if (
      !validStatusName ||
      typeof validStatusName !== "string" ||
      validStatusName.trim() === ""
    ) {
      validStatusName = "Invited";
    }
    if (!validStatusID || !validStatusName) {
      alert("Attendee status is required.");
      setLoading(false);
      return;
    }
    e.preventDefault();
    if (!selectedEmployee) {
      alert("Please select an employee.");
      return;
    }
    setLoading(true);
    const guestUser = {
      UserFirstname: guestFirstName,
      UserLastname: guestLastName,
      UserEmail: guestEmail,
      UserDateofbirth: guestDateOfBirth + "T00:00:00.000Z",
      UserImageURL: guestImageURL,
      UserUsertypeID: guestUsertypeID,
      UserRoleID: guestRoleID,
      UserGuestofID: selectedEmployee.UserID,
      UserActive: 1,
      UserUsertypeName:
        statusOptions.find(
          (opt) => String(opt.StatusID) === String(guestUsertypeID)
        )?.StatusName || "Guest",
      UserRoleName: "None",
      UserGuestofName: selectedEmployee
        ? `${selectedEmployee.UserFirstname}, ${selectedEmployee.UserLastname} (${selectedEmployee.UserEmail})`
        : "",
    };
    const guestResult = await API.post(apiEndpoints.USERS, guestUser);
    if (guestResult.isSuccess) {
      const guestUserID = guestResult.result[0].UserID;
      const attendeeData = {
        AttendeeUserID: guestUserID,
        AttendeeEventID: Number(eventId),
        AttendeeStatusID: validStatusID,
        AttendeeUserName: guestFirstName + " " + guestLastName,
        AttendeeEventName: eventName || "",
        AttendeeStatusName: validStatusName,
      };
      const result = await API.post(apiEndpoints.ATTENDEES, attendeeData);
      if (result.isSuccess) {
        if (onSubmit) onSubmit();
        if (onCancel) onCancel();
      } else {
        alert(
          "Failed to add attendee: " +
            (result.message || "Unknown error") +
            "\nPayload: " +
            JSON.stringify(attendeeData, null, 2)
        );
      }
    } else {
      alert(guestResult.message);
    }
    setLoading(false);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Plus One</h2>
        </div>
        <div className="modal-body">
          <div className="employee-info">
            <h3>Select Employee For Plus One</h3>
            <select
              value={selectedEmployeeID}
              onChange={(e) => setSelectedEmployeeID(e.target.value)}
              required
            >
              <option value="">-- Select Employee --</option>
              {employees.map((emp) => (
                <option key={emp.UserID} value={emp.UserID}>
                  {emp.UserFirstname} {emp.UserLastname} ({emp.UserEmail})
                </option>
              ))}
            </select>
            {selectedEmployee && (
              <p>
                <strong>Employee:</strong> {selectedEmployee.UserFirstname}{" "}
                {selectedEmployee.UserLastname}
              </p>
            )}
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
                  required
                />
              </label>
              <label>
                Last Name *
                <input
                  type="text"
                  value={guestLastName}
                  onChange={(e) => setGuestLastName(e.target.value)}
                  placeholder="Guest's last name"
                  required
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
                required
              />
            </label>
            <label>
              Date of Birth
              <input
                type="date"
                value={guestDateOfBirth}
                onChange={(e) => setGuestDateOfBirth(e.target.value)}
              />
            </label>
            <label>
              Image URL
              <input
                type="text"
                value={guestImageURL}
                onChange={(e) => setGuestImageURL(e.target.value)}
                placeholder="Guest's image URL"
              />
            </label>
            <label>
              Usertype ID
              <input
                type="number"
                value={guestUsertypeID}
                onChange={(e) => setGuestUsertypeID(Number(e.target.value))}
                min={1}
              />
            </label>
            <label>
              Role ID
              <input
                type="number"
                value={guestRoleID}
                onChange={(e) => setGuestRoleID(Number(e.target.value))}
                min={1}
              />
            </label>
            <label>
              Status
              <select
                value={selectedStatusID}
                onChange={(e) => setSelectedStatusID(Number(e.target.value))}
                required
              >
                {statusOptions.map((opt) => (
                  <option key={opt.StatusID} value={opt.StatusID}>
                    {opt.StatusName}
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
              onClick={handleAdd}
              disabled={loading}
            />
            <Action.Cancel showText buttonText="CANCEL" onClick={onCancel} />
          </Action.Tray>
        </div>
      </div>
    </div>
  );
}

export default AttendeeForm;
