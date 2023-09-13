export default async function (ev) {
  ev.preventDefault();

  let type = $(this).attr("data-type"),
    value = $(this).attr("data-value");

  switch (type) {
    case "images": {
      let imagesSet = images[+value],
        imagesSource = imagesSet["general-src"],
        name = $(this).parents(".box").children(".name").text(),
        numberOfImages = imagesSet.info.length,
        lang = localStorage.lang ?? defaultLang;

      $(".cover .container .project-images").attr("data-index", value);

      $(".cover .container .project-images .project-name").text(name);

      $(".cover .container .project-images .images").empty();

      for await (let image of imagesSet.info) {
        $(".cover .container .project-images .images").append(`
                    <div class="image" style="background-image: url('${imagesSource}/${image.img}')"></div>
                `);
      }

      $(
        ".cover .container .project-images .images .image:first-child"
      ).addClass("active");

      $(".cover .container .project-images .description").text(
        imagesSet.info[0][lang]
      );

      $(".cover .container .project-images .pagination .prev").addClass(
        "disabled"
      );

      $(".cover .container .project-images .pagination .next").addClass(
        "disabled"
      );

      $(
        ".cover .container .project-images .pagination .image-number .current"
      ).text("1");

      $(
        ".cover .container .project-images .pagination .image-number .all"
      ).text(numberOfImages);

      if (numberOfImages > 1) {
        $(".cover .container .project-images .pagination .next").removeClass(
          "disabled"
        );
      }

      setTimeout((_) => {
        $(".cover").fadeIn();
      }, 0);

      break;
    }

    default: {
      return;
    }
  }
}
