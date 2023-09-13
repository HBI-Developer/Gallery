export default function () {
  let arrow = $(this).hasClass("prev") ? "prev" : "next",
    imageNumber = $(
      ".cover .container .project-images .images .image.active"
    ).index(),
    directionImages = $("body").attr("dir") === "rtl" ? 1 : -1,
    index = +$(this).parents(".project-images").attr("data-index"),
    lang = localStorage.lang ?? defaultLang;

  if (arrow === "prev") {
    if (imageNumber > 0) {
      $(".cover .container .project-images .pagination .next").removeClass(
        "disabled"
      );

      $(".cover .container .project-images .images .image").css(
        "transform",
        `translateX(${(imageNumber - 1) * 100 * directionImages}%)`
      );

      $(".cover .container .project-images .images .image.active")
        .removeClass("active")
        .prev(".image")
        .addClass("active");

      $(".cover .container .project-images .description").text(
        images[index].info[imageNumber - 1][lang]
      );

      $(
        ".cover .container .project-images .pagination .image-number .current"
      ).text(imageNumber);

      if (imageNumber === 1) {
        $(this).addClass("disabled");
      }
    }
  } else if (arrow === "next") {
    let numberOfimages = $(
      ".cover .container .project-images .images .image"
    ).length;

    if (imageNumber < numberOfimages) {
      $(".cover .container .project-images .pagination .prev").removeClass(
        "disabled"
      );

      $(".cover .container .project-images .images .image").css(
        "transform",
        `translateX(${(imageNumber + 1) * 100 * directionImages}%)`
      );

      $(".cover .container .project-images .images .image.active")
        .removeClass("active")
        .next(".image")
        .addClass("active");

      $(".cover .container .project-images .description").text(
        images[index].info[imageNumber + 1][lang]
      );

      $(
        ".cover .container .project-images .pagination .image-number .current"
      ).text(imageNumber + 2);

      if (imageNumber === numberOfimages - 2) {
        $(this).addClass("disabled");
      }
    }
  }
}
