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
import useLoad from "../api/useLoad.js";
import Papa from "papaparse";

function Employees() {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees, loadingEmployeesMessage, loadEmployees] = useLoad(apiEndpoints.USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");
  const [roles, loadingRolesMessage] = useLoad(apiEndpoints.ROLES);
  const [usertypes, loadingUserTypesMessage] = useLoad(apiEndpoints.USERTYPES);

  const [csvError, setCsvError] = useState(null);

  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);

  const handleSubmit = async (employee) => {
    const employeeData = {
      UserFirstname: employee.UserFirstname,
      UserLastname: employee.UserLastname,
      UserDateofbirth: employee.UserDateofbirth,
      UserImageURL:
        "https://images.generated.photos/m8Sph5rhjkIsOiVIp4zbvIuFl43F6BWIwhkkY86z2Ms/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODU4MTE5LmpwZw.jpg",
      UserUsertypeID: "2",
      UserRoleID: employee.UserRoleID,
      UserEmail: employee.UserEmail || "no-reply@example.com",
      UserGuestofID: null,
    };

    const result = await API.post(apiEndpoints.USERS, employeeData);
    console.log("Submitting employee data:", employeeData);
    if (result.isSuccess) {
      setShowForm(false);
      await loadEmployees(apiEndpoints.USERS);
    } else {
      alert(result.message || "Failed to add employee");
    }
  };


  const employeeFilterFn = (employee, search, filterField) => {
    switch (filterField) {
      case "role":
        return (employee.UserRoleName || "").toLowerCase().includes(search);
      case "type":
        return (employee.UserUsertypeName || "").toLowerCase().includes(search);
      case "name":
        const fullName = `${employee.UserFirstname || ""} ${
          employee.UserLastname || ""
        }`.toLowerCase();
        return fullName.includes(search);
      default:
        const full = `${employee.UserFirstname || ""} ${
          employee.UserLastname || ""
        }`.toLowerCase();
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

  const dropdowns = {
    roles: {
      list: roles,
      loadingMessage: loadingRolesMessage,
    },
    usertypes: {
      list: usertypes,
      loadingMessage: loadingUserTypesMessage,
    },
  };

  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          setCsvError("CSV parsing error.");
          return;
        }
        setEmployees(results.data);
        setCsvError(null);
      },
      error: () => setCsvError("Failed to parse CSV."),
    });
  };

  return (
    <>
      <Action.Tray>
        {!showForm && (
          <>
            <Action.Add
              showText
              buttonText="ADD NEW EMPLOYEE"
              onClick={handleAdd}
            />
            <label style={{ marginLeft: "10px" }}>
              <button
                type="button"
                className="Action"
                style={{ width: "auto", height: "40px" }}
                onClick={() => document.getElementById("csvInput").click()}
              >
                Import CSV
              </button>
              <input
                id="csvInput"
                type="file"
                accept=".csv"
                style={{ display: "none" }}
                onChange={handleImportCSV}
              />
            </label>
          </>
        )}
      </Action.Tray>
      {csvError && <p style={{ color: "red" }}>{csvError}</p>}
      {showForm && (
        <EmployeeForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          dropdowns={dropdowns}
        />
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
              />
            );
          })
        )}
      </ListContainer>
    </>
  );
}

export default Employees;
