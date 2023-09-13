import closeSettings from "./closeSettings.js";

export default function (ev) {
  if ($(ev.target).closest(".header").hasClass("header")) {
    if ($(this).hasClass("active")) {
      closeSettings(this);
    } else {
      $(this).addClass("active");

      $(this).find(".list").slideDown().addClass("active");
    }
  }
}
