import { useState, useEffect } from "react";
import useLoad from "../../api/useLoad.js";
import apiEndpoints from "../../api/apiEndpoints.js";
import { Modal, useModal } from "../../UI/Modal.jsx";
import API from "../../api/API.js";
import { Alert, Confirm, Error } from "../../UI/Notifications.jsx";
import Action from "../../UI/Actions.jsx";
import AttendeeForm from "./AttendeeForm.jsx";
import AttendeeList from "./AttendeeList.jsx";
import AttendeeView from "./AttendeeView.jsx";
import { filterRecords } from "../../../utils/filtering.jsx";
import SearchBar from "../../../utils/search.jsx";
import CSVImportButton from "../../../utils/CSVImportButton.jsx";
import "./AttendeeCrudler.scss";
import AttendeeTableContainer from "./AttendeeTableContainer.jsx";

export const sampleAttendees = [
  {
    ID: 1,
    AttendeeName: "Alice Johnson",
    AttendeeTitle: "Dr.",
    AttendeePosition: "Research Scientist",
    AttendeeAgeGroup: "30-39",
    AttendeePartnerGuestName: "Mark Johnson",
    AttendeeLocation: "New York",
    AttendeeSeat: "A1",
  },
  {
    ID: 2,
    AttendeeName: "Bob Smith",
    AttendeeTitle: "Mr.",
    AttendeePosition: "Software Engineer",
    AttendeeAgeGroup: "20-29",
    AttendeePartnerGuestName: "",
    AttendeeLocation: "San Francisco",
    AttendeeSeat: "A2",
  },
  {
    ID: 3,
    AttendeeName: "Carla Gomez",
    AttendeeTitle: "Ms.",
    AttendeePosition: "Product Manager",
    AttendeeAgeGroup: "30-39",
    AttendeePartnerGuestName: "",
    AttendeeLocation: "Los Angeles",
    AttendeeSeat: "A2",
  },
  {
    ID: 4,
    AttendeeName: "David Lee",
    AttendeeTitle: "Mr.",
    AttendeePosition: "UX Designer",
    AttendeeAgeGroup: "20-29",
    AttendeePartnerGuestName: "Anna Lee",
    AttendeeLocation: "Chicago",
    AttendeeSeat: "A2",
  },
  {
    ID: 5,
    AttendeeName: "Eva Brown",
    AttendeeTitle: "Dr.",
    AttendeePosition: "Physician",
    AttendeeAgeGroup: "40-49",
    AttendeePartnerGuestName: "",
    AttendeeLocation: "Boston",
    AttendeeSeat: "B1",
  },
  {
    ID: 6,
    AttendeeName: "Frank Wilson",
    AttendeeTitle: "Mr.",
    AttendeePosition: "Financial Analyst",
    AttendeeAgeGroup: "30-39",
    AttendeePartnerGuestName: "Lucy Wilson",
    AttendeeLocation: "Miami",
    AttendeeSeat: "B1",
  },
  {
    ID: 7,
    AttendeeName: "Grace Kim",
    AttendeeTitle: "Ms.",
    AttendeePosition: "Marketing Specialist",
    AttendeeAgeGroup: "20-29",
    AttendeePartnerGuestName: "",
    AttendeeLocation: "Seattle",
    AttendeeSeat: "B2",
  },
  {
    ID: 8,
    AttendeeName: "Henry Adams",
    AttendeeTitle: "Mr.",
    AttendeePosition: "Lawyer",
    AttendeeAgeGroup: "40-49",
    AttendeePartnerGuestName: "Sophia Adams",
    AttendeeLocation: "Houston",
    AttendeeSeat: "B2",
  },
  {
    ID: 9,
    AttendeeName: "Irene Chen",
    AttendeeTitle: "Dr.",
    AttendeePosition: "Professor",
    AttendeeAgeGroup: "50-59",
    AttendeePartnerGuestName: "",
    AttendeeLocation: "Philadelphia",
    AttendeeSeat: "C1",
  },
  {
    ID: 10,
    AttendeeName: "Jack Thompson",
    AttendeeTitle: "Mr.",
    AttendeePosition: "Entrepreneur",
    AttendeeAgeGroup: "30-39",
    AttendeePartnerGuestName: "",
    AttendeeLocation: "Denver",
    AttendeeSeat: "C1",
  },
];

function AttendeeCrudler(eventId) {
  // Status options for dropdown
  const [attendees, setAttendees] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);

  useEffect(() => {
    API.get(apiEndpoints.STATUS).then((res) => {
      if (res.isSuccess) setStatusOptions(res.result);
    });
  }, []);
  // Modal state for editing attendee
  const [showEditModal, setShowEditModal] = useState(false);
  const [editAttendee, setEditAttendee] = useState(null);

  const openEditModal = (attendee) => {
    setEditAttendee(attendee);
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditAttendee(null);
  };

  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  useEffect(() => {
    if (showEditModal && editAttendee) {
      setEditFirstName(editAttendee.AttendeeName?.split(" ")[0] || "");
      setEditLastName(editAttendee.AttendeeName?.split(" ")[1] || "");
      setEditEmail(editAttendee.AttendeeEmail || "");
    }
  }, [showEditModal, editAttendee]);

  const handleEditSave = async () => {
    setEditLoading(true);

    const updatedAttendee = {
      ...editAttendee,
      AttendeeName: `${editFirstName} ${editLastName}`.trim(),
      AttendeeEmail: editEmail,
    };
    await handleModify(updatedAttendee);
    setEditLoading(false);
    closeEditModal();
  };

  const [selectedAttendee, setSelectedAttendeeRaw] = useState(null);
  const setSelectedAttendee = (attendee) => {
    if (!attendee) {
      setSelectedAttendeeRaw(null);
      return;
    }
    let statusName = "";
    if (Array.isArray(statusOptions) && attendee.AttendeeStatusID != null) {
      const statusObj = statusOptions.find(
        (opt) => String(opt.StatusID) === String(attendee.AttendeeStatusID)
      );
      if (statusObj) statusName = statusObj.StatusName;
    }
    setSelectedAttendeeRaw({
      ...attendee,
      AttendeeStatusName: statusName,
    });
  };
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);
  const [showConfirm, ConfirmContent, openConfirm, closeConfirm] =
    useModal(false);
  const [showError, ErrorContent, openError, closeError] = useModal(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

  const filteredAttendees = attendees
    ? attendees.filter((a) => String(a.AttendeeEventID) === String(eventId))
    : [];

  const attendeeFilterFn = (attendee, search, filterField) => {
    switch (filterField) {
      case "name":
        return (attendee.AttendeeName || "").toLowerCase().includes(search);
      case "email":
        return (attendee.AttendeeEmail || "").toLowerCase().includes(search);
      default: {
        const name = (attendee.AttendeeName || "").toLowerCase();
        const email = (attendee.AttendeeEmail || "").toLowerCase();
        return name.includes(search) || email.includes(search);
      }
    }
  };

  const attendeeFilterOptions = [
    { value: "", label: "All Fields" },
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
  ];

  const searchedAttendees = filterRecords(
    filteredAttendees,
    searchTerm,
    filterField,
    attendeeFilterFn
  );

  // CRUD handlers
  const openAddForm = () => {
    setSelectedAttendee(null);
    openForm("Add an Attendee");
  };

  const openModifyForm = () => {
    openForm("Edit Attendee");
  };

  const openDeleteConfirmation = () =>
    openConfirm(
      `Are you sure you want to delete Attendee ${
        selectedAttendee?.AttendeeName || ""
      }?`
    );

  const handleAdd = async (attendee) => {
    const result = await API.post(getAttendeesEndpoint, attendee);
    checkSuccess(result, "Attendee added");
  };

  const handleModify = async (attendee) => {
    const putEndpoint = `${getAttendeesEndpoint}/${attendee.AttendeeID}`;
    const result = await API.put(putEndpoint, attendee);
    checkSuccess(result, "Attendee Modified");
  };

  const handleDelete = async (attendee) => {
    const deleteEndpoint = `${getAttendeesEndpoint}/${attendee.AttendeeID}`;
    const result = await API.delete(deleteEndpoint);
    checkSuccess(result, "Attendee Deleted");
  };

  const checkSuccess = async (result, successMessage) => {
    if (result.isSuccess) {
      setSelectedAttendee(result.result ? result.result[0] : null);
      closeForm();
      openAlert(successMessage);
      await loadAttendees(getAttendeesEndpoint);
    } else openError(result.message);
  };

  const handleUserImport = (attendees) => {
    const storedUsers = localStorage.getItem("employees");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);

      // Convert users to attendees format
      const attendeesFromUsers = users.map((user, index) => ({
        AttendeeID: attendees.length + index + 1,
        AttendeeName: user.Name || "",
        AttendeeEventID: eventId,
        AttendeeStatusID: 1,
        AttendeeUserName: user.Name || "",
        AttendeeTitle: user.Title || "",
        AttendeePosition: user.Position || "",
        AttendeeLocation: user.Location || "",
        AttendeeAgeGroup: user.AgeGroup || "",
        AttendeePartnerGuestName: user.PartnerGuestName || "",
      }));
      setAttendees(attendeesFromUsers);
      openAlert(`Imported ${attendeesFromUsers.length} users as attendees`);
    } else {
      openError("No CSV file has been imported");
    }
  };

  const handleUserSave = () => {
    const storedUsers = localStorage.getItem("employees");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);

      // Convert users to attendees format
      const attendeesFromUsers = users.map((user, index) => ({
        AttendeeID: attendees.length + index + 1,
        AttendeeName: user.Name || "",
        AttendeeEventID: eventId,
        AttendeeStatusID: 1,
        AttendeeUserName: user.Name || "",
        AttendeeTitle: user.Title || "",
        AttendeePosition: user.Position || "",
        AttendeeLocation: user.Location || "",
        AttendeeAgeGroup: user.AgeGroup || "",
        AttendeePartnerGuestName: user.PartnerGuestName || "",
      }));
      setAttendees(attendeesFromUsers);
      openAlert(`Imported ${attendeesFromUsers.length} users as attendees`);
    } else {
      openError("No CSV file has been imported");
    }
  };

  //ADD BUTTON TO POST CSV TO BACKEND

  return (
    <div className="attendeeCrudler">
      <Modal show={showForm} title={formTitle}>
        <AttendeeForm
          attendee={selectedAttendee}
          eventId={eventId}
          eventName={"Annual Christmas Party"}
          onCancel={closeForm}
          onSubmit={selectedAttendee ? handleModify : handleAdd}
        />
      </Modal>

      <Alert show={showAlert} message={alertContent} onDismiss={closeAlert} />
      <Confirm
        show={showConfirm}
        message={ConfirmContent}
        onConfirm={() => handleDelete(selectedAttendee)}
        onDismiss={closeConfirm}
      />
      <Error show={showError} message={ErrorContent} onDismiss={closeError} />

      <Action.Tray>
        <Action.Import
          showText
          buttonText={"Import Attendees"}
          onClick={handleUserImport}
        />
        <Action.Save
          showText
          buttonText={"Save Attendees"}
          onClick={handleUserSave}
        />
      </Action.Tray>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterField={filterField}
        setFilterField={setFilterField}
        filterOptions={attendeeFilterOptions}
        placeholder="Search attendees"
      />
      <main>
        <div className="attendeeViewListContainer">
          <div
            className={`attendeeViewAnimated${selectedAttendee ? " show" : ""}`}
            style={{
              maxHeight: selectedAttendee ? 500 : 0,
              opacity: selectedAttendee ? 1 : 0,
              transform: selectedAttendee
                ? "translateY(0)"
                : "translateY(-40px)",
              transition:
                "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              overflow: "hidden",
              marginBottom: selectedAttendee ? 24 : 0,
            }}
          >
            {selectedAttendee && (
              <AttendeeView
                attendee={selectedAttendee}
                onModify={() => openEditModal(selectedAttendee)}
                onDismiss={() => setSelectedAttendee(null)}
                onDelete={openDeleteConfirmation}
              />
            )}
          </div>
          <div
            className="attendeeListAnimated"
            style={{
              transition: "margin-top 0.5s cubic-bezier(0.4,0,0.2,1)",
              marginTop: selectedAttendee ? 0 : 0,
            }}
          >
            <AttendeeList
              attendees={searchedAttendees}
              onSelect={setSelectedAttendee}
              selectedAttendee={selectedAttendee}
            />
          </div>
        </div>{" "}
        <AttendeeTableContainer attendees={sampleAttendees} />
      </main>
      {showEditModal && editAttendee && (
        <Modal show={true} title="Edit Attendee Status">
          <form
            className="formTray"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleModify({
                ...editAttendee,
                AttendeeStatusID: Number(e.target.status.value),
              });
              closeEditModal();
            }}
          >
            <div className="form-row">
              <label>
                Guest Name
                <input
                  type="text"
                  value={editAttendee.AttendeeUserName || ""}
                  disabled
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                Status
                <select
                  name="status"
                  defaultValue={editAttendee.AttendeeStatusID}
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
            <Action.Tray>
              <Action.Submit showText buttonText="Save" />
              <Action.Cancel
                showText
                buttonText="Cancel"
                onClick={closeEditModal}
              />
            </Action.Tray>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default AttendeeCrudler;
