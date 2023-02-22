import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LoginCreate from "./LoginCreate";
import LoginForm from "./LoginForm";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPaswwordReset from "./LoginPaswwordReset";
import styles from "./Login.module.css";
import NotFound from "../../NotFound";
import { useSelector } from "react-redux";
import Loading from "../Helper/Loading";

function Login() {
  const { data, loading } = useSelector((state) => state.user);

  if (loading) return <Loading />;
  if (data) return <Navigate to="/account" />;

  return (
    <section className={styles.login}>
      <div className={styles.forms}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="create" element={<LoginCreate />} />
          <Route path="forget" element={<LoginPasswordLost />} />
          <Route path="reset" element={<LoginPaswwordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </section>
  );
}

export default Login;
