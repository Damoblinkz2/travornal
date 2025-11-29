import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useState, useEffect } from "react";
import { useCities } from "../contexts/citiesContext";

import styles from "./Map.module.css";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

const Map = ({ handleView }) => {
  const { cities } = useCities();
  const {
    isLoading: isLoadingPosition,
    position: geoLocationPosition,
    getPosition,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  const [position, setPosition] = useState([7.61, 4.74]);
  // console.log(setPosition());

  // const position = [51.505, -0.09];
  useEffect(() => {
    if (mapLat && mapLng) setPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoLocationPosition)
      setPosition([geoLocationPosition.lat, geoLocationPosition.lng]);
  }, [geoLocationPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoLocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        center={position}
        zoom={10}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities?.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span role="img">
                <img
                  className={styles.flag_pop}
                  src={
                    city.countryCode !== "" || city.countryCode !== undefined
                      ? `https://flagsapi.com/${city.countryCode}/flat/24.png`
                      : null
                  }
                />
                {` ${city.cityName}`}
              </span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={position} />
        <DetectClick handleView={handleView} />
      </MapContainer>
    </div>
  );
};

const ChangeCenter = ({ position }) => {
  const map = useMap();
  map.setView(position);
  return null;
};

const DetectClick = ({ handleView }) => {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      handleView("sidebar");
    },
  });
};

export default Map;
