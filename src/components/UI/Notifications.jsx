import { Modal } from "./Modal.jsx";
import Action from "./Actions.jsx";
import "./Notifications.scss";

export function Alert({ show, message, onDismiss }) {
  return (
    <Modal show={show} title="Alert" modalPaneClass="notificationAlert">
      <p>{message}</p>
      <Action.Tray>
        <Action.Dismiss showText onClick={onDismiss} />
      </Action.Tray>
    </Modal>
  );
}

export function Confirm({ show, message, onConfirm, onDismiss }) {
  const handleDismiss = () => {
    onConfirm();
    onDismiss();
  };

  return (
    <Modal
      show={show}
      title="Confirmation needed"
      modalPaneClass="notificationConfirm"
    >
      <p>{message}</p>
      <Action.Tray>
        <Action.Yes showText onClick={handleDismiss} />
        <Action.Dismiss showText onClick={onDismiss} />
      </Action.Tray>
    </Modal>
  );
}

export function Error({ show, message, onDismiss }) {
  return (
    <Modal
      show={show}
      title="Error detected"
      modalPaneClass="notificationError"
    >
      <p>{message}</p>
      <Action.Tray>
        <Action.Dismiss showText onClick={onDismiss} />
      </Action.Tray>
    </Modal>
  );
}
