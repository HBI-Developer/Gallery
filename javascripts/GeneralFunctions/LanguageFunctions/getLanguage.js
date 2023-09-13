/**
    @param {string} lang
    @param {function} callback
    @void
*/

const getLangauge = (lang = defaultLang, callback = (_) => {}) => {
  $.getJSON(`./data/langs/${lang}.json`, (result) => {
    $("body").attr("dir", result.direction);

    let words = result.items;

    $("head title").text(words.title);

    $("footer").text(words.footer);

    $(".settings .header span:last-child").text(words.preferences);

    $(".settings .container .list .setting.themes .title").text(words.themes);

    $(".settings .container .list .setting.languages .title").text(
      words.languages
    );

    for (let theme of themes) {
      let themeName = theme.name.replaceAll("-", "_");

      $(`
                    .settings .container .list .setting.themes .options .option[data-option="${theme.name}"] span:not(.icon):not(.theme)
                `).text(words[`${themeName}_mode`]);
    }

    for (let lang of langs) {
      $(`
                    .settings .container .list .setting.languages .options .option[data-option="${lang}"] span:not(.icon):not(.theme)
                `).text(words[`${lang}_lang`]);
    }

    setTimeout((_) => {
      callback();
    }, 0);
  });
};

export default getLangauge;
