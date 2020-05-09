$(document).ready(function () {
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

    if ($getData.toString() == "primary")
      $getImgSrc = $("#primary-dp-src").attr("src");
    else if ($getData.toString() == "secondary")
      $getImgSrc = $("#secondary-dp-src").attr("src");

    console.log($getImgSrc);

    var reader = new FileReader();
    reader.onload = function (event) {
      $image_crop
        .croppie("bind", {
          url: $getImgSrc,
        })
        .then(function () {
          console.log("jQuery bind complete");
        });
    };

    open_dpChange_popup("dp_change_main");
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
