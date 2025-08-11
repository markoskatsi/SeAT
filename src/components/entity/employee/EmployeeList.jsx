import "./EmployeeList.scss";
import { ListContainer, HeaderContainer } from "../../UI/ListContainer.jsx";

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
    <ListContainer>
      <HeaderContainer>
        <p>Name</p>
        <p>Title</p>
        <p>Position</p>
        <p>Age Group</p>
        <p>Partner Name</p>
        <p>Location</p>
      </HeaderContainer>
      {employees.map((employee, idx) => (
        <EmployeeListItem
          key={employee.ID || idx}
          employee={employee}
          onSelect={onSelect}
          selected={
            selectedEmployee &&
            (selectedEmployee.ID === employee.ID ||
              selectedEmployee === employee)
          }
          className={idx === 0 && selectedEmployee ? "animate-push" : ""}
        />
      ))}
    </ListContainer>
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
      className={`employeeItem${selected ? " selected" : ""}${
        className ? " " + className : ""
      }`}
      onClick={handleSelect}
    >
      <p>{employee.Name || "N/A"}</p>
      <p>{employee.Title || "N/A"}</p>
      <p>{employee.Position || "N/A"}</p>
      <p>{employee.AgeGroup || "N/A"}</p>
      <p>{employee.PartnerGuestName || ""}</p>
      <p>{employee.Location || "N/A"}</p>
    </div>
  );
}

export default EmployeeList;
