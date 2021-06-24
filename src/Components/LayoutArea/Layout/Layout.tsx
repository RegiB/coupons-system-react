import { BrowserRouter } from "react-router-dom";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Routing from "../Routing/Routing";
import "./Layout.css";

function Layout(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="Layout">
        <header>
          <Header />
        </header>
        <main>
          <div className="PageContainer">
            <Routing />
          </div>
          <footer>
            <Footer />
          </footer>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default Layout;
