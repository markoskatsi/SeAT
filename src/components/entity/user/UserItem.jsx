import PropTypes from "prop-types";

export function UserItem({ user, onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick(user);
    }
  };

  return (
    <div className="userItem" onClick={() => onClick && onClick(user)}>
      <p>{user.Name}</p>
      <p>{user.Title}</p>
      <p>{user.Position}</p>
      <p>{user.AgeGroup}</p>
      <p>{user.PartnerGuestName || ""}</p>
      <p>{user.Location}</p>
    </div>
  );
}

UserItem.propTypes = {
  user: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Position: PropTypes.string.isRequired,
    AgeGroup: PropTypes.string.isRequired,
    PartnerGuestName: PropTypes.string,
    Location: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};
