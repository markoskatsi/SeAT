import "./Employees.scss";
import { TableContainer } from "../UI/DataTable.jsx";
import useLoad from '../../API/useLoad.js';
import API_ENDPOINTS from '../../API/API_ENDPOINTS.js';

function Employees() {
  const [employees, setEmployees, isLoading, loadEmployees] = useLoad(API_ENDPOINTS.EMPLOYEES);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return <div>Loading employees...</div>;
  }

  return (
    <>
      <h1>Employee</h1>
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>D.O.B</th>
              <th>Gender</th>
              <th>UserRole</th>
              <th>Department</th>
              <th>Title</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => {
              return (
                <tr key={employee.UserID}>
                  <td>{employee.UserID}</td>
                  <td>{employee.UserFirstname}</td>
                  <td>{employee.UserLastname}</td>
                  <td>{formatDate(employee.UserDateofbirth)}</td>
                  <td>{employee.UserGender}</td>
                  <td>{employee.UserRole}</td>
                  <td>{employee.UserJobDepartment}</td>
                  <td>{employee.UserTitle}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </TableContainer>
    </>
  );
}

export default Employees;
