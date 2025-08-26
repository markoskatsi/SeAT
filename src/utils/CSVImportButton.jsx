import Papa from "papaparse";
import PropTypes from "prop-types";
import { useState, useRef } from "react";
import "./CSVImportButton.scss";

function CSVImportButton({ onImport }) {
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (
          !results.data ||
          results.data.length === 0 ||
          !results.data[0].Name
        ) {
          setError("Invalid CSV format");
          return;
        }
        onImport(results.data, file.name);
      },
      error: () => setError("Invalid CSV format"),
    });
  };
  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button type="button" onClick={handleFileSelect}>
        Import CSV
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
