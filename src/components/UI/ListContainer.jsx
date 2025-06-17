import "./ListContainer.scss";
import PropTypes from "prop-types";


export function ListContainer(props) {
  return <div className="listContainer">{props.children}</div>;
}
export function HeaderContainer(props) {
  return <div className="headerContainer">{props.children}</div>;
}

export function EmployeeItem({ employee }) {

  function formatDate(dateString) {
    if (!dateString) return "";
    const newDate = new Date(dateString);
    return newDate.toISOString().slice(0, 10);
  }

  return (
    <div className="employeeItem">
      <p>{employee.UserFirstname}</p>
      <p>{employee.UserLastname}</p>
      <p>{formatDate(employee.UserDateofbirth)}</p>
      <p>{employee.UserUsertypeName}</p>
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
};

ListContainer.propTypes = {
  children: PropTypes.node,
};

HeaderContainer.propTypes = {
  children: PropTypes.node,
};
