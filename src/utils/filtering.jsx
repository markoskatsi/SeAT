export function filterRecords(records, searchTerm, filterField, filterFn) {
  const search = searchTerm.toLowerCase();
  if (!search) return records;
  return records.filter((record) => filterFn(record, search, filterField));
}