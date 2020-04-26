import React, { useContext } from "react";
import "./layerOneModal.css";
import { ModalsContext } from "./../../../../contexts/ModalsContext";

const LayerOneModal = () => {
  let {
    openLayerOne,
    toggleOpenLayerOne,
    closeLayerOne,
    toggleCloseLayerOne,
  } = useContext(ModalsContext);

  let classes = openLayerOne
    ? "modal-layer-one modal-layer-one-show"
    : "modal-layer-one modal-layer-one-hide";

  if (openLayerOne) {
    var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    console.log(scrollBarWidth);
    // document.getElementById("main").style.position = "fixed";
    // document.getElementById("main").style.overflowY = "hidden";
    document.getElementById("modal-layer-one").style.display = "block";
    document.getElementById("modal-layer-one").style.overflowY = "scroll";
    document.getElementById("modal-layer-one").scrollTo(0, 0);
    document.body.style.overflowY = "hidden";
    document.body.style.marginRight = scrollBarWidth + "px";
    document.getElementById("modal-layer-one").focus();
  }

  if (closeLayerOne) {
    document.getElementById("modal-layer-one").style.display = "none";
    document.getElementById("modal-layer-one").style.overflowY = "hidden";
    document.body.style.marginRight = "0px";
    document.body.style.overflowY = "scroll";
    document.body.focus();
  }

  return (
    <div className="LayerOneModal">
      <div id="modal-layer-one" tabIndex="1" className={classes}>
        <div className="modal-inner-one">
          <button id="close" onClick={toggleCloseLayerOne} type="button">
            close Modal
          </button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <button id="close" onClick={toggleCloseLayerOne} type="button">
            close Modal
          </button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <button id="close" onClick={toggleCloseLayerOne} type="button">
            close Modal
          </button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <button id="close" onClick={toggleCloseLayerOne} type="button">
            close Modal
          </button>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac
            ornare metus. Duis luctus consequat consectetur. Integer eleifend
            metus et condimentum rutrum. Nam vel laoreet diam, in gravida metus.
            Etiam sagittis diam nec lacus sodales, id hendrerit quam convallis.
            Proin finibus pretium commodo. Nam et luctus metus. Nulla vitae
            augue est. Donec vitae tristique urna, id cursus nunc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LayerOneModal;
