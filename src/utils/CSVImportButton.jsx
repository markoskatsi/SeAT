import Papa from "papaparse";
import PropTypes from "prop-types";
import { useState } from "react";
import { useRef } from "react";

function CSVImportButton({ onImport, buttonText = "Import CSV" }) {
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleImportCSV = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length) {
          setError("CSV parsing error.");
          return;
        }
        onImport(results.data);
        setError(null);
      },
      error: () => setError("Failed to parse CSV."),
    });
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        onChange={handleImportCSV}
        style={{ display: "none" }}
      />
      <button type="button" onClick={handleButtonClick}>
        {buttonText}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

CSVImportButton.propTypes = {
  onImport: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
};

export default CSVImportButton;
