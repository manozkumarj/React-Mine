import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import "./modal.css";
import { Modal } from "react-responsive-modal";

const ModalPage = () => {
  const [openFirst, setOpenFirst] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);
  const littleLorem = (
    <p>
      Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus
      congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum
      quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at
      eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate
      consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat
      est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi.
      In hac habitasse platea dictumst. Vestibulum ac ultrices risus.
      Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar interdum
      velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent aliquet
      justo vitae rutrum volutpat. Ut quis pulvinar est.
    </p>
  );
  return (
    <>
      <span onClick={() => setOpenFirst(true)}>Open first modal</span>

      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}

      <span onClick={() => setOpenFirst(true)}>Open first modal</span>
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}

      <span onClick={() => setOpenFirst(true)}>Open first modal</span>
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}

      <span onClick={() => setOpenFirst(true)}>Open first modal</span>
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      {littleLorem}
      <span onClick={() => setOpenFirst(true)}>Open first modal</span>
      <Modal
        open={openFirst}
        onClose={() => setOpenFirst(false)}
        center
        classNames={{ overlay: "customOverlay-1", modal: "customModal-1" }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ccc",
            padding: "10px",
          }}
        >
          <p>First modal</p>
          <span
            style={{ backgroundColor: "red" }}
            onClick={() => setOpenSecond(true)}
          >
            Open second modal
          </span>
          {littleLorem}
          {littleLorem}
          <span
            style={{ backgroundColor: "red" }}
            onClick={() => setOpenSecond(true)}
          >
            Open second modal
          </span>
          {littleLorem}
          {littleLorem}
          {littleLorem}
          <span
            style={{ backgroundColor: "red" }}
            onClick={() => setOpenSecond(true)}
          >
            Open second modal
          </span>
          {littleLorem}
          {littleLorem}
          <span
            style={{ backgroundColor: "red" }}
            onClick={() => setOpenSecond(true)}
          >
            Open second modal
          </span>
        </div>
      </Modal>
      <Modal
        open={openSecond}
        onClose={() => setOpenSecond(false)}
        center
        classNames={{ overlay: "customOverlay", modal: "customModal" }}
        closeIcon={null}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "red",
            padding: "10px",
          }}
        >
          <p>Second modal</p>
          {littleLorem}
          {littleLorem}
        </div>
      </Modal>
    </>
  );
};

export default ModalPage;
