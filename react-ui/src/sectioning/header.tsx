import { NavLink } from 'react-router-dom';

const Header = (): JSX.Element => {
  return (
    <header>
      <div className="y-wrap">
        <nav>
          <div><NavLink to="/">Boxtasa</NavLink></div>
          <ul className="navs">
            <li><NavLink to="/search">Search</NavLink></li>
            <li><NavLink to="/transactions">Transactions</NavLink></li>
          </ul>
        </nav>
      </div>
    </header>
  )
};

export default Header;