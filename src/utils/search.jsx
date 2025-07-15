import PropTypes from "prop-types";
import "./search.scss";

function SearchBar({
  searchTerm,
  setSearchTerm,
  filterField,
  setFilterField,
  filterOptions,
  placeholder = "Search...",
}) {
  return (
    <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
      <select
        className="filter-select"
        value={filterField}
        onChange={(e) => setFilterField(e.target.value)}
        style={{ padding: "8px" }}
      >
        {filterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <input
        className="search-input"
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: "8px", flex: 1 }}
      />
    </div>
  );
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  filterField: PropTypes.string.isRequired,
  setFilterField: PropTypes.func.isRequired,
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({ value: PropTypes.string, label: PropTypes.string })
  ).isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
