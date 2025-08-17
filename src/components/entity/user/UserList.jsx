import "./UserList.scss";
import { ListContainer, HeaderContainer } from "../../UI/ListContainer.jsx";

function UserList({
  users,
  loadingMessage,
  onSelect,
  selectedUser,
}) {
  if (!users) return <UserListMessage message={loadingMessage} />;
  if (users.length === 0)
    return <UserListMessage message="No records found!" />;
  return (
    <ListContainer>
      <HeaderContainer>
        <p>Name</p>
        <p>Title</p>
        <p>Position</p>
        <p>Age Group</p>
        <p>Partner Name</p>
        <p>Location</p>
      </HeaderContainer>
      {users.map((user, idx) => (
        <UserListItem
          key={user.ID || idx}
          user={user}
          onSelect={onSelect}
          selected={
            selectedUser &&
            (selectedUser.ID === user.ID ||
              selectedUser === user)
          }
          className={idx === 0 && selectedUser ? "animate-push" : ""}
        />
      ))}
    </ListContainer>
  );
}

function UserListMessage({ message }) {
  return <p className="userListMessage">{message}</p>;
}

function UserListItem({ user, onSelect, selected, className = "" }) {
  const handleSelect = () => {
    onSelect(user);
  };
  return (
    <div
      className={`userItem${selected ? " selected" : ""}${
        className ? " " + className : ""
      }`}
      onClick={handleSelect}
    >
      <p>{user.Name || "N/A"}</p>
      <p>{user.Title || "N/A"}</p>
      <p>{user.Position || "N/A"}</p>
      <p>{user.AgeGroup || "N/A"}</p>
      <p>{user.PartnerGuestName || ""}</p>
      <p>{user.Location || "N/A"}</p>
    </div>
  );
}

export default UserList;
