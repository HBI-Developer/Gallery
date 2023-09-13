import chooseOption from "./EventFunctions/SelectionBar/chooseOption.js";

$(() => {
  $("body").on("click", ".selection-bar .option:not(.active)", chooseOption);
});
