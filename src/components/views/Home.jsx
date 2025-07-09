import { useAuth } from "../../auth/useAuth";
import Login from "./Login";
import "./Home.scss";

function Home() {
  const { loggedInUser } = useAuth();

  return (
    <div className="home">
      {loggedInUser ? <h1>Welcome to Seat</h1> : <Login />}
    </div>
  );
}

export default Home;
