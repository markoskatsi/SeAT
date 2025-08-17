import { useEffect, useState } from "react";
import "./Users.scss";
import UserForm from "../entity/user/UserForm.jsx";
import apiEndpoints from "../api/apiEndpoints.js";
import API from "../api/API.js";
import useLoad from "../api/useLoad.js";
import UserCrudler from "../entity/user/UserCrudler.jsx";

function Users() {
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers, loadingUsersMessage, loadUsers] =
    useLoad(apiEndpoints.USERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterField, setFilterField] = useState("");
  const [roles, loadingRolesMessage] = useLoad(apiEndpoints.ROLES);
  const [usertypes, loadingUserTypesMessage] = useLoad(apiEndpoints.USERTYPES);

  const handleCSVImport = (data) => {
    setUsers(data);
  };

  const handleAdd = () => setShowForm(true);
  const handleCancel = () => setShowForm(false);

  const handleSubmit = async (user) => {
    const userData = {
      UserFirstname: user.UserFirstname,
      UserLastname: user.UserLastname,
      UserDateofbirth: user.UserDateofbirth,
      UserImageURL:
        "https://images.generated.photos/m8Sph5rhjkIsOiVIp4zbvIuFl43F6BWIwhkkY86z2Ms/rs:fit:256:256/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODU4MTE5LmpwZw.jpg",
      UserUsertypeID: "2",
      UserRoleID: user.UserRoleID,
      UserEmail: user.UserEmail || "no-reply@example.com",
      UserGuestofID: null,
    };

    const result = await API.post(apiEndpoints.USERS, userData);
    console.log("Submitting user data:", userData);
    if (result.isSuccess) {
      setShowForm(false);
      await loadUsers(apiEndpoints.USERS);
    } else {
      alert(result.message || "Failed to add user");
    }
  };

  const dropdowns = {
    roles: {
      list: roles,
      loadingMessage: loadingRolesMessage,
    },
    usertypes: {
      list: usertypes,
      loadingMessage: loadingUserTypesMessage,
    },
  };

  return (
    <>
      {showForm && (
        <UserForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          dropdowns={dropdowns}
        />
      )}

      <UserCrudler getUsersEndpoint={apiEndpoints.USERS} />
    </>
  );
}

export default Users;
