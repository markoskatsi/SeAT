import { useEffect, useState } from "react";
import "./Employees.scss";
import { EmployeeItem } from "../entity/employee/EmployeeItem.jsx";
import Action from "../UI/Actions.jsx";
import { ListContainer, HeaderContainer } from "../UI/ListContainer.jsx";
import EmployeeForm from "../entity/employee/EmployeeForm.jsx";
import { filterRecords } from "../../utils/filtering.jsx";
import SearchBar from "../../utils/search.jsx";
import apiEndpoints from "../api/apiEndpoints.js";
import API from "../api/API.js";
import AttendeeModal from "../entity/guest/AttendeeModal.jsx";

function Employees() {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showAttendeeModal, setShowAttendeeModal] = useState(false);
  const [attendeeSuccess, setAttendeeSuccess] = useState(false);

  const apiGet = async () => {
    const response = await API.get(apiEndpoints.USERS);
    let result;
    if (response && response.isSuccess) {
      result = response.result;
    } else if (response && Array.isArray(response)) {
      result = response;
    } else {
      result = [];
    }
    setEmployees(result);
    console.log(result);
  };

  useEffect(() => {
    apiGet();
  }, []);

  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);
  const handleSuccess = () => {
    handleCancel();
    apiGet();
  };

  const handleEmployeeClick = (employee) => {
    console.log("Employee clicked:", employee);
    setSelectedEmployee(employee);
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

  const employeeFilterFn = (employee, search, filterField) => {
    switch (filterField) {
      case "role":
        return (employee.UserRoleName || "").toLowerCase().includes(search);
      case "type":
        return (employee.UserUsertypeName || "").toLowerCase().includes(search);
      case "name":
        const fullName = `${employee.UserFirstname || ""} ${employee.UserLastname || ""}`.toLowerCase();
        return fullName.includes(search);
      default:
        const full = `${employee.UserFirstname || ""} ${employee.UserLastname || ""}`.toLowerCase();
        return (
          full.includes(search) ||
          (employee.UserUsertypeName || "").toLowerCase().includes(search) ||
          (employee.UserRoleName || "").toLowerCase().includes(search)
        );
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
    <>
      <Action.Tray>
        {!showForm && (
          <Action.Add
            showText
            buttonText="ADD NEW EMPLOYEE"
            onClick={handleAdd}
          />
        )}
      </Action.Tray>

      {showForm && (
        <EmployeeForm onCancel={handleCancel} onSuccess={handleSuccess} />
      )}
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterField={filterField}
        setFilterField={setFilterField}
        filterOptions={employeeFilterOptions}
        placeholder="Search employees"
      />

      <ListContainer>
        <HeaderContainer>
          <p>First Name</p>
          <p>Last Name</p>
          <p>D.O.B</p>
          <p>Role</p>
        </HeaderContainer>
        {employees === null ? (
          <p>Loading records...</p>
        ) : filteredEmployees.length === 0 ? (
          <p>No employees found...</p>
        ) : (
          filteredEmployees.map((employee) => {
            return (
              <EmployeeItem
                employee={employee}
                key={employee.UserID}
                onClick={handleEmployeeClick}
              />
            );
          })
        )}
      </ListContainer>

      <AttendeeModal
        employee={selectedEmployee}
        isOpen={showAttendeeModal}
        onClose={handleAttendeeModalClose}
        onSuccess={handleAttendeeSuccess}
      />
    </>
  );
}

export default Employees;
