// Constant functions

/*
    @func getBoxTemplate
    @param {info : object} = {}
        This param contains collections of data that's put in project box is not assigning dafault value is empty object
    @return {template : string}
        This is a template of project box
*/

const getBoxTemplate = async (info = {}) => {

    /*
        @variable template will contains project box template
        @variable lang language of user [in browser] e.g. ar, en, and so on
        @variable name contains name of  project
        @variable description  contains description of project
        @variable tools contains tools use to build a project e.g. HTML5, CSS3, and so on
        @variable img contains img of project
        @variable buttons collection of buttons for this project e.g. link to project or to Github repo to project
        @variable toolsTemplate will contains template of tools [tools in tools variable]
        @variable buttonsTemplate will contains template of buttons [buttons in buttons variable]
    */

    let template,
        lang = localStorage.lang,
        name = info.name[lang],
        description = info.description[lang],
        tools = info.tools,
        img = info.img,
        buttons = info.buttons,
        toolsTemplate = ``,
        buttonsTemplate = ``;

    for await (let tool of tools) {

        // For loop to put each tool in toolsTemplate

        toolsTemplate += `
            <div class="technology" style="background-image: url('images/technologies/${tool[0]}.svg');">
                <div class="title-container">
                    <div class="title">${tool[1] ?? tool[0]}</div>
                </div>
            </div>
        `;
    }

    for await (let button of buttons) {

        // For loop to put each button in buttonsTemplate

        /*
            @variable noIcon if this button don's have icon this varible contains 'no-icon' else will be empty
            @variable icon if this button have icon [in icons.css] or img will have template for this icon else will be empty
            @variable link if this button have link will have this link else will be have '#'
            @variable colors if this button have its background or text color will be have style to it else will be empty
            @variable buttonType if button is not have a link then will have a type e.g. mini gallery for project [project
                images] else this variable will be empty
        */

        let noIcon = '',
            icon = '',
            link,
            colors,
            buttonType = '';

        if (button.icon !== '') {

            // If this button have icon
            
            icon = `<div class="icon icon-${button.icon}"></div>`;
        } else if (button.img !== '') {

            // else if this button have image

            icon = `<div class="icon" style="background-image: url('images/logos/${button.img}');"></div>`;

        } else {

            // else then this button have no icon

            noIcon = " no-icon";
        }


        if (button.link) {

            // If this button have link

            link = button.link;
        } else if (button['images-link']) {

            // If not have link and have [images-link] property

            // Add this propery value to global variable, images array

            images.push(button['images-link']);

            // Set '#' to link variable

            link = '#';

            // Set data type as images for button and value is number of index for data value

            buttonType = `data-type="images" data-value="${images.length - 1}"`;
        }


        if (button.background !== '' || button.color !== '') {

            // If button have background or text color

            // If have background put it in css background color property else let it empty

            let background = button.background !== '' ? `background-color: ${button.background};` : '',

            // If have text color put it in css color property else let it empty

                color = button.color !== '' ? `color: ${button.color};` : '';

            // put this variables in style property in colors

            colors = `style="${background} ${color}"`;
        } else {

            // else let colors empty

            colors = '';
        }

        // Add all this variables to [a] element and add this element to butttonsTemplate variable

        buttonsTemplate += `
            <a href="${link}" ${colors} target="_black" class="button${noIcon}" ${buttonType}> ${icon} <div class="text">${button.name[lang]}</div></a>
        `;
    }

    // Create project box template

    template = `
        <div class="box">
            <div class="img" style="background-image: url('images/Projects/${img}');">
                <div class="cover">
                    <div class="description">${description}</div>
                </div>
            </div>
            <div class="name">${name}</div>
            <div class="partition"></div>
            <div class="technologies">
                
                ${toolsTemplate}

            </div>
            <div class="partition"></div>
            <div class="buttons">
                
                ${buttonsTemplate}

            </div>
        </div>
    `;

    // return this template

    return template;

},

/*
    @func getSelectionBar
    @param {lang:string} = defaultLang
        contains lang for selection bar if not assigning then default value is defaultLang constant
    @param {activaed:number} = 0
        contains index of actived element inside selection bar if not assining then dafault value is 0 [first element]
    @void
        Create selection bar if there's more than one category for projects
*/

    getSelectionBar = (lang = defaultLang, actived = 0) => {
        $.getJSON('./data/items.json', result => {

            // Get items.json data in result variable

            // get categories have project one project at least

            let categories = result.filter(cate => cate.items.length > 0);
    
            if (categories.length > 1) {

                // If categories is more than one
                
                if (!$("main .container .selection-bar").length) {

                    // If selection bar is not exists then create it

                    $("main .container").prepend(selectionBarTemplate);
                }

                // Empty the selection bar

                $("main .container .selection-bar").empty();
    
                for (let i = 0; i < categories.length; i++) {

                    // Add categories to selection bar [its template in selectionBarOptionTemplate constant]

                    $("main .container .selection-bar").append(selectionBarOptionTemplate);

                    // Add name of category to it

                    $("main .container .selection-bar .option").eq(i).text(categories[i][lang]);
                }

                // Active the option in (actived) index
    
                $("main .container .selection-bar .option").eq(actived).addClass('active');
            }
        });
    }

    /*
        @func getBoxes
        @param {page:number} = 1
            Number of page for project [for pagination], if not assigning default value is 1
        @param {category:number} = 0
            Index of category of project, if not assigning default value is 0
        @param {callback:function} = empty function
            Callback function execution after this function
        @void
            adding projects boxes to main element in page with pagination
    */

    getBoxes = (page = 1, category = 0, callback = _ => {}) => {

        $.getJSON('./data/items.json', async result => {

            // Get items.json data in result variable

            // Empty global variable images

            images = [];

            /*
                @variable boxes will contains projects info
                @variable firstItem is index of first project [That for pages]
            */

            let boxes,
                firstItem = 0;


            if (result.length <= 0) {

                // If result is empty [There's not project] then boxes is empty

                boxes = [];
            } if (category < result.length) {

                // If category index is less than number of categories then get projects info in this category

                boxes = result[category];
            } else {

                // else get projects in first category

                boxes = result[0];
            }

            // Global variable lastPage equals number of projects in this category on number of projects that's show in each page

            lastPage = Math.ceil(boxes.items.length / numberOfBox);

            if (page < 1) {

                // If page less than 1 than page equal 1

                page = 1;
            } else if (page > lastPage) {

                // If page greater than lastPage then page equal lastPage

                page = lastPage;
            }

            /*
                fistItem is number of page minus 1 in number of projects in each page
                for example for page 2 with numberOfBox is 10
                (2 - 1) * 10 => 1 * 10 => 10
                Then first item that in index number 10
            */

            firstItem = (page - 1) * numberOfBox;

            // reverse projects [Last project will be apear in top]

            boxes = boxes.items.reverse();

            // Get number of project in [numberOfBox] from firstItem index

            boxes = boxes.splice(firstItem, numberOfBox);

            // Remove current projects boxes

            $(".box-container .box").remove();

            for await (let box of boxes) {

                // @variable contains template of project box with this project info

                let boxTemplate = await getBoxTemplate(box);

                // Add this template before wait element in box container

                $("main .container .box-container .wait").before(boxTemplate);

            }

            // Create pagination with page variable

            pagination(page);

            setTimeout(_ => {

                // After all above commands execute callback function

                callback();
            }, 0);
            
        });
}

    /*
        @func pagination
        @param {page:numner} = 1
            Contains of active page, if not assigning default value is 1
        @void
            Cteate pagination if number of project for current category is more than numberOfBox (OR) active page by number in
            page param
    */

    pagination = (page = 1) => {

        if (lastPage <= 1) {

            // If global variable lastPage is less than or equal 1

            // Empty pagination element

            $(".pagination").empty();

            // Exit from this function

            return;
        }

        if (lastPage < 9) {

            // If global variable lastPage less than 9

            if (!$(".pagination .page").length) {

                // Pagination is empty add page from 1 to lastPage number

                for (let i = 1; i <= lastPage; i++) {
                    $(".pagination").append(pageInPaginationTemplate);
                    $(".pagination .page").eq(i - 1).text(i);
                }
            }

            // Avtive page with number in page param and disactive from others

            $(`.pagination .page`).filter(function () {
                return $(this).text() == page;
            }).addClass('active').siblings().removeClass("active");

        } else if (page === 1 || page === lastPage) {

            // If lastPage more than 9 and page is equal 1 or lastPage

            // Empty pagination

            $(".pagination").html("");

            for (let i = 1; i <= 5; i++) {

                // Add 5 page element to pagination [pageInPaginationTemplate is a template of page]

                $(".pagination").append(pageInPaginationTemplate);
            }

            if (page === 1) {

                // If page is first page

                // Number the pages

                $(`.pagination .page:nth-child(1)`).text(1);
                $(`.pagination .page:nth-child(2)`).text(2);
                $(`.pagination .page:nth-child(3)`).text(3);
                $(`.pagination .page:nth-child(4)`).text(lastPage - 1);
                $(`.pagination .page:nth-child(5)`).text(lastPage);

                // Active first page

                $(".pagination .page:first-child").addClass('active');

                // Add dots after third page

                $(".pagination .page:nth-child(3)").after('<span>...</span>');
            }

            else if (page === lastPage) {

                // If active page is last page

                // Number the pages

                $(`.pagination .page:nth-child(1)`).text(1);
                $(`.pagination .page:nth-child(2)`).text(2);
                $(`.pagination .page:nth-child(3)`).text(lastPage - 2);
                $(`.pagination .page:nth-child(4)`).text(lastPage - 1);
                $(`.pagination .page:nth-child(5)`).text(lastPage);

                // Active the last page

                $(".pagination .page:last-child").addClass('active');

                // Add dots after seconds page

                $(".pagination .page:nth-child(2)").after('<span>...</span>');
            }
        }

        else if (page < 5 || page > lastPage - 4) {

            // If active page is before fifth page or from last four pages

            // Empty pagination element

            $(".pagination").html("");

            // @variable counter is number of pages elements with 6 as init value

            let counter = 6;

            if (page === 4 || page === lastPage - 3) {

                // If active page is fourth page or third page before last page

                // Counter value is 7

                counter = 7;
            }


            for (let i = 1; i <= counter; i++) {

                // Create pages element by number of counter

                $(".pagination").append(pageInPaginationTemplate);
            }

            if (page < 5) {

                // If number of active page is less than 5

                // Number the pages

                $(`.pagination .page:nth-child(1)`).text(1);
                $(`.pagination .page:nth-child(2)`).text(2);
                $(`.pagination .page:nth-child(3)`).text(3);
                $(`.pagination .page:nth-child(4)`).text(4);
                $(`.pagination .page:nth-last-child(2)`).text(lastPage - 1);
                $(`.pagination .page:nth-last-child(1)`).text(lastPage);

                // Active page in page param

                $(`.pagination .page`).filter(function () {
                    return $(this).text() == page;
                }).addClass('active');

                // Add dots before the penultimate page

                $(".pagination .page:nth-last-child(2)").before('<span>...</span>');

                if (counter === 7) {

                    // If counter is 7 number fifth page

                    $(`.pagination .page:nth-child(5)`).text(5);
                }

            }
            else if (page > lastPage - 4) {

                // If active page from last four page

                // Number the pages

                $(`.pagination .page:nth-child(1)`).text(1);
                $(`.pagination .page:nth-child(2)`).text(2);
                $(`.pagination .page:nth-last-child(4)`).text(lastPage - 3);
                $(`.pagination .page:nth-last-child(3)`).text(lastPage - 2);
                $(`.pagination .page:nth-last-child(2)`).text(lastPage - 1);
                $(`.pagination .page:nth-last-child(1)`).text(lastPage);

                // Add dots after seconds page

                $(".pagination .page:nth-child(2)").after('<span>...</span>');

                if (counter === 7) {

                    // If couter is 7

                    // Number the fourth page before last page

                    $(`.pagination .page:nth-last-child(5)`).text(lastPage - 4);
                }
            }

            // Active page in page param

            $(`.pagination .page`).filter(function () {
                return $(this).text() == page;
            }).addClass('active');

        } else {

            // If number of page greater than or equals 9 and active page is after fourth page or before third page before last page

            // Empty pagination element

            $(".pagination").html("");

            for (let i = 0; i <= 7; i++) {

                // Add 7 pages elements

                $(".pagination").append(pageInPaginationTemplate);
            }

            // Number the page

            $(`.pagination .page:nth-child(1)`).text(1);
            $(`.pagination .page:nth-child(2)`).text(2);

            $(`.pagination .page:nth-child(3)`).text(page - 1);
            $(`.pagination .page:nth-child(4)`).text(page);
            $(`.pagination .page:nth-child(5)`).text(page + 1);

            $(`.pagination .page:nth-child(6)`).text(lastPage - 1);
            $(`.pagination .page:nth-child(7)`).text(lastPage);

            // Add dots after seconds page and before the penultimate page

            $(".pagination .page:nth-child(2), .pagination .page:nth-child(5)").after('<span>...</span>');

            // Active page in page param

            $(`.pagination .page`).filter(function () {
                return $(this).text() == page;
            }).addClass('active');
        }
    },

    /*
        @func getLanguage
        @param {lang:string} = defaultLang
            Contains lang for website, If not assigning will have defaultLang
        @param {callback:function} = empty function
            Callback function will execute after this function
        @void
            Set assigning language for website
    */

    getLangauge = (lang = defaultLang, callback = _ => {}) => {
        $.getJSON(`./data/langs/${lang}.json`, result => {

            // Get json file for required language

            // Set direction in file for body element [rtl or ltr]

            $("body").attr("dir", result.direction);

            // @variable words contains all words by this language
    
            let words = result.items;

            // Set the words in its element on screen
    
            $("head title").text(words.title);
            $("footer").text(words.footer);
            $(".settings .header span:last-child").text(words.preferences);
            $(".settings .container .list .setting.themes .title").text(words.themes);
            $(".settings .container .list .setting.languages .title").text(words.languages);
    
            for (let theme of themes) {

                /*
                    @variable themeName contains name of theme with replace dash [-] to underscore [_]
                */

                let themeName = theme.name.replaceAll("-", "_");

                // Set name of themes in settings by this language

                $(`
                    .settings .container .list .setting.themes .options .option[data-option="${theme.name}"] span:not(.icon):not(.theme)
                `).text(words[`${themeName}_mode`]);
            }
    
            for (let lang of langs) {

                // Set name of languages in settings by this language

                $(`
                    .settings .container .list .setting.languages .options .option[data-option="${lang}"] span:not(.icon):not(.theme)
                `).text(words[`${lang}_lang`]);
            }

            setTimeout(_ => {

                // After all above commands end, execute callback function

                callback();
            }, 0);
        });
    };

