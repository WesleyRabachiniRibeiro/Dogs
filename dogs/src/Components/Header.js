import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import { useSelector } from "react-redux";

function Header() {

  const {data} = useSelector(state => state.user)

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.brand} to="/" aria-label="Dogs - Home">
          <Dogs />
        </Link>
        {data ? (
          <Link to="/account" className={styles.login}>
            {data.nome}
          </Link>
        ) : (
          <Link to="/login" className={styles.login}>
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
