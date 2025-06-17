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
    },
    js2html: {
      UserFirstname: (value) => (value === null ? "" : value),
      UserLastname: (value) => (value === null ? "" : value),
      UserDateofbirth: (value) => (value === null ? "" : value),
      UserUsertypeName: (value) => (value === null ? "" : value),
      UserRoleName: (value) => (value === null ? "" : value),
    },
  };

  const apiURL = "https://softwarehub.uk/unibase/seat/api";
  const postEmployeesEndpoint = `${apiURL}/users/employees`;

  // State ------------------------------

  const [employee, setEmployee] = useState(initialEmployee);

  // const apiGet = async (endpoint) => {
  //   const response = await fetch(endpoint);
  //   const result = await response.json();
  //   console.log(result);
  // };

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
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true }
      : { isSuccess: false, message: result.message };
    console.log(result);
  };

  // Handlers ---------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    setEmployee({ ...employee, [name]: conformance.html2js[name](value) });
  };

  const handleSubmit = async () => {
    console.log(`Employee=[${JSON.stringify(employee)}]`);

    const result = await apiPost(postEmployeesEndpoint, employee);

    if (result.isSuccess) onSuccess();
    else alert(result.message);
  };

  // View --------------------------------
  return (
    <div className="employeeForm">
      <div className="formTray">
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
            value={conformance.js2html["UserDateofbirth"](
              employee.UserDateofbirth
            )}
            onChange={handleChange}
          />
        </label>

        <label>
          Role
          <input
            type="text"
            name="UserRoleName"
            value={conformance.js2html["UserRoleName"](employee.UserRoleName)}
            onChange={handleChange}
          />
        </label>

        <label>
          Title
          <input
            type="text"
            name="UserUsertypeName"
            value={conformance.js2html["UserUsertypeName"](
              employee.UserUsertypeName
            )}
            onChange={handleChange}
          />
        </label>
      </div>

      <Action.Tray>
        <Action.Submit showText onClick={handleSubmit} />
        <Action.Cancel showText buttonText="Cancel form" onClick={onCancel} />
      </Action.Tray>
    </div>
  );
}

EmployeeForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default EmployeeForm;
