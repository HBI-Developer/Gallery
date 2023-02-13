$(_ => {
    
    $("body").on("click", ".pagination .page:not(.active)", function () {

        if ($(".box-container .wait").css("display") === 'none') {

            let page = +$(this).text(),
                category = $(".selection-bar .option.active").index();

            $(".box-container .wait").fadeIn();

            $(".box-container .wait").css("display", "flex");

            getBoxes(page, category, _ => {

                $(this).addClass("active").siblings().removeClass("active");

                $(".box-container .wait").fadeOut();

            });

        }

    });

});