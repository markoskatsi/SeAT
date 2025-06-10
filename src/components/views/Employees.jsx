import "./Employees.scss";
import { Table, TableRow, TableContainer } from "../UI/DataTable.jsx";

function Employees() {
  const employeelist = [
    {
      UserID: 1,
      UserFirstname: "Liam",
      UserLastname: "Roberts",
      UserDateOfBirth: "1984-05-15",
      UserGender: "Male",
      UserRole: "Partner",
      UserJobDepartment: "Corporate Law",
      UserTitle: "Senior Partner",
    },
    {
      UserID: 2,
      UserFirstname: "Emma",
      UserLastname: "Johnson",
      UserDateOfBirth: "1990-11-22",
      UserGender: "Female",
      UserRole: "Associate",
      UserJobDepartment: "Litigation",
      UserTitle: "Associate Lawyer",
    },
    {
      UserID: 3,
      UserFirstname: "Noah",
      UserLastname: "Williams",
      UserDateOfBirth: "1979-03-30",
      UserGender: "Male",
      UserRole: "Paralegal",
      UserJobDepartment: "Intellectual Property",
      UserTitle: "Senior Paralegal",
    },
    {
      UserID: 4,
      UserFirstname: "Olivia",
      UserLastname: "Brown",
      UserDateOfBirth: "1993-07-12",
      UserGender: "Female",
      UserRole: "Associate",
      UserJobDepartment: "Real Estate",
      UserTitle: "Junior Associate",
    },
    {
      UserID: 5,
      UserFirstname: "James",
      UserLastname: "Jones",
      UserDateOfBirth: "1975-09-04",
      UserGender: "Male",
      UserRole: "Partner",
      UserJobDepartment: "Litigation",
      UserTitle: "Managing Partner",
    },
    {
      UserID: 6,
      UserFirstname: "Ava",
      UserLastname: "Garcia",
      UserDateOfBirth: "1992-01-19",
      UserGender: "Female",
      UserRole: "Legal Secretary",
      UserJobDepartment: "Corporate Law",
      UserTitle: "Senior Secretary",
    },
    {
      UserID: 7,
      UserFirstname: "William",
      UserLastname: "Martinez",
      UserDateOfBirth: "1988-12-10",
      UserGender: "Male",
      UserRole: "Associate",
      UserJobDepartment: "Tax Law",
      UserTitle: "Associate Lawyer",
    },
    {
      UserID: 8,
      UserFirstname: "Sophia",
      UserLastname: "Davis",
      UserDateOfBirth: "1995-06-05",
      UserGender: "Female",
      UserRole: "Paralegal",
      UserJobDepartment: "Litigation",
      UserTitle: "Paralegal",
    },
    {
      UserID: 9,
      UserFirstname: "Benjamin",
      UserLastname: "Miller",
      UserDateOfBirth: "1970-02-27",
      UserGender: "Male",
      UserRole: "Partner",
      UserJobDepartment: "Intellectual Property",
      UserTitle: "Senior Partner",
    },
    {
      UserID: 10,
      UserFirstname: "Mia",
      UserLastname: "Wilson",
      UserDateOfBirth: "1994-08-21",
      UserGender: "Female",
      UserRole: "Legal Assistant",
      UserJobDepartment: "Real Estate",
      UserTitle: "Legal Assistant",
    },
  ];

  return (
    <>
      <h1>Employee</h1>
      <TableContainer>
        <Table>
          <th>User ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>D.O.B</th>
          <th>Gender</th>
          <th>UserRole</th>
          <th>Department</th>
          <th>Title</th>

          {employeelist.map((employee) => {
            return (
              <TableRow key={employee.UserID}>
                <td>{employee.UserID}</td>
                <td>{employee.UserFirstname}</td>
                <td>{employee.UserLastname}</td>
                <td>{employee.UserDateOfBirth}</td>
                <td>{employee.UserGender}</td>
                <td>{employee.UserRole}</td>
                <td>{employee.UserJobDepartment}</td>
                <td>{employee.UserTitle}</td>
              </TableRow>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
}

export default Employees;
