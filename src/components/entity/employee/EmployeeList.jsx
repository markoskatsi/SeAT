import "./EmployeeList.scss";

function EmployeeList({ employees, loadingMessage, onSelect }) {
  if (!employees) return <EmployeeListMessage message={loadingMessage} />;
  if (employees.length === 0)
    return <EmployeeListMessage message="No records found!" />;
  return (
    <div className="employeeList">
      {employees.map((employee) => (
        <EmployeeListItem
          key={employee.UserID}
          employee={employee}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function EmployeeListMessage({ message }) {
  return <p className="employeeListMessage">{message}</p>;
}

function EmployeeListItem({ employee, onSelect }) {
  const handleSelect = () => {
    onSelect(employee);
  };
  //   const moduleLeader = module.ModuleLeaderID
  //     ? `${module.ModuleLeaderName} (Module Leader)`
  //     : "Module leader not assigned";

  //   const moduleLeaderClass = `moduleListLeader ${
  //     !module.ModuleLeaderID && "moduleListNoLeader"
  //   }`;

  return (
    <div className="employeeListItem" onClick={handleSelect}>
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
