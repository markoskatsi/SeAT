export function filterEmployees(employees, searchTerm, filterField) {
  const search = searchTerm.toLowerCase();
  if (!search) return employees;

  return employees.filter((employee) => {
    switch (filterField) {
      case "role":
        return (employee.UserRoleName || "").toLowerCase().includes(search);
      case "type":
        return (employee.UserUsertypeName || "").toLowerCase().includes(search);
      case "name":
        const fullName = `${employee.UserFirstname || ""} ${employee.UserLastname || ""}`.toLowerCase();
        return fullName.includes(search);
      default:
        const full = `${employee.UserFirstname || ""} ${employee.UserLastname || ""}`.toLowerCase();
        return (
          full.includes(search) ||
          (employee.UserUsertypeName || "").toLowerCase().includes(search) ||
          (employee.UserRoleName || "").toLowerCase().includes(search)
        );
    }
  });
}