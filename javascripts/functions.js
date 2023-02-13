/*
    @func getBoxTemplate
    @param {info : object} = {}
        This param contains collections of data that's put in project box is not assigning dafault value is empty object
    @return {template : string}
        This is a template of project box
*/

const getBoxTemplate = async (info = {}) => {

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

        toolsTemplate += `
            <div class="technology" style="background-image: url('images/technologies/${tool[0]}.svg');">
                <div class="title-container">
                    <div class="title">${tool[1] ?? tool[0]}</div>
                </div>
            </div>
        `;

    }

    for await (let button of buttons) {

        let noIcon = '',
            icon = '',
            link,
            colors,
            buttonType = '';

        if (button.icon !== '') {

            icon = `<div class="icon icon-${button.icon}"></div>`;

        } else if (button.img !== '') {

            icon = `<div class="icon" style="background-image: url('images/logos/${button.img}');"></div>`;

        } else {

            noIcon = " no-icon";

        }


        if (button.link) {

            link = button.link;

        } else if (button['images-link']) {

            images.push(button['images-link']);

            link = '#';

            buttonType = `data-type="images" data-value="${images.length - 1}"`;

        }


        if (button.background !== '' || button.color !== '') {

            let background = button.background !== '' ? `background-color: ${button.background};` : '',

                color = button.color !== '' ? `color: ${button.color};` : '';

            colors = `style="${background} ${color}"`;

        } else {

            colors = '';

        }

        buttonsTemplate += `
            <a href="${link}" ${colors} target="_black" class="button${noIcon}" ${buttonType}> ${icon} <div class="text">${button.name[lang]}</div></a>
        `;

    }

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

            let categories = result.filter(cate => cate.items.length > 0);
    
            if (categories.length > 1) {
                
                if (!$("main .container .selection-bar").length) {

                    $("main .container").prepend(selectionBarTemplate);

                }

                $("main .container .selection-bar").empty();
    
                for (let i = 0; i < categories.length; i++) {

                    $("main .container .selection-bar").append(selectionBarOptionTemplate);

                    $("main .container .selection-bar .option").eq(i).text(categories[i][lang]);

                }

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

            images = [];

            let boxes,
                firstItem = 0;

            if (result.length <= 0) {

                boxes = [];

            } if (category < result.length) {

                boxes = result[category];

            } else {

                boxes = result[0];

            }

            lastPage = Math.ceil(boxes.items.length / numberOfBox);

            if (page < 1) {

                page = 1;

            } else if (page > lastPage) {

                page = lastPage;

            }

            firstItem = (page - 1) * numberOfBox;

            boxes = boxes.items.reverse();

            boxes = boxes.splice(firstItem, numberOfBox);

            $(".box-container .box").remove();

            for await (let box of boxes) {

                let boxTemplate = await getBoxTemplate(box);

                $("main .container .box-container .wait").before(boxTemplate);

            }

            pagination(page);

            setTimeout(_ => {

                callback();

            }, 0);
            
        }
    );
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

            $(".pagination").empty();

            return;

        }

        if (lastPage < 9) {

            if (!$(".pagination .page").length) {

                for (let i = 1; i <= lastPage; i++) {

                    $(".pagination").append(pageInPaginationTemplate);

                    $(".pagination .page").eq(i - 1).text(i);

                }

            }

            $(`.pagination .page`).filter(function () {
                return $(this).text() == page;
            }).addClass('active').siblings().removeClass("active");

        } else if (page === 1 || page === lastPage) {

            $(".pagination").html("");

            for (let i = 1; i <= 5; i++) {

                $(".pagination").append(pageInPaginationTemplate);

            }

            if (page === 1) {

                $(`.pagination .page:nth-child(1)`).text(1);

                $(`.pagination .page:nth-child(2)`).text(2);
                
                $(`.pagination .page:nth-child(3)`).text(3);
                
                $(`.pagination .page:nth-child(4)`).text(lastPage - 1);
                
                $(`.pagination .page:nth-child(5)`).text(lastPage);

                $(".pagination .page:first-child").addClass('active');

                $(".pagination .page:nth-child(3)").after('<span>...</span>');

            }

            else if (page === lastPage) {

                $(`.pagination .page:nth-child(1)`).text(1);

                $(`.pagination .page:nth-child(2)`).text(2);
                
                $(`.pagination .page:nth-child(3)`).text(lastPage - 2);
                
                $(`.pagination .page:nth-child(4)`).text(lastPage - 1);
                
                $(`.pagination .page:nth-child(5)`).text(lastPage);

                $(".pagination .page:last-child").addClass('active');

                $(".pagination .page:nth-child(2)").after('<span>...</span>');

            }

        }

        else if (page < 5 || page > lastPage - 4) {

            $(".pagination").html("");

            let counter = 6;

            if (page === 4 || page === lastPage - 3) {

                counter = 7;

            }


            for (let i = 1; i <= counter; i++) {

                $(".pagination").append(pageInPaginationTemplate);

            }

            if (page < 5) {

                $(`.pagination .page:nth-child(1)`).text(1);

                $(`.pagination .page:nth-child(2)`).text(2);

                $(`.pagination .page:nth-child(3)`).text(3);

                $(`.pagination .page:nth-child(4)`).text(4);

                $(`.pagination .page:nth-last-child(2)`).text(lastPage - 1);

                $(`.pagination .page:nth-last-child(1)`).text(lastPage);

                $(`.pagination .page`).filter(function () {
                    return $(this).text() == page;
                }).addClass('active');

                $(".pagination .page:nth-last-child(2)").before('<span>...</span>');

                if (counter === 7) {

                    $(`.pagination .page:nth-child(5)`).text(5);

                }

            } else if (page > lastPage - 4) {

                $(`.pagination .page:nth-child(1)`).text(1);

                $(`.pagination .page:nth-child(2)`).text(2);

                $(`.pagination .page:nth-last-child(4)`).text(lastPage - 3);

                $(`.pagination .page:nth-last-child(3)`).text(lastPage - 2);

                $(`.pagination .page:nth-last-child(2)`).text(lastPage - 1);

                $(`.pagination .page:nth-last-child(1)`).text(lastPage);

                $(".pagination .page:nth-child(2)").after('<span>...</span>');

                if (counter === 7) {

                    $(`.pagination .page:nth-last-child(5)`).text(lastPage - 4);

                }

            }

            $(`.pagination .page`).filter(function () {
                return $(this).text() == page;
            }).addClass('active');

        } else {

            $(".pagination").html("");

            for (let i = 0; i <= 7; i++) {

                $(".pagination").append(pageInPaginationTemplate);

            }

            $(`.pagination .page:nth-child(1)`).text(1);

            $(`.pagination .page:nth-child(2)`).text(2);

            $(`.pagination .page:nth-child(3)`).text(page - 1);

            $(`.pagination .page:nth-child(4)`).text(page);

            $(`.pagination .page:nth-child(5)`).text(page + 1);

            $(`.pagination .page:nth-child(6)`).text(lastPage - 1);

            $(`.pagination .page:nth-child(7)`).text(lastPage);

            $(".pagination .page:nth-child(2), .pagination .page:nth-child(5)").after('<span>...</span>');

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

            $("body").attr("dir", result.direction);
    
            let words = result.items;
    
            $("head title").text(words.title);

            $("footer").text(words.footer);

            $(".settings .header span:last-child").text(words.preferences);

            $(".settings .container .list .setting.themes .title").text(words.themes);

            $(".settings .container .list .setting.languages .title").text(words.languages);
    
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

            setTimeout(_ => {

                callback();

            }, 0);

        });
        
    };

