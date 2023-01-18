import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import { useEffect } from "react";
import "leaflet-plugin-trackplayback";
import "leaflet/dist/leaflet.css";
import { LayerGroup, FeatureGroup } from "react-leaflet";
import "leaflet-plugin-trackplayback/dist/control.trackplayback";
// import "leaflet-plugin-trackplayback/src/control.trackplayback/control.playback.css";
import "leaflet-plugin-trackplayback/dist/control.playback.css";
export default function TrackplayBack({ data }) {
  const context = useLeafletContext();

  useEffect(() => {
    const container = context.layerContainer || context.map;

    const trackplayback = new L.trackplayback(data, container, {
      // the play options
      clockOptions: {
        // the default speed
        // caculate method: fpstime * Math.pow(2, speed - 1)
        // fpstime is the two frame time difference
        speed: 10,
        // the max speed
        maxSpeed: 65,
      },
      // trackPoint options
      trackPointOptions: {
        // whether draw track point
        isDraw: false,
        // whether use canvas to draw it, if false, use leaflet api `L.circleMarker`
        useCanvas: true,
        stroke: false,
        color: "#ef0300",
        fill: true,
        fillColor: "#ef0300",
        opacity: 0.3,
        radius: 4,
      },
      // trackLine options
      trackLineOptions: {
        // whether draw track line
        isDraw: true,
        stroke: true,
        color: "#FFFFFF",
        weight: 1.5,
        fill: false,
        fillColor: "#FFFFFF",
        opacity: 1,
      },
      // target options
      targetOptions: {
        // whether use image to display target, if false, the program provide a default
        useImg: false,
        // if useImg is true, provide the imgUrl
        // imgUrl: "../../static/images/ship.png",
        // the width of target, unit: px
        width: 7,
        // the height of target, unit: px
        height: 14,
        // the stroke color of target, effective when useImg set false
        color: "#FFFF00",
        // the fill color of target, effective when useImg set false
        fillColor: "#9FD12D",
      },
    });

    const trackplaybackControl = L.trackplaybackcontrol(trackplayback);
    trackplaybackControl.addTo(container);

    return () => {
      if (trackplayback?.track !== null) trackplayback.dispose();
    };
    // return () => {
    //   if (trackplayback !== null) trackplayback.dispose();
    //   //Ssas
    // };
    // container.addLayer(trackplayback);

    // return () => {
    //   container.removeLayer(trackplayback);
    // };
  }, []);

  return null;
}
