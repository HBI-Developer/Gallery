$(_ => {
    $("body").on("click", ".pagination .page:not(.active)", function () {

        // Fired when click in page except active page

        if ($(".box-container .wait").css("display") === 'none') {

            // If wait element is hidden [There's not another process of get projects]

            /*
                @variable page contains number of clicking page
                @variable category contains active category
            */

            let page = +$(this).text(),
                category = $(".selection-bar .option.active").index();

            // Shown wait element

            $(".box-container .wait").fadeIn();
            $(".box-container .wait").css("display", "flex");

            // Get projects for this page and this category

            getBoxes(page, category, _ => {

                // After all above commands end

                // Active this page and remove active class from siblings

                $(this).addClass("active").siblings().removeClass("active");

                // Hide wait element

                $(".box-container .wait").fadeOut();
            });
        }
    });
});