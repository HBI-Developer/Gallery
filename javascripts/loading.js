$(window).on('load', () => { // Fired when page is loading

    /*
        @variable lang contains lang property value in localStorage
        @variable theme contains theme property value in localStorage
        @variable validTheme contains name of themes availabe in this website
    */

    let lang = localStorage.lang,
        theme = localStorage.theme,
        validThemes = themes.map(theme => {
            return theme.name
        });
        
    if (!theme || validThemes.indexOf(theme) === -1) {

        // If theme value is undefined or is not in themes list

        // Put dafaultTheme value in theme variable

        theme = defaultTheme;

        // Set theme property with new (theme) value

        localStorage.setItem("theme", theme);
    }

    // Add class by name of theme to body element

    $("body").addClass(theme);

    if (!lang || langs.indexOf(lang) < 0) {

        // If lang value is undefined or is not in langs list

        // @variable tempLang contains language in user browser

        let tempLang;

        for (let i = 0; i < langs.length; i++) {

            // For loop to langs supported list

            if (navigator.language.indexOf(langs[i]) >= 0) {

                // If lang in langs list is lang in user browser

                // Set this value in tempLang and stop for loop

                tempLang = langs[i];
                break;
            }
        }


        if (!tempLang) {

            // If tempLang is undefined

            // Set defaultLang to lang variable

            lang = defaultLang;
        } else {

            // If tempLang is not undefined

            // Set tempLang to lang variable

            lang = tempLang;
        }

        // Set lang property to localStorage with lang value

        localStorage.setItem('lang', lang);
    }


    for (let i = 0; i < themes.length; i++) {

        // For loop to set themes list in themes setting

        $(".settings .container .list .setting.themes .options").append(`
            <div class="option" data-option="${themes[i].name}">
                <span class="theme" style="background-color: ${themes[i]["main-color"]};"></span>
                <span></span>
            </div>
        `);
    }

    for (let i = 0; i < langs.length; i++) {

        // For loop to set langs list in langs setting

        $(".settings .container .list .setting.languages .options").append(`
            <div class="option" data-option="${langs[i]}">
                <span></span>
            </div>
        `);
    }

    // Set language [in lang] in website 

    getLangauge(lang);

    // Active current theme in theme setting

    $(`.settings .container .list .setting.themes .options .option[data-option="${theme}"]`).addClass('active');

    // Active current lang in lang setting

    $(`.settings .container .list .setting.languages .options .option[data-option="${lang}"]`).addClass('active');

    // Get selection bar with current lang

    getSelectionBar(lang);

    // Get project boxes

    getBoxes(1, 0, _ => {

        // After all above commands end, Hide loading screen

        $(".loading-screen").fadeOut();
    });
});
