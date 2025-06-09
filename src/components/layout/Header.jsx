import './Header.scss';

function Header(props) {
    return(
        <header>
            <h1>Seat</h1>
            <p className="welcome">Welcome {props.loggedInUser}</p>
        </header> 
    );
}

export default Header; 