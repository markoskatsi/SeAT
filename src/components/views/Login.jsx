import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/useAuth.jsx";
import Action from "../UI/Actions.jsx";

function Login() {
  // Initialisation -------------------
  const { login } = useAuth();
  const navigate = useNavigate();

  const admin = {
    UserID: 2,
    UserFirstname: "Graeme",
    UserLastname: "Jones",
    UserEmail: "G.Jones@kingston.ac.uk",
    UserDateofbirth: "1965-01-30T00:00:00.000Z",
    UserImageURL: "https://avatars.githubusercontent.com/u/48164351?s=400&u=70e6fedaa5b9cd794807b73c5748f72af4efc328&v=4",
    UserUsertypeID: 1,
    UserRoleID: 1,
    UserUsertypeName: "Employee",
    UserRoleName: "None"
  };


  // State ----------------------------
  // Handlers -------------------------
  const handleAdmin = () => {
    login(admin);
    navigate("/");
  };

  // View -----------------------------
  return (
    <Action.Tray>
      <Action.Add
        showText
        buttonText="Admin Login"
        onClick={handleAdmin}
      />
    </Action.Tray>
  );
}

export default Login;
