import getPage from "./EventFunctions/Pagination/getPage.js";

$((_) => {
  $("body").on(
    "click",
    "main .container .pagination .page:not(.active)",
    getPage
  );
});
