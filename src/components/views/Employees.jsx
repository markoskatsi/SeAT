import { useEffect, useState } from "react";
import "./Employees.scss";
import { EmployeeItem } from "../entity/employee/EmployeeItem.jsx";
import Action from "../UI/Actions.jsx";
import { ListContainer, HeaderContainer } from "../UI/ListContainer.jsx";
import EmployeeForm from "../entity/employee/EmployeeForm.jsx";

function Employees() {
  const apiURL = "https://softwarehub.uk/unibase/seat/api";
  const employeeListEndpoint = `${apiURL}/users`;

  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredEmployees = employees.filter((employee) => {
    const fullName = `${employee.UserFirstname} ${employee.UserLastname}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      (employee.UserUsertypeName && employee.UserUsertypeName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (employee.UserRoleName && employee.UserRoleName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <>
      <h1>Employee</h1>

      <Action.Tray>
        {!showForm && (
          <Action.Add
            showText
            buttonText="Add new employee"
            onClick={handleAdd}
          />
        )}
      </Action.Tray>

      {showForm && (
        <EmployeeForm onCancel={handleCancel} onSuccess={handleSuccess} />
      )}
      <input
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: "16px", padding: "8px", width: "100%" }}
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
          <p>Loading records...</p>
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
