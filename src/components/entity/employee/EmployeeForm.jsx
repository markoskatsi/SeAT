import PropTypes from "prop-types";
import "./EmployeeForm.scss";
import { employeeConformance } from "../../../utils/employeeConformance.jsx";
import Form from "../../UI/Form.jsx";

const initialEmployee = {
  UserFirstname: "",
  UserLastname: "",
  UserDateofbirth: "",
  UserUsertypeName: "",
  UserRoleName: "",
  UserRoleID: "",
  UserImageURL:
    "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE=",
  UserUsertypeID: "",
  UserEmail: "",
};

function EmployeeForm({ onSubmit, onCancel, dropdowns }) {
  // Initialisation --------------------

  const validation = {
    isValid: {
      UserFirstname: (name) => name && name.length > 1,
      UserLastname: (name) => name && name.length > 1,
      UserDateofbirth: (date) => date,
      UserUsertypeName: (name) => name && name.length > 1,
      UserRoleID: (id) => id > 0,
      UserUsertypeID: (id) => id > 0,
      UserEmail: (email) => email && email.includes("@"),
    },
    errorMessage: {
      UserFirstname: "First name must be at least 2 characters long",
      UserLastname: "Last name must be at least 2 characters long",
      UserDateofbirth: "Date of birth is required",
      UserRoleID: "Role must be selected",
      UserUsertypeID: "User type must be selected",
      UserEmail: "Email must be a valid email address",
    },
  };

  // State ------------------------------

  const [employee, errors, handleChange, handleSubmit] = Form.useForm(
    initialEmployee,
    employeeConformance,
    validation,
    onSubmit
  );

  // Handlers ---------------------------
  // View --------------------------------
  const roles = dropdowns.roles;
  const usertypes = dropdowns.usertypes;
  return (
    <Form className="formTray" onSubmit={handleSubmit} onCancel={onCancel}>
      <div className="employeeLeft">
        <Form.Item label="First Name" error={errors.UserFirstname}>
          <input
            type="text"
            name="UserFirstname"
            value={employeeConformance.js2html["UserFirstname"](
              employee.UserFirstname
            )}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Last Name" error={errors.UserLastname}>
          <input
            type="text"
            name="UserLastname"
            value={employeeConformance.js2html["UserLastname"](
              employee.UserLastname
            )}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Date of Birth" error={errors.UserDateofbirth}>
          <input
            type="date"
            name="UserDateofbirth"
            value={employeeConformance.js2html["UserDateofbirth"](
              employee.UserDateofbirth
            )}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Role" error={errors.UserRoleID}>
          {!roles ? (
            <p>Loading roles...</p>
          ) : roles.length === 0 ? (
            <p>No roles available</p>
          ) : (
            <select
              name="UserRoleID"
              value={employeeConformance.js2html["UserRoleID"](
                employee.UserRoleID
              )}
              onChange={handleChange}
            >
              <option value="0">None selected</option>
              {roles.list.map((role) => (
                <option key={role.RoleID} value={role.RoleID}>
                  {role.RoleName}
                </option>
              ))}
            </select>
          )}
        </Form.Item>
      </div>
      <div className="employeeRight">
        <Form.Item label="Title">
          <input
            type="text"
            name="UserUsertypeName"
            value={employeeConformance.js2html["UserUsertypeName"](
              employee.UserUsertypeName
            )}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Email" error={errors.UserEmail}>
          <input
            type="text"
            name="UserEmail"
            value={employeeConformance.js2html["UserEmail"](employee.UserEmail)}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="Image">
          <input
            type="text"
            name="UserImageURL"
            value={employeeConformance.js2html["UserImageURL"](
              employee.UserImageURL
            )}
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item label="User Types" error={errors.UserUsertypeID}>
          {!usertypes.list ? (
            <p>{usertypes.loadingMessage}</p>
          ) : usertypes.list.length === 0 ? (
            <p>No user types available</p>
          ) : (
            <select
              name="UserUsertypeID"
              value={employeeConformance.js2html["UserUsertypeID"](
                employee.UserUsertypeID
              )}
              onChange={handleChange}
            >
              <option value="0">None selected</option>
              {usertypes.list.map((type) => (
                <option key={type.UsertypeID} value={type.UsertypeID}>
                  {type.UsertypeName}
                </option>
              ))}
            </select>
          )}
        </Form.Item>
      </div>
    </Form>
  );
}

EmployeeForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default EmployeeForm;
