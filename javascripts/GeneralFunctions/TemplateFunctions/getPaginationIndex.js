/**
 *
 * @param {number} index
 * @param {string} text
 * @void
 */
const getPaginationIndex = (index, text = "") => {
  if (text === "") text = Math.abs(index);

  if (index > 0) {
    $(`main .container .pagination .page:nth-child(${index})`).text(text);
  } else if (index < 0) {
    index = Math.abs(index);
    $(`main .container .pagination .page:nth-last-child(${index})`).text(text);
  } else {
    $(`main .container .pagination .page:first-child`).text(text);
  }
};

export default getPaginationIndex;
