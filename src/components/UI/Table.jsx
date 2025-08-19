import "./Table.scss";
import PropTypes from "prop-types";

export function Table(props) {
  return <div className="table">{props.children}</div>;
}
export function HeaderTable(props) {
  return <div className="headerTable">{props.children}</div>;
}

Table.propTypes = {
  children: PropTypes.node,
};

HeaderTable.propTypes = {
  children: PropTypes.node,
};
