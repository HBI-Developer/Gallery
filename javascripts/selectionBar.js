$(() => {
    $("body").on("click", ".selection-bar .option:not(.active)", function () {

        // Fired when click on category that's not active category

        if ($(".box-container .wait").css("display") === 'none') {

            // If wait element hidden [There's not another get project process]

            /*
                @variable category contains index of this category
            */

            let category = $(this).index();

            // Shown wait element
        
            $(".box-container .wait").fadeIn(400, _ => {

                // Get projects in first page in this category

                getBoxes(1, category, _ => {

                    // After this add active class to this category and remvoe from others

                    $(this).addClass("active").siblings().removeClass("active");

                    // Hide wait element

                    $(".box-container .wait").fadeOut();
                });
            });
            $(".box-container .wait").css("display", "flex");
        }
    });
});