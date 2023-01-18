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

import "leaflet/dist/leaflet.css";
const polygons_1 = require("../static/ikea_jeddah_polygons_fl_1.json");
const floor_plan_1 = require("../static/floor_plan_1.json");
const raw_transition_data = require("../static/static_transitions.json");
const floor_1 = raw_transition_data.result.filter((item) => {
  return item.floor == 1;
});
const to_hashed = floor_1.map((item) => item.hash_id);
const unique_hashed = [...new Set(to_hashed)];
const transitions_data = unique_hashed.map((id) => {
  const filtered = raw_transition_data.result.filter((item) => {
    return item.hash_id === id;
  });
  let arr = [];
  filtered.forEach((it, index) => {
    arr.push({
      lat: it.latitude,
      lng: it.longitude,
      time: it.timestamp,
      info: [{ key: index, value: it.hash_id }],
    });
  });
  return arr;
});
import Ellipse from "./custom/Ellipse";
import DistortableImgOverlay from "./custom/DistortableImgOverlay";
import TrackplayBack from "./custom/TrackPlayback";
function getVoivodeshipName(feature, layer) {
  if (feature.properties && feature.properties.name) {
    layer.bindPopup(feature.properties.name);
  }
}
function onEachFeature(feature, layer) {
  // layer.bindTooltip(feature.properties.name, {
  //   direction: "center",
  //   permanent: true,
  //   className: "tooltip-transparent",
  //   color: "#fff",
  // });

  layer.on("mouseover", function (e) {
    getVoivodeshipName(feature, layer);

    this.openPopup();

    // style
    this.setStyle({
      fillColor: "#3388ff",
      weight: 0.01,
      color: "#3388ff",
      fillOpacity: 0.01,
    });
  });

  layer.on("mouseout", function () {
    this.closePopup();
    // style
    this.setStyle({
      fillColor: "#3388ff",
      weight: 0.01,
      color: "#3388ff",
      fillOpacity: 0.01,
    });
  });
}
const TransMap = () => {
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState({
    base: "https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}.png",
    additional: "http://ariadnetiles.device-analytics.com/hot1/{z}/{x}/{y}.png",
  });
  const [showImg, setShowImg] = useState(true);
  return (
    <div>
      <MapContainer
        whenCreated={(map) => setMap(map)}
        className={styles.map}
        center={[21.55714349076981, 39.183163768695984]}
        zoom={18}
        scrollWheelZoom={false}
      >
        <LayersControl position='bottomright'>
          <LayersControl.BaseLayer checked name='Map'>
            <TileLayer
              maxNativeZoom={19}
              maxZoom={24}
              attribution='&copy; <a href="http://cartodb.com/attributions">CartoDB</a> contributors'
              url={maps.base}
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name='Additional'>
            <TileLayer
              maxNativeZoom={19}
              maxZoom={24}
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={maps.additional}
            />
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name='Floor plans'>
            <LayerGroup
              eventHandlers={{
                add: (e) => {
                  setShowImg(true);
                },
                remove: (e) => {
                  setShowImg(false);
                },
              }}
            >
              <DistortableImgOverlay
                show={showImg}
                src={floor_plan_1[0]["imgSrc"]}
                corners={floor_plan_1[0]["coords"]}
              />
              <DistortableImgOverlay
                show={showImg}
                src={floor_plan_1[1]["imgSrc"]}
                corners={floor_plan_1[1]["coords"]}
              />
            </LayerGroup>
          </LayersControl.Overlay>
        </LayersControl>

        {transitions_data?.length && <TrackplayBack data={transitions_data} />}
        {true && (
          <GeoJSON
            style={{
              fillColor: "#3388ff",
              weight: 0.01,
              color: "#3388ff",
              fillOpacity: 0.01,
              // zIndex: -10,
            }}
            data={polygons_1.final_data}
            onEachFeature={onEachFeature}
          />
        )}
      </MapContainer>
    </div>
  );
};

export default TransMap;
