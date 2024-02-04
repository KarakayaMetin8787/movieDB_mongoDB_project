import { Link } from "react-router-dom";
import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Searchbar from "./Searchbar";
import SubmitNewEntry from "../pages/SubmitNewEntry";

const Header = () => {
    return (
        <header>
            <Link to="/">Home</Link>
            <Link to="/favorites">Favoriten</Link>
            <Searchbar />
            <Link to="/submit">Neuen Film hinzufügen</Link>
        </header>
    );
};

export default Header;
