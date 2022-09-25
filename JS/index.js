let projects = [],
    getItems = (projects, lang = localStorage.getItem("lang")) => {
        let index = 0;
        $(".body .main").html("");
        for (let project of projects) {
            let tools = ``;

            new Promise(t => {
                if (project.tools.length > 0) {
                    tools += `<div class='made-container'><ul class='made-by'>`;
                    for (let i = 0; i < project.tools.length; i++) {
                        tools += `<li title="${project.tools[i]}" style="background-image: url('images/langs&techs/${project.tools[i]}.svg')"></li>`;

                        if (i === project.tools.length - 1) {
                            tools += `</ul></div>`;
                            t(tools);
                        }
                    }
                } else {
                    t(``);
                }
            }).then(t => {
                let linkButton = "";

                if (project.link) {
                    linkButton = `<a href="${(project.link !== "") ? project.link : "#"}" target="_blank" class="link"></a>`;
                } else if (project['images-link']) {
                    linkButton = `
                        <div class='image-button' data-index="${index}">
                            <span></span>
                            <span class='icon' style: ></span>
                        </div>
                    `;
                }
                $(".body .main").append(`
                    <div class="grid">
                        <div class="item">
                        <div class="cover" ${(project.img !== "") ? `style="background-image: url('images/${project.img}')"` : ""}>
                            ${(project.img === "") ? `<div class="img">Image</div>`: ""}
                            <div class="description">${project.description[lang]}</div>
                        </div>
                        ${t}
                        <div class="name">${project.name[lang]}</div>
                        <div class="buttons">
                            ${linkButton}
                        </div>
                        </div>
                    </div>
                `);
                index++;
            });
        }

        setTimeout(() => {
            switch (lang) {
                case "ar": {
                    $(".body .main .grid .item .buttons .link").text("رابط الموقع");
                    $(".body .main .grid .item .buttons .image-button").text("عرض الصور");
                break;}
    
                default: {
                    $(".body .main .grid .item .buttons .link").text("Link");
                    $(".body .main .grid .item .buttons .image-button").text("Show Images");
                }
            }
        }, 0);
    }
    switchLang = (lang, index = 0) => {
        switch (lang) {
            case "ar": {
                $("body").attr("dir", "rtl");
                $("header .themes .container .themes-button").text("سمات");
                $("header .langs .container .langs-button").text("اللغة")
                $("footer .copyright").text("تم تصميم وبرمجة هذا الموقع من قبل (HBI)");
            break;}

            default: {
                $("body").attr("dir", "ltr");
                $("header .themes .container .themes-button").text("Theme");
                $("header .langs .container .langs-button").text("Lang")
                $("footer .copyright").text("This's Website Designed & Developed By HBI");
            }
        }

        for (let i = 0; i < $(".body .select-bar .option").length; i++) {
            $(".body .select-bar .option").eq(i).text(projects[i][lang]);
        }

        getItems(projects[index].items, lang);
    };

$(window).on("load", () => {
    if (localStorage.getItem("lang") === null) {
        if (navigator.language) {
            localStorage.setItem("lang", navigator.language);
        } else {
            localStorage.setItem("lang", 'en');
        }
    }

    let certainLang = $("header .langs .container .lang").filter(function () {
        if (localStorage.getItem("lang").indexOf(this.innerText.toLowerCase()) > -1) {
            return this.innerText.toLowerCase();
        }
    });

    certainLang.addClass("active").siblings().removeClass("active");

    if (localStorage.getItem("main-color") !== null) {
        $("body").css("--main-color", localStorage.getItem("main-color"));

        let certainTheme = $("header .themes .container .theme").filter(function () {
            return this.style.backgroundColor === localStorage.getItem("main-color");
        });

        certainTheme.addClass("active").siblings().removeClass("active");
    }

    let lang = (localStorage.getItem("lang").indexOf("ar") > -1) ? "ar" : "en";

    $.getJSON("items.json", (items) => {
        let firstProjects = -1;

        for (let i = 0; i < items.length; i++) {
            if (items[i].items.length > 0) {
                $(".body .select-bar").append(`
                    <div class="option">${items[i][lang]}</div>
                `);

                projects.push(items[i]);

                if (firstProjects === -1) {
                    firstProjects = i;
                }
            }
        }

        $(".body .select-bar .option:first-child").addClass("active");

        if (firstProjects === -1) {
            $(".body .main").append(`
                <div class="grid">
                    <div class="item nothing">
                    <div class="cover">
                        <div class="img">Image</div>
                        <div class="description">ليس هناك مشاريع في الوقت الحالي، عد لاحقاً.</div>
                    </div>
                    <div class="name">لا يوجد مشاريع بعد</div>
                    <div class="buttons"></div>
                    </div>
                </div>
            `);

            switch (lang) {
                case "ar": {
                    $(".body .main .grid .item .cover .description").text("ليس هناك مشاريع في الوقت الحالي، عد لاحقاً.");
                    $(".body .main .grid .item .name").text("لا يوجد مشاريع بعد");
                break;}
                
                default: {
                    $(".body .main .grid .item .cover .description").text("There's no Projects Now, Comeback Later");
                    $(".body .main .grid .item .name").text("There's no Projects Yet");
                }
            }
        }

        switchLang(lang);

        setTimeout(() => {
            $(".waiting").fadeOut(400, function () {
                $(this).remove();
            });
        }, 0);
    });
});

$(() => {
    $("body").on("click", "header .themes .container .themes-button", () => {
        $("header .themes").toggleClass("open");
    });

    $("body").on("click", "header .langs .container .langs-button", () => {
        $("header .langs").toggleClass("open");
    });

    $("body").on("click", "header .themes .container .theme:not(.active)", function () {
        localStorage.setItem("main-color", $(this).css("background-color"));
        $(this).addClass("active").siblings().removeClass("active");
        $("body").css("--main-color", $(this).css("background-color"));
    });

    $("body").on("click", ".body .main .grid .item .buttons > .image-button", async function () {
        let index = +$(this).attr("data-index"),
            images = projects[0].items[index]['images-link'],
            imagesTemplate = ``,
            lang = localStorage.getItem("lang");

        for await (let image of images.info) {
            imagesTemplate += `<div class="image" style="background-image:url('${images["general-src"]}${image.img}')"></div>`;
        }

        $("footer").after(`
        <div class="cover" data-index="${index}">
            <div class="container">
                <div class="cover-exit"></div>
                <div class="project-images">
                <div class="project-name">${projects[0].items[index].name[lang]}</div>
                <div class="images">
                    ${imagesTemplate}
                </div>
                <div class="description">${images.info[0][lang]}</div>
                <div class="pagination">
                    <div class="prev disabled">
                    <span>&langle;</span>
                    </div>
                    <div class="image-number">
                        <div class="current">1</div>
                        <span>/</span>
                        <div class="all">${images.info.length}</div>
                    </div>
                    <div class="next">
                    <span>&rangle;</span>
                    </div>
                </div>
                </div>
            </div>
        </div>
        `);

        $(".cover").fadeIn();
        $("body").css("overflow", "hidden");
    });

    $("body").on("click", ".cover .container .project-images .pagination .prev:not(.disabled), .cover .container .project-images .pagination .next:not(.disabled)", function () {
        let index = $(this).parents(".cover").attr("data-index"),
            currentImage = +$(this).siblings(".image-number").children(".current").text(),
            images = projects[0].items[index]['images-link'],
            lang = localStorage.getItem("lang"),
            multi = 1;

        if ($("body").attr("dir") === "ltr") {
            multi = -1;
        }

        if ($(this).hasClass("prev") && currentImage > 1) {
            $(".cover .container .project-images .images .image").css("transform", `translateX(${(currentImage - 2) * 100 * multi}%)`);
            $(".cover .container .project-images .description").text(images.info[currentImage - 2][lang]);
            $(this).siblings(".image-number").children(".current").text(currentImage - 1);
        } else if ($(this).hasClass("next") && currentImage < images.info.length) {
            $(".cover .container .project-images .images .image").css("transform", `translateX(${currentImage * 100 * multi}%)`);
            $(".cover .container .project-images .description").text(images.info[currentImage][lang]);
            $(this).siblings(".image-number").children(".current").text(currentImage + 1);
        }

        currentImage = +$(this).siblings(".image-number").children(".current").text()

        if (currentImage > 1) {
            $(".cover .container .project-images .pagination .prev").removeClass("disabled");
        } else {
            $(".cover .container .project-images .pagination .prev").addClass("disabled");
        }

        if (currentImage < images.info.length) {
            $(".cover .container .project-images .pagination .next").removeClass("disabled");
        } else {
            $(".cover .container .project-images .pagination .next").addClass("disabled");
        }

    });

    $("body").on("click", ".cover > .container > .cover-exit", () => {
        $("body > .cover").fadeOut(400, function () {
            $(this).remove();
        });

        $("body").css("overflow", "auto");
    });
    
    $("body").on("click", "header .langs .container .lang", function () {
        $("footer").after(`
        <div class="waiting" style='display: none'>
            <div class="container">
            <div class="square" style="transform: translate(50%, -50%);"></div>
            <div class="square" style="transform: translate(50%, 50%); animation-delay: 0.5s;"></div>
            <div class="square" style="transform: translate(-50%, 50%); animation-delay: 1s;"></div>
            <div class="square" style="transform: translate(-50%, -50%); animation-delay: 1.5s;"></div>
            <div class="circle"></div>
            <div class="vertical-line"></div>
            <div class="horizontal-line"></div>
            </div>
        </div>
        `);

        $(".waiting").fadeIn(400, async () => {
            let lang = $(this).text().toLowerCase();
            localStorage.setItem("lang", lang);
            $(this).addClass("active").siblings().removeClass("active");

            await switchLang(lang);

            $(".waiting").fadeOut(400, function () {
                $(this).remove();
            });
        });
    });

    $("body").on("click", ".body .select-bar .option:not(.active)", function () {
        $(".body").append(`
        <div class="waiting" style='display: none'>
            <div class="container">
            <div class="square" style="transform: translate(50%, -50%);"></div>
            <div class="square" style="transform: translate(50%, 50%); animation-delay: 0.5s;"></div>
            <div class="square" style="transform: translate(-50%, 50%); animation-delay: 1s;"></div>
            <div class="square" style="transform: translate(-50%, -50%); animation-delay: 1.5s;"></div>
            <div class="circle"></div>
            <div class="vertical-line"></div>
            <div class="horizontal-line"></div>
            </div>
        </div>
        `);

        $(".waiting").fadeIn(400, async () => {
            if ($(this).index() > $(".body .select-bar .option.active").index()) {
                $(this).addClass("active left");
                $(this).siblings(".active").addClass("right").removeClass("active");
            } else {
                $(this).addClass("active right");
                $(this).siblings(".active").addClass("left").removeClass("active");
            }
    
            let lang = (localStorage.getItem("lang").indexOf("ar") > -1) ? "ar" : "en";
    
            await getItems(projects[$(this).index()].items, lang);
    
            setTimeout(() => {
                $(".body .select-bar .option").removeClass("left right");
            }, 200);
    
            $(".waiting").fadeOut(400, function () {
                $(this).remove();
            });
        });
    });
});