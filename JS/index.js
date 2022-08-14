let projects = [],
    getItems = (projects, lang = localStorage.getItem("lang")) => {
        $(".body .main").html("");
        for (let project of projects) {
            $(".body .main").append(`
                <div class="grid">
                    <div class="item">
                    <div class="cover" ${(project.img !== "") ? `style="background-image: url('images/${project.img}')"` : ""}>
                        ${(project.img === "") ? `<div class="img">Image</div>`: ""}
                        <div class="description">${project.description[lang]}</div>
                    </div>
                    <div class="name">${project.name[lang]}</div>
                    <div class="buttons">
                        <a href="${(project.link !== "") ? project.link : "#"}" target="_blank" class="link"></a>
                    </div>
                    </div>
                </div>
            `);
        }

        switch (lang) {
            case "ar": {
                $(".body .main .grid .item .buttons .link").text("رابط الموقع");
            break;}

            default: {
                $(".body .main .grid .item .buttons .link").text("Link");
            }
        }
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
    });

    if (document.readyState === "complete") {
        $(".waiting").fadeOut(400, function () {
            $(this).remove();
        });
    }
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
    
    $("body").on("click", "header .langs .container .lang", async function () {
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

        $(".waiting").fadeIn();

        let lang = $(this).text().toLowerCase();
        localStorage.setItem("lang", lang);
        $(this).addClass("active").siblings().removeClass("active");

        await switchLang(lang);

        $(".waiting").fadeOut(400, function () {
            $(this).remove();
        });
    });

    $("body").on("click", ".body .select-bar .option:not(.active)", async function () {
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

        $(".waiting").fadeIn();

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