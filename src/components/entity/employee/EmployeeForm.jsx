import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EmployeeForm.scss";
import Action from "../../UI/Actions.jsx";

const initialEmployee = {
  UserFirstname: "",
  UserLastname: "",
  UserDateofbirth: "",
  UserUsertypeName: "",
  UserRoleName: "",
  UserRoleID: "",
  UserImageURL: "",
  UserUsertypeID: "",
  UserEmail: "",
};

function EmployeeForm({ onSuccess, onCancel }) {
  // Initialisation --------------------

  const conformance = {
    html2js: {
      UserFirstname: (value) => (value === "" ? null : value),
      UserLastname: (value) => (value === "" ? null : value),
      UserDateofbirth: (value) => (value === "" ? null : value),
      UserUsertypeName: (value) => (value === "" ? null : value),
      UserRoleName: (value) => (value === "" ? null : value),
      UserRoleID: (value) => (value === "0" ? null : value),
      UserImageURL: (value) => (value === "" ? null : value),
      UserEmail: (value) => (value === "" ? null : value),
      UserUsertypeID: (value) => (value === "" ? null : value),
    },
    js2html: {
      UserFirstname: (value) => value ?? "",
      UserLastname: (value) => value ?? "",
      UserDateofbirth: (value) => value ?? "",
      UserUsertypeName: (value) => value ?? "",
      UserRoleName: (value) => value ?? "",
      UserRoleID: (value) => value ?? "0",
      UserImageURL: (value) => value ?? "",
      UserEmail: (value) => value ?? "",
      UserUsertypeID: (value) => value ?? "",
    },
  };
  const apiURL = "https://softwarehub.uk/unibase/seat/api";
  const postEndpoint = `${apiURL}/users/`;
  const rolesEndpoint = `${apiURL}/roles`;

  // State ------------------------------

  const [employee, setEmployee] = useState(initialEmployee);
  const [roles, setRoles] = useState(null);

  const apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const result = await response.json();
    setRoles(result);
    console.log(result);
  };

  const apiPost = async (endpoint, record) => {
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    };

    const response = await fetch(endpoint, request);
    const result = await response.json();
    console.log(result);
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
  };

  useEffect(() => {
    apiGet(rolesEndpoint, setRoles);
  }, [rolesEndpoint]);

  // Handlers ---------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: conformance.html2js[name](value),
    }));
  };

  const handleSubmit = async () => {
    const employeeData = {
      UserFirstname: employee.UserFirstname,
      UserLastname: employee.UserLastname,
      UserDateofbirth: employee.UserDateofbirth,
      UserImageURL:
        "https://images.generated.photos/m8Sph5rhjkIsOiVIp4zbvIuFl43F6BWIwhkkY86z2Ms/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODU4MTE5LmpwZw.jpg",
      UserUsertypeID: "2",
      UserRoleID: employee.UserRoleID,
      UserEmail: employee.UserEmail || "no-reply@example.com",
    };

    const result = await apiPost(postEndpoint, employeeData);
    console.log("Submitting employee data:", employeeData);

    if (result.isSuccess) {
      onSuccess();
      setEmployee(initialEmployee);
    } else {
      alert(result.message);
    }
  };

  // View --------------------------------
  return (
    <div className="employeeForm">
      <div className="formTray">
        <div className="employeeLeft">
          <label>
            First Name
            <input
              type="text"
              name="UserFirstname"
              value={conformance.js2html["UserFirstname"](employee.UserFirstname)}
              onChange={handleChange}
            />
          </label>
          <label>
            Last Name
            <input
              type="text"
              name="UserLastname"
              value={conformance.js2html["UserLastname"](employee.UserLastname)}
              onChange={handleChange}
            />
          </label>
          <label>
            Date of Birth
            <input
              type="date"
              name="UserDateofbirth"
              value={conformance.js2html["UserDateofbirth"](employee.UserDateofbirth)}
              onChange={handleChange}
            />
          </label>
          <label>
            Role
            {!roles ? (
              <p>Loading roles...</p>
            ) : roles.length === 0 ? (
              <p>No roles available</p>
            ) : (
              <select
                name="UserRoleID"
                value={conformance.js2html["UserRoleID"](employee.UserRoleID)}
                onChange={handleChange}
              >
                <option value="0">None selected</option>
                {roles.map((role) => (
                  <option key={role.RoleID} value={role.RoleID}>
                    {role.RoleName}
                  </option>
                ))}
              </select>
            )}
          </label>
          <label>
            User Type
            <input
              type="text"
              name="UserUsertypeName"
              value={conformance.js2html["UserUsertypeName"](employee.UserUsertypeName)}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="employeeRight">
          <label>
            Email
            <input
              type="text"
              name="UserEmail"
              value={conformance.js2html["UserEmail"](employee.UserEmail)}
              onChange={handleChange}
            />
          </label>
          <label>
            Image URL
            <input
              type="text"
              name="UserImageURL"
              value={conformance.js2html["UserImageURL"](employee.UserImageURL)}
              onChange={handleChange}
            />
          </label>
          <label>
            User Type ID
            <input
              type="text"
              name="UserUsertypeID"
              value={conformance.js2html["UserUsertypeID"](employee.UserUsertypeID)}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <Action.Tray>
        <Action.Submit showText buttonText="ADD EMPLOYEE" onClick={handleSubmit} />
        <Action.Cancel showText buttonText="CANCEL" onClick={onCancel} />
      </Action.Tray>
    </div>
  );
}

EmployeeForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default EmployeeForm;
