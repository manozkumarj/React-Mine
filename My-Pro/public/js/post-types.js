$(document).ready(function () {
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
      $getDataAttr = $(this).attr("data-post-type");
      $(".postContentTextarea").css({
        background: "#006600",
        color: "#fff",
        border: "2px solid yellow",
      });
      // alert($getId + " *** " + $getDataAttr);
      if ($getDataAttr == "dashed-all") {
        $(".postContentTextarea").css({ "border-style": "dashed" });
      } else if ($getDataAttr == "dotted-all") {
        $(".postContentTextarea").css({ "border-style": "dotted" });
      } else if ($getDataAttr == "double-all") {
        $(".postContentTextarea").css({
          width: "94%",
          "border-style": "double",
          "border-width": "4px",
        });
      } else if ($getDataAttr == "solid-lNr") {
        $(".postContentTextarea").css({
          "border-top": "none",
          "border-bottom": "none",
        });
      } else if ($getDataAttr == "solid-tNb") {
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
    var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    $("body").css("margin-right", scrollBarWidth).addClass("toggleModal");
    $(
      "#postType-layerTwoModalContainer, .postType-layerTwoModalInner, .postType-sample-LayerTwo"
    ).show();
    $("#postType-layerTwoModalContainer").scrollTop(0);
    $("#postType-layerTwoModalContainer").focus();
    $("#postType-layerTwoModalContainer").css("overflow-y", "scroll");
  });
  // Individual post type preview N confirm  modal functionality - ends
});
