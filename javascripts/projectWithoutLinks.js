import showProject from "./EventFunctions/ProjectWithoutLinks/showProject.js";
import anotherImage from "./EventFunctions/ProjectWithoutLinks/anotherImage.js";

$((_) => {
  $("body").on(
    "click",
    ".box-container .box .buttons .button[href='#']",
    showProject
  );

  $("body").on("click", ".cover .container .cover-exit", () => {
    $(".cover").fadeOut();
  });

  $("body").on(
    "click",
    `
        .cover .container .project-images .pagination .prev:not(.disabled),
        .cover .container .project-images .pagination .next:not(.disabled)
        `,
    anotherImage
  );
});
