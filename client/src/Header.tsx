import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="headerWrap">
      <div>
        <Link to={"/"}>Flash Cards</Link>
      </div>
      <div>
        <a href="/">Decks</a>
      </div>
      <div>
        <a href="/login">login</a>
      </div>
    </div>
  );
};

export default Header;
