import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EmployeeForm.scss";
import Action from "../../UI/Actions.jsx";
import { employeeConformance } from "../../../utils/employeeConformance.jsx";
import EmployeeFormFields from "./EmployeeFormFields.jsx";

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
      [name]: employeeConformance.html2js[name](value),
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
      UserGuestofID: null,
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
      <EmployeeFormFields
        employee={employee}
        roles={roles}
        handleChange={handleChange}
      />
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
