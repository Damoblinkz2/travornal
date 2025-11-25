import { useEffect, useState } from "react";
import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./appLayout.module.css";
// import { useCities } from "../contexts/citiesContext";

const NavMobile = ({ handleView }) => {
  return (
    <div className={styles.nav}>
      <ul className={styles.list}>
        <li onClick={() => handleView("map")}>map</li>
        <li onClick={() => handleView("sidebar")}>cities</li>
      </ul>
    </div>
  );
};

const AppLayout = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [currentView, setCurrentView] = useState("map");
  // const { mobileForm } = useCities();
  // const { currentViewMobile, mobileForm } = useCities();

  const handleClick = () => {
    setIsMobile(!isMobile ? true : false);
  };

  useEffect(() => {
    if (innerWidth > 600) {
      setIsMobile(false);
    } else {
      setIsMobile(true);
    }
    console.log(isMobile);
    console.log(innerWidth);
  }, [innerWidth]);

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
      <NavMobile handleClick={handleClick} handleView={handleView} />
    </div>
  );
};

export default AppLayout;
