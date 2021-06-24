import "./Logo.css";
import logo from "../../../Assets/logo/logo.png";

function Logo(): JSX.Element {
  return (
    <div className="Logo">
      <img src={logo} />
    </div>
  );
}

export default Logo;
