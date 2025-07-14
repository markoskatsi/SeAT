import PropTypes from "prop-types";
import "./EmployeeItem.scss";
export function EmployeeItem({ employee, onClick }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleClick = () => {
    if (onClick) {
      onClick(employee);
    }
  };

  return (
    <div className="employeeItem" onClick={() => onClick && onClick(employee)}>
      <p>{employee.UserFirstname}</p>
      <p>{employee.UserLastname}</p>
      <p>{formatDate(employee.UserDateofbirth)}</p>
      <p>{employee.UserRoleName}</p>
    </div>
  );
}
EmployeeItem.propTypes = {
  employee: PropTypes.shape({
    UserFirstname: PropTypes.string.isRequired,
    UserLastname: PropTypes.string.isRequired,
    UserDateofbirth: PropTypes.string.isRequired,
    UserUsertypeName: PropTypes.string.isRequired,
    UserRoleName: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};
