/**
    @param {{}} info
    @return {string}
*/

const getBoxTemplate = async (info = {}) => {
  let template,
    lang = localStorage.lang,
    name = info.name[lang],
    description = info.description[lang],
    tools = info.tools,
    img = info.img,
    buttons = info.buttons,
    toolsTemplate = ``,
    buttonsTemplate = ``;

  for await (let tool of tools) {
    toolsTemplate += `
            <div class="technology" style="background-image: url('images/technologies/${
              tool[0]
            }.svg');">
                <div class="title-container">
                    <div class="title">${tool[1] ?? tool[0]}</div>
                </div>
            </div>
        `;
  }

  for await (let button of buttons) {
    let noIcon = "",
      icon = "",
      link,
      colors,
      buttonType = "";

    if (button.icon !== "") {
      icon = `<div class="icon icon-${button.icon}"></div>`;
    } else if (button.img !== "") {
      icon = `<div class="icon" style="background-image: url('images/logos/${button.img}');"></div>`;
    } else {
      noIcon = " no-icon";
    }

    if (button.link) {
      link = button.link;
    } else if (button["images-link"]) {
      images.push(button["images-link"]);

      link = "#";

      buttonType = `data-type="images" data-value="${images.length - 1}"`;
    }

    if (button.background !== "" || button.color !== "") {
      let background =
          button.background !== ""
            ? `background-color: ${button.background};`
            : "",
        color = button.color !== "" ? `color: ${button.color};` : "";

      colors = `style="${background} ${color}"`;
    } else {
      colors = "";
    }

    buttonsTemplate += `
            <a href="${link}" ${colors} target="_black" class="button${noIcon}" ${buttonType}> ${icon} <div class="text">${button.name[lang]}</div></a>
        `;
  }

  template = `
        <div class="box">
            <div class="img" style="background-image: url('images/Projects/${img}');">
                <div class="cover">
                    <div class="description">${description}</div>
                </div>
            </div>
            <div class="name">${name}</div>
            <div class="partition"></div>
            <div class="technologies">
                
                ${toolsTemplate}

            </div>
            <div class="partition"></div>
            <div class="buttons">
                
                ${buttonsTemplate}

            </div>
        </div>
    `;

  return template;
};

export default getBoxTemplate;
