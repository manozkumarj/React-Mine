$(document).ready(function () {
  $(document).on("focus", ".postContentTextarea", function () {
    $("#warning-div").slideUp("slow");
  });

  // Individual post type modal functionality - starts
  $(document).on("click", ".open-post-type-modal", function () {
    $(".postContentDiv").removeClass("postContentDivStyle");
    $getId = $(this).attr("id");
    if ($getId == "bg-N-text-type") {
      $(".postContentTextarea").css({
        width: "96%",
      });
      $getDataAttr = $(this).attr("data-post-type");
      if ($getDataAttr == "bg-N-text") {
        $(".postContentTextarea").css({
          background: "#ff0066",
          color: "#fff",
          border: "none",
        });
      } else if ($getDataAttr == "text") {
        $(".postContentTextarea").css({
          background: "#fff",
          color: "#ff0066",
          border: "none",
        });
      }
    } else if ($getId == "bg-N-text-N-border-type") {
      $(".postContentTextarea").css({
        width: "95%",
      });
      $(".postContentDiv").addClass("postContentDivStyle");
      $getDataAttrBorderStyle = $(this).attr("data-post-border-style");
      $getDataAttrBorderSides = $(this).attr("data-post-border-sides");
      $(".postContentTextarea").css({
        background: "#006600",
        color: "#fff",
        border: "2px solid yellow",
      });
      // alert($getId + " *** " + $getDataAttr);
      if ($getDataAttrBorderStyle == "dashed") {
        $(".postContentTextarea").css({ "border-style": "dashed" });
      } else if ($getDataAttrBorderStyle == "dotted") {
        $(".postContentTextarea").css({ "border-style": "dotted" });
      } else if ($getDataAttrBorderStyle == "double") {
        $(".postContentTextarea").css({
          width: "94%",
          "border-style": "double",
          "border-width": "4px",
        });
      }

      if ($getDataAttrBorderSides == "lNr") {
        $(".postContentTextarea").css({
          "border-top": "none",
          "border-bottom": "none",
        });
      } else if ($getDataAttrBorderSides == "tNb") {
        $(".postContentTextarea").css({
          "border-left": "none",
          "border-right": "none",
        });
      }
    } else {
      alert("Something went wrong");
    }

    var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    $("body").css("margin-right", scrollBarWidth).addClass("toggleModal");
    $(
      "#postType-layerOneModalContainer, .postType-layerOneModalInner, .postType-sample-LayerOne"
    ).show();
    $("#postType-layerOneModalContainer").scrollTop(0);
    $("#postType-layerOneModalContainer").focus();
    $("#postType-layerOneModalContainer").css("overflow-y", "scroll");
  });
  // Individual post type modal functionality - ends

  // Individual post type preview N confirm modal functionality - starts
  $(document).on("click", "#postType-openLayerTwoModal", function () {
    $postContent = $(".postContentTextarea").val();
    $postContent = $postContent.trim();
    if ($postContent) {
      $("#postContentPreviewDiv").text($postContent);
      var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
      $("body").css("margin-right", scrollBarWidth).addClass("toggleModal");
      $(
        "#postType-layerTwoModalContainer, .postType-layerTwoModalInner, .postType-sample-LayerTwo"
      ).show();
      $("#postType-layerTwoModalContainer").scrollTop(0);
      $("#postType-layerTwoModalContainer").focus();
      $("#postType-layerTwoModalContainer").css("overflow-y", "scroll");
    } else {
      // alert("Enter some text");
      $("#warning-div").slideDown("slow");
      $(".postContentTextarea").val("");
    }
  });
  // Individual post type preview N confirm  modal functionality - ends
});
