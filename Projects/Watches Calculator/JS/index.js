let words = {},
  lang = "";

$(window).on("load", () => {
  if (localStorage.getItem("lang")) {
    lang = localStorage.getItem("lang");
  } else if (navigator.language) {
    lang = navigator.language;
    localStorage.setItem("lang", navigator.language);
  } else {
    lang = "en";
    localStorage.setItem("lang", "en");
  }

  if (lang === "ar") {
    $(".waiting .message").text("يتم تحميل الموقع، انتظر رجاءً");
  } else {
    $(".waiting .message").text("Website loading, Wait please");
  }

  $.getJSON(`Lang/${lang}.json`, (r) => {
    words = r.words;

    $("body").attr("dir", r.direction);
    $("head title, header .title").text(words["watches-calculator"]);
    $("header .description").text(words["website-description"]);
    $("header .navbar .calc-by").text(words["calc-by"]);
    $("header .navbar .option[data-option='seconds']").text(words["seconds"]);
    $("header .navbar .option[data-option='minutes']").text(words["minutes"]);
    $("header .navbar .option[data-option='hours']").text(words["hours"]);
    $("header .navbar .option[data-option='days']").text(words["days"]);
    $("header .navbar .option[data-option='weeks']").text(words["weeks"]);
    $("header .navbar .option[data-option='months']").text(words["months"]);
    $("header .navbar .option[data-option='years']").text(words["years"]);
    $("header .navbar .option[data-option='decades']").text(words["decades"]);
    $("header .navbar .option[data-option='centuries']").text(
      words["centuries"]
    );
    $("header .navbar .option[data-option='millenniums']").text(
      words["millenniums"]
    );
    $(".calc .nothing").text(words["nothing"]);
    $(".calc .buttons .add-watch").text(words["add-watch"]);
    $(".calc .buttons .add-collection").text(words["add-brackets"]);
    $(".calc .buttons .reset").text(words["reset"]);
    $(".calc .buttons .calculating").text(words["calculating"]);
    $("footer .footer-box .ar").text(words["ar-lang"]);
    $("footer .footer-box .en").text(words["en-lang"]);
    $("footer .copyright").text(words["copyright"]);
  });

  if (document.readyState === "complete") {
    $(".waiting").fadeOut();
  }
});

$(() => {
  $("body").on("click", "header .navbar .calc-options .option", function () {
    if (!$(".watch, .collection").length) {
      $(this).addClass("select").siblings().removeClass("select");
      $(
        "header .navbar .calc-mobile-options .current .selected .option.select"
      ).removeClass("select");
      $(
        `header .navbar .calc-mobile-options .current .selected .option[data-option="${$(
          this
        ).attr("data-option")}"]`
      ).addClass("select");
      $("header .navbar .calc-mobile-options .current .selected .option").css(
        "transform",
        `translateX(${
          (100 *
          $(
            "header .navbar .calc-mobile-options .current .selected .option.select"
          ).index()) * (($("body").attr("dir") === "rtl") ? 1 : -1)
        }%)`
      );
    }
  });

  $("body").on("click", "header .navbar .calc-mobile-options .to-prev", () => {
    if (!$(".watch, .collection").length) {
      let option = $(
          "header .navbar .calc-mobile-options .current .selected .option"
        ),
        select = $(
          "header .navbar .calc-mobile-options .current .selected .option.select"
        );

      if (select.index() == 0) {
        option.css(
          "transform",
          `translateX(${
            100 *
            (option.length - 1) *
            ($("body").attr("dir") === "rtl" ? 1 : -1)
          }%)`
        );
        $(
          "header .navbar .calc-mobile-options .current .selected .option.select"
        ).removeClass("select");
        $(
          "header .navbar .calc-mobile-options .current .selected .option:last-child"
        ).addClass("select");
      } else {
        option.css(
          "transform",
          `translateX(${
            100 *
            (select.index() - 1) *
            ($("body").attr("dir") === "rtl" ? 1 : -1)
          }%)`
        );
        $(
          "header .navbar .calc-mobile-options .current .selected .option.select"
        )
          .removeClass("select")
          .prev()
          .addClass("select");
      }

      $("header .navbar .calc-options .option.select").removeClass("select");
      $(
        `header .navbar .calc-options .option[data-option="${$(
          "header .navbar .calc-mobile-options .current .selected .option.select"
        ).attr("data-option")}"]`
      ).addClass("select");
    }
  });

  $("body").on("click", "header .navbar .calc-mobile-options .to-next", () => {
    if (!$(".watch, .collection").length) {
      let option = $(
          "header .navbar .calc-mobile-options .current .selected .option"
        ),
        select = $(
          "header .navbar .calc-mobile-options .current .selected .option.select"
        );

      if (select.index() == option.length - 1) {
        option.css("transform", `translateX(0%)`);
        $(
          "header .navbar .calc-mobile-options .current .selected .option.select"
        ).removeClass("select");
        $(
          "header .navbar .calc-mobile-options .current .selected .option:first-child"
        ).addClass("select");
      } else {
        option.css(
          "transform",
          `translateX(${
            100 *
            (select.index() + 1) *
            ($("body").attr("dir") === "rtl" ? 1 : -1)
          }%)`
        );
        $(
          "header .navbar .calc-mobile-options .current .selected .option.select"
        )
          .removeClass("select")
          .next()
          .addClass("select");
      }

      $("header .navbar .calc-options .option.select").removeClass("select");
      $(
        `header .navbar .calc-options .option[data-option="${$(
          "header .navbar .calc-mobile-options .current .selected .option.select"
        ).attr("data-option")}"]`
      ).addClass("select");
    }
  });

  $("body").on(
    "click",
    ".calc .buttons .add-watch, .calc .buttons .add-collection",
    function () {
      if (!$(".attention, .confirm").length) {
        let signs = `
          <div class="signs">
            <div class="sign select"><div class="plus">&plus;</div></div>
            <div class="sign sign1"><div class="minus">&minus;</div></div>
            <div class="sign sign2"><div class="multi">&times;</div></div>
            <div class="sign sign3"><div class="div">&div;</div></div>
          </div>
        `,
          formulaStructure = ``,
          collectionStructure = `
        <div class="collection">
          <div class="options">
            <span>&minus;</span>
          </div>
          <div class="formulas">
            <p class="nothing">${words["nothing"]}</p>
          </div>
          <div class="buttons">
            <div class="add-watch">${words["add-watch"]}</div>
            <div class="add-collection">${words["add-brackets"]}</div>
          </div>
        </div>
        `;

        if ($(this).hasClass("add-watch")) {
          switch (
            $(
              "header .navbar .calc-mobile-options .current .selected .option.select"
            ).attr("data-option")
          ) {
            case "seconds": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" min="0" />
                    </div>
                  </form>
                </div>
              `;
              break;
            }

            case "minutes": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["minutes"]}</p>
                      <input type="number" class="minutes" value="0" min="0" />
                    </div>
                    </div>
                  </form>
                </div>
              `;
              break;
            }

            case "hours": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["minutes"]}</p>
                      <input type="number" class="minutes" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["hours"]}</p>
                      <input type="number" class="hours" value="0" min="0" />
                    </div>
                  </form>
                </div>
              `;
              break;
            }

            case "days": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["minutes"]}</p>
                      <input type="number" class="minutes" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["hours"]}</p>
                      <input type="number" class="hours" value="0" max="23" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["days"]}</p>
                      <input type="number" class="days" value="0" min="0" />
                    </div>
                  </form>
                </div>
              `;
              break;
            }

            case "weeks": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["minutes"]}</p>
                      <input type="number" class="minutes" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["hours"]}</p>
                      <input type="number" class="hours" value="0" max="23" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["days"]}</p>
                      <input type="number" class="days" value="0" max="6" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["weeks"]}</p>
                      <input type="number" class="weeks" value="0" min="0" />
                    </div>
                  </form>
                </div>
              `;
              break;
            }

            case "months": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["minutes"]}</p>
                      <input type="number" class="minutes" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["hours"]}</p>
                      <input type="number" class="hours" value="0" max="23" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["days"]}</p>
                      <input type="number" class="days" value="0" max="6" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["weeks"]}</p>
                      <input type="number" class="weeks" value="0" max="4" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["months"]}</p>
                      <input type="number" class="months" value="0" min="0" />
                    </div>
                  </form>
                </div>
              `;
              break;
            }

            case "years": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["minutes"]}</p>
                      <input type="number" class="minutes" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["hours"]}</p>
                      <input type="number" class="hours" value="0" max="23" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["days"]}</p>
                      <input type="number" class="days" value="0" max="6" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["weeks"]}</p>
                      <input type="number" class="weeks" value="0" max="4" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["months"]}</p>
                      <input type="number" class="months" value="0" max="11" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["years"]}</p>
                      <input type="number" class="years" value="0" min="0" />
                    </div>
                  </form>
                </div>
              `;
              break;
            }

            case "decades": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["minutes"]}</p>
                      <input type="number" class="minutes" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["hours"]}</p>
                      <input type="number" class="hours" value="0" max="23" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["days"]}</p>
                      <input type="number" class="days" value="0" max="6" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["weeks"]}</p>
                      <input type="number" class="weeks" value="0" max="4" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["months"]}</p>
                      <input type="number" class="months" value="0" max="11" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["years"]}</p>
                      <input type="number" class="years" value="0" max="9" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["decades"]}</p>
                      <input type="number" class="decades" value="0" min="0" />
                    </div>
                  </form>
                </div>
              `;
              break;
            }

            case "centuries": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["minutes"]}</p>
                      <input type="number" class="minutes" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["hours"]}</p>
                      <input type="number" class="hours" value="0" max="23" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["days"]}</p>
                      <input type="number" class="days" value="0" max="6" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["weeks"]}</p>
                      <input type="number" class="weeks" value="0" max="4" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["months"]}</p>
                      <input type="number" class="months" value="0" max="11" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["years"]}</p>
                      <input type="number" class="years" value="0" max="9" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["decades"]}</p>
                      <input type="number" class="decades" value="0" max="9" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["centuries"]}</p>
                      <input type="number" class="centuries" value="0" min="0" />
                    </div>
                  </form>
                </div>
              `;
              break;
            }

            case "millenniums": {
              formulaStructure = `
                <div class="watch">
                  <div class="options">
                    <span>&minus;</span>
                  </div>
                  <form class="fields">
                    <div class="field">
                      <p class="label">${words["seconds"]}</p>
                      <input type="number" class="seconds" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["minutes"]}</p>
                      <input type="number" class="minutes" value="0" max="59" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["hours"]}</p>
                      <input type="number" class="hours" value="0" max="23" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["days"]}</p>
                      <input type="number" class="days" value="0" max="6" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["weeks"]}</p>
                      <input type="number" class="weeks" value="0" max="4" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["months"]}</p>
                      <input type="number" class="months" value="0" max="11" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["years"]}</p>
                      <input type="number" class="years" value="0" max="9" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["decades"]}</p>
                      <input type="number" class="decades" value="0" max="9" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["centuries"]}</p>
                      <input type="number" class="centuries" value="0" max="9" min="0" />
                    </div>
                    <div class="field">
                      <p class="label">${words["millenniums"]}</p>
                      <input type="number" class="millenniums" value="0" min="0" />
                    </div>
                  </form>
                </div>
              `;
              break;
            }
          }
        }

        let structure = $(this).hasClass("add-watch")
          ? formulaStructure
          : collectionStructure;

        if ($(this).parent().parent().hasClass("collection")) {
          $(this).parent().siblings(".formulas").children(".nothing").remove();

          if ($(this).parent().siblings(".formulas").children().length) {
            $(this)
              .parent()
              .siblings(".formulas")
              .append(signs + structure);
          } else {
            $(this).parent().siblings(".formulas").append(structure);
          }
        } else {
          $(this).parent().parent().children(".nothing").remove();

          if (
            $(this).parent().parent().children(".watch, .collection").length
          ) {
            $(this)
              .parent()
              .before(signs + structure);
          } else {
            $(this).parent().before(structure);
          }
        }
      }
    }
  );

  $("body").on("submit", ".calc .watch form", (e) => {
    e.preventDefault();
  });

  $("body").on("blur", ".calc .watch .fields .field input", function () {
    if (parseInt($(this).val()) < 0) {
      $(this).val(0);
    } else {
      let select = $(
          "header .navbar .calc-mobile-options .current .selected .option.select"
        ).attr("data-option"),
        current = $(this).attr("class"),
        value = $(this).val();

      if (select !== current) {
        switch (current) {
          case "seconds": {
            if (value > 59) {
              $(this).val(59);
            }
            break;
          }

          case "minutes": {
            if (value > 59) {
              $(this).val(59);
            }
            break;
          }

          case "hours": {
            if (value > 23) {
              $(this).val(23);
            }
            break;
          }

          case "days": {
            if (value > 6) {
              $(this).val(6);
            }
            break;
          }

          case "weeks": {
            if (value > 4) {
              $(this).val(4);
            }
            break;
          }

          case "months": {
            if (value > 11) {
              $(this).val(11);
            }
            break;
          }

          case "years": {
            if (value > 9) {
              $(this).val(9);
            }
            break;
          }

          case "decades": {
            if (value > 9) {
              $(this).val(9);
            }
            break;
          }

          case "centuries": {
            if (value > 9) {
              $(this).val(9);
            }
            break;
          }
        }
      }
    }
  });

  $("body").on(
    "click",
    ".calc .buttons .reset, .calc .watch .options span:last-child, .calc .collection > .options span:last-child",
    function () {
      if (!$(".attention").length) {
        let confirm = `
        <div class="confirm">
          <div class="title">${words["delete-confirm-title"]}</div>
          <div class="body">
            <div class="message">${words["delete-confirm-message"]}</div>
            <div class="confirm-buttons">
              <div class="yes">${words["yes"]}</div>
              <div class="no">${words["no"]}</div>
            </div>
          </div>
        </div>
        `;

        if (!$(".confirm").length) {
          $(this).addClass("active");
          $("body").append(confirm);
          $(".confirm").fadeIn(200);
        }
      }
    }
  );

  $("body").on("click", ".calc .buttons .calculating", async () => {
    if ($(".watch").length && !$(".confirm, .attention").length) {
      let mainFormulas = [
          ...$(".calc").children(".watch, .signs, .collection"),
        ],
        getFinalFormula = async (mainFormulas) => {
          let firstStage = [],
            secondStage = [],
            result = 0,
            counter = 0;

          $("body").css("overflow", "hidden");
          $(".waiting .message").text(words["solving-now"]);
          $(".waiting").fadeIn();
          $(".waiting").css("display", "flex");

          for await (let formula of mainFormulas) {
            await getFinalFormula([
              ...$(formula)
                .children(".formulas")
                .children(".watch, .signs, .collection"),
            ]).then((r) => {
              if ($(formula).hasClass("collection")) {
                firstStage.push(r);
              } else if ($(formula).hasClass("watch")) {
                let millenniums = $(formula).find(".millenniums").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".millenniums").val())
                        ).multiply(31536000000000)
                      )
                    : 0,
                  centuries = $(formula).find(".centuries").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".centuries").val())
                        ).multiply(3153600000000)
                      )
                    : 0,
                  decades = $(formula).find(".decades").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".decades").val())
                        ).multiply(315360000000)
                      )
                    : 0,
                  years = $(formula).find(".years").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".years").val())
                        ).multiply(31536000000)
                      )
                    : 0,
                  months = $(formula).find(".months").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".months").val())
                        ).multiply(2592000000)
                      )
                    : 0,
                  weeks = $(formula).find(".weeks").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".weeks").val())
                        ).multiply(604800000)
                      )
                    : 0,
                  days = $(formula).find(".days").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".days").val())
                        ).multiply(86400000)
                      )
                    : 0,
                  hours = $(formula).find(".hours").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".hours").val())
                        ).multiply(3600000)
                      )
                    : 0,
                  minutes = $(formula).find(".minutes").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".minutes").val())
                        ).multiply(60000)
                      )
                    : 0,
                  seconds = $(formula).find(".seconds").length
                    ? parseInt(
                        bigInt(
                          parseInt($(formula).find(".seconds").val())
                        ).multiply(1000)
                      )
                    : 0,
                  totalSeconds =
                    millenniums +
                    centuries +
                    decades +
                    years +
                    months +
                    weeks +
                    days +
                    hours +
                    minutes +
                    seconds;

                firstStage.push(totalSeconds);
              } else if ($(formula).hasClass("signs")) {
                firstStage.push(
                  $(formula).children(".select").children().attr("class")
                );
              }
            });
          }

          if (firstStage.length === 1) {
            return firstStage[0];
          } else if (firstStage.length <= 0) {
            return 0;
          }

          counter = 0;

          for await (let stage of firstStage) {
            if (stage === "div") {
              secondStage.push(
                parseInt(
                  bigInt(firstStage[counter - 1]).divide(
                    firstStage[counter + 1]
                  )
                )
              );
            } else if (stage === "multi") {
              secondStage.push(
                parseInt(
                  bigInt(firstStage[counter - 1]).multiply(
                    firstStage[counter + 1]
                  )
                )
              );
            } else if (stage === "plus" || stage === "minus") {
              if (
                firstStage[counter - 2] === "plus" ||
                firstStage[counter - 2] === "minus" ||
                counter === 1
              ) {
                secondStage.push(firstStage[counter - 1]);
              }
              secondStage.push(stage);

              if (counter + 1 === firstStage.length - 1) {
                secondStage.push(firstStage[counter + 1]);
              }
            }

            counter++;
          }

          if (secondStage.length === 1) {
            return secondStage[0];
          }

          counter = 0;

          for await (let stage of secondStage) {
            if (counter === 0) {
              result = parseInt(bigInt(result).add(stage));
            } else {
              if (stage === "plus") {
                result = parseInt(bigInt(result).add(secondStage[counter + 1]));
              } else if (stage === "minus") {
                result = parseInt(
                  bigInt(result).minus(secondStage[counter + 1])
                );
              }
            }

            counter++;
          }

          return result;
        };

      getFinalFormula(mainFormulas).then((result) => {
        let finalResult = parseInt(bigInt(result).abs());

        if (finalResult > 0) {
          let millenniums = parseInt(
              bigInt(finalResult).divide(31536000000000)
            ),
            centuries = parseInt(
              bigInt(finalResult).mod(31536000000000).divide(3153600000000)
            ),
            decades = parseInt(
              bigInt(finalResult).mod(3153600000000).divide(315360000000)
            ),
            years = parseInt(
              bigInt(finalResult).mod(315360000000).divide(31536000000)
            ),
            months = parseInt(
              bigInt(finalResult).mod(31536000000).divide(2592000000)
            ),
            weeks = parseInt(
              bigInt(finalResult).mod(2592000000).divide(604800000)
            ),
            days = parseInt(
              bigInt(finalResult)
                .mod(2592000000)
                .mod(604800000)
                .divide(86400000)
            ),
            hours = parseInt(bigInt(finalResult).mod(86400000).divide(3600000)),
            minutes = parseInt(bigInt(finalResult).mod(3600000).divide(60000)),
            seconds = parseInt(bigInt(finalResult).mod(60000).divide(1000)),
            mili = parseInt(bigInt(finalResult).mod(1000)),
            millenniumsWord = "",
            centuriesWord = "",
            decadesWord = "",
            yearsWord = "",
            monthsWord = "",
            weeksWord = "",
            daysWord = "",
            hoursWord = "",
            minutesWord = "",
            secondsWord = "",
            miliWord = "",
            directionNumber = "";

          if (lang === "ar") {
            if (result < 0) {
              directionNumber = "(بالسالب)";
            }

            if (millenniums > 10) {
              millenniumsWord = "ألفية";
            } else if (millenniums <= 10 && millenniums >= 3) {
              millenniumsWord = "ألفيات";
            } else if (millenniums === 2) {
              millenniumsWord = "(ألفيتان)";
            } else if (millenniums === 1) {
              millenniumsWord = "(ألفية واحدة)";
            } else {
              millenniumsWord = "-";
            }

            if (centuries > 10) {
              centuriesWord = "قرن";
            } else if (centuries <= 10 && centuries >= 3) {
              centuriesWord = "قرون";
            } else if (centuries === 2) {
              centuriesWord = "(قرنان";
            } else if (centuries === 1) {
              centuriesWord = "(قرن واحد)";
            } else {
              centuriesWord = "-";
            }

            if (decades > 10) {
              decadesWord = "عقد";
            } else if (decades <= 10 && decades >= 3) {
              decadesWord = "عقود";
            } else if (decades === 2) {
              decadesWord = "(عقدين)";
            } else if (decades === 1) {
              decadesWord = "(عقد واحد)";
            } else {
              decadesWord = "-";
            }

            if (years > 10) {
              yearsWord = "سنة";
            } else if (years <= 10 && years >= 3) {
              yearsWord = "سنوات";
            } else if (years === 2) {
              yearsWord = "(سنتان)";
            } else if (years === 1) {
              yearsWord = "(سنة واحدة)";
            } else {
              yearsWord = "-";
            }

            if (months > 10) {
              monthsWord = "شهر";
            } else if (months <= 10 && months >= 3) {
              monthsWord = "أشهر";
            } else if (months === 2) {
              monthsWord = "(شهران)";
            } else if (months === 1) {
              monthsWord = "(شهر واحد)";
            } else {
              monthsWord = "-";
            }

            if (weeks > 10) {
              weeksWord = "أسبوع";
            } else if (weeks <= 10 && weeks >= 3) {
              weeksWord = "أسابيع";
            } else if (weeks === 2) {
              weeksWord = "(أسبوعان)";
            } else if (weeks === 1) {
              weeksWord = "(أسبوع واحد)";
            } else {
              weeksWord = "-";
            }

            if (days > 10) {
              daysWord = "يوم";
            } else if (days <= 10 && days >= 3) {
              daysWord = "أيام";
            } else if (days === 2) {
              daysWord = "(يومان)";
            } else if (days === 1) {
              daysWord = "(يوم واحد)";
            } else {
              daysWord = "-";
            }

            if (hours > 10) {
              hoursWord = "ساعة";
            } else if (hours <= 10 && hours >= 3) {
              hoursWord = "ساعات";
            } else if (hours === 2) {
              hoursWord = "(ساعتان)";
            } else if (hours === 1) {
              hoursWord = "(ساعة واحدة)";
            } else {
              hoursWord = "-";
            }

            if (minutes > 10) {
              minutesWord = "دقيقة";
            } else if (minutes <= 10 && minutes >= 3) {
              minutesWord = "دقائق";
            } else if (minutes === 2) {
              minutesWord = "(دقيقتان)";
            } else if (minutes === 1) {
              minutesWord = "(دقيقة واحدة)";
            } else {
              minutesWord = "-";
            }

            if (seconds > 10) {
              secondsWord = "ثانية";
            } else if (seconds <= 10 && seconds >= 3) {
              secondsWord = "ثواني";
            } else if (seconds === 2) {
              secondsWord = "(ثانيتان)";
            } else if (seconds === 1) {
              secondsWord = "(ثانية واحدة)";
            } else {
              secondsWord = "-";
            }

            if (mili > 10) {
              miliWord = "جزء من الثانية";
            } else if (mili <= 10 && mili >= 3) {
              miliWord = "أجزاء من الثانية";
            } else if (mili === 2) {
              miliWord = "(جزئين من الثانية)";
            } else if (mili === 1) {
              miliWord = "(جزء واحد من الثانية)";
            } else {
              miliWord = "-";
            }
          } else {
            if (result < 0) {
              directionNumber = "(In Negative)";
            }

            if (millenniums === 1) {
              millenniumsWord = "Millennium";
            } else if (millenniums > 1) {
              millenniumsWord = "Millenniums";
            } else {
              millenniumsWord = "-";
            }

            if (centuries === 1) {
              centuriesWord = "Century";
            } else if (centuries > 1) {
              centuriesWord = "Centuries";
            } else {
              centuriesWord = "-";
            }

            if (decades === 1) {
              decadesWord = "Decade";
            } else if (decades > 1) {
              decadesWord = "Decades";
            } else {
              decadesWord = "-";
            }

            if (years === 1) {
              yearsWord = "Year";
            } else if (years > 1) {
              yearsWord = "Years";
            } else {
              yearsWord = "-";
            }

            if (months === 1) {
              monthsWord = "Month";
            } else if (months > 1) {
              monthsWord = "Months";
            } else {
              monthsWord = "-";
            }

            if (weeks === 1) {
              weeksWord = "Week";
            } else if (weeks > 1) {
              weeksWord = "Weeks";
            } else {
              weeksWord = "-";
            }

            if (days === 1) {
              daysWord = "Day";
            } else if (days > 1) {
              daysWord = "Days";
            } else {
              daysWord = "-";
            }

            if (hours === 1) {
              hoursWord = "Hour";
            } else if (hours > 1) {
              hoursWord = "Hours";
            } else {
              hoursWord = "-";
            }

            if (minutes === 1) {
              minutesWord = "Minute";
            } else if (minutes > 1) {
              minutesWord = "Minutes";
            } else {
              minutesWord = "-";
            }

            if (seconds === 1) {
              secondsWord = "Second";
            } else if (seconds > 1) {
              secondsWord = "Seconds";
            } else {
              secondsWord = "-";
            }

            if (mili === 1) {
              miliWord = "Millisecond";
            } else if (mili > 1) {
              miliWord = "Milliseconds";
            } else {
              miliWord = "-";
            }
          }

          $(".waiting").before(`
        <div class="result">
          <div class="title">${
            words["result"] + directionNumber + " " + words["is"]
          }</div>
          <div class="container">
            ${
              millenniums > 0
                ? `<div class="index">
                <div class="number">${
                  millenniums < 10 ? "0" : ""
                }${millenniums}</div>
                <div class="time">${millenniumsWord}</div>
              </div>`
                : ""
            }
            ${
              millenniums > 0 &&
              (centuries > 0 ||
                decades > 0 ||
                years > 0 ||
                months > 0 ||
                weeks > 0 ||
                days > 0 ||
                hours > 0 ||
                minutes > 0 ||
                (seconds > 0 && mili > 0))
                ? `<span class="partition">:</span>`
                : ""
            }

            ${
              centuries > 0
                ? `<div class="index">
                <div class="number">${
                  centuries < 10 ? "0" : ""
                }${centuries}</div>
                <div class="time">${centuriesWord}</div>
              </div>`
                : ""
            }

            ${
              centuries > 0 &&
              (decades > 0 ||
                years > 0 ||
                months > 0 ||
                weeks > 0 ||
                days > 0 ||
                hours > 0 ||
                minutes > 0 ||
                (seconds > 0 && mili > 0))
                ? `<span class="partition">:</span>`
                : ""
            }

            ${
              decades > 0
                ? `<div class="index">
                <div class="number">${decades < 10 ? "0" : ""}${decades}</div>
                <div class="time">${decadesWord}</div>
              </div>`
                : ""
            }
            ${
              decades > 0 &&
              (years > 0 ||
                months > 0 ||
                weeks > 0 ||
                days > 0 ||
                hours > 0 ||
                minutes > 0 ||
                (seconds > 0 && mili > 0))
                ? `<span class="partition">:</span>`
                : ""
            }

            ${
              years > 0
                ? `<div class="index">
                <div class="number">${years < 10 ? "0" : ""}${years}</div>
                <div class="time">${yearsWord}</div>
              </div>`
                : ""
            }

            ${
              years > 0 &&
              (months > 0 ||
                weeks > 0 ||
                days > 0 ||
                hours > 0 ||
                minutes > 0 ||
                (seconds > 0 && mili > 0))
                ? `<span class="partition">:</span>`
                : ""
            }

            ${
              months > 0
                ? `<div class="index">
                <div class="number">${months < 10 ? "0" : ""}${months}</div>
                <div class="time">${monthsWord}</div>
              </div>`
                : ""
            }

            ${
              months > 0 &&
              (weeks > 0 ||
                days > 0 ||
                hours > 0 ||
                minutes > 0 ||
                (seconds > 0 && mili > 0))
                ? `<span class="partition">:</span>`
                : ""
            }

            ${
              weeks > 0
                ? `<div class="index">
                <div class="number">${weeks < 10 ? "0" : ""}${weeks}</div>
                <div class="time">${weeksWord}</div>
              </div>`
                : ""
            }

            ${
              weeks > 0 &&
              (days > 0 ||
                hours > 0 ||
                minutes > 0 ||
                (seconds > 0 && mili > 0))
                ? `<span class="partition">:</span>`
                : ""
            }

            ${
              days > 0
                ? `<div class="index">
                <div class="number">${days < 10 ? "0" : ""}${days}</div>
                <div class="time">${daysWord}</div>
              </div>`
                : ""
            }

            ${
              days > 0 &&
              (hours > 0 || minutes > 0 || (seconds > 0 && mili > 0))
                ? `<span class="partition">:</span>`
                : ""
            }

            ${
              hours > 0
                ? `<div class="index">
                <div class="number">${hours < 10 ? "0" : ""}${hours}</div>
                <div class="time">${hoursWord}</div>
              </div>`
                : ""
            }

            ${
              hours > 0 && (minutes > 0 || seconds > 0 || mili > 0)
                ? `<span class="partition">:</span>`
                : ""
            }

            ${
              minutes > 0
                ? `<div class="index">
                <div class="number">${minutes < 10 ? "0" : ""}${minutes}</div>
                <div class="time">${minutesWord}</div>
              </div>`
                : ""
            }

            ${
              minutes > 0 && (seconds > 0 || mili > 0)
                ? `<span class="partition">:</span>`
                : ""
            }

            ${
              seconds > 0
                ? `<div class="index">
                <div class="number">${seconds < 10 ? "0" : ""}${seconds}</div>
                <div class="time">${secondsWord}</div>
              </div>`
                : ""
            }

            ${seconds > 0 && mili > 0 ? `<span class="partition">:</span>` : ""}

            ${
              mili > 0
                ? `<div class="index">
                <div class="number">${mili < 100 ? "0" : ""}${
                    mili < 10 ? "0" : ""
                  }${mili}</div>
                <div class="time">${miliWord}</div>
              </div>`
                : ""
            }
          </div>
          <div class="calc-again">${words["calc-again"]}</div>
        </div>
        `);
        } else {
          $(".waiting").before(`
        <div class="result">
          <div class="title">${words["result"] + words["is"]}</div>
          <div class="container">
            <div class="zero">${words["result-zero"]}</div>
          </div>
    
          <div class="calc-again">${words["calc-again"]}</div>
        </div>
        `);
        }

        $(".waiting").fadeOut();
      });
    } else if (
      !$(".watch").length &&
      !$(".confirm, .attention").length
    ) {
      $(".calc").after(`
        <div class='attention'>
          <div class='title'>${words["nothing-attention-title"]}</div>
          <div class='body'>
            <div class='message'>${words["nothing-attention-message"]}</div>
            <div class='attention-button'>${words["sorry"]}</div>
          </div>
        </div>
      `);

      $(".attention").fadeIn();
    }
  });

  $("body").on("click", ".confirm .body .confirm-buttons .no", () => {
    $(".calc .buttons .active, .calc .options .active").removeClass("active");

    $(".confirm").fadeOut(200, () => {
      $(".confirm").remove();
    });
  });

  $("body").on("click", ".confirm .body .confirm-buttons .yes", () => {
    if ($(".calc .buttons .active, .calc .options .active").hasClass("reset")) {
      if (!$(".calc > .nothing").length) {
        $(".calc > .watch, .calc > .collection, .calc > .signs").remove();
        $(".calc").prepend(`<p class="nothing">${words["nothing"]}</p>`);
      }
      $(".calc .buttons .active").removeClass("active");
    } else {
      let parent = $(".calc .buttons .active, .calc .options .active")
          .parent()
          .parent(),
        grandfather = parent.parent(),
        siblingsNumber = grandfather.children(".watch, .collection").length - 1;

      if (siblingsNumber === 0) {
        parent.remove();
        grandfather.prepend(`<p class="nothing">${words["nothing"]}</p>`);
      } else if (!parent.prev().prev(".watch, .collection").length) {
        parent.next().remove();
        parent.remove();
      } else {
        parent.prev(".signs").remove();
        parent.remove();
      }
    }

    $(".confirm").fadeOut(200, () => {
      $(".confirm").remove();
    });
  });

  $("body").on("click", ".attention .body .attention-button", () => {
    $(".attention").fadeOut(200, () => {
      $(".attention").remove();
    });
  });

  $("body").on("mousedown", ".confirm .title, .attention .title", function (e) {
    let confirmBox = $(this).parent(),
      titleBoxX = e.pageX - confirmBox.position().left,
      titleBoxY = e.pageY - confirmBox.position().top;

    $(window).on("mousemove", function (e) {
      confirmBox.css("transform", "none");
      let inX = e.pageX - titleBoxX,
        inY = e.pageY - titleBoxY;

      if (inY < 0) {
        inY = 0;
      }

      if (inY > $(this).height() - confirmBox.height()) {
        inY = $(this).height() - confirmBox.height();
      }

      if (inX < 0) {
        inX = 0;
      }

      if (inX > $(this).width() - confirmBox.width()) {
        inX = $(this).width() - confirmBox.width();
      }

      confirmBox.css({
        top: inY + "px",
        left: inX + "px",
      });
    });
  });

  $("body").on("mouseup", ".confirm, .attention", function () {
    $(window).off("mousemove");
  });

  $("body").on("click", ".calc .signs .sign:not(.select)", function () {
    let sign = $(this).attr("class").split(" ").pop();

    $(this).siblings(".select").addClass(sign).removeClass("select");
    $(this).addClass("select").removeClass(sign);
  });

  $("body").on("click", ".result .calc-again", () => {
    window.scrollTo(0, 0);
    $(".calc > .watch, .calc > .collection, .calc > .signs").remove();
    $(".calc").prepend(`<p class="nothing">${words["nothing"]}</p>`);
    $("body").removeAttr("style");

    $(".result").fadeOut(400, () => {
      $(".result").remove();
    });
  });

  $("body").on("click", "footer .footer-box > *", function () {
    if ($(this).attr("class") !== lang) {
      lang = $(this).attr("class");
      localStorage.setItem("lang", lang);
      if (lang === "ar") {
        $(".waiting .message").text("يتم تحميل الموقع، انتظر رجاءً");
      } else {
        $(".waiting .message").text("Website loading, Wait please");
      }

      let translate =
        parseInt(
          $("header .navbar .calc-mobile-options .current .selected .option")
            .css("transform")
            .split(", ")[4]
        ) * -1;
      $("header .navbar .calc-mobile-options .current .selected .option").css(
        "transform",
        `translateX(${translate}px)`
      );

      $(".waiting").fadeIn();

      $.getJSON(`Lang/${lang}.json`, (r) => {
        words = r.words;

        $("body").attr("dir", r.direction);
        $("head title, header .title").text(words["watches-calculator"]);
        $("header .description").text(words["website-description"]);
        $("header .navbar .calc-by").text(words["calc-by"]);
        $("header .navbar .option[data-option='seconds']").text(
          words["seconds"]
        );
        $("header .navbar .option[data-option='minutes']").text(
          words["minutes"]
        );
        $("header .navbar .option[data-option='hours']").text(words["hours"]);
        $("header .navbar .option[data-option='days']").text(words["days"]);
        $("header .navbar .option[data-option='weeks']").text(words["weeks"]);
        $("header .navbar .option[data-option='months']").text(words["months"]);
        $("header .navbar .option[data-option='years']").text(words["years"]);
        $("header .navbar .option[data-option='decades']").text(
          words["decades"]
        );
        $("header .navbar .option[data-option='centuries']").text(
          words["centuries"]
        );
        $("header .navbar .option[data-option='millenniums']").text(
          words["millenniums"]
        );
        $(".calc .nothing").text(words["nothing"]);
        $(".calc .buttons .add-watch").text(words["add-watch"]);
        $(".calc .buttons .add-collection").text(words["add-brackets"]);
        $(".calc .buttons .reset").text(words["reset"]);
        $(".calc .buttons .calculating").text(words["calculating"]);
        $("footer .footer-box .ar").text(words["ar-lang"]);
        $("footer .footer-box .en").text(words["en-lang"]);
        $("footer .copyright").text(words["copyright"]);

        $(".waiting").fadeOut();
      });
    }
  });
});
