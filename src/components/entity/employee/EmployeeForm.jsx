import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EmployeeForm.scss";
import Action from "../../UI/Actions.jsx";
import { employeeConformance } from "../../../utils/employeeConformance.jsx";
import EmployeeFormFields from "./EmployeeFormFields.jsx";
import API from "../../api/API.js";
import apiEndpoints from "../../api/apiEndpoints.js";

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

  // State ------------------------------

  const [employee, setEmployee] = useState(initialEmployee);
  const [roles, setRoles] = useState(null);
  const [userTypes, setUserTypes] = useState([]);

  const getRoles = async () => {
    const response = await API.get(apiEndpoints.ROLES);
    if (response.isSuccess) {
      setRoles(response.result);
    } else {
      setRoles([]);
    }
  };

  const getUserTypes = async () => {
    const response = await API.get(apiEndpoints.USERTYPES);
    if (response.isSuccess) {
      setUserTypes(response.result);
    } else {
      setUserTypes([]);
    }
  };

  const apiPost = async (record) => {
    const response = await API.post(apiEndpoints.USERS, record);
    return response;
  };

  useEffect(() => {
    getRoles();
    getUserTypes();
  }, []);

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

    const result = await apiPost(employeeData);
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
        userTypes={userTypes}
        handleChange={handleChange}
      />
      <Action.Tray>
        <Action.Submit
          showText
          buttonText="ADD EMPLOYEE"
          onClick={handleSubmit}
        />
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
