import { useState } from "react";
import useLoad from "../../api/useLoad.js";
import { Modal, useModal } from "../../UI/Modal.jsx";
import API from "../../api/API.js";
import apiEndpoints from "../../api/apiEndpoints.js";
import { Alert, Confirm, Error } from "../../UI/Notifications.jsx";
import Action from "../../UI/Actions.jsx";
import UserForm from "./UserForm.jsx";
import UserList from "./UserList.jsx";
import UserView from "./UserView.jsx";
import { useEffect } from "react";
import { filterRecords } from "../../../utils/filtering.jsx";
import SearchBar from "../../../utils/search.jsx";
import CSVImportButton from "../../../utils/CSVImportButton.jsx";
import "./UserCrudler.scss";
import CSVExportButton from "../../../utils/CSVExportButton.jsx";

function UserCrudler() {
  // Initialisation -------------------------------------

  // State ----------------------------------------------
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);
  const [showConfirm, ConfirmContent, openConfirm, closeConfirm] =
    useModal(false);
  const [showError, ErrorContent, openError, closeError] = useModal(false);
  const [lastImportedFilename, setLastImportedFilename] = useState(() => {
    const storedFilename = localStorage.getItem("lastImportedFilename");
    return storedFilename ? JSON.parse(storedFilename) : [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

  // Handlers -------------------------------------------

  const handleSelect = (user) => {
    setSelectedUser(user);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDismiss = () => {
    setSelectedUser(null);
  };

  const openAddFrom = () => {
    handleDismiss();
    openForm("Add an Entry");
  };

  const openModifyFrom = () => {
    openForm("Edit Entry");
  };

  const openDeleteConfirmation = () =>
    openConfirm(`Are you sure you want to delete ${selectedUser.Name}?`);

  const handleAdd = (user) => {
    const newUser = { ...user, ID: generateNextId() };
    setUsers((prev) => [...prev, newUser]);
    setSelectedUser(newUser);
    console.log("User added:", newUser);
    closeForm();
    openAlert("User added successfully");
  };

  const handleModify = (user) => {
    setUsers((prev) => prev.map((e) => (e.ID === user.ID ? user : e)));
    setSelectedUser(user);
    closeForm();
    openAlert("User updated successfully");
  };

  const handleDelete = () => {
    setUsers((prev) => prev.filter((e) => e.ID !== selectedUser.ID));
    setSelectedUser(null);
    closeConfirm();
    openAlert("User deleted successfully");
  };

  const generateNextId = () => {
    const maxId =
      users.length > 0 ? Math.max(...users.map((e) => e.ID || 0)) : 0;
    return maxId + 1;
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const handleCSVImport = (csvData, filename) => {
    const importedUsers = csvData.map((row, index) => ({
      ID: index + 1,
      Name: row["Name"] || "",
      Position: row["Job Title/ Position"],
      Location: row["Location (Onshore or Offshore)"],
      AgeGroup: row["Age Group"] || "",
      PartnerGuestName: row["Partner's Name"] || "",
    }));
    console.log(importedUsers);

    setUsers(importedUsers);
    localStorage.setItem("users", JSON.stringify(importedUsers));
    setSelectedUser(null);
    setLastImportedFilename(filename);
    localStorage.setItem("lastImportedFilename", JSON.stringify(filename));
    openAlert(`Imported ${importedUsers.length} users`);
  };

  // View -----------------------------------------------

  const userFilterFn = (user, search, filterField) => {
    switch (filterField) {
      case "position":
        return (user.Position || "").toLowerCase().includes(search);
      case "name":
        return (user.Name || "").toLowerCase().includes(search);
      case "location":
        return (user.Location || "").toLowerCase().includes(search);
      case "ageGroup":
        return (user.AgeGroup || "").toLowerCase().includes(search);
      default:
        return (
          (user.Name || "").toLowerCase().includes(search) ||
          (user.Position || "").toLowerCase().includes(search) ||
          (user.Location || "").toLowerCase().includes(search) ||
          (user.AgeGroup || "").toLowerCase().includes(search) ||
          (user.PartnerGuestName || "").toLowerCase().includes(search)
        );
    }
  };

  const userFilterOptions = [
    { value: "", label: "All Fields" },
    { value: "name", label: "Name" },
    { value: "position", label: "Job Title / Position" },
    { value: "location", label: "Location" },
    { value: "ageGroup", label: "Age Group" },
  ];

  const filteredUsers = users
    ? filterRecords(users, searchTerm, filterField, userFilterFn)
    : [];

  return (
    <div className="userCrudler">
      <Modal show={showForm} title={formTitle}>
        <UserForm
          user={selectedUser}
          onCancel={closeForm}
          onSubmit={selectedUser ? handleModify : handleAdd}
        />
      </Modal>

      <Alert show={showAlert} message={alertContent} onDismiss={closeAlert} />
      <Confirm
        show={showConfirm}
        message={ConfirmContent}
        onConfirm={handleDelete}
        onDismiss={closeConfirm}
      />
      <Error show={showError} message={ErrorContent} onDismiss={closeError} />

      <Action.Tray>
        <Action.Add
          showText
          buttonText={"ADD NEW ENTRY"}
          onClick={openAddFrom}
        />
        <div className="csv-buttons">
          <CSVImportButton onImport={handleCSVImport} buttonText="Import CSV" />
          {users && users.length > 0 && (
            <CSVExportButton data={users} filename={lastImportedFilename} />
          )}
        </div>
      </Action.Tray>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterField={filterField}
        setFilterField={setFilterField}
        filterOptions={userFilterOptions}
        placeholder="Search users"
      />
      <div className="userCrudlerContainer">
        <div className="userViewListContainer">
          <div
            className={`userViewAnimated${selectedUser ? " show" : ""}`}
            style={{
              maxHeight: selectedUser ? 500 : 0,
              opacity: selectedUser ? 1 : 0,
              transform: selectedUser ? "translateY(0)" : "translateY(-40px)",
              transition:
                "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              overflow: "hidden",
              marginBottom: selectedUser ? 24 : 0,
            }}
          >
            {selectedUser && (
              <UserView
                user={selectedUser}
                onModify={openModifyFrom}
                onDismiss={handleDismiss}
                onDelete={openDeleteConfirmation}
              />
            )}
          </div>
          <div
            className="userListAnimated"
            style={{
              transition: "margin-top 0.5s cubic-bezier(0.4,0,0.2,1)",
              marginTop: selectedUser ? 0 : 0,
            }}
          >
            <UserList
              users={filteredUsers}
              loadingMessage="Loading users..."
              onSelect={handleSelect}
              selectedUser={selectedUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCrudler;
