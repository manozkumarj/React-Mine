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
      // $("#bgcolor").val($getColorCode);
      $(".postContentTextarea, .postContentDiv, #postContentPreviewDiv").css(
        "background",
        "#" + $getColorCode
      );
    } else if ($getStorePlace == "textcolor") {
      // $("#textcolor").val($getColorCode);
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

    $getbgcolorr = $("#bgcolor").val();
    $gettextcolorr = $("#textcolor").val();

    $get_brdrFoldNcutPostbgcolorr = $("#brdrFoldNcutPost-bgclrpkr").val();
    $get_brdrFoldNcutPosttextcolorr = $("#brdrFoldNcutPost-textclrpkr").val();
    if (
      $getbgcolorr == $gettextcolorr ||
      $get_brdrFoldNcutPostbgcolorr == $get_brdrFoldNcutPosttextcolorr
    ) {
      $(".warning-div").text(
        "Post background color & text color can't be same"
      );
      $(".warning-div").slideDown("slow");
    } else {
      $(".warning-div").slideUp("slow");
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

      localStorage.setItem(
        "_bgNtextNborderPostBorderStyleSides",
        $getDataAttrBorderSides
      );

      console.log("$getDataAttrBorderStyle --> " + $getDataAttrBorderStyle);

      $(".postContentTextarea, #postContentPreviewDiv, .postContentDiv").css({
        background: "#006600",
        color: "#fff",
      });
      $(".postContentTextarea, #postContentPreviewDiv").css({
        border: "2px solid yellow",
      });

      $("#borderStyle").val("solid");
      localStorage.setItem("_bgNtextNborderPostBorderStyle", "solid");
      $("#post-borders-selecter").val("all");
      // alert($getId + " *** " + $getDataAttr);
      if ($getDataAttrBorderStyle == "dashed") {
        $("#borderStyle").val("dashed");
        localStorage.setItem("_bgNtextNborderPostBorderStyle", "dashed");
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-style": "dashed",
        });
      } else if ($getDataAttrBorderStyle == "dotted") {
        $("#borderStyle").val("dotted");
        localStorage.setItem("_bgNtextNborderPostBorderStyle", "dotted");
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-style": "dotted",
        });
      } else if ($getDataAttrBorderStyle == "double") {
        $("#borderStyle").val("double");
        localStorage.setItem("_bgNtextNborderPostBorderStyle", "double");
        $(".postContentTextarea, #postContentPreviewDiv").css({
          width: "94%",
          "border-style": "double",
          "border-width": "4px",
        });
      }

      if ($getDataAttrBorderSides == "lNr") {
        $("#post-borders-selecter").val("lNr");
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-top": "transparent",
          "border-bottom": "transparent",
        });
      } else if ($getDataAttrBorderSides == "tNb") {
        $("#post-borders-selecter").val("tNb");
        $(".postContentTextarea, #postContentPreviewDiv").css({
          "border-left": "transparent",
          "border-right": "transparent",
        });
      }

      open_postTypes_layerOne_popup("postType-sample-LayerOne");
    } else if ($getId == "border-fold-type" || $getId == "border-cut-type") {
      $getDataAttr = $(this).attr("data-post-fold-or-cut-class");
      $getDataCornerStyleSides = $(this).attr("data-corner-style-sides");
      localStorage.setItem(
        "_brdrFoldNcutPostCornerStyleSides",
        $getDataCornerStyleSides
      );

      $("#brdrFoldNcutPost-cornerStyleSides").val($getDataCornerStyleSides);

      $(
        "#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer"
      ).removeClass(
        "cornerFold_topRight cornerFold_bottomRight cornerFold_bottomLeft cornerFold_topLeft cornerFold_topRight_bottomLeft cornerFold_topLeft_bottomRight remove_cornerShadow"
      );

      $(
        "#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer"
      ).addClass($getDataAttr);

      if ($getId == "border-cut-type") {
        $("#brdrFoldNcutPost-cornerStyle").val("cut");
        localStorage.setItem("_brdrFoldNcutPostCornerStyle", "cut");
        $(
          "#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer"
        ).addClass("remove_cornerShadow");
      } else {
        $("#brdrFoldNcutPost-cornerStyle").val("fold");
        localStorage.setItem("_brdrFoldNcutPostCornerStyle", "fold");
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
    $(".warning-div").slideUp("slow");
    $postContentt = $(".postContentTextarea").val();
    $postContentt = $postContentt.trim();

    $getbgcolorr = $("#bgcolor").val();
    $gettextcolorr = $("#textcolor").val();

    // alert($getbgcolorr + "***" + $gettextcolorr);

    if (!$postContentt) {
      $(".warning-div").text("Post content can't be empty");
      $(".warning-div").slideDown("slow");
      $(".postContentTextarea").val("");
      return false;
    }
    if ($getbgcolorr == $gettextcolorr) {
      $(".warning-div").text(
        "Post background color & text color can't be same"
      );
      $(".warning-div").slideDown("slow");
      return false;
    }

    $(".warning-div").slideUp("slow");
    $("#postContentPreviewDiv").text($postContentt);
    open_postTypes_layerTwo_popup("postType-sample-LayerTwo");
  });
  // Individual post type preview N confirm  modal functionality - ends

  // Individual brdrFoldNcut-post type preview N confirm modal functionality - starts
  $(document).on(
    "click",
    "#brdrFoldNcut-postType-openLayerTwoModal",
    function () {
      $(".warning-div").slideUp("slow");
      $postContent = $("#brdrFoldNcutPostContentTextarea").val();
      $postContent = $postContent.trim();

      if (!$postContent) {
        $(".warning-div").text("Post content can't be empty");
        $(".warning-div").slideDown("slow");
        $("#brdrFoldNcutPostContentTextarea").val("");
        return false;
      }

      $get_brdrFoldNcutPostbgcolorr = $("#brdrFoldNcutPost-bgclrpkr").val();
      $get_brdrFoldNcutPosttextcolorr = $("#brdrFoldNcutPost-textclrpkr").val();
      if ($get_brdrFoldNcutPostbgcolorr == $get_brdrFoldNcutPosttextcolorr) {
        $(".warning-div").text(
          "Post background color & text color can't be same"
        );
        $(".warning-div").slideDown("slow");
        return false;
      }

      $(".warning-div").slideUp("slow");
      $("#brdrFoldNcutPostContentPreviewer").text($postContent);

      open_postTypes_layerTwo_popup("postType-sample-two-LayerTwo");
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
    localStorage.setItem("_bgNtextNborderPostBgcolor", $val);
    console.log($val);
    $(".postContentTextarea, .postContentDiv, #postContentPreviewDiv").css(
      "background",
      "#" + $val
    );
  });

  $(document).on("change", "#textcolor", function () {
    $val = $(this).val();
    localStorage.setItem("_bgNtextNborderPostTextcolor", $val);
    console.log($val);
    $(".postContentTextarea, #postContentPreviewDiv").css("color", "#" + $val);
  });

  $(document).on("change", "#bordercolor", function () {
    $val = $(this).val();
    localStorage.setItem("_bgNtextNborderPostBordercolor", $val);
    console.log($val);
    $(".postContentTextarea, #postContentPreviewDiv").css(
      "border-color",
      "#" + $val
    );
  });

  $(document).on("change", "#brdrFoldNcutPost-bgclrpkr", function () {
    $val = $(this).val();
    localStorage.setItem("_brdrFoldNcutPostBgcolor", $val);
    console.log($val);
    $("#cornerFoldStyle-textareaDiv, #brdrFoldNcutPostContentPreviewer").css(
      "background",
      "#" + $val
    );
  });

  $(document).on("change", "#brdrFoldNcutPost-textclrpkr", function () {
    $val = $(this).val();
    localStorage.setItem("_brdrFoldNcutPostTextcolor", $val);
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
    localStorage.setItem("_bgNtextNborderPostBorderStyleSides", $val);
    $getBorderStylee = localStorage.getItem("_bgNtextNborderPostBorderStyle");
    // $getBorderStylee = $("#borderStyle").attr("value");
    // alert($getBorderStylee);
    // return;
    $getBorderColor = "#" + $("#bordercolor").val();
    $borderWidth = "2px";
    // alert($val + " ** " + $getBorderStylee + " ** " + $getBorderColor);

    if ($getBorderStylee == "double") {
      $borderWidth = "4px ";
    }

    if ($val && $getBorderStylee) {
      $(".postContentTextarea, #postContentPreviewDiv").css(
        "border",
        $borderWidth + " " + $getBorderStylee + " " + $getBorderColor
      );
      console.log($val + " ** " + $getBorderStylee + " ** " + $getBorderColor);
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
