import Header from "./Header.jsx";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";
import "./Layout.scss";

function Layout(props) {
  return (
    <div className="layout">
      <Header loggedInUser={props.loggedInUser} />

      <main>{props.children}</main>

      <Footer />
    </div>
  );
}

export default Layout;
