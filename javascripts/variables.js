
/*
    @CONST themes is the list of supported themes in website
    @CONST defaultTheme is the default theme in themes list
    @CONST langs is the list of supported languages in website
    @CONST defaultLang is the default language in languages list
    @CONST numberOfBox number of projects in each page
    @CONST pageInPaginationTemplate template of pages in pagination element
    @CONST selectionBarTemplate template of selection bar
    @CONST selectionBarOptionTemplate template of options in selection bar element
*/

const themes = [
                {
                    "name": "default",
                    "main-color": "#1976D2"
                },
                {
                    "name": "dark",
                    "main-color": "#272727"
                },
                {
                    "name": "milk-chocolate",
                    "main-color": "#84563C"
                },
                {
                    "name": "dark-cyan",
                    "main-color": "#009688"
                },
                {
                    "name": "moderate-magenta",
                    "main-color": "#AB47BC"
                }
            ],

    defaultTheme  = 'default',

    langs = ['ar', 'en'],

    defaultLang = 'en',

    numberOfBox = 10,

    //Templetes

    pageInPaginationTemplate = `
        <div class="page"></div>
    `,
    selectionBarTemplate = `
        <div class="selection-bar"></div>
    `,
    selectionBarOptionTemplate = `
        <div class="option">Option</div>
    `;

/*
    @variable lastPage will contains number of last page in active category of projects
    @variable images will contains info of projects images for projects has images for it
*/

let lastPage = 0,
    images = [];
