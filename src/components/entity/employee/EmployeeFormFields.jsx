import PropTypes from "prop-types";
import { employeeConformance } from "../../../utils/employeeConformance.jsx";

function EmployeeFormFields({ employee, roles, handleChange }) {
  return (
    <div className="formTray">
      <label>
        First Name
        <input
          type="text"
          name="UserFirstname"
          value={employeeConformance.js2html["UserFirstname"](employee.UserFirstname)}
          onChange={handleChange}
        />
      </label>

      <label>
        Last Name
        <input
          type="text"
          name="UserLastname"
          value={employeeConformance.js2html["UserLastname"](employee.UserLastname)}
          onChange={handleChange}
        />
      </label>

      <label>
        Date of Birth
        <input
          type="date"
          name="UserDateofbirth"
          value={employeeConformance.js2html["UserDateofbirth"](employee.UserDateofbirth)}
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
            value={employeeConformance.js2html["UserRoleID"](employee.UserRoleID)}
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
        Title
        <input
          type="text"
          name="UserUsertypeName"
          value={employeeConformance.js2html["UserUsertypeName"](employee.UserUsertypeName)}
          onChange={handleChange}
        />
      </label>

      <label>
        Email
        <input
          type="text"
          name="UserEmail"
          value={employeeConformance.js2html["UserEmail"](employee.UserEmail)}
          onChange={handleChange}
        />
      </label>

      <label>
        Image
        <input
          type="text"
          name="UserImageURL"
          value={employeeConformance.js2html["UserImageURL"](employee.UserImageURL)}
          onChange={handleChange}
        />
      </label>

      <label>
        User Type ID
        <input
          type="text"
          name="UserUsertypeID"
          value={employeeConformance.js2html["UserUsertypeID"](employee.UserUsertypeID)}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

EmployeeFormFields.propTypes = {
  employee: PropTypes.object.isRequired,
  roles: PropTypes.array,
  handleChange: PropTypes.func.isRequired,
};

export default EmployeeFormFields;