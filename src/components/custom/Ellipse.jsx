import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-ellipse";
import {
  useLeafletContext,
  createElementHook,
  useLayerLifecycle,
  createPathHook,
  createLeafComponent,
} from "@react-leaflet/core";

function createEllipse(props, context) {
  return {
    instance: new L.Ellipse(
      props.center,
      props.radii,
      props.tilt,
      props.options
    ),
    context,
  };
}
function updateEllipse(instance, props, prevProps) {
  if (
    props.center !== prevProps.center ||
    props.radii !== prevProps.radii ||
    props.tilt !== prevProps.tilt ||
    props.options !== prevProps.options
  ) {
    instance.setLatLng(props.center);
    instance.setRadius(props.radii);
    instance.setTilt(props.tilt);
    instance.setStyle(props.options);
  }
}
const useEllipseElement = createElementHook(createEllipse, updateEllipse);
const useEllipse = createPathHook(useEllipseElement);
const Ellipse = createLeafComponent(useEllipse);

export default Ellipse;
