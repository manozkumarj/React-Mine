import React, { useContext } from "react";
import "./modals.css";
import { ModalsContext } from "./../../../contexts/ModalsContext";
import LayerOneModal from "./layerOneModal/LayerOneModal";

const Modals = () => {
  let { isLayerOne, isLayerTwo, toggleLayerOne, toggleLayerTwo } = useContext(
    ModalsContext
  );

  let renderModal = isLayerOne && <LayerOneModal />;

  return <div className="Modals"></div>;
};

export default Modals;
