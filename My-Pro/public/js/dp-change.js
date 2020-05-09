$(document).ready(function () {
  const maxFileSize = 1048576 * 5;

  $image_crop = $("#image_cropper_view").croppie({
    enableExif: true,
    viewport: {
      width: 200,
      height: 200,
      type: "square", //circle
    },
    boundary: {
      width: 300,
      height: 300,
    },
  });

  // Individual post type preview N confirm modal functionality - starts
  $(document).on("click", "#change-dp", function () {
    $getData = $(this).attr("data-type");
    console.log($getData);
    $("#dp-change-type").text($getData);

    let $getImgSrc;

    if ($getData.toLowerCase() == "primary") {
      $getImgSrc = $("#primary-dp-src").attr("src");
      $getImgSrc = "https://i.picsum.photos/id/250/500/500.jpg";
    } else if ($getData.toLowerCase() == "secondary") {
      $getImgSrc = $("#secondary-dp-src").attr("src");
      $getImgSrc = "https://i.picsum.photos/id/280/500/500.jpg";
    }

    console.log($getImgSrc);

    $image_crop
      .croppie("bind", {
        url: $getImgSrc,
      })
      .then(function () {
        console.log("jQuery bind complete");
      });

    open_dpChange_popup("dp_change_main");
  });

  $("#dp-upload").on("change", function () {
    console.log(this.files);

    let selectedFile = this.files[0];

    let fileSize = selectedFile["size"];
    console.log("fileSize --> " + fileSize);
    if (fileSize > maxFileSize) {
      console.log("One of selected files size is more than 5 MB");
      alert("One of selected files size is more than 5 MB");
      return false;
    }

    var reader = new FileReader();
    reader.onload = function (event) {
      $image_crop
        .croppie("bind", {
          url: event.target.result,
        })
        .then(function () {
          console.log("jQuery bind complete");
        });
    };
    reader.readAsDataURL(this.files[0]);
  });

  function open_dpChange_popup(popup_name) {
    var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    $("body").css("margin-right", scrollBarWidth).addClass("toggleModal");
    $(
      "#dp_change_layerOneModalContainer, .dp_change_layerOneModalInner, ." +
        popup_name
    ).show();
    $("#dp_change_layerOneModalContainer").scrollTop(0);
    $("#dp_change_layerOneModalContainer").focus();
    $("#dp_change_layerOneModalContainer").css("overflow-y", "scroll");
  }
});
