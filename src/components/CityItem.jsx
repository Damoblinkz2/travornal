import { useCities } from "../contexts/citiesContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities();

  const { countryCode, date, _id, position } = city;
  console.log(position);

  const handleClick = (e) => {
    e.preventDefault();
    deleteCity(_id);
  };
  return (
    <li>
      <Link
        to={`${_id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          _id === currentCity?.id ? styles["cityItem--active"] : ""
        }`}
      >
        <img
          className={styles.flag}
          src={`https://flagsapi.com/${countryCode}/flat/24.png`}
        />
        <h3 className={styles.name}>{city.city}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
