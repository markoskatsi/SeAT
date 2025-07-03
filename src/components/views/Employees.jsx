import { useEffect, useState } from "react";
import "./Employees.scss";
import { EmployeeItem } from "../entity/employee/EmployeeItem.jsx";
import Action from "../UI/Actions.jsx";
import { ListContainer, HeaderContainer } from "../UI/ListContainer.jsx";
import EmployeeForm from "../entity/employee/EmployeeForm.jsx";
import { filterEmployees } from "../../utils/filtering.jsx";
import EmployeeSearchBar from "../../utils/search.jsx";

function Employees() {
  const apiURL = "https://softwarehub.uk/unibase/seat/api";
  const employeeListEndpoint = `${apiURL}/users`;

  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setEmployees(result);
    console.log(result);
  };

  useEffect(() => {
    apiGet(employeeListEndpoint);
  }, [employeeListEndpoint]);

  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);
  const handleSuccess = () => {
    handleCancel();
    apiGet(employeeListEndpoint);
  };

  const filteredEmployees = filterEmployees(employees, searchTerm, filterField);

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
          <p>Title</p>
        </HeaderContainer>
        {employees.length === 0 ? (
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
