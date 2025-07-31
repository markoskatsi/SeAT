import "./RecordView.scss";

function RecordView({ record, labels }) {
  if (!record) return <p className="viewRecordMessage">No record found</p>;

  return (
    <table className="viewRecord">
      <tbody>
        {Object.keys(record).map((property) => (
          <RecordRow
            key={property}
            property={property}
            value={record[property]}
            labels={labels}
          />
        ))}
      </tbody>
    </table>
  );
}

function RecordRow({ property, value, labels }) {
  if (labels && !labels[property]) return null;

  const propertyLabel = labels ? labels[property] : property;

  return (
    <tr key={property} className="viewRecordProperty">
      <td className="viewRecordLabel">{propertyLabel}</td>
      <td className="viewRecordValue">{value}</td>
    </tr>
  );
}

export default RecordView;
