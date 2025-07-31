import { useEffect, useState } from "react";
import "./Employees.scss";
import { EmployeeItem } from "../entity/employee/EmployeeItem.jsx";
import SearchBar from "../../utils/search.jsx";
import Action from "../UI/Actions.jsx";
import { ListContainer, HeaderContainer } from "../UI/ListContainer.jsx";
import EmployeeForm from "../entity/employee/EmployeeForm.jsx";
import apiEndpoints from "../api/apiEndpoints.js";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import CSVImportButton from "../../utils/CSVImportButton.jsx";
import EmployeeCrudler from "../entity/employee/EmployeeCrudler.jsx";

function Employees() {
  const [showForm, setShowForm] = useState(false);
  const [employees, setEmployees, loadingEmployeesMessage, loadEmployees] =
    useLoad(apiEndpoints.USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");
  const [roles, loadingRolesMessage] = useLoad(apiEndpoints.ROLES);
  const [usertypes, loadingUserTypesMessage] = useLoad(apiEndpoints.USERTYPES);

  const handleCSVImport = (data) => {
    setEmployees(data);
  };

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

  /* const employeeFilterFn = (employee, search, filterField) => {
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
  */

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
        <CSVImportButton
          onImport={handleCSVImport}
          buttonText="Import Employees CSV"
        />
      </Action.Tray>
      {showForm && (
        <EmployeeForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          dropdowns={dropdowns}
        />
      )}
      {/* <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterField={filterField}
        setFilterField={setFilterField}
        filterOptions={employeeFilterOptions}
        placeholder="Search employees"
      /> */}

      <EmployeeCrudler getEmployeesEndpoint={apiEndpoints.USERS} />
    </>
  );
}

export default Employees;
