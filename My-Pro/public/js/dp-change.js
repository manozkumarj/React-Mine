$(document).ready(function () {
  const maxFileSize = 1048576 * 5;

  $dp_image_crop = $("#dp_image_cropper_view").croppie({
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

  $timeline_image_crop = $("#timeline_image_cropper_view").croppie({
    enableExif: true,
    viewport: {
      width: 400,
      height: 200,
      type: "square", //circle
    },
    boundary: {
      width: 500,
      height: 250,
    },
  });

  // Opening DP changes popup - starts
  $(document).on("click", "#change-dp, #change-timeline", function () {
    $(
      "#dp_img_change_croppie_modal, #timeline_img_change_croppie_modal"
    ).hide();
    $getDataFileType = $(this).attr("data-file-type");
    console.log($getDataFileType);

    if ($getDataFileType == "dp" || $getDataFileType == "timeline") {
      let $getImgSrc;

      if ($getDataFileType == "dp") {
        $("#dp_img_change_croppie_modal").show();
        $getData = $(this).attr("data-type");
        console.log($getData);
        $title = $getData + " Profile change";
        $("#dp-and-timeline-change-title").text($title);

        if ($getData.toLowerCase() == "primary") {
          $getImgSrc = $("#primary-dp-src").attr("src");
          $getImgSrc = "https://i.picsum.photos/id/250/500/500.jpg";
        } else if ($getData.toLowerCase() == "secondary") {
          $getImgSrc = $("#secondary-dp-src").attr("src");
          $getImgSrc = "https://i.picsum.photos/id/280/500/500.jpg";
        }

        console.log($getImgSrc);

        $dp_image_crop
          .croppie("bind", {
            url: $getImgSrc,
          })
          .then(function () {
            console.log("jQuery bind complete");
          });
      } else if ($getDataFileType == "timeline") {
        $("#dp-and-timeline-change-title").text("Cover pic change");
        $("#timeline_img_change_croppie_modal").show();
        $getImgSrc = "https://i.picsum.photos/id/400/200/500.jpg";
        $timeline_image_crop
          .croppie("bind", {
            url: $getImgSrc,
          })
          .then(function () {
            console.log("jQuery bind complete");
          });
      }

      open_dpChange_popup("dp_change_main");
    } else {
      alert("Something went wrong");
    }
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
      $dp_image_crop
        .croppie("bind", {
          url: event.target.result,
        })
        .then(function () {
          console.log("jQuery bind complete");
        });

      $timeline_image_crop
        .croppie("bind", {
          url: event.target.result,
        })
        .then(function () {
          console.log("jQuery bind complete");
        });
    };
    reader.readAsDataURL(this.files[0]);
  });

  $("#crop-selected-part").click(function (event) {
    let authToken = localStorage.getItem("authToken");
    $dp_image_crop
      .croppie("result", {
        type: "canvas",
        size: "viewport",
      })
      .then(function (response) {
        // console.log("cropped dp pic data is below");
        // console.log(response);

        // $("#hiddenFile").val(response);
        $("#primary-dp-src").attr("src", response);
        let image = $("#dp-upload")[0].files[0];

        console.log(image);
        // let values = [...image.entries()];
        // console.log(values);

        var formData = new FormData();
        formData.append("images", image);

        $.ajax({
          url: "http://localhost:8088/api/users/update-primary-dp",
          headers: { "x-auth-token": authToken },
          type: "POST",
          processData: false,
          contentType: false,
          data: formData,
          success: function (data) {
            console.log("DP uploaded & data is below");
            console.log(data);
          },
        });
      });
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
