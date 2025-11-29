import { useEffect, useState } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./appLayout.module.css";
import { NavLink } from "react-router-dom";
// import { useCities } from "../contexts/citiesContext";

const NavMobile = ({ handleView }) => {
  return (
    <div className={styles.nav}>
      <ul className={styles.list}>
        <li onClick={() => handleView("map")}>Map</li>
        <li onClick={() => handleView("sidebar")}>
          <NavLink
            to="cities"
            style={{ color: "white", textDecoration: "none" }}
          >
            Cities
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

const AppLayout = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [currentView, setCurrentView] = useState("map");
  const [isInnerWidth, setIsInnerWidth] = useState(innerWidth);
  // const { mobileForm } = useCities();
  // const { currentViewMobile, mobileForm } = useCities();

  // const handleClick = () => {
  //   setIsMobile(!isMobile ? true : false);
  // };

  useEffect(() => {
    if (isInnerWidth > 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
      setIsInnerWidth(innerWidth);
    }
  }, [isInnerWidth]);

  const handleView = (view) => {
    // mobileForm(view);
    if (isMobile === false) return;
    setCurrentView(view);
  };
  return (
    <div>
      <div className={styles.app}>
        {!isMobile ? (
          <>
            <Sidebar />
            <Map />
          </>
        ) : currentView === "map" ? (
          <Map handleView={handleView} />
        ) : (
          <Sidebar />
        )}
      </div>
      <NavMobile handleView={handleView} />
    </div>
  );
};

export default AppLayout;
