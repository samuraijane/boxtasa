import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Logout } from "../../components/logout/logout";
import { selectAuth } from "../../features/authSlice";
import navsJson from "./navs.json";
import "./header.scss";

interface Nav {
  access: string[];
  href: string;
  id: string;
  text: string;
}

const Header = (): JSX.Element => {

  const isAuth = useSelector(selectAuth);

  const navs = navsJson.map((nav: Nav) => {
    if (isAuth && nav.access.indexOf("private") > -1) {

      if (nav.id === "nav-logout") {
        return (
          <Logout href={nav.href} key={nav.id} text={nav.text} />
        )
      }
      return (
        <NavLink key={nav.id} to={nav.href}>
          {nav.text}
        </NavLink>
      )
    }
    if (!isAuth && nav.access.indexOf("public") > -1) {
      return (
        <NavLink key={nav.id} to={nav.href}>
          {nav.text}
        </NavLink>
      )
    }
    return <></>;
  });

  return (
    <header>
      <div className="y-wrap">
        <div className="header">{navs}</div>
      </div>
    </header>
  );
};

export default Header;
