const themes = [
    {
      name: "default",
      "main-color": "#1976D2",
    },
    {
      name: "dark",
      "main-color": "#272727",
    },
    {
      name: "milk-chocolate",
      "main-color": "#84563C",
    },
    {
      name: "dark-cyan",
      "main-color": "#009688",
    },
    {
      name: "moderate-magenta",
      "main-color": "#AB47BC",
    },
  ],
  defaultTheme = "default",
  langs = ["ar", "en"],
  defaultLang = "en",
  numberOfBox = 10,
  pageInPaginationTemplate = `
        <div class="page"></div>
    `,
  selectionBarTemplate = `
        <div class="selection-bar"></div>
    `,
  selectionBarOptionTemplate = `
        <div class="option">Option</div>
    `;

let lastPage = 0,
  images = [];
