import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [data, setData] = useState();

    useEffect(() => {
      const getUser = async () => {
        const response = await fetch("http://localhost:4000/user/me", {
          credentials: "include",
        });
        const userData = await response.json();
        if (!userData.status) {
          router.push("/admin/login");
        } else {
          setData(userData);
        }
      };
      getUser();
    }, [router]);

    return !!data ? <Component /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
