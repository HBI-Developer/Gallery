import getBoxTemplate from "./getBoxTemplate.js";
import getPagination from "./getPagination.js";

/**
    @param {number} page
    @param {number} category
    @param {function} callback
    @void
*/

const getBoxes = (page = 1, category = 0, callback = (_) => {}) => {
  $.getJSON("./data/items.json", async (result) => {
    images = [];

    let boxes,
      firstItem = 0;

    if (result.length <= 0) {
      boxes = [];
    }
    if (category < result.length) {
      boxes = result[category];
    } else {
      boxes = result[0];
    }

    lastPage = Math.ceil(boxes.items.length / numberOfBox);

    if (page < 1) {
      page = 1;
    } else if (page > lastPage) {
      page = lastPage;
    }

    firstItem = (page - 1) * numberOfBox;

    boxes = boxes.items.reverse();

    boxes = boxes.splice(firstItem, numberOfBox);

    $(".box-container .box").remove();

    for await (let box of boxes) {
      let boxTemplate = await getBoxTemplate(box);

      $("main .container .box-container .wait").before(boxTemplate);
    }

    getPagination(page);

    setTimeout((_) => {
      callback();
    }, 0);
  });
};

export default getBoxes;
