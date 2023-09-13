import getBoxes from "./GeneralFunctions/TemplateFunctions/getBoxes.js";
import getLangauge from "./GeneralFunctions/LanguageFunctions/getLanguage.js";
import getSelectionBar from "./GeneralFunctions/TemplateFunctions/getSelectionBar.js";

$(window).on("load", () => {
  let lang = localStorage.lang,
    theme = localStorage.theme,
    validThemes = themes.map((theme) => {
      return theme.name;
    });

  if (!theme || validThemes.indexOf(theme) === -1) {
    theme = defaultTheme;

    localStorage.setItem("theme", theme);
  }

  $("body").addClass(theme);

  if (!lang || langs.indexOf(lang) < 0) {
    let tempLang;

    for (let i = 0; i < langs.length; i++) {
      if (navigator.language.indexOf(langs[i]) >= 0) {
        tempLang = langs[i];

        break;
      }
    }

    if (!tempLang) {
      lang = defaultLang;
    } else {
      lang = tempLang;
    }

    localStorage.setItem("lang", lang);
  }

  for (let i = 0; i < themes.length; i++) {
    $(".settings .container .list .setting.themes .options").append(`
            <div class="option" data-option="${themes[i].name}">
                <span class="theme" style="background-color: ${themes[i]["main-color"]};"></span>
                <span></span>
            </div>
        `);
  }

  for (let i = 0; i < langs.length; i++) {
    $(".settings .container .list .setting.languages .options").append(`
            <div class="option" data-option="${langs[i]}">
                <span></span>
            </div>
        `);
  }

  getLangauge(lang);

  $(
    `.settings .container .list .setting.themes .options .option[data-option="${theme}"]`
  ).addClass("active");

  $(
    `.settings .container .list .setting.languages .options .option[data-option="${lang}"]`
  ).addClass("active");

  getSelectionBar(lang);

  getBoxes(1, 0, (_) => {
    $(".loading-screen").fadeOut();
  });
});
