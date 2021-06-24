import { Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import Logo from "../Logo/Logo";
import SearchBar from "../SearchBar/SearchBar";
import "./Header.css";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <Typography variant="h4">
        <NavLink className="Title" to="/home">
          Coupons 24/7
        </NavLink>
      </Typography>
      <Logo />
      <SearchBar />
      <AuthMenu />
    </div>
  );
}

export default Header;
