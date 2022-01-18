import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

const AdminLogin: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div className="admin__login container">
      <h2 className="admin__loginTitle">Admin Login</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          fetch("http://localhost:4000/user/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email: email,
              password: password,
            }),
          }).then(() => {
            router.push("/admin");
          });
        }}
      >
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Please Enter Your Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Please Enter Your Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
