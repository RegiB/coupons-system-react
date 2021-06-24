import { Button, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./Page404.css";

function Page404(): JSX.Element {
  return (
    <div className="Page404">
      <Typography variant="h6">
        ERROR 404 - Page Not Found!
      </Typography>
      <iframe
        width="800"
        height="300"
        src="https://www.youtube.com/embed/t3otBjVZzT0?autoplay=1"
        allow="autoplay"
        title="Page not Found"
      ></iframe>
      <br />
      <NavLink to="/home">
        <Button >Go Back Home!</Button>
      </NavLink>
    </div>
  );
}

export default Page404;
