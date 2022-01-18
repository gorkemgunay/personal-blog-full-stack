import Link from "next/link";
import {
  CategoryIcon,
  HomeIcon,
  PaperIcon,
  SettingsIcon,
  UserIcon,
} from "../../utility/Icons";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <h2 className="sidebar__logo">Admin Dashboard</h2>
      <ul className="sidebar__menu">
        <Link href="/admin" passHref>
          <li className="sidebar__menuItem">
            <HomeIcon />
            <a className="sidebar__menuLink">Dashboard</a>
          </li>
        </Link>

        <Link href="/admin/home" passHref>
          <li className="sidebar__menuItem">
            <SettingsIcon />
            <a className="sidebar__menuLink">Home Settings</a>
          </li>
        </Link>

        <Link href="/admin/post" passHref>
          <li className="sidebar__menuItem">
            <PaperIcon />
            <a className="sidebar__menuLink">Post Settings</a>
          </li>
        </Link>

        <Link href="/admin/category" passHref>
          <li className="sidebar__menuItem">
            <CategoryIcon />
            <a className="sidebar__menuLink">Category Settings</a>
          </li>
        </Link>

        <Link href="/admin/user" passHref>
          <li className="sidebar__menuItem">
            <UserIcon />
            <a className="sidebar__menuLink">User Settings</a>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
