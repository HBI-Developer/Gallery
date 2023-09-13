import getPaginationIndex from "./getPaginationIndex.js";

/**
    @param {numner} page
    @void
*/

const getPagination = (page = 1) => {
  if (lastPage <= 1) {
    $("main .container .pagination").empty();
    return;
  }

  if (lastPage < 9) {
    if (!$("main .container .pagination .page").length) {
      for (let i = 1; i <= lastPage; i++) {
        $("main .container .pagination").append(pageInPaginationTemplate);

        $("main .container .pagination .page")
          .eq(i - 1)
          .text(i);
      }
    }

    $(`main .container .pagination .page`)
      .filter(function () {
        return $(this).text() == page;
      })
      .addClass("active")
      .siblings()
      .removeClass("active");
  } else if (page === 1 || page === lastPage) {
    $("main .container .pagination").html("");

    for (let i = 1; i <= 5; i++) {
      $("main .container .pagination").append(pageInPaginationTemplate);
    }

    if (page === 1) {
      getPaginationIndex(1);
      getPaginationIndex(2);
      getPaginationIndex(3);
      getPaginationIndex(4, lastPage - 1);
      getPaginationIndex(5, lastPage);

      $("main .container .pagination .page:first-child").addClass("active");

      $("main .container .pagination .page:nth-child(3)").after(
        "<span>...</span>"
      );
    } else if (page === lastPage) {
      getPaginationIndex(1);
      getPaginationIndex(2);
      getPaginationIndex(3, lastPage - 2);
      getPaginationIndex(4, lastPage - 1);
      getPaginationIndex(5, lastPage);

      $("main .container .pagination .page:last-child").addClass("active");

      $("main .container .pagination .page:nth-child(2)").after(
        "<span>...</span>"
      );
    }
  } else if (page < 5 || page > lastPage - 4) {
    $("main .container .pagination").html("");

    let counter = 6;

    if (page === 4 || page === lastPage - 3) {
      counter = 7;
    }

    for (let i = 1; i <= counter; i++) {
      $("main .container .pagination").append(pageInPaginationTemplate);
    }

    if (page < 5) {
      getPaginationIndex(1);
      getPaginationIndex(2);
      getPaginationIndex(3);
      getPaginationIndex(4);
      getPaginationIndex(-2, lastPage - 1);
      getPaginationIndex(-1, lastPage);

      $(`main .container .pagination .page`)
        .filter(function () {
          return $(this).text() == page;
        })
        .addClass("active");

      $("main .container .pagination .page:nth-last-child(2)").before(
        "<span>...</span>"
      );

      if (counter === 7) {
        getPaginationIndex(5);
      }
    } else if (page > lastPage - 4) {
      getPaginationIndex(1);
      getPaginationIndex(2);
      getPaginationIndex(-4, lastPage - 3);
      getPaginationIndex(-3, lastPage - 2);
      getPaginationIndex(-2, lastPage - 1);
      getPaginationIndex(-1, lastPage);

      $("main .container .pagination .page:nth-child(2)").after(
        "<span>...</span>"
      );

      if (counter === 7) {
        getPaginationIndex(-5, lastPage - 4);
      }
    }

    $(`main .container .pagination .page`)
      .filter(function () {
        return $(this).text() == page;
      })
      .addClass("active");
  } else {
    $("main .container .pagination").html("");

    for (let i = 0; i <= 7; i++) {
      $("main .container .pagination").append(pageInPaginationTemplate);
    }

    getPaginationIndex(1);
    getPaginationIndex(2);
    getPaginationIndex(3, page - 1);
    getPaginationIndex(4, page);
    getPaginationIndex(5, page + 1);
    getPaginationIndex(6, lastPage - 1);
    getPaginationIndex(7, lastPage);

    $(
      "main .container .pagination .page:nth-child(2), main .container .pagination .page:nth-child(5)"
    ).after("<span>...</span>");

    $(`main .container .pagination .page`)
      .filter(function () {
        return $(this).text() == page;
      })
      .addClass("active");
  }
};

export default getPagination;
