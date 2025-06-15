import { useEffect, useState } from "react";
import "./Employees.scss";
import {
  ListContainer,
  HeaderContainer,
  EmployeeItem,
} from "../UI/ListContainer.jsx";

function Employees() {
  const apiURL = "https://softwarehub.uk/unibase/seat/api";
  const employeeListEndpoint = `${apiURL}/users/employees`;

  const [employees, setEmployees] = useState([]);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setEmployees(result);
  };

  useEffect(() => {
    apiGet(employeeListEndpoint);
  }, [employeeListEndpoint]);

  const headerList = [
    "User ID",
    "First Name",
    "Last Name",
    "D.O.B",
    "Gender",
    "UserRole",
    "Department",
    "Title",
  ];

  return (
    <>
      <h1>Employee</h1>
      <ListContainer>
        <HeaderContainer>
          {headerList.map((header) => {
            return <p key={header}>{header}</p>;
          })}
        </HeaderContainer>
        {!employees ? (
          <p>Loading records...</p>
        ) : (
          employees.map((employee) => {
            return (
              <EmployeeItem
                employee={employee}
                key={employee.UserID}
              ></EmployeeItem>
            );
          })
        )}
      </ListContainer>
    </>
  );
}

export default Employees;
