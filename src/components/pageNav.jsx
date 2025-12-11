import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

const PageNav = () => {
  return (
    <nav className={styles.nav}>
      <Logo />
      <div className={styles.mobileNav}>X</div>
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/signup" className={styles.ctaLink}>
            Signup
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default PageNav;
