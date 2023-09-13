import closeSettings from "./EventFunctions/Settings/closeSettings.js";
import executeOption from "./EventFunctions/Settings/executeOption.js";
import toggleSetting from "./EventFunctions/Settings/toggleSetting.js";
import toggleSettings from "./EventFunctions/Settings/toggleSettings.js";

$(() => {
  $("body").on("click", ".settings", toggleSettings);

  $("body").on("click", (ev) => {
    if (
      !$(ev.target).closest(".settings").length &&
      $(".settings").hasClass("active")
    ) {
      closeSettings($(".settings"));
    }
  });

  $("body").on("click", ".settings .list .setting .title", toggleSetting);

  $("body").on(
    "click",
    ".settings .list .setting .options .option",
    executeOption
  );
});
