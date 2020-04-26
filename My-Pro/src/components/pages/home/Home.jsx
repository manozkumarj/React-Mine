import React, { Fragment } from "react";
import "./home.css";

export default function Home() {
  const handleOpen = (e) => {
    e.preventDefault();
    // alert();
    var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    console.log(scrollBarWidth);
    // document.getElementById("main").style.position = "fixed";
    document.body.style.overflowY = "hidden";
    document.body.style.marginRight = scrollBarWidth;
    document.getElementById("main").style.overflowY = "hidden";
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal").style.overflowY = "scroll";
  };

  const handleClose = (e) => {
    e.preventDefault();
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal").style.overflowY = "hidden";
    document.body.style.marginRight = 0;
    document.body.style.overflowY = "scroll";
  };

  return (
    <Fragment>
      <div className="three-divs-container" id="main">
        <div className="left-section">
          <div className="fixed-div">This is leftside div</div>
        </div>

        <div className="middle-section">
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <button onClick={handleOpen}>Click me</button>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <button onClick={handleOpen}>Click me</button>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <button onClick={handleOpen}>Click me</button>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <button onClick={handleOpen}>Click me</button>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <button onClick={handleOpen}>Click me</button>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <button onClick={handleOpen}>Click me</button>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <button onClick={handleOpen}>Click me</button>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <button onClick={handleOpen}>Click me</button>

          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <button onClick={handleOpen}>Click me</button>
        </div>

        <div className="right-section">
          <div className="fixed-div">This is rightside div</div>
        </div>
      </div>

      <div id="modal" tabIndex="1" className="modal">
        <div className="modal-inner">
          <button id="close" onClick={handleClose} type="button">
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
        </div>
      </div>
    </Fragment>
  );
}
