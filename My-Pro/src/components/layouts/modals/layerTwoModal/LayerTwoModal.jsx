import React, { useContext } from "react";
import "./layerTwoModal.css";
import { ModalsContext } from "./../../../../contexts/ModalsContext";

const LayerTwoModal = () => {
  let { isLayerTwo, toggleLayerTwo } = useContext(ModalsContext);

  let renderModal = isLayerTwo ? <LayerTwoModal /> : null;
  return <div className="LayerTwoModal">{renderModal}</div>;
};

export default LayerTwoModal;
