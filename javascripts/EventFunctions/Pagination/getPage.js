import getBoxes from "../../GeneralFunctions/TemplateFunctions/getBoxes.js";

export default function () {
  if ($(".box-container .wait").css("display") === "none") {
    let page = +$(this).text(),
      category = $(".selection-bar .option.active").index();

    if (category < 0) {
      category = 0;
    }

    $(".box-container .wait").fadeIn();

    $(".box-container .wait").css("display", "flex");

    getBoxes(page, category, (_) => {
      $(this).addClass("active").siblings().removeClass("active");

      $(".box-container .wait").fadeOut();
    });
  }
}
