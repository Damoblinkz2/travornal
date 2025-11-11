import styles from "./Button.module.css";
import { Link } from "react-router-dom";

const Button = ({ children, onClick, type }) => {
  return (
    <button className={`${styles.btn} ${styles[type]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
