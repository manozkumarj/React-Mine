import React, { useEffect } from "react";
import "./colorPalette.css";

const ColorPalette = (props) => {
  useEffect(() => {
    // console.log(props);
  }, []);

  const { storePlace } = props;
  //   console.log(storePlace);

  return (
    <div className="clrpkr-absolute">
      {/* row - 1 */}
      <span
        className="pick-clr clr-000000"
        data-store-place={storePlace}
        data-color="000000"
      ></span>
      <span
        className="pick-clr clr-ff0000"
        data-store-place={storePlace}
        data-store-place={storePlace}
        data-color="ff0000"
      ></span>
      <span
        className="pick-clr clr-999999"
        data-store-place={storePlace}
        data-color="999999"
      ></span>
      <span
        className="pick-clr clr-ff0066"
        data-store-place={storePlace}
        data-color="ff0066"
      ></span>
      <span
        className="pick-clr clr-ffff00"
        data-store-place={storePlace}
        data-color="ffff00"
      ></span>
      <span
        className="pick-clr clr-006600"
        data-store-place={storePlace}
        data-color="006600"
      ></span>
      <span
        className="pick-clr clr-53a3b4"
        data-store-place={storePlace}
        data-color="53a3b4"
      ></span>
      <span
        className="pick-clr clr-663300"
        data-store-place={storePlace}
        data-color="663300"
      ></span>
      {/* row - 2 */}
      <span
        className="pick-clr clr-993300"
        data-store-place={storePlace}
        data-color="993300"
      ></span>
      <span
        className="pick-clr clr-006699"
        data-store-place={storePlace}
        data-color="006699"
      ></span>
      <span
        className="pick-clr clr-66ff33"
        data-store-place={storePlace}
        data-color="66ff33"
      ></span>
      <span
        className="pick-clr clr-ffffff"
        data-store-place={storePlace}
        data-color="ffffff"
      ></span>
      <span
        className="pick-clr clr-006666"
        data-store-place={storePlace}
        data-color="006666"
      ></span>
      <span
        className="pick-clr clr-9900cc"
        data-store-place={storePlace}
        data-color="9900cc"
      ></span>
      <span
        className="pick-clr clr-000099"
        data-store-place={storePlace}
        data-color="000099"
      ></span>
      <span
        className="pick-clr clr-ff6600"
        data-store-place={storePlace}
        data-color="ff6600"
      ></span>
    </div>
  );
};

export default ColorPalette;
