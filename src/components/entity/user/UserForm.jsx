import PropTypes from "prop-types";
import { useEffect } from "react";
import "./UserForm.scss";
import { userConformance } from "../../../utils/userConformance.jsx";
import Form from "../../UI/Form.jsx";

const initialUser = {
  ID: "",
  Name: "",
  Title: "",
  Position: "",
  AgeGroup: "",
  PartnerGuestName: "",
  Location: "",
};

function UserForm({ user: userProp, onSubmit, onCancel }) {
  // Initialisation --------------------

  const validation = {
    isValid: {
      Name: (name) => name && name.length > 1,
      Title: (title) => title && title.length > 1,
      Position: (position) => position && position.length > 1,
      AgeGroup: (ageGroup) => ageGroup && ageGroup.length > 0,
      Location: (location) => location && location.length > 0,
    },
    errorMessage: {
      Name: "Name must be at least 2 characters long",
      Title: "Title is required",
      Position: "Position is required",
      AgeGroup: "Age group must be selected",
      Location: "Location must be selected",
    },
  };

  // State ------------------------------
  const [user, errors, handleChange, handleSubmit, setUser] =
    Form.useForm(initialUser, userConformance, validation, onSubmit);

  useEffect(() => {
    if (userProp) {
      setUser({ ...userProp });
    }
  }, [userProp, setUser]);

  // Handlers ---------------------------
  // View --------------------------------

  const titleOptions = ["Ms.", "Dr.", "KC", "Mr.", "Sir", "Madam"];
  const ageGroupOptions = ["18-29", "30-44", "45-59", "60+"];
  const locationOptions = ["Offshore", "Onshore"];

  return (
    <Form className="formTray" onSubmit={handleSubmit} onCancel={onCancel}>
      <input
        type="hidden"
        name="ID"
        value={userConformance.js2html["ID"](user.ID)}
        onChange={handleChange}
      />

      <div className="userLeft">
        <Form.Item label="Full Name" error={errors.Name}>
          <input
            type="text"
            name="Name"
            value={userConformance.js2html["Name"](user.Name)}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Title" error={errors.Title}>
          <select
            name="Title"
            value={userConformance.js2html["Title"](user.Title)}
            onChange={handleChange}
          >
            <option value="">Select Title</option>
            {titleOptions.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item label="Position" error={errors.Position}>
          <input
            type="text"
            name="Position"
            value={userConformance.js2html["Position"](user.Position)}
            onChange={handleChange}
          />
        </Form.Item>
      </div>

      <div className="userRight">
        <Form.Item label="Age Group" error={errors.AgeGroup}>
          <select
            name="AgeGroup"
            value={userConformance.js2html["AgeGroup"](user.AgeGroup)}
            onChange={handleChange}
          >
            <option value="">Select Age Group</option>
            {ageGroupOptions.map((age) => (
              <option key={age} value={age}>
                {age}
              </option>
            ))}
          </select>
        </Form.Item>

        <Form.Item label="Partner/Guest Name">
          <input
            type="text"
            name="PartnerGuestName"
            value={userConformance.js2html["PartnerGuestName"](
              user.PartnerGuestName
            )}
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item label="Location" error={errors.Location}>
          <select
            name="Location"
            value={userConformance.js2html["Location"](user.Location)}
            onChange={handleChange}
          >
            <option value="">Select Location</option>
            {locationOptions.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </Form.Item>
      </div>
    </Form>
  );
}

UserForm.propTypes = {
  onCancel: PropTypes.func,
  onSuccess: PropTypes.func,
};

export default UserForm;
