import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <ul className="footer__menu container">
        <li className="footer__menuItem">
          <Link href="/">
            <a className="footer__menuLink">Home</a>
          </Link>
        </li>
      </ul>
      <div className="footer__copyright container">
        <small>Copyright 2021. Gorkem Gunay.</small>
      </div>
    </footer>
  );
};

export default Footer;
