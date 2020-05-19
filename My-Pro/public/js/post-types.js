$(document).ready(function () {
  // color-palette openers
  $(document).on("click", ".color-palette", function () {
    $(".clrpkr-absolute-container").hide();
    $getId = $(this).attr("data-color-palette-id");
    $(".color-palette-" + $getId).show();
  });

  // Choose color
  $(document).on("click", ".pick-clr", function () {
    $getStorePlace = $(this).attr("data-store-place");
    $getColorCode = $(this).attr("data-color");
    console.log($getStorePlace + " - " + $getColorCode);
    $("#" + $getStorePlace).val($getColorCode);

    if ($getStorePlace == "bgcolor") {
      $(".postContentTextarea, .postContentDiv, #postContentPreviewDiv").css(
        "background",
        "#" + $getColorCode
      );
    } else if ($getStorePlace == "textcolor") {
      $(".postContentTextarea, #postContentPreviewDiv").css(
        "color",
        "#" + $getColorCode
      );
    } else if ($getStorePlace == "bordercolor") {
      $(".postContentTextarea, #postContentPreviewDiv").css(
        "border-color",
        "#" + $getColorCode
      );
    } else if ($getStorePlace == "brdrFoldNcutPost-bgclrpkr") {
      $("#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer").css(
        "background",
        "#" + $getColorCode
      );
    } else if ($getStorePlace == "brdrFoldNcutPost-textclrpkr") {
      $("#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer").css(
        "color",
        "#" + $getColorCode
      );
    }
  });

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

      console.log("$getDataAttrBorderStyle --> " + $getDataAttrBorderStyle);

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
    } else if ($getId == "border-fold-type" || $getId == "border-cut-type") {
      $getDataAttr = $(this).attr("data-post-fold-or-cut-class");
      $(
        "#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer"
      ).removeClass(
        "cornerFold_topRight cornerFold_bottomRight cornerFold_bottomLeft cornerFold_topLeft cornerFold_topRight_bottomLeft cornerFold_topLeft_bottomRight remove_cornerShadow"
      );

      $(
        "#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer"
      ).addClass($getDataAttr);

      if ($getId == "border-cut-type") {
        $(
          "#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer"
        ).addClass("remove_cornerShadow");
      }

      $("#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer").css({
        background: "#53a3b4",
        color: "#ffffff",
      });

      $("#brdrFoldNcutPost-bgclrpkr").val("53a3b4");
      $("#brdrFoldNcutPost-textclrpkr").val("ffffff");

      $("#brdrFoldNcut-bgclrpkr").css({
        background: "#53a3b4",
        color: "#000000",
      });
      $("#brdrFoldNcut-textclrpkr").css({
        background: "#ffffff",
        color: "#000000",
      });

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
      $(".warning-div").slideDown("slow");
      $(".postContentTextarea").val("");
    }
  });
  // Individual post type preview N confirm  modal functionality - ends

  // Individual brdrFoldNcut-post type preview N confirm modal functionality - starts
  $(document).on(
    "click",
    "#brdrFoldNcut-postType-openLayerTwoModal",
    function () {
      $postContent = $("#brdrFoldNcutPostContentTextarea").val();
      $postContent = $postContent.trim();
      if ($postContent) {
        $("#brdrFoldNcutPostContentPreviewer").text($postContent);

        open_postTypes_layerTwo_popup("postType-sample-two-LayerTwo");
      } else {
        // alert("Enter some text");
        $(".warning-div").slideDown("slow");
        $("#brdrFoldNcutPostContentTextarea").val("");
      }
    }
  );
  // Individual brdrFoldNcut-post type preview N confirm  modal functionality - ends

  // textarea focus event - starts
  $(document).on("focus", ".postContentTextarea", function () {
    $(".warning-div").slideUp("slow");
  });
  // textarea focus event - ends

  // textarea focus event - starts
  $(document).on("focus", "#brdrFoldNcutPostContentTextarea", function () {
    $(".warning-div").slideUp("slow");
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

  $(document).on("change", "#brdrFoldNcutPost-bgclrpkr", function () {
    $val = $(this).val();
    console.log($val);
    $("#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer").css(
      "background",
      "#" + $val
    );
  });

  $(document).on("change", "#brdrFoldNcutPost-textclrpkr", function () {
    $val = $(this).val();
    console.log($val);
    $("#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer").css(
      "color",
      "#" + $val
    );
  });

  // Clrpkr change events - ends

  // Post border selector change event - starts
  $(document).on("change", "#post-borders-selecter", function () {
    $val = $(this).val();
    $getBorderStyle = $("#borderStyle").val();
    $getBorderColor = "#" + $("#bordercolor").val();
    $borderWidth = "2px";

    if ($getBorderStyle == "double") {
      $borderWidth = "4px ";
    }

    if ($val && $getBorderStyle) {
      $(".postContentTextarea, #postContentPreviewDiv").css(
        "border",
        $borderWidth + " " + $getBorderStyle + " " + $getBorderColor
      );
      console.log($val + " ** " + $getBorderStyle + " ** " + $getBorderColor);
      if ($val == "all") {
        console.log($val);
      } else if ($val == "top") {
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-right": "transparent",
          "border-bottom": "transparent",
          "border-left": "transparent",
        });
      } else if ($val == "right") {
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-top": "transparent",
          "border-bottom": "transparent",
          "border-left": "transparent",
        });
      } else if ($val == "bottom") {
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-right": "transparent",
          "border-top": "transparent",
          "border-left": "transparent",
        });
      } else if ($val == "left") {
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-right": "transparent",
          "border-bottom": "transparent",
          "border-top": "transparent",
        });
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
