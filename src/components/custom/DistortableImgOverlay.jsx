import { useLeafletContext } from "@react-leaflet/core";
import L from "leaflet";
import { useEffect, useRef } from "react";
import "leaflet-toolbar";
import "leaflet-distortableimage";
import "leaflet-distortableimage/dist/vendor.js";

// import "leaflet/dist/leaflet.css";
import "leaflet-toolbar/dist/leaflet.toolbar.css";
import "leaflet-distortableimage/dist/leaflet.distortableimage.css";

export default function DistortableImgOverlay({ src, corners, show }) {
  const context = useLeafletContext();
  const imgRef = useRef();
  const propsRef = useRef({ src, corners });

  useEffect(() => {
    imgRef.current = L.distortableImageOverlay(src, {
      mode: "lock",
      actions: [],
      editable: false,
      corners: [
        L.latLng(corners[0].lat, corners[0].lng),
        L.latLng(corners[1].lat, corners[1].lng),
        L.latLng(corners[2].lat, corners[2].lng),
        L.latLng(corners[3].lat, corners[3].lng),
      ],
    });

    const container = context.layerContainer || context.map;
    if (show) container.addLayer(imgRef.current);

    return () => {
      container.removeLayer(imgRef.current);
    };
  }, [show]);
  // useEffect(() => {
  //   console.log("Called");
  //   const container = context.layerContainer || context.map;
  //   if (show) {
  //     container.addLayer(imgRef.current);
  //   } else if (!show) {
  //     container.removeLayer(imgRef.current);
  //   }
  // }, [show]);

  return null;
}
