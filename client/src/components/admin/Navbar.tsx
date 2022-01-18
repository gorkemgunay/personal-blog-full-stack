import useSWR from "swr";

interface Props {}

const Navbar: React.FC<Props> = () => {
  const me: any = useSWR("http://localhost:4000/user/me", (...args) =>
    fetch(...args, { credentials: "include" }).then((res) => res.json())
  );

  return (
    <nav className="admin__navbar">
      <div className="admin__navbarMenu">
        <div className="admin__navbarUser">
          {me?.data?.data?.name} {me?.data?.data?.surname}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
