import getBoxes from "../../GeneralFunctions/TemplateFunctions/getBoxes.js";
import getLangauge from "../../GeneralFunctions/LanguageFunctions/getLanguage.js";
import getSelectionBar from "../../GeneralFunctions/TemplateFunctions/getSelectionBar.js";
export default function () {
  if (!$(this).hasClass("active")) {
    let setting = $(this).parents(".setting").attr("class").split(" ")[1],
      value = $(this).attr("data-option");

    switch (setting) {
      case "themes": {
        $("body").attr("class", value);

        localStorage.setItem("theme", value);

        break;
      }

      case "languages": {
        $(".loading-screen").fadeIn(400, (_) => {
          getLangauge(value, (_) => {
            let page = $("main .container .pagination .page.active").length
                ? +$("main .container .pagination .page.active").text()
                : 1,
              category = $(".selection-bar .option.active").length
                ? $(".selection-bar .option.active").index()
                : 0;

            localStorage.setItem("lang", value);

            getSelectionBar(value, category);

            getBoxes(page, category, (_) => {
              $(".loading-screen").fadeOut();
            });
          });
        });

        $(".loading-screen").css("display", "flex");

        break;
      }

      default: {
        return;
      }
    }

    $(this).addClass("active").siblings().removeClass("active");
  }
}
