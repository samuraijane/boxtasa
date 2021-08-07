import { NavLink } from 'react-router-dom';
import './style.css';

function Header () {
  return (
    <div>
      <header>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
      </header>
    </div>
  );
}

export default Header;
