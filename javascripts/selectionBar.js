$(() => {

    $("body").on("click", ".selection-bar .option:not(.active)", function () {

        if ($(".box-container .wait").css("display") === 'none') {

            let category = $(this).index();
        
            $(".box-container .wait").fadeIn(400, _ => {

                getBoxes(1, category, _ => {

                    $(this).addClass("active").siblings().removeClass("active");

                    $(".box-container .wait").fadeOut();

                });

            });

            $(".box-container .wait").css("display", "flex");

        }

    });
    
});