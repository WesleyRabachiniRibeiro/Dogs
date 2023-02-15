import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { ReactComponent as Photos } from "../../Assets/feed.svg";
import { ReactComponent as Stats } from "../../Assets/estatisticas.svg";
import { ReactComponent as AddPhoto } from "../../Assets/adicionar.svg";
import { ReactComponent as Exit } from "../../Assets/sair.svg";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

function UserHeaderNav() {
  const { userLogout } = React.useContext(UserContext);
  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const { pathname } = useLocation();
  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}
      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <NavLink to="/account" end>
          <Photos />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink to="/account/stats">
          <Stats />
          {mobile && "Estatisticas"}
        </NavLink>
        <NavLink to="/account/photo">
          <AddPhoto />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={userLogout}>
          <Exit />
          {mobile && "Sair"}
        </button>
      </nav>
    </>
  );
}

export default UserHeaderNav;
