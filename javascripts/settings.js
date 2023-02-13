const closeSettings = (element) => {
  
  $(element)
    .find(".list")
    .slideUp(400, () => {

      $(element).removeClass("active");

      $(element).find(".list").removeClass("active");

    });

};

$(() => {

  $("body").on("click", ".settings", function (ev) {

    if ($(ev.target).closest(".header").hasClass("header")) {

      if ($(this).hasClass("active")) {

        closeSettings(this);

      } else {

        $(this).addClass("active");

        $(this).find(".list").slideDown().addClass("active");

      }

    }

  });

  $("body").on("click", (ev) => {

    if (
      !$(ev.target).closest(".settings").length &&
      $(".settings").hasClass("active")
    ) {
    
      closeSettings($(".settings"));

    }

  });

  $("body").on("click", ".settings .list .setting .title", function () {
    
    if ($(this).hasClass("active")) {
    
      $(this).removeClass("active").siblings(".options").slideUp();

    } else {
      
      $(this)
        .addClass("active")
        .siblings(".options")
        .slideDown()
        .parent()
        .siblings()
        .children(".title")
        .removeClass("active")
        .siblings(".options")
        .slideUp();
    }

  });

  $("body").on(
    "click",
    ".settings .list .setting .options .option",
    function () {
    
      if (!$(this).hasClass("active")) {
    
        let setting = $(this).parents(".setting").attr("class").split(" ")[1],
          value = $(this).attr("data-option");

        switch (setting) {

          case "themes": {
          
            $("body").attr("class", value);

            localStorage.setItem("theme", value);

            break;

          }

          case "languages": {
            
            $(".loading-screen").fadeIn(400, (_) => {
            
              getLangauge(value, (_) => {
            
                let page = $(".pagination .page.active").length
                    ? +$(".pagination .page.active").text()
                    : 1,
                  category = $(".selection-bar .option.active").length
                    ? $(".selection-bar .option.active").index()
                    : 0;

                localStorage.setItem("lang", value);

                getSelectionBar(value, category);

                getBoxes(page, category, (_) => {

                  $(".loading-screen").fadeOut();

                });

              });

            });

            $(".loading-screen").css("display", "flex");

            break;

          }

          default: {

            return;

          }

        }

        $(this).addClass("active").siblings().removeClass("active");

      }

    }

  );

});
