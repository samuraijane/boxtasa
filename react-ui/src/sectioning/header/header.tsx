import { NavLink } from "react-router-dom";
import navsJson from "./navs.json";

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
      <div className="y-wrap">{navs}</div>
    </header>
  );
};

export default Header;
