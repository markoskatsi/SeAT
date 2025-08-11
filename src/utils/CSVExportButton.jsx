import Papa from "papaparse";
import PropTypes from "prop-types";

function CSVExportButton({ data, filename, fields = null }) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      alert("No data to export");
      return;
    }

    let exportData = data;

    if (fields && fields.length > 0) {
      exportData = data.map((row) => {
        const filteredRow = {};
        fields.forEach((field) => {
          filteredRow[field] = row[field];
        });
        return filteredRow;
      });
    }

    exportData = exportData.map((row) => ({
      ID: row.ID,
      Name: row.Name,
      Title: row.Title,
      Position: row.Position,
      "Age Group": row.AgeGroup,
      "Partner/Guest Name": row.PartnerGuestName,
      Location: row.Location,
    }));

    const csv = Papa.unparse(exportData, {
      header: true,
      skipEmptyLines: false,
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");

    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <button type="button" onClick={handleExport}>
      Export CSV
    </button>
  );
}

CSVExportButton.propTypes = {
  data: PropTypes.array.isRequired,
  filename: PropTypes.string,
  fields: PropTypes.array,
};

export default CSVExportButton;
