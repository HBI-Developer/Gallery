/**
    @param {string} lang
    @param {number} activaed
    @void
        Create selection bar if there's more than one category for projects
*/

const getSelectionBar = (lang = defaultLang, actived = 0) => {
  $.getJSON("./data/items.json", (result) => {
    let categories = result.filter((cate) => cate.items.length > 0);

    if (categories.length > 1) {
      if (!$("main .container .selection-bar").length) {
        $("main .container").prepend(selectionBarTemplate);
      }

      $("main .container .selection-bar").empty();

      for (let i = 0; i < categories.length; i++) {
        $("main .container .selection-bar").append(selectionBarOptionTemplate);

        $("main .container .selection-bar .option")
          .eq(i)
          .text(categories[i][lang]);
      }

      $("main .container .selection-bar .option")
        .eq(actived)
        .addClass("active");
    }
  });
};

export default getSelectionBar;
