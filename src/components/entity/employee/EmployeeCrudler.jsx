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

function EmployeeCrudler({ getEmployeesEndpoint }) {
  // Initialisation -------------------------------------
  const employeesEndpoint = apiEndpoints.USERS;

  // State ----------------------------------------------
  const [employees, , loadingMessage, loadEmployees] =
    useLoad(getEmployeesEndpoint);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [roles, , loadingRolesMessage] = useLoad(apiEndpoints.ROLES);
  const [usertypes, , loadingUsertypesMessage] = useLoad(
    apiEndpoints.USERTYPES
  );
  const [showForm, formTitle, openForm, closeForm] = useModal(false);
  const [showAlert, alertContent, openAlert, closeAlert] = useModal(false);
  const [showConfirm, ConfirmContent, openConfirm, closeConfirm] =
    useModal(false);
  const [showError, ErrorContent, openError, closeError] = useModal(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

  // Handlers -------------------------------------------

  const handleSelect = (employee) => {
    setSelectedEmployee(employee);
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
    openConfirm(
      `Are you sure you want to delete Employee ${selectedEmployee.UserFirstname}?`
    );

  const handleAdd = async (employee) => {
    const result = await API.post(employeesEndpoint, employee);
    checkSuccess(result, "Employee added");
  };

  const handleModify = async (employee) => {
    const putEndpoint = `${employeesEndpoint}/${employee.UserID}`;
    const result = await API.put(putEndpoint, employee);
    checkSuccess(result, "Employee Modified");
  };

  const handleDelete = async (employee) => {
    const deleteEndpoint = `${employeesEndpoint}/${employee.UserID}`;
    const result = await API.delete(deleteEndpoint);
    checkSuccess(result, "Employee Deleted");
  };

  const checkSuccess = async (result, successMessage) => {
    if (result.isSuccess) {
      setSelectedEmployee(result.result ? result.result[0] : null);
      closeForm();
      openAlert(successMessage);
      await loadEmployees(getEmployeesEndpoint);
    } else openError(result.message);
  };
  // View -----------------------------------------------
  const dropdowns = {
    roles: {
      list: roles,
      loadingMessage: loadingRolesMessage,
    },
    usertypes: {
      list: usertypes,
      loadingMessage: loadingUsertypesMessage,
    },
  };

  const employeeFilterFn = (employee, search, filterField) => {
    switch (filterField) {
      case "role":
        return (employee.UserRoleName || "").toLowerCase().includes(search);
      case "type":
        return (employee.UserUsertypeName || "").toLowerCase().includes(search);
      case "name": {
        const fullName = `${employee.UserFirstname || ""} ${
          employee.UserLastname || ""
        }`.toLowerCase();
        return fullName.includes(search);
      }
      default: {
        const full = `${employee.UserFirstname || ""} ${
          employee.UserLastname || ""
        }`.toLowerCase();
        return (
          full.includes(search) ||
          (employee.UserUsertypeName || "").toLowerCase().includes(search) ||
          (employee.UserRoleName || "").toLowerCase().includes(search)
        );
      }
    }
  };

  const employeeFilterOptions = [
    { value: "", label: "All Fields" },
    { value: "name", label: "Name" },
    { value: "role", label: "Role" },
    { value: "type", label: "Type" },
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
          dropdowns={dropdowns}
        />
      </Modal>

      <Alert show={showAlert} message={alertContent} onDismiss={closeAlert} />
      <Confirm
        show={showConfirm}
        message={ConfirmContent}
        onConfirm={() => handleDelete(selectedEmployee)}
        onDismiss={closeConfirm}
      />
      <Error show={showError} message={ErrorContent} onDismiss={closeError} />

      <Action.Tray>
        <Action.Add
          showText
          buttonText={"Add a new employee"}
          onClick={openAddFrom}
        />
        <CSVImportButton />
      </Action.Tray>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterField={filterField}
        setFilterField={setFilterField}
        filterOptions={employeeFilterOptions}
        placeholder="Search employees"
      />
      <main>
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
              loadingMessage={loadingMessage}
              onSelect={handleSelect}
              selectedEmployee={selectedEmployee}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default EmployeeCrudler;
