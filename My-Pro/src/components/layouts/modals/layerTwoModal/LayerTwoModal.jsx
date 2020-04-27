import React, { useContext } from "react";
import "./layerTwoModal.css";
import { ModalsContext } from "./../../../../contexts/ModalsContext";

const LayerTwoModal = () => {
  let { openLayerTwo, closeLayerTwo, toggleCloseLayerTwo } = useContext(
    ModalsContext
  );

  let classes = openLayerTwo
    ? "modal-layer-two modal-layer-two-show"
    : "modal-layer-two modal-layer-two-hide";

  if (openLayerTwo) {
    var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    console.log(scrollBarWidth);
    document.body.style.marginRight = scrollBarWidth + "px";
    document.body.style.overflowY = "hidden";
    document.getElementById("modal-layer-two").style.display = "block";
    document.getElementById("modal-layer-two").style.overflowY = "scroll";
    document.getElementById("modal-layer-two").scrollTo(0, 0);
    document.getElementById("modal-layer-two").focus();
  }

  if (closeLayerTwo) {
    document.getElementById("modal-layer-two").style.display = "none";
    document.getElementById("modal-layer-two").style.overflowY = "hidden";
  }

  return (
    <div className="LayerTwoModal">
      <div id="modal-layer-two" tabIndex="1" className={classes}>
        <div className="modal-inner-two">
          <button id="close" onClick={toggleCloseLayerTwo} type="button">
            close Modal
          </button>
          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <button id="close" onClick={toggleCloseLayerTwo} type="button">
            close Modal
          </button>
          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <button id="close" onClick={toggleCloseLayerTwo} type="button">
            close Modal
          </button>
          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <button id="close" onClick={toggleCloseLayerTwo} type="button">
            close Modal
          </button>
          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>

          <p>
            2nd layer --> Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Mauris ac ornare metus. Duis luctus consequat consectetur.
            Integer eleifend metus et condimentum rutrum. Nam vel laoreet diam,
            in gravida metus. Etiam sagittis diam nec lacus sodales, id
            hendrerit quam convallis. Proin finibus pretium commodo. Nam et
            luctus metus. Nulla vitae augue est. Donec vitae tristique urna, id
            cursus nunc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LayerTwoModal;
