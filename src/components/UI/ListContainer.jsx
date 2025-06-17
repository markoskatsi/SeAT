import "./ListContainer.scss";
import PropTypes from "prop-types";

export function ListContainer(props) {
  return <div className="listContainer">{props.children}</div>;
}
export function HeaderContainer(props) {
  return <div className="headerContainer">{props.children}</div>;
}

ListContainer.propTypes = {
  children: PropTypes.node,
};

HeaderContainer.propTypes = {
  children: PropTypes.node,
};
