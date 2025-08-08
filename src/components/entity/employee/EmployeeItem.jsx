import PropTypes from "prop-types";

export function EmployeeItem({ employee, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(employee);
    }
  };

  return (
    <div className="employeeItem" onClick={() => onClick && onClick(employee)}>
      <p>{employee.Name}</p>
      <p>{employee.Title}</p>
      <p>{employee.Position}</p>
      <p>{employee.AgeGroup}</p>
      <p>{employee.PartnerGuestName || ""}</p>
      <p>{employee.Location}</p>
    </div>
  );
}

EmployeeItem.propTypes = {
  employee: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Position: PropTypes.string.isRequired,
    AgeGroup: PropTypes.string.isRequired,
    PartnerGuestName: PropTypes.string,
    Location: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};
