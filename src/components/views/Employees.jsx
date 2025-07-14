import { useEffect, useState } from "react";
import "./Employees.scss";
import { EmployeeItem } from "../entity/employee/EmployeeItem.jsx";
import Action from "../UI/Actions.jsx";
import { ListContainer, HeaderContainer } from "../UI/ListContainer.jsx";
import EmployeeForm from "../entity/employee/EmployeeForm.jsx";
import { filterEmployees } from "../../utils/filtering.jsx";
import EmployeeSearchBar from "../../utils/search.jsx";
import apiEndpoints from "../api/apiEndpoints.js";
import API from "../api/API.js";
import AttendeeModal from "../entity/guest/AttendeeModal.jsx";

function Employees() {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

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

  const filteredEmployees = employees
    ? filterEmployees(employees, searchTerm, filterField)
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
      <EmployeeSearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterField={filterField}
        setFilterField={setFilterField}
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
            return <EmployeeItem employee={employee} key={employee.UserID} />;
          })
        )}
      </ListContainer>
    </>
  );
}

export default Employees;
