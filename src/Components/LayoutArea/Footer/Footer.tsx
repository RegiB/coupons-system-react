import { Typography } from "@material-ui/core";
import "./Footer.css";

function Footer(): JSX.Element {
  return (
    <div className="Footer">
      <Typography variant="h4" className="FooterTxt">
        All Rights Reserved &copy; Regina Brand | {currentYear()}
      </Typography>
    </div>
  );
}

export default Footer;

function currentYear() {
  const date = new Date();
  const year = date.getFullYear();
  return year;
}
