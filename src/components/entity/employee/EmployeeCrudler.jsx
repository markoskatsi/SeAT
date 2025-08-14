import { useState } from "react";
import useLoad from "../../api/useLoad.js";
import { Modal, useModal } from "../../UI/Modal.jsx";
import API from "../../api/API.js";
import apiEndpoints from "../../api/apiEndpoints.js";
import { Alert, Confirm, Error } from "../../UI/Notifications.jsx";
import Action from "../../UI/Actions.jsx";
import EmployeeForm from "./EmployeeForm.jsx";
import EmployeeList from "./EmployeeList.jsx";
import EmployeeView from "./EmployeeView.jsx";
import { filterRecords } from "../../../utils/filtering.jsx";
import SearchBar from "../../../utils/search.jsx";
import CSVImportButton from "../../../utils/CSVImportButton.jsx";
import "./EmployeeCrudler.scss";
import CSVExportButton from "../../../utils/CSVExportButton.jsx";

function EmployeeCrudler() {
  // Initialisation -------------------------------------

  // State ----------------------------------------------
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);
  const [showConfirm, ConfirmContent, openConfirm, closeConfirm] =
    useModal(false);
  const [showError, ErrorContent, openError, closeError] = useModal(false);
  const [lastImportedFilename, setLastImportedFilename] = useState();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

  // Handlers -------------------------------------------

  const handleSelect = (employee) => {
    setSelectedEmployee(employee);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDismiss = () => {
    setSelectedEmployee(null);
  };

  const openAddFrom = () => {
    handleDismiss();
    openForm("Add an Employee");
  };

  const openModifyFrom = () => {
    openForm("Edit Employee");
  };

  const openDeleteConfirmation = () =>
    openConfirm(`Are you sure you want to delete ${selectedEmployee.Name}?`);

  const handleAdd = (employee) => {
    const newEmployee = { ...employee, ID: generateNextId() };
    setEmployees((prev) => [...prev, newEmployee]);
    setSelectedEmployee(newEmployee);
    closeForm();
    openAlert("Employee added successfully");
  };

  const handleModify = (employee) => {
    setEmployees((prev) =>
      prev.map((e) => (e.ID === employee.ID ? employee : e))
    );
    setSelectedEmployee(employee);
    closeForm();
    openAlert("Employee updated successfully");
  };

  const handleDelete = () => {
    setEmployees((prev) => prev.filter((e) => e.ID !== selectedEmployee.ID));
    setSelectedEmployee(null);
    closeConfirm();
    openAlert("Employee deleted successfully");
  };

  const generateNextId = () => {
    const maxId =
      employees.length > 0 ? Math.max(...employees.map((e) => e.ID || 0)) : 0;
    return maxId + 1;
  };

  const handleCSVImport = (csvData, filename) => {
    const importedEmployees = csvData.map((row, index) => ({
      ID: index + 1,
      Name: row.Name || "",
      Title: row.Title || "",
      Position: row.Position || "",
      AgeGroup: row["Age Group"] || "",
      PartnerGuestName: row["Partner/Guest Name"] || "",
      Location: row.Location || "",
    }));

    setEmployees(importedEmployees);
    setSelectedEmployee(null);
    setLastImportedFilename(filename);
    openAlert(`Imported ${importedEmployees.length} employees`);
  };
  // View -----------------------------------------------

  const employeeFilterFn = (employee, search, filterField) => {
    switch (filterField) {
      case "position":
        return (employee.Position || "").toLowerCase().includes(search);
      case "title":
        return (employee.Title || "").toLowerCase().includes(search);
      case "name":
        return (employee.Name || "").toLowerCase().includes(search);
      case "location":
        return (employee.Location || "").toLowerCase().includes(search);
      case "ageGroup":
        return (employee.AgeGroup || "").toLowerCase().includes(search);
      default:
        return (
          (employee.Name || "").toLowerCase().includes(search) ||
          (employee.Title || "").toLowerCase().includes(search) ||
          (employee.Position || "").toLowerCase().includes(search) ||
          (employee.Location || "").toLowerCase().includes(search) ||
          (employee.AgeGroup || "").toLowerCase().includes(search) ||
          (employee.PartnerGuestName || "").toLowerCase().includes(search)
        );
    }
  };

  const employeeFilterOptions = [
    { value: "", label: "All Fields" },
    { value: "name", label: "Name" },
    { value: "position", label: "Position" },
    { value: "title", label: "Title" },
    { value: "location", label: "Location" },
    { value: "ageGroup", label: "Age Group" },
  ];

  const filteredEmployees = employees
    ? filterRecords(employees, searchTerm, filterField, employeeFilterFn)
    : [];

  return (
    <div className="employeeCrudler">
      <Modal show={showForm} title={formTitle}>
        <EmployeeForm
          employee={selectedEmployee}
          onCancel={closeForm}
          onSubmit={selectedEmployee ? handleModify : handleAdd}
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
          buttonText={"ADD NEW EMPLOYEE"}
          onClick={openAddFrom}
        />
        <div className="csv-buttons">
          <CSVImportButton onImport={handleCSVImport} buttonText="Import CSV" />
          {lastImportedFilename && (
            <CSVExportButton data={employees} filename={lastImportedFilename} />
          )}
        </div>
      </Action.Tray>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterField={filterField}
        setFilterField={setFilterField}
        filterOptions={employeeFilterOptions}
        placeholder="Search employees"
      />
      <div className="employeeCrudlerContainer">
        <div className="employeeViewListContainer">
          <div
            className={`employeeViewAnimated${selectedEmployee ? " show" : ""}`}
            style={{
              maxHeight: selectedEmployee ? 500 : 0,
              opacity: selectedEmployee ? 1 : 0,
              transform: selectedEmployee
                ? "translateY(0)"
                : "translateY(-40px)",
              transition:
                "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.4s, transform 0.5s cubic-bezier(0.4,0,0.2,1)",
              overflow: "hidden",
              marginBottom: selectedEmployee ? 24 : 0,
            }}
          >
            {selectedEmployee && (
              <EmployeeView
                employee={selectedEmployee}
                onModify={openModifyFrom}
                onDismiss={handleDismiss}
                onDelete={openDeleteConfirmation}
              />
            )}
          </div>
          <div
            className="employeeListAnimated"
            style={{
              transition: "margin-top 0.5s cubic-bezier(0.4,0,0.2,1)",
              marginTop: selectedEmployee ? 0 : 0,
            }}
          >
            <EmployeeList
              employees={filteredEmployees}
              loadingMessage="Loading employees..."
              onSelect={handleSelect}
              selectedEmployee={selectedEmployee}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeCrudler;
