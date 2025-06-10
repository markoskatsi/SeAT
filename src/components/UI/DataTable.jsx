export function TableContainer(props) {
  return <div className="tableContainer">{props.children}</div>;
}

export function Table(props) {
  return <table className="table">{props.children}</table>;
}

export function TableRow(props) {
  return <tr className="tableRow">{props.children}</tr>;
}
