import Link from "next/link";

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav className="navbar container">
        <ul className="navbar__menu">
          <li className="navbar__menuItem">
            <Link href="/">
              <a className="navbar__menuLink">Home</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
