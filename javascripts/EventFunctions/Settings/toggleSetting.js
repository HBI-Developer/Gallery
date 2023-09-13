export default function () {
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
}
