$(document).ready(function () {
  // Individual post type modal functionality - starts
  $(document).on("click", ".open-post-type-modal", function () {
    $("#bgcolor").val("006600");
    $("#textcolor").val("ffffff");
    $("#bordercolor").val("FFF711");

    $("#bgclrpkr").css({ background: "#006600", color: "#FFF" });
    $("#textclrpkr").css({ background: "#ffffff", color: "#000000" });
    $("#borderclrpkr").css({ background: "#FFF711", color: "#000000" });

    $(".postContentDiv").removeClass("postContentDivStyle");
    $getId = $(this).attr("id");
    if ($getId == "bg-N-text-type") {
      $(".picker-div-2").hide();
      $(".postContentTextarea, #postContentPreviewDiv").css({
        width: "96%",
      });
      $getDataAttr = $(this).attr("data-post-type");
      // bg-N-text - starts below
      if ($getDataAttr == "bg-N-text") {
        $("#bgcolor").val("ff0066");
        $("#textcolor").val("ffffff");

        $("#bgclrpkr").css({ background: "#ff0066", color: "#FFF" });
        $("#textclrpkr").css({ background: "#ffffff", color: "#000000" });

        $(".postContentTextarea, #postContentPreviewDiv").css({
          background: "#ff0066",
          color: "#fff",
          border: "none",
        });
        // text - starts below
      } else if ($getDataAttr == "text") {
        $("#bgcolor").val("ffffff");
        $("#textcolor").val("ff0066");

        $("#bgclrpkr").css({ background: "#ffffff", color: "#000000" });
        $("#textclrpkr").css({ background: "#ff0066", color: "#000000" });
        $(".postContentTextarea, #postContentPreviewDiv").css({
          background: "#fff",
          color: "#ff0066",
          border: "none",
        });
      }

      open_postTypes_layerOne_popup("postType-sample-LayerOne");
      // bg-N-text-N-border-type - starts below
    } else if ($getId == "bg-N-text-N-border-type") {
      $(".picker-div-2").show();
      $(".postContentTextarea, #postContentPreviewDiv").css({
        width: "95%",
      });
      $(".postContentDiv").addClass("postContentDivStyle");
      $getDataAttrBorderStyle = $(this).attr("data-post-border-style");
      $getDataAttrBorderSides = $(this).attr("data-post-border-sides");
      $(".postContentTextarea, #postContentPreviewDiv, .postContentDiv").css({
        background: "#006600",
        color: "#fff",
      });
      $(".postContentTextarea, #postContentPreviewDiv").css({
        border: "2px solid yellow",
      });

      $("#borderStyle").val("solid");
      // alert($getId + " *** " + $getDataAttr);
      if ($getDataAttrBorderStyle == "dashed") {
        $("#borderStyle").val("dashed");
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-style": "dashed",
        });
      } else if ($getDataAttrBorderStyle == "dotted") {
        $("#borderStyle").val("dotted");
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-style": "dotted",
        });
      } else if ($getDataAttrBorderStyle == "double") {
        $("#borderStyle").val("double");
        $(".postContentTextarea, #postContentPreviewDiv").css({
          width: "94%",
          "border-style": "double",
          "border-width": "4px",
        });
      }

      if ($getDataAttrBorderSides == "lNr") {
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-top": "transparent",
          "border-bottom": "transparent",
        });
      } else if ($getDataAttrBorderSides == "tNb") {
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-left": "transparent",
          "border-right": "transparent",
        });
      }

      open_postTypes_layerOne_popup("postType-sample-LayerOne");
    } else if ($getId == "border-fold-type") {
      open_postTypes_layerOne_popup("postType-sample-two-LayerOne");
    } else {
      alert("Something went wrong");
      return false;
    }
  });
  // Individual post type modal functionality - ends

  // Individual post type preview N confirm modal functionality - starts
  $(document).on("click", "#postType-openLayerTwoModal", function () {
    $postContent = $(".postContentTextarea").val();
    $postContent = $postContent.trim();
    if ($postContent) {
      $("#postContentPreviewDiv").text($postContent);

      open_postTypes_layerTwo_popup("postType-sample-LayerTwo");
    } else {
      // alert("Enter some text");
      $("#warning-div").slideDown("slow");
      $(".postContentTextarea").val("");
    }
  });
  // Individual post type preview N confirm  modal functionality - ends

  // textarea focus event - starts
  $(document).on("focus", ".postContentTextarea", function () {
    $("#warning-div").slideUp("slow");
  });
  // textarea focus event - ends

  // Clrpkr change events - starts
  $(document).on("change", "#bgcolor", function () {
    $val = $(this).val();
    console.log($val);
    $(".postContentTextarea, .postContentDiv, #postContentPreviewDiv").css(
      "background",
      "#" + $val
    );
  });

  $(document).on("change", "#textcolor", function () {
    $val = $(this).val();
    console.log($val);
    $(".postContentTextarea, #postContentPreviewDiv").css("color", "#" + $val);
  });

  $(document).on("change", "#bordercolor", function () {
    $val = $(this).val();
    console.log($val);
    $(".postContentTextarea, #postContentPreviewDiv").css(
      "border-color",
      "#" + $val
    );
  });
  // Clrpkr change events - ends

  // Post border selector change event - starts
  $(document).on("change", "#post-borders-selecter", function () {
    $val = $(this).val();
    $getBorderStyle = $("#borderStyle").val();
    $getBorderColor = "#" + $("#bordercolor").val();
    $borderWidth = "2px ";

    if ($getBorderStyle == "double") {
      $borderWidth = "4px ";
    }

    if ($val && $getBorderStyle) {
      $(".postContentTextarea, #postContentPreviewDiv").css(
        "border",
        $borderWidth + $getBorderStyle + " " + $getBorderColor
      );
      console.log($val + " ** " + $getBorderStyle + " ** " + $getBorderColor);
      if ($val == "all") {
        console.log($val);
      } else if ($val == "lNr") {
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-top": "transparent",
          "border-bottom": "transparent",
        });
      } else if ($val == "tNb") {
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-left": "transparent",
          "border-right": "transparent",
        });
      }
    } else {
      alert("Something went wrong");
    }
  });
  // Post border selector change event - ends

  function open_postTypes_layerOne_popup(popup_name) {
    var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    $("body").css("margin-right", scrollBarWidth).addClass("toggleModal");
    $(
      "#postType-layerOneModalContainer, .postType-layerOneModalInner, ." +
        popup_name
    ).show();
    $("#postType-layerOneModalContainer").scrollTop(0);
    $("#postType-layerOneModalContainer").focus();
    $("#postType-layerOneModalContainer").css("overflow-y", "scroll");
  }

  function open_postTypes_layerTwo_popup(popup_name) {
    var scrollBarWidth = window.innerWidth - document.body.offsetWidth;
    $("body").css("margin-right", scrollBarWidth).addClass("toggleModal");
    $(
      "#postType-layerTwoModalContainer, .postType-layerTwoModalInner, ." +
        popup_name
    ).show();
    $("#postType-layerTwoModalContainer").scrollTop(0);
    $("#postType-layerTwoModalContainer").focus();
    $("#postType-layerTwoModalContainer").css("overflow-y", "scroll");
  }
});
