import "./EmployeeList.scss";

function EmployeeList({
  employees,
  loadingMessage,
  onSelect,
  selectedEmployee,
}) {
  if (!employees) return <EmployeeListMessage message={loadingMessage} />;
  if (employees.length === 0)
    return <EmployeeListMessage message="No records found!" />;
  return (
    <div className="employeeList">
      {employees.map((employee, idx) => (
        <EmployeeListItem
          key={employee.UserID}
          employee={employee}
          onSelect={onSelect}
          selected={
            selectedEmployee && selectedEmployee.UserID === employee.UserID
          }
          className={idx === 0 && selectedEmployee ? "animate-push" : ""}
        />
      ))}
    </div>
  );
}

function EmployeeListMessage({ message }) {
  return <p className="employeeListMessage">{message}</p>;
}

function EmployeeListItem({ employee, onSelect, selected, className = "" }) {
  const handleSelect = () => {
    onSelect(employee);
  };
  return (
    <div
      className={`employeeListItem${selected ? " selected" : ""}${
        className ? " " + className : ""
      }`}
      onClick={handleSelect}
    >
      <div className="employeeListDetails">
        <div className="employeeListTitle">
          <p>{employee.UserFirstname || "N/A"}</p>
          <p>{employee.UserLastname || "N/A"}</p>
          <p>
            {employee.UserDateofbirth
              ? employee.UserDateofbirth.substring(0, 10)
              : "N/A"}
          </p>
          <p>{employee.UserRoleName || "N/A"}</p>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;
