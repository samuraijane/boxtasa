import { NavLink } from "react-router-dom";
import navsJson from "./navs.json";
import "./header.scss";

interface Nav {
  access: string[];
  href: string;
  id: string;
  text: string;
}

const Header = (): JSX.Element => {
  const navs = navsJson.map((nav: Nav) => (
    <NavLink key={nav.id} to={nav.href}>
      {nav.text}
    </NavLink>
  ));

  return (
    <header>
      <div className="y-wrap">
        <div className="header">{navs}</div>
      </div>
    </header>
  );
};

export default Header;
