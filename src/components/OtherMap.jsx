import React, { useEffect, useRef, useState } from "react";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  useMap,
  MapContainerProps,
  Popup,
  Marker,
  GeoJSON,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import cities from "@/static/data";
import "leaflet/dist/leaflet.css";
import Ellipse from "./custom/Ellipse";
const OtherMap = () => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState({
    base: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  });
  return (
    <>
      <MapContainer
        center={[38, -82]}
        zoom={4}
        zoomControl={false}
        style={{ height: "100vh", width: "100%", padding: 0 }}
        whenCreated={(map) => setMap(map)}
      >
        <LayersControl position='topleft'>
          <LayersControl.BaseLayer checked name='Map'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name='Markers'>
            <LayerGroup>
              {cities.map((city) => (
                <Marker position={[city.lat, city.lng]}>
                  <Popup>{city.city}</Popup>
                </Marker>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay name='Ellipses' checked>
            <LayerGroup>
              {cities.map((city) => (
                <>
                  <Ellipse
                    center={[city.lat, city.lng]}
                    radii={[city.semimajor, city.semiminor]}
                    tilt={city.tilt}
                    options={city.options}
                  />
                </>
              ))}
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  );
};

export default OtherMap;
