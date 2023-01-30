const closeSettings = (element) => {
  $(element)
    .find(".list")
    .slideUp(400, () => {
      // Remove active class from element

      $(element).removeClass("active");

      // Remove active class from list in element

      $(element).find(".list").removeClass("active");
    });
};

$(() => {
  $("body").on("click", ".settings", function (ev) {
    // Fired when click on settings element

    if ($(ev.target).closest(".header").hasClass("header")) {
      // If the click was on header element in settings element

      if ($(this).hasClass("active")) {
        // If settings class has active class [is already open]

        // Hide list element in settings element

        closeSettings(this);
      } else {
        // If settings element has not active class [is closed]

        // Add active class to settings element

        $(this).addClass("active");

        // Shown and add active class to list element in settings element

        $(this).find(".list").slideDown().addClass("active");
      }
    }
  });

  $("body").on("click", (ev) => {
    // Fired when click on body and settings is open

    if (
      !$(ev.target).closest(".settings").length &&
      $(".settings").hasClass("active")
    ) {
      // Hide list element in settings element

      closeSettings($(".settings"));
    }
  });

  $("body").on("click", ".settings .list .setting .title", function () {
    // Fired when clicking on setting in settings list [e.g. themes, languages]

    if ($(this).hasClass("active")) {
      // If this setting has active class [Already open]

      // Remove active class and hide options list

      $(this).removeClass("active").siblings(".options").slideUp();
    } else {
      // If this setting has not active class [is closed]

      // Add class and shown options list and remove active class and close options list from others

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
      // Fired when clicking in option in setting element in settings element

      if (!$(this).hasClass("active")) {
        // If this option isn't active [Is not already selected]

        /*
                @variable setting has type of this setting [themes, langauges, ...]
                @variable value contains value of selecting option
            */

        let setting = $(this).parents(".setting").attr("class").split(" ")[1],
          value = $(this).attr("data-option");

        switch (setting) {
          case "themes": {
            // If setting is themes

            // Add this value as class to body element

            $("body").attr("class", value);

            // Set this value to theme property in localStorage

            localStorage.setItem("theme", value);

            break;
          }

          case "languages": {
            // If setting is languages

            // Shown loading screen

            $(".loading-screen").fadeIn(400, (_) => {
              // After that get Languages and direction for website screen

              getLangauge(value, (_) => {
                // After get website language

                /*
                                @variable page is current page of projects
                                @variable category is index of current category of projects
                            */

                let page = $(".pagination .page.active").length
                    ? +$(".pagination .page.active").text()
                    : 1,
                  category = $(".selection-bar .option.active").length
                    ? $(".selection-bar .option.active").index()
                    : 0;

                // Set value to lang property in localStorage

                localStorage.setItem("lang", value);

                // Get selection bar by selecting language with current category as active category

                getSelectionBar(value, category);

                // Get projects in current category in current page with selecting language

                getBoxes(page, category, (_) => {
                  // After commands end

                  // Hide loading screen

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

        // Add active class to selecting option and remove from others

        $(this).addClass("active").siblings().removeClass("active");
      }
    }
  );
});
