import "./ListContainer.scss";
import PropTypes from "prop-types";

export function ListContainer(props) {
  return <div className="listContainer">{props.children}</div>;
}
export function HeaderContainer(props) {
  return <div className="headerContainer">{props.children}</div>;
}

export function EmployeeItem({ employee }) {
  return (
    <div className="employeeItem">
      <p>{employee.UserFirstname}</p>
      <p>{employee.UserLastname}</p>
      <p>{employee.UserDateofbirth}</p>
      {/* <img src={employee.UserImageURL} /> */}
      {/* <p>{employee.UserUsertypeID}</p>
      <p>{employee.UserRoleID}</p> */}
      <p>{employee.UserUsertypeName}</p>
      <p>{employee.UserRoleName}</p>
    </div>
  );
}

ListContainer.propTypes = {
  children: PropTypes.node,
};

HeaderContainer.propTypes = {
  children: PropTypes.node,
};
