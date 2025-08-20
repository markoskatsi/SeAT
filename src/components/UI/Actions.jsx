import PropTypes from "prop-types";
import Icon from "./Icons.jsx";
import "./Actions.scss";

// -----------------------------------------
// Action Button ///////////////////////////
// -----------------------------------------

export default function Action({ children, onClick, showText, buttonText }) {
  return (
    <button className="Action" onClick={onClick}>
      {children} {showText && <p>{buttonText}</p>}
    </button>
  );
}

Action.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string.isRequired,
};

// -----------------------------------------
// Action Tray /////////////////////////////
// -----------------------------------------

Tray.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export function Tray({ children }) {
  return <div className="ActionTray">{children}</div>;
}

// -----------------------------------------
// Actions /////////////////////////////////
// -----------------------------------------

const ActionPropTypes = {
  onClick: PropTypes.func.isRequired,
  showText: PropTypes.bool,
  buttonText: PropTypes.string,
};
Generic.propTypes = ActionPropTypes;
export function Generic({ onClick, showText = false, buttonText = "Generic" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}
Import.propTypes = ActionPropTypes;

export function Import({ onClick, showText = false, buttonText = "Import" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Save.propTypes = ActionPropTypes;

export function Save({ onClick, showText = false, buttonText = "Save" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Add.propTypes = ActionPropTypes;

export function Add({ onClick, showText = false, buttonText = "Add" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Cancel.propTypes = ActionPropTypes;

export function Cancel({ onClick, showText = false, buttonText = "Cancel" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Collapse.propTypes = ActionPropTypes;

export function Collapse({
  onClick,
  showText = false,
  buttonText = "Collapse",
}) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Close.propTypes = ActionPropTypes;

export function Close({ onClick, showText = false, buttonText = "Close" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Delete.propTypes = ActionPropTypes;

export function Delete({ onClick, showText = false, buttonText = "Delete" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Dismiss.propTypes = ActionPropTypes;

export function Dismiss({ onClick, showText = false, buttonText = "Dismiss" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Expand.propTypes = ActionPropTypes;

export function Expand({ onClick, showText = false, buttonText = "Expand" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Favourites.propTypes = ActionPropTypes;

export function Favourites({
  onClick,
  showText = false,
  buttonText = "List favourites",
}) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

ListAll.propTypes = ActionPropTypes;

export function ListAll({
  onClick,
  showText = false,
  buttonText = "List all",
}) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Modify.propTypes = ActionPropTypes;

export function Modify({ onClick, showText = false, buttonText = "Modify" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

No.propTypes = ActionPropTypes;

export function No({ onClick, showText = false, buttonText = "No" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Submit.propTypes = ActionPropTypes;

export function Submit({ onClick, showText = false, buttonText = "Submit" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Subscribe.propTypes = ActionPropTypes;

export function Subscribe({
  onClick,
  showText = false,
  buttonText = "Subscribe",
}) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Yes.propTypes = ActionPropTypes;

export function Yes({ onClick, showText = false, buttonText = "Yes" }) {
  return (
    <Action
      buttonText={buttonText}
      onClick={onClick}
      showText={showText}
    ></Action>
  );
}

Unsubscribe.propTypes = ActionPropTypes;

export function Unsubscribe({
  onClick,
  showText = false,
  buttonText = "Unsubscribe",
}) {
  return (
    <Action buttonText={buttonText} onClick={onClick} showText={showText}>
      <Icon.Cross />
    </Action>
  );
}

// -----------------------------------------
// Compose Action Object ///////////////////
// -----------------------------------------

Action.Tray = Tray;

Action.Add = Add;
Action.Cancel = Cancel;
Action.Close = Close;
Action.Collapse = Collapse;
Action.Delete = Delete;
Action.Dismiss = Dismiss;
Action.Expand = Expand;
Action.Favourites = Favourites;
Action.ListAll = ListAll;
Action.Modify = Modify;
Action.No = No;
Action.Import = Import;
Action.Submit = Submit;
Action.Subscribe = Subscribe;
Action.Yes = Yes;
Action.Unsubscribe = Unsubscribe;
Action.Generic = Generic;
Action.Save = Save;
