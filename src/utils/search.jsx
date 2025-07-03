import PropTypes from "prop-types";

function EmployeeSearchBar({ searchTerm, setSearchTerm, filterField, setFilterField }) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      <select
        value={filterField}
        onChange={(e) => setFilterField(e.target.value)}
        style={{ padding: "8px" }}
      >
        <option value="">All Fields</option>
        <option value="name">Name</option>
        <option value="role">Role</option>
        <option value="type">Type</option>
      </select>
      <input
        type="text"
        placeholder="Search employees"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", flex: 1 }}
      />
    </div>
  );
}

EmployeeSearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  filterField: PropTypes.string.isRequired,
  setFilterField: PropTypes.func.isRequired,
};

export default EmployeeSearchBar;