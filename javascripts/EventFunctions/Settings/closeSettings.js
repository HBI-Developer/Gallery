export default (element) => {
  $(element)
    .find(".list")
    .slideUp(400, () => {
      $(element).removeClass("active");

      $(element).find(".list").removeClass("active");
    });
};
