const adminPage = (username) => {
    let year =
        localStorage.getItem("RS_year") !== null
          ? localStorage.getItem("RS_year")
          : new Date().getUTCFullYear(),
      month =
        localStorage.getItem("RS_month") !== null
          ? localStorage.getItem("RS_month") - 1
          : new Date().getMonth(),
      monthTranslate = 106 * month,
      day =
        localStorage.getItem("RS_day") !== null
          ? localStorage.getItem("RS_day")
          : new Date().getDate(),
      hour =
        localStorage.getItem("RS_hour") !== null
          ? localStorage.getItem("RS_hour")
          : "0",
      minute =
        localStorage.getItem("RS_minute") !== null
          ? localStorage.getItem("RS_minute")
          : "0",
      lastDay = new Date(year, parseInt(month) + 1, 0).getDate(),
      untilShowTime =
        new Date(`${year}-${month + 1}-${day} ${hour}:${minute}`) -
        new Date().getTime(),
      untilSecond = Math.floor((untilShowTime % 60000) / 1000),
      untilMinute = Math.floor((untilShowTime % 3600000) / 60000),
      untilHour = Math.floor((untilShowTime % 86400000) / 3600000);
    untilDay = Math.floor(untilShowTime / 86400000);

    if (hour < 10 && hour.toString().length === 1) {
      hour = "0" + hour;
    }

    if (minute < 10 && minute.toString().length === 1) {
      minute = "0" + minute;
    }

    $(".loading-screen").before(`
            <div class="admin-page">
                <div class="header">
                <div class="logo">
                    <div class="icon logo-icon"></div>
                </div>
                <div class="welcome">
                    <span>مرحباً بك مجدداً، </span>
                    <span class="username">${username}</span>
                </div>
                <div class="logout">تسجيل الخروج</div>
                </div>
                <div class="container">
                    <div class="sidebar">
                        <div class="option clock">
                        <div class="icon clock-icon"></div>
                        </div>
                    </div>
                    <div class="option clock">
                        <div class="icon clock-icon"></div>
                    </div>
                    <div class="options">
                        <div class="option statistics" data-option="statistics">
                        <div class="icon statistics-icon"></div>
                        <div class="name">احصائيات</div>
                        </div>
                        <div class="option students" data-option="students">
                        <div class="icon student-icon"></div>
                        <div class="name">الطلاب</div>
                        </div>
                        <div class="option subjects" data-option="subjects">
                        <div class="icon subjects-icon"></div>
                        <div class="name">المقررات الدراسية</div>
                        </div>
                        <div class="option degrees" data-option="degrees">
                        <div class="icon bookmark-icon"></div>
                        <div class="name">الدرجات</div>
                        </div>
                    </div>
                </div>
                <div class="cover">
                    <div class="time-picker" dir="ltr">
                    <div class="title-bar">عرض النتائج بتاريخ...</div>
                    <div class="years">
                        <div class="arrow prev ${
                          year <= new Date().getUTCFullYear() ? "disabled" : ""
                        }">&langle;</div>
                        <div class="year-input">
                          <input type="number" class="year open" min="${year}" value="${year}">
                        </div>
                        <div class="arrow next">&rangle;</div>
                    </div>
                    <div class="months">
                        <div class="arrow prev ${
                          year <= new Date().getUTCFullYear() &&
                          month <= new Date().getMonth()
                            ? "disabled"
                            : ""
                        }">&langle;</div>
                        <div class="container">
                        <div class="month" data-month="1">يناير</div>
                        <div class="month" data-month="2">فبراير</div>
                        <div class="month" data-month="3">مارس</div>
                        <div class="month" data-month="4">أبريل</div>
                        <div class="month" data-month="5">مايو</div>
                        <div class="month" data-month="6">يونيو</div>
                        <div class="month" data-month="7">يوليو</div>
                        <div class="month" data-month="8">أغسطس</div>
                        <div class="month" data-month="9">سبتمبر</div>
                        <div class="month" data-month="10">أكتوبر</div>
                        <div class="month" data-month="11">نوفمبر</div>
                        <div class="month" data-month="12">ديسمبر</div>
                        </div>
                        <div class="arrow next">&rangle;</div>
                    </div>
                    <div class="days">
                        <div class="day">1</div>
                        <div class="day">2</div>
                        <div class="day">3</div>
                        <div class="day">4</div>
                        <div class="day">5</div>
                        <div class="day">6</div>
                        <div class="day">7</div>
                        <div class="day">8</div>
                        <div class="day">9</div>
                        <div class="day">10</div>
                        <div class="day">11</div>
                        <div class="day">12</div>
                        <div class="day">13</div>
                        <div class="day">14</div>
                        <div class="day">15</div>
                        <div class="day">16</div>
                        <div class="day">17</div>
                        <div class="day">18</div>
                        <div class="day">19</div>
                        <div class="day">20</div>
                        <div class="day">21</div>
                        <div class="day">22</div>
                        <div class="day">23</div>
                        <div class="day">24</div>
                        <div class="day">25</div>
                        <div class="day">26</div>
                        <div class="day">27</div>
                        <div class="day">28</div>
                        <div class="day">29</div>
                        <div class="day">30</div>
                        <div class="day">31</div>
                    </div>
                    <div class="hours">
                        <input type="number" class="hour" min="0" max="23" value="${hour}">
                        :
                        <input type="number" class="minute" min="0" max="59" value="${minute}">
                    </div>
                    <div class="until-open">
                        <div class="text">بقي حتى العرض:</div>
                        <div class="counter">${
                          untilDay > 0
                            ? untilDay < 10
                              ? "0" + untilDay
                              : untilDay
                            : "00"
                        }:${
      untilHour > 0 ? (untilHour < 10 ? "0" + untilHour : untilHour) : "00"
    }:${
      untilMinute > 0
        ? untilMinute < 10
          ? "0" + untilMinute
          : untilMinute
        : "00"
    }:${
      untilSecond > 0
        ? untilSecond < 10
          ? "0" + untilSecond
          : untilSecond
        : "00"
    }</div>
                    </div>
                    <div class="reset-time">إعادة ضبط</div>
                </div>
            </div>
        `);

    $(".admin-page .cover .time-picker .months .container .month").css(
      "transform",
      `translateX(-${monthTranslate}%)`
    );
    $(`.admin-page .cover .time-picker .days .day`)
      .filter((someday) => {
        return someday + 1 == day;
      })
      .addClass("selected");

    if (year <= new Date().getUTCFullYear() && month <= new Date().getMonth()) {
      $(`.admin-page .cover .time-picker .days .day`)
        .filter((someday) => {
          return someday + 1 < day;
        })
        .addClass("disabled");
    }

    $(`.admin-page .cover .time-picker .days .day`)
      .filter((someday) => {
        return someday + 1 > lastDay;
      })
      .remove();

    setStorageTime();
    updateTime();
  },
  studentPage = async (ssn) => {
    let years = (localStorage.getItem("RS_year") !== null) ? localStorage.getItem("RS_year") : 0,
      months = (localStorage.getItem("RS_month") !== null) ? localStorage.getItem("RS_month") : 0,
      days = (localStorage.getItem("RS_day") !== null) ? localStorage.getItem("RS_day") : 0,
      hours = (localStorage.getItem("RS_hour") !== null) ? localStorage.getItem("RS_hour") : 0,
      minutes = (localStorage.getItem("RS_minute") !== null) ? localStorage.getItem("RS_minute") : 0,
      theTime = new Date(`${years}-${months}-${days} ${hours}:${minutes}`).getTime() - new Date(),
      template = ``,
      name = "",
      haveDegrees = 0;

    ssn = +ssn;

    for await (let student of students) {
      if (student.ssn === ssn) {
        name = student.name;
      }
    }

    for await (let degree of degrees) {
      if (degree.ssn === ssn) {
        haveDegrees = degree.degrees;
        break;
      }
    }

    if (theTime > 0) {
      let daysLeft = Math.floor(theTime / 86400000),
        hoursLeft = Math.floor((theTime % 86400000) / 3600000),
        minutesLeft = Math.floor((theTime % 3600000) / 60000),
        secondsLeft = Math.floor((theTime % 60000) / 1000);

      template = `
        <div class="until-open">
          <div class="time">${(daysLeft < 10 ? "0" : "") + daysLeft}</div>
          <span>:</span>
          <div class="time">${(hoursLeft < 10 ? "0" : "") + hoursLeft}</div>
          <span>:</span>
          <div class="time">${(minutesLeft < 10 ? "0" : "") + minutesLeft}</div>
          <span>:</span>
          <div class="time">${(secondsLeft < 10 ? "0" : "") + secondsLeft}</div>
        </div>
      `;
    } else if (!haveDegrees) {
      template = `
        <div class="no-degrees">
          <div class="nothing">لم يتم وضع درجاتك بعد، عد لاحقاً من فضلك.</div>
        </div>
      `;
    } else {

      /* for await (let d of haveDegrees) {
        for await (let subject of subjects) {
          if (d[0] === subject.id) {
            d[0] = subject.name;
            break;
          }
        }
      } */

      template = `
      <div class="to-back">
        <span></span>
        <div class="page-title">الطالب: ${name}</div>
      </div>

      <div class="degrees-table">
        <div class="table-head">الدرجات</div>
        <div class="degrees">
          <div class="details">
            <div class="column title">المادة</div>
            <div class="column title">الدرجة</div>`
            
            for await (let degree of haveDegrees) {
              for await (let subject of subjects) {
                if (degree[0] === subject.id) {
                  template += `
                  <div class="column">${subject.name}</div>
                  <div class="column">${degree[1]}%</div>
                  `;
                  break;
                }
              }
            }

      template += `</div>
          <div class="final">
            <div class="column title">الدرجة الكلية</div>
            <div class="column title">82%</div>
          </div>
        </div>
        <div class="print-button">
          <div class="icon print-icon"></div>
        </div>
      `;
    }

    $(".loading-screen").before(`
      <div class="student-page">
        <div class="header">
          <div class="logo">
            <div class="icon logo-icon"></div>
          </div>
          <div class="welcome">
            <span>مرحباً بك، </span>
            <span class="username">${name.split(" ")[0]}</span>
          </div>
          <div class="logout">تسجيل الخروج</div>
        </div>
        <div class="container">
          ${template}
        </div>
      </div>
    `);
  }
  updateTime = () => {
    if (
      $(".admin-page .cover .time-picker .until-open > .counter").text() ===
      "00:00:00:00"
      ||
      $(".student-page .container .until-open .time").text() === "00000000"
      ||
      ($(".admin-page .cover .time-picker").length === 0 && $(".student-page .container .until-open .time").length === 0)
    ) {
      clearInterval(timeDecrement);

      if ($(".student-page .container .until-open .time").length > 0) {
        $(".loading-screen").fadeIn(400, () => {
          $(".student-page").remove();
          studentPage(sessionStorage.getItem("RS_username"));
          setTimeout(() => {
            $(".loading-screen").fadeOut();
          }, 0);
        });
        $(".loading-screen").css("display", "flex");
      }
    }

    if (sessionStorage.getItem("RS_role") === "admin") {
      let result = "",
        time = $(".admin-page .cover .time-picker .until-open > .counter")
          .text()
          .split(":");

      if (parseInt(time[3]) > 0) {
        result = `${time[0]}:${time[1]}:${time[2]}:${
          time[3] - 1 < 10 ? "0" + (time[3] - 1) : +time[3] - 1
        }`;
      } else if (parseInt(time[2]) > 0) {
        result = `${time[0]}:${time[1]}:${
          time[2] - 1 < 10 ? "0" + (time[2] - 1) : time[2] - 1
        }:59`;
      } else if (parseInt(time[1]) > 0) {
        result = `${time[0]}:${
          time[1] - 1 < 10 ? "0" + (time[1] - 1) : time[1] - 1
        }:59:59`;
      } else if (parseInt(time[0]) > 0) {
        result = `${
          time[0] - 1 < 10 ? "0" + (time[0] - 1) : time[0] - 1
        }:23:59:59`;
      } else {
        result = "00:00:00:00";
      }

      $(".admin-page .cover .time-picker .until-open > .counter").text(result);
    } else {
      let days =  +$(".student-page .container .until-open .time").eq(0).text(),
        hours =  +$(".student-page .container .until-open .time").eq(1).text(),
        minutes =  +$(".student-page .container .until-open .time").eq(2).text(),
        seconds = +$(".student-page .container .until-open .time").eq(3).text();

      if (seconds > 0) {
        seconds -= 1;
      } else if (minutes > 0) {
        minutes -= 1;
        seconds = 59;
      } else if (hours > 0) {
        hours -= 1;
        minutes = 59;
        seconds = 59;
      } else if (days > 0) {
        days -= 1;
        hours = 23;
        minutes = 59;
        seconds = 59;
      }
      
      $(".student-page .container .until-open .time").eq(0).text((days < 10 ? "0" : "") + days);
      $(".student-page .container .until-open .time").eq(1).text((hours < 10 ? "0" : "") + hours);
      $(".student-page .container .until-open .time").eq(2).text((minutes < 10 ? "0" : "") + minutes);
      $(".student-page .container .until-open .time").eq(3).text((seconds < 10 ? "0" : "") + seconds);
    }
  },
  refreshShowTime = () => {
    clearInterval(timeDecrement);
    let showtime = new Date(
        `${localStorage.getItem("RS_year")}-${localStorage.getItem(
          "RS_month"
        )}-${localStorage.getItem("RS_day")} ${localStorage.getItem(
          "RS_hour"
        )}:${localStorage.getItem("RS_minute")}`
      ).getTime(),
      diff =
        showtime - new Date().getTime() > 0
          ? showtime - new Date().getTime()
          : 0,
      days = Math.floor(diff / 86400000),
      hours = Math.floor((diff % 86400000) / 3600000),
      minutes = Math.floor((diff % 3600000) / 60000),
      seconds = Math.floor((diff % 60000) / 1000),
      time = `${(days < 10 ? "0" : "") + days}:${
        (hours < 10 ? "0" : "") + hours
      }:${(minutes < 10 ? "0" : "") + minutes}:${
        (seconds < 10 ? "0" : "") + seconds
      }`;

    $(".admin-page .cover .time-picker .until-open .counter").text(time);

    timeDecrement = setInterval(updateTime, 1000);
  },
  setStorageTime = () => {
    if (localStorage.getItem("RS_year") === null) {
      localStorage.setItem(
        "RS_year",
        $(".admin-page .cover .time-picker .years .year").val()
      );
    }

    if (localStorage.getItem("RS_month") === null) {
      let row = $(".admin-page .cover .time-picker .months .container .month")
          .css("transform")
          .split(", ")[4],
        month = Math.ceil(
          Math.abs(
            row /
              $(
                ".admin-page .cover .time-picker .months .container .month"
              ).width()
          )
        );

      localStorage.setItem("RS_month", month);
    }

    if (localStorage.getItem("RS_day") === null) {
      localStorage.setItem(
        "RS_day",
        $(".admin-page .cover .time-picker .days .day.selected").text()
      );
    }

    if (localStorage.getItem("RS_hour") === null) {
      localStorage.setItem(
        "RS_hour",
        $(".admin-page .cover .time-picker .hours .hour").val()
      );
    }

    if (localStorage.getItem("RS_minute") === null) {
      localStorage.setItem(
        "RS_minute",
        $(".admin-page .cover .time-picker .hours .minute").val()
      );
    }
  },
  createPagination = (itemsNumber = 0, current = 1, limit = 25, selector = false) => {
    let template = ``,
      page = Math.ceil(itemsNumber / limit),
      paginationContent = ``;
      
    selector = (selector) ? selector : ".students-page .container .students-table";

    current = (current > page) ? page : current;


    paginationContent = `
      <div class="prev${current === 1 ? " disabled" : ""}">&langle;</div>
      <div class="pages">
        <div class="current">${current}</div>
        <span>/</span>
        <div class="pages-number">${page}</div>
      </div>
      <div class="next${current === page ? " disabled" : ""}">&rangle;</div>
    `;

    if ($(`${selector} .pagination, ${selector} .footer-table`).length) {
      if (page > 1) {
        $(`${selector} .footer-table`).addClass("pagination").removeClass("footer-table");
        $(`${selector} .wait-table`).before()
        $(`${selector} .pagination`).html(paginationContent);
      } else {
        $(`${selector} .pagination`).html("");
        $(`${selector} .pagination`).addClass("footer-table").removeClass("pagination");
      }

      return 1;
    } else {
      if (page > 1) {
        template = `
          <div class="pagination">
            ${paginationContent}
          </div>
        `;
      } else {
        template = `<div class="footer-table"></div>`;
      }

      return template;
    }
  },
  createStudentsTable = async (type = "الكل", page = 1, openLastColumn = false) => {
    let template = ``,
      i = 0,
      start,
      end;

    if (page > Math.ceil(students.length / studentsLimit)) {
      if (type === "الكل") {
        page = Math.ceil(students.length / studentsLimit);
      } else {
        let j = 0;
        for await (let student of students) {
          if (student.state === type) {
            j++;
          }
        }

        page = Math.ceil(j / studentsLimit);
      }
    }

    start = (page - 1) * studentsLimit;
    end = page * studentsLimit;

      if (type === "الكل") {
        for await (let student of students) {
          if (i >= start) {
            template += `
            <div class="student">
            <div class="info-name">
              <div class="open-arrow">&langle;</div>
              <div class="title">
                <div class="name">${student.name}</div>
                <div class="options">
                  <div class="edit"><div class="icon edit-icon"></div></div>
                  <div class="delete">&minus;</div>
                </div>
              </div>
            </div>
            <div class="info">
              <div class="name">الرقم الوطني</div>
              <div class="value">${student.ssn}</div>
              <div class="name">العمر</div>
              <div class="value">${student.age}</div>
              <div class="name">الجنس</div>
              <div class="value">${student.gender}</div>
              <div class="name">المدرسة</div>
              <div class="value">${student.school}</div>
              <div class="name">الولاية</div>
              <div class="value">${student.state}</div>
              <div class="name">رقم الجلوس</div>
              <div class="value">${student["sitting-number"]}</div>
              <div class="name">التخصص</div>
              <div class="value">${student.major}</div>
            </div>
          </div>
          `;
          }

          i++;

          if (i === end) {
            break;
          }
        }
      } else {
        for await (let student of students) {
          if (student.state === type) {
            if (i >= start) {
              template += `
              <div class="student">
              <div class="info-name">
                <div class="open-arrow">&langle;</div>
                <div class="title">
                  <div class="name">${student.name}</div>
                  <div class="options">
                    <div class="edit"><div class="icon edit-icon"></div></div>
                    <div class="delete">&minus;</div>
                  </div>
                </div>
              </div>
              <div class="info">
                <div class="name">الرقم الوطني</div>
                <div class="value">${student.ssn}</div>
                <div class="name">العمر</div>
                <div class="value">${student.age}</div>
                <div class="name">الجنس</div>
                <div class="value">${student.gender}</div>
                <div class="name">المدرسة</div>
                <div class="value">${student.school}</div>
                <div class="name">الولاية</div>
                <div class="value">${student.state}</div>
                <div class="name">رقم الجلوس</div>
                <div class="value">${student["sitting-number"]}</div>
                <div class="name">التخصص</div>
                <div class="value">${student.major}</div>
              </div>
            </div>
            `;
            }

          i++;
          }

          if (i === end) {
            break;
          }
        }
      }

      let slice1 = `div class="student`,
        slice2 = `div class="info"`;

      template = (template === ``) ? `
      <div class="nothing">
        <div class="message">لا يوجد أي طلاب مسجلين حتى الآن</div>
      </div>
      ` : template
        /* (openLastColumn) ? 
        template.slice(0, template.lastIndexOf(slice1) + slice1.length) + " open" + template.slice(template.lastIndexOf(slice1) + (slice1.length), template.lastIndexOf(slice2) + slice2.length) + ` style='display: grid;'` + template.slice(template.lastIndexOf(slice2) + slice2.length) : 
        template.slice(0, template.indexOf(slice1) + slice1.length) + " open" + template.slice(template.indexOf(slice1) + (slice1.length), template.indexOf(slice2) + slice2.length) + ` style='display: grid;'` + template.slice(template.indexOf(slice2) + slice2.length) */
      ;

    return template;
  },
  createSubjectsTable = async () => {
    let template = ``;

    for await (let subject of subjects) {
      template += `
      <div class="column">
        <div class="subject" data-id="${subject.id}">${subject.name}</div>
        <div class="major">
          <div class="name">${subject.major}</div>
          <div class="options">
            <div class="edit"><div class="icon edit-icon"></div></div>
            <div class="delete">&minus;</div>
          </div>
        </div>
      </div>
      `
    }

    return template;
  },
  createDetailsDegreesTable = async (type = "الكل", page = 1, openLastColumn = false) => {
    let template = ``,
      i = 0,
      start,
      end,
      degreesInfo = [];

    if (page > Math.ceil(degrees.length / detailsDegreesLimit)) {
      if (type === "الكل") {
        page = Math.ceil(degrees.length / detailsDegreesLimit);
      } else {
        let j = 0;
        for await (let student of students) {
          if (student.state === type) {
            j++;
          }
        }

        page = Math.ceil(j / detailsDegreesLimit);
      }
    }

    start = (page - 1) * detailsDegreesLimit;
    end = page * detailsDegreesLimit;

    for await (let degree of degrees) {
      let name = "",
        state = "",
        ssn = 0,
        details = [];

      for (let i = 0; i < students.length; i++) {
        if (students[i].ssn === degree.ssn) {
          ssn = students[i].ssn;
          name = students[i].name;
          state = students[i].state;
          break;
        }
      }

      for await (let d2 of degree.degrees) {
        for (let i = 0; i < subjects.length; i++) {
          if (subjects[i].id === d2[0]) {
            details.push([subjects[i].name, d2[1]]);
            break;
          }
        }
      }

      degreesInfo.push({
        ssn,
        name,
        state,
        degrees: details
      });
    }

    degreesInfo.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }
    });

    if (type === "الكل") {
      for await (let degree of degreesInfo) {
        if (i >= start) {
          template += `
          <div class="student" data-ssn="${degree.ssn}">
            <div class="info-name">
              <div class="open-arrow">&langle;</div>
              <div class="title">
                <div class="name">${degree.name}</div>
                <div class="options">
                  <div class="edit"><div class="icon edit-icon"></div></div>
                  <div class="delete">&minus;</div>
                </div>
              </div>
            </div>
            <div class="info">`;
             
              for await (let d2 of degree.degrees) {
                template += `
                  <div class="name">${d2[0]}</div>
                  <div class="value">${d2[1]}%</div>
                `;
              }

          template += `</div>
            </div>
          `;
        }

        i++;

        if (i === end) {
          break;
        }
      }
    } else {
      for await (let degree of degreesInfo) {
        if (degree.state === type) {
          if (i >= start) {
            template += `
            <div class="student" data-ssn="${degree.ssn}">
              <div class="info-name">
                <div class="open-arrow">&langle;</div>
                <div class="title">
                  <div class="name">${degree.name}</div>
                  <div class="options">
                    <div class="edit">&divide;</div>
                    <div class="delete">&minus;</div>
                  </div>
                </div>
              </div>
              <div class="info">`;
              
                for await (let d2 of degree.degrees) {
                  template += `
                    <div class="name">${d2[0]}</div>
                    <div class="value">${d2[1]}%</div>
                  `;
                }

            template += `</div>
              </div>
            `;
          }

        i++;
        }

        if (i === end) {
          break;
        }
      }
    }

    let slice1 = `div class="student`,
      slice2 = `div class="info"`;

    template = (template === ``) ? `
    <div class="nothing">
      <div class="message">لا يوجد أي طلاب مسجلين حتى الآن</div>
    </div>
    ` : template
      /* (openLastColumn) ? 
      template.slice(0, template.lastIndexOf(slice1) + slice1.length) + " open" + template.slice(template.lastIndexOf(slice1) + (slice1.length), template.lastIndexOf(slice2) + slice2.length) + ` style='display: grid;'` + template.slice(template.lastIndexOf(slice2) + slice2.length) : 
      template.slice(0, template.indexOf(slice1) + slice1.length) + " open" + template.slice(template.indexOf(slice1) + (slice1.length), template.indexOf(slice2) + slice2.length) + ` style='display: grid;'` + template.slice(template.indexOf(slice2) + slice2.length) */
    ;

  return template;
  },
  createFinalDegreesTable = async (type = "الكل", page = 1) => {
    let template = ``,
      i = 0,
      start,
      end,
      degreesInfo = [];

    if (page > Math.ceil(degrees.length / finalDegreesLimit)) {
      if (type === "الكل") {
        page = Math.ceil(degrees.length / finalDegreesLimit);
      } else {
        let j = 0;
        for await (let student of students) {
          if (student.state === type) {
            j++;
          }
        }

        page = Math.ceil(j / finalDegreesLimit);
      }
    }

    start = (page - 1) * finalDegreesLimit;
    end = page * finalDegreesLimit;

    for await (let degree of degrees) {
      let name = "",
        state = "",
        finalDegree = 0,
        counter = 0;

      for (let i = 0; i < students.length; i++) {
        if (students[i].ssn === degree.ssn) {
          name = students[i].name;
          state = students[i].state;
          break;
        }
      }

      for await (let d2 of degree.degrees) {
        finalDegree += d2[1];
        counter++;
      }

      finalDegree = (finalDegree / counter).toFixed(2);

      degreesInfo.push({
        name,
        state,
        degree: finalDegree
      });
    }

    degreesInfo.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      if (a.name < b.name) {
        return -1;
      }
    });

    if (type === "الكل") {
      for await (let degree of degreesInfo) {
        if (i >= start) {
          template += `
            <div class="student">${degree.name}</div>
            <div class="degree">${degree.degree}%</div>
          `;
        }

        i++;

        if (i === end) {
          break;
        }
      }
    } else {
      for await (let degree of degreesInfo) {
        if (degree.state === type) {
          if (i >= start) {
            template += `
              <div class="student">${degree.name}</div>
              <div class="degree">${degree.degree}%</div>
            `;
          }

        i++;
        }

        if (i === end) {
          break;
        }
      }
    }

    template = (template === ``) ? `
    <div class="nothing">
      <div class="message">لا يوجد أي طلاب مسجلين حتى الآن</div>
    </div>
    ` : template;

  return template;
  },
  adminLogin = () => {
    let thisElement = $(".login-page .admin-login .container .send-btn");
    thisElement.addClass("waiting");
    thisElement.siblings(".error").hide();
    let username = thisElement.siblings(".username").val().trim(),
      password = thisElement.siblings(".password").val().trim();

    if (username === "") {
      thisElement
        .siblings(".error")
        .text("لا يمكنك ترك حقل المستخدم فارغاً")
        .show();
      thisElement.removeClass("waiting");
    } else if (password === "") {
      thisElement
        .siblings(".error")
        .text("لا يمكنك ترك حقل كلمة المرور فارغاً")
        .show();
      thisElement.removeClass("waiting");
    } else {
      $.getJSON("admin.json", (d) => {
        if (username === d.username && password === d.password) {
          $(".loading-screen").fadeIn(400, () => {
            adminPage(username);
            timeDecrement = setInterval(updateTime, 1000);

            $(".login-page").remove();

            setTimeout(() => {
              $(".loading-screen").fadeOut();
            }, 0);
          });

          sessionStorage.setItem("RS_username", username);
          sessionStorage.setItem("RS_role", "admin");

          $(".loading-screen").css("display", "flex");
        } else {
          thisElement
            .siblings(".error")
            .text("اسم المستخدم أو كلمة المرور غير صحيحة")
            .show();
          thisElement.removeClass("waiting");
        }
      });
    }
  },
  studentLogin = async () => {
    let thisElement = $(".login-page .student-login .container .send-btn");
    
    thisElement.addClass("waiting");
    thisElement.siblings(".error").hide();
    let username = +thisElement.siblings(".username").val().trim(),
      password = +thisElement.siblings(".password").val().trim();

    if (!username) {
      thisElement
        .siblings(".error")
        .text("لا يمكنك ترك حقل الرقم الوطني فارغاً")
        .show();
      thisElement.removeClass("waiting");
    } else if (!password) {
      thisElement
        .siblings(".error")
        .text("لا يمكنك ترك حقل رقم الجلوس فارغاً")
        .show();
      thisElement.removeClass("waiting");
    } else {
      let exists = 0;
      for await (let student of students) {
        if (username === student.ssn && password === student["sitting-number"]) {
          exists = 1;
          $(".loading-screen").fadeIn(400, async () => {
            await studentPage(username);
            timeDecrement = setInterval(updateTime, 1000);
            $(".login-page").remove();

            setTimeout(() => {
              $(".loading-screen").fadeOut();
            }, 0);
          });

          sessionStorage.setItem("RS_username", username);
          sessionStorage.setItem("RS_role", "student");

          $(".loading-screen").css("display", "flex");
          break;
        }
      }

      if (!exists) {
        thisElement
          .siblings(".error")
          .text("رقم الجلوس أو الرقم الوطني غير صحيح")
          .show();
        thisElement.removeClass("waiting");
      }
    }
  };

let timeDecrement,
  students = [],
  degrees = [],
  subjects = [],
  studentsLimit = 25,
  detailsDegreesLimit = 20,
  finalDegreesLimit = 25;

$(window).on("load", () => {
  $.getJSON("data.json", async (r) => {
    students = r.students;
    degrees = r.degrees;
    subjects = r.subjects;

    students.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }

      if(a.name < b.name) {
        return -1;
      }
    });

    if (sessionStorage.getItem("RS_username") === null) {
      $(".loading-screen").before(`
          <div class="login-page">
              <div class="choose-page">
                  <div class="header">
                  <div class="logo">
                      <div class="icon logo-icon"></div>
                  </div>
                  <div class="welcome">
                      <p>مرحباً بك في</p>
                      <div class="title">نظام النتائج</div>
                  </div>
                  </div>
                  <div class="container">
                  <div class="admin">
                      <div class="icon user-icon"></div>
                      <div class="name">مسؤول النظام</div>
                  </div>
                  <div class="student">
                      <div class="icon student-icon"></div>
                      <div class="name">طالب</div>
                  </div>
                  </div>
              </div>
          </div>
          `);
    } else {
      if (sessionStorage.getItem("RS_role") === "admin") {
        adminPage(sessionStorage.getItem("RS_username"));
        timeDecrement = setInterval(updateTime, 1000);
      } else {
        await studentPage(sessionStorage.getItem("RS_username"));
        timeDecrement = setInterval(updateTime, 1000);
      }
    }
  });
});

$(() => {
  $("body").on("click", ".start-page", () => {
    $(".start-page").animate(
      {
        top: "-100%",
      },
      200,
      function () {
        $(this).remove();
      }
    );
  });

  $("body").on("click", ".login-page .choose-page .container > div", function () {
    $(".loading-screen").fadeIn(400, async () => {
      let user = $(this).attr("class"),
        template = ``;

      if (user === "admin") {
        template = `
            <div class="admin-login">
                <div class="header">
                <div class="logo">
                    <div class="icon logo-icon"></div>
                </div>
                <div class="title">نظام النتائج</div>
                </div>
                <form class="container" onsubmit="return false">
                    <div class="icon">
                        <div class="icon user-icon"></div>
                    </div>
                    <div class="user">مسؤول النظام</div>
                    <input type="text" class="username" placeholder="اسم المستخدم" />
                    <input type="password" class="password" placeholder="كلمة المرور" />
                    <p class="error"> اسم المستخدم أو كلمة المرور غير صحيحة </p>
                    <div class="btn send-btn">
                        <p> تسجيل الدخول </p>
                        <div class="waiting">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                        </div>
                    </div>
                    <div class="btn back-btn">عودة</div>
                </form>
                <div class="login-data">
                  <div class="username">اسم المستخدم: admin</div>
                  <div class="password">كلمة المرور: 1234567890</div>
                </div>
            </div>
        `;
      } else {
        let ssn = degrees[Math.floor(Math.random() * degrees.length)].ssn,
          sn = 0;

        for await (let student of students) {
          if (student.ssn === ssn) {
            sn = student["sitting-number"];
            break;
          }
        }
        
        template = `
          <div class="student-login">
            <div class="header">
            <div class="logo">
                <div class="icon logo-icon"></div>
            </div>
            <div class="title">نظام النتائج</div>
            </div>
            <form class="container" onsubmit="return false">
              <div class="icon">
              <div class="icon student-icon"></div>
              </div>
              <div class="user">طالب</div>
              <input type="text" class="username" placeholder="الرقم الوطني" />
              <input type="text" class="password" placeholder="رقم الجلوس" />
              <p class="error"> رقم الجلوس أو الرقم الوطني غير صحيح </p>
              <div class="btn send-btn">
                  <p> تسجيل الدخول </p>
                  <div class="waiting">
                      <div class="dot"></div>
                      <div class="dot"></div>
                      <div class="dot"></div>
                  </div>
              </div>
              <div class="btn back-btn">عودة</div>
            </form>
            <div class="login-data">
              <div class="username">الرقم الوطني: ${ssn}</div>
              <div class="password">رقم الجلوس: ${sn}</div>
            </div>
          </div>
        `;
      }

      $(".login-page").html(template);

      setTimeout(() => {
        $(".loading-screen").fadeOut();
      }, 0);
    });
    $(".loading-screen").css("display", "flex");
  });

  $("body").on("click", ".login-page .container .back-btn", () => {
    $(".loading-screen").fadeIn(400, () => {
      $(".login-page").html(`
                <div class="choose-page">
                    <div class="header">
                    <div class="logo">
                        <div class="icon logo-icon"></div>
                    </div>
                    <div class="welcome">
                        <p>مرحباً بك في</p>
                        <div class="title">نظام النتائج</div>
                    </div>
                    </div>
                    <div class="container">
                    <div class="admin">
                        <div class="icon user-icon"></div>
                        <div class="name">مسؤول النظام</div>
                    </div>
                    <div class="student">
                        <div class="icon student-icon"></div>
                        <div class="name">طالب</div>
                    </div>
                    </div>
                </div>
            `);

      $(".loading-screen").fadeOut();
    });
    $(".loading-screen").css("display", "flex");
  });

  $("body").on(
    "click",
    ".login-page .admin-login .container .send-btn:not(.waiting)",
    adminLogin
  );

  $("body").on("keyup", ".login-page .admin-login .container", e => {
    if (e.key === "Enter") {
      adminLogin();
    }
  });

  $("body").on("click", ".login-page .student-login .container .send-btn:not(.waiting)", studentLogin);

  $("body").on("keyup", ".login-page .student-login .container", e => {
    if (e.key === "Enter") {
      studentLogin();
    }
  });

  $("body").on("click", ".header .logout", () => {
    $(".loading-screen").fadeIn(400, () => {
      $(".loading-screen").before(`
        <div class="login-page">
          <div class="choose-page">
              <div class="header">
              <div class="logo">
                  <div class="icon logo-icon"></div>
              </div>
              <div class="welcome">
                  <p>مرحباً بك في</p>
                  <div class="title">نظام النتائج</div>
              </div>
              </div>
              <div class="container">
              <div class="admin">
                  <div class="icon user-icon"></div>
                  <div class="name">مسؤول النظام</div>
              </div>
              <div class="student">
                  <div class="icon student-icon"></div>
                  <div class="name">طالب</div>
              </div>
              </div>
          </div>
        </div>
      `);
      $(".admin-page, .student-page").remove();
      sessionStorage.removeItem("RS_role");
      sessionStorage.removeItem("RS_username");

      setTimeout(() => {
        $(".loading-screen").fadeOut();
      }, 0);
    });
    $(".loading-screen").css("display", "flex");
  });

  $("body").on("click", ".admin-page .container .sidebar .option.clock, .admin-page .container>.option", () => {
    $(".admin-page .cover").fadeIn();
    $(".admin-page .cover").css("display", "flex");
  });

  $("body").on("click", ".admin-page .cover", (e) => {
    let startTop = $(".admin-page .cover .time-picker").position().top,
      endTop =
        $(".admin-page .cover .time-picker").height() +
        $(".admin-page .cover .time-picker").position().top,
      startLeft = $(".admin-page .cover .time-picker").position().left,
      endLeft =
        $(".admin-page .cover .time-picker").width() +
        $(".admin-page .cover .time-picker").position().left;

    if (
      e.pageX < startLeft ||
      e.pageX > endLeft ||
      e.pageY < startTop ||
      e.pageY > endTop
    ) {
      $(".admin-page .cover").fadeOut();
    }
  });

  $("body").on("keydown", "input[type='number']", function (ev) {
    if (ev.key.toUpperCase() === "E") {
      ev.preventDefault();
    }
  });

  $("body").on(
    "click",
    ".admin-page .cover .time-picker .years .arrow:not(.disabled)",
    function () {
      let currentYear = +$(
          ".admin-page .cover .time-picker .years .year-input .year"
        ).val(),
        row = $(".admin-page .cover .time-picker .months .container .month")
          .css("transform")
          .split(", ")[4],
        currentMonth = Math.ceil(
          Math.abs(
            row /
              $(
                ".admin-page .cover .time-picker .months .container .month"
              ).width()
          )
        );
      if ($(this).hasClass("prev")) {
        $(".admin-page .cover .time-picker .years .year-input").prepend(`
        <input type="number" class="year" style="width: 0; padding: 0" min="${new Date().getFullYear()}" value="${
          currentYear - 1
        }">
      `);

        $(
          ".admin-page .cover .time-picker .years .year-input .year:first-child"
        ).animate(
          {
            width: "100%",
            padding: "5px 10px",
          },
          50,
          () => {
            $(
              ".admin-page .cover .time-picker .years .year-input .year:last-child"
            ).remove();
          }
        );

        if (currentYear - 1 == new Date().getFullYear()) {
          $(".admin-page .cover .time-picker .years .arrow.prev").addClass(
            "disabled"
          );
        }
      } else {
        $(".admin-page .cover .time-picker .years .year-input").prepend(`
        <input type="number" class="year" style="width: 0; padding: 0" min="${new Date().getFullYear()}" value="${
          currentYear + 1
        }">
      `);

        $(
          ".admin-page .cover .time-picker .years .year-input .year:first-child"
        ).animate(
          {
            width: "100%",
            padding: "5px 10px",
          },
          50,
          () => {
            $(
              ".admin-page .cover .time-picker .years .year-input .year:last-child"
            ).remove();
          }
        );

        $(".admin-page .cover .time-picker .years .arrow.disabled").removeClass(
          "disabled"
        );
      }

      if (
        +$(".admin-page .cover .time-picker .years .year-input .year").val() ==
        new Date().getFullYear()
      ) {
        if (currentMonth <= new Date().getMonth() + 1) {
          let day = new Date().getDate();

          $(".admin-page .cover .time-picker .months .container .month").css(
            "transform",
            `translateX(-${new Date().getMonth() * 106}%)`
          );

          $(".admin-page .cover .time-picker .months .arrow.prev").addClass(
            "disabled"
          );

          $(`.admin-page .cover .time-picker .days .day`)
            .filter((someday) => {
              return someday + 1 < day;
            })
            .addClass("disabled");

          if (
            +$(".admin-page .cover .time-picker .days .day.selected").text() <
            new Date().getDate()
          ) {
            $(
              ".admin-page .cover .time-picker .days .day.selected"
            ).removeClass("selected");

            $(`.admin-page .cover .time-picker .days .day`)
              .filter((someday) => {
                return someday + 1 == day;
              })
              .addClass("selected");
          }
        } else {
          $(
            ".admin-page .cover .time-picker .months .arrow.disabled"
          ).removeClass("disabled");
          $(".admin-page .cover .time-picker .days .day.disabled").removeClass(
            "disabled"
          );
        }
      } else if (
        +$(".admin-page .cover .time-picker .years .year-input .year").val() >
        new Date().getFullYear()
      ) {
        $(
          ".admin-page .cover .time-picker .months .arrow.disabled"
        ).removeClass("disabled");
        $(".admin-page .cover .time-picker .days .day.disabled").removeClass(
          "disabled"
        );
      }

      row = $(".admin-page .cover .time-picker .months .container .month")
        .css("transform")
        .split(", ")[4];
      currentMonth = Math.ceil(
        Math.abs(
          row /
            $(
              ".admin-page .cover .time-picker .months .container .month"
            ).width()
        )
      );

      let lastDay = new Date(
          $(".admin-page .cover .time-picker .years .year-input .year").val(),
          currentMonth,
          0
        ).getDate(),
        currentLastDay = +$(
          ".admin-page .cover .time-picker .days .day:last-child"
        ).text();

      if (currentLastDay > lastDay) {
        $(`.admin-page .cover .time-picker .days .day`)
          .filter((someday) => {
            return someday + 1 > lastDay;
          })
          .remove();
      } else if (currentLastDay < lastDay) {
        for (let i = currentLastDay + 1; i <= lastDay; i++) {
          $(".admin-page .cover .time-picker .days").append(`
          <div class="day">${i}</div>
        `);
        }
      }

      if (
        $(".admin-page .cover .time-picker .days .day.selected").length === 0
      ) {
        $(".admin-page .cover .time-picker .days .day:last-child").addClass(
          "selected"
        );
      }

      setTimeout(() => {
        localStorage.setItem(
          "RS_year",
          $(".admin-page .cover .time-picker .years .year-input .year").val()
        );
        refreshShowTime();
      }, 0);
    }
  );

  $("body").on(
    "change",
    ".admin-page .cover .time-picker .years .year-input .year",
    function () {
      if ($(this).val() == new Date().getFullYear()) {
        $(".admin-page .cover .time-picker .years .arrow.prev").addClass(
          "disabled"
        );
      } else if ($(this).val() > new Date().getFullYear()) {
        $(".admin-page .cover .time-picker .years .arrow.disabled").removeClass(
          "disabled"
        );
      } else {
        $(".admin-page .cover .time-picker .years .arrow.prev").addClass(
          "disabled"
        );
        $(this).val(new Date().getFullYear());
      }

      let row = $(".admin-page .cover .time-picker .months .container .month")
          .css("transform")
          .split(", ")[4],
        currentMonth = Math.ceil(
          Math.abs(
            row /
              $(
                ".admin-page .cover .time-picker .months .container .month"
              ).width()
          )
        );

      if (
        +$(".admin-page .cover .time-picker .years .year-input .year").val() ==
        new Date().getFullYear()
      ) {
        if (currentMonth <= new Date().getMonth() + 1) {
          let day = new Date().getDate();

          $(".admin-page .cover .time-picker .months .container .month").css(
            "transform",
            `translateX(-${new Date().getMonth() * 106}%)`
          );

          $(".admin-page .cover .time-picker .months .arrow.prev").addClass(
            "disabled"
          );

          $(`.admin-page .cover .time-picker .days .day`)
            .filter((someday) => {
              return someday + 1 < day;
            })
            .addClass("disabled");

          if (
            +$(".admin-page .cover .time-picker .days .day.selected").text() <
            new Date().getDate()
          ) {
            $(
              ".admin-page .cover .time-picker .days .day.selected"
            ).removeClass("selected");

            $(`.admin-page .cover .time-picker .days .day`)
              .filter((someday) => {
                return someday + 1 == day;
              })
              .addClass("selected");
          }
        } else {
          $(
            ".admin-page .cover .time-picker .months .arrow.disabled"
          ).removeClass("disabled");
          $(".admin-page .cover .time-picker .days .day.disabled").removeClass(
            "disabled"
          );
        }
      } else if (
        +$(".admin-page .cover .time-picker .years .year-input .year").val() >
        new Date().getFullYear()
      ) {
        $(
          ".admin-page .cover .time-picker .months .arrow.disabled"
        ).removeClass("disabled");
        $(".admin-page .cover .time-picker .days .day.disabled").removeClass(
          "disabled"
        );
      }

      row = $(".admin-page .cover .time-picker .months .container .month")
        .css("transform")
        .split(", ")[4];
      currentMonth = Math.ceil(
        Math.abs(
          row /
            $(
              ".admin-page .cover .time-picker .months .container .month"
            ).width()
        )
      );

      let lastDay = new Date(
          $(".admin-page .cover .time-picker .years .year-input .year").val(),
          currentMonth,
          0
        ).getDate(),
        currentLastDay = +$(
          ".admin-page .cover .time-picker .days .day:last-child"
        ).text();

      if (currentLastDay > lastDay) {
        $(`.admin-page .cover .time-picker .days .day`)
          .filter((someday) => {
            return someday + 1 > lastDay;
          })
          .remove();
      } else if (currentLastDay < lastDay) {
        for (let i = currentLastDay + 1; i <= lastDay; i++) {
          $(".admin-page .cover .time-picker .days").append(`
          <div class="day">${i}</div>
        `);
        }
      }

      if (
        $(".admin-page .cover .time-picker .days .day.selected").length === 0
      ) {
        $(".admin-page .cover .time-picker .days .day:last-child").addClass(
          "selected"
        );
      }

      localStorage.setItem(
        "RS_year",
        $(".admin-page .cover .time-picker .years .year-input .year").val()
      );
      refreshShowTime();
    }
  );

  $("body").on(
    "click",
    ".admin-page .cover .time-picker .months .arrow:not(.disabled)",
    function () {
      let currentYear = +$(
          ".admin-page .cover .time-picker .years .year-input .year"
        ).val(),
        row = $(".admin-page .cover .time-picker .months .container .month")
          .css("transform")
          .split(", ")[4],
        currentMonth = Math.ceil(
          Math.abs(
            row /
              $(
                ".admin-page .cover .time-picker .months .container .month"
              ).width()
          )
        );

      if ($(this).hasClass("prev")) {
        if (currentMonth === 0) {
          currentMonth = 13;
        }

        if (currentMonth - 1 == 12) {
          $(".admin-page .cover .time-picker .months .container .month").css(
            "transform",
            `translateX(-${11 * 106}%)`
          );

          $(".admin-page .cover .time-picker .years .year-input .year").val(
            currentYear - 1
          );

          if (currentYear - 1 == new Date().getFullYear()) {
            $(".admin-page .cover .time-picker .years .arrow.prev").addClass(
              "disabled"
            );
          }
        } else {
          $(".admin-page .cover .time-picker .months .container .month").css(
            "transform",
            `translateX(-${(currentMonth - 2) * 106}%)`
          );
        }

        if (
          currentYear == new Date().getFullYear() &&
          currentMonth - 1 == new Date().getMonth() + 1
        ) {
          let day = new Date().getDate();

          $(".admin-page .cover .time-picker .months .arrow.prev").addClass(
            "disabled"
          );

          if (
            +$(".admin-page .cover .time-picker .days .day.selected").text() <
            new Date().getDate()
          ) {
            $(
              ".admin-page .cover .time-picker .days .day.selected"
            ).removeClass("selected");

            $(`.admin-page .cover .time-picker .days .day`)
              .filter((someday) => {
                return someday + 1 == day;
              })
              .addClass("selected");
          }

          $(`.admin-page .cover .time-picker .days .day`)
            .filter((someday) => {
              return someday + 1 < day;
            })
            .addClass("disabled");
        }
      } else {
        if (currentMonth === 0) {
          currentMonth = 1;
        }

        if (currentMonth == 12) {
          $(".admin-page .cover .time-picker .years .year-input .year").val(
            currentYear + 1
          );

          $(
            ".admin-page .cover .time-picker .years .arrow.disabled"
          ).removeClass("disabled");

          $(".admin-page .cover .time-picker .months .container .month").css(
            "transform",
            `translateX(0)`
          );
        } else {
          $(".admin-page .cover .time-picker .months .container .month").css(
            "transform",
            `translateX(-${currentMonth * 106}%)`
          );
        }

        $(
          ".admin-page .cover .time-picker .months .arrow.disabled"
        ).removeClass("disabled");
        $(`.admin-page .cover .time-picker .days .day.disabled`).removeClass(
          "disabled"
        );
      }

      row = $(".admin-page .cover .time-picker .months .container .month")
        .css("transform")
        .split(", ")[4];
      currentMonth = Math.ceil(
        Math.abs(
          row /
            $(
              ".admin-page .cover .time-picker .months .container .month"
            ).width()
        )
      );

      let lastDay = new Date(
          $(".admin-page .cover .time-picker .years .year-input .year").val(),
          currentMonth,
          0
        ).getDate(),
        currentLastDay = +$(
          ".admin-page .cover .time-picker .days .day:last-child"
        ).text();

      if (currentLastDay > lastDay) {
        $(`.admin-page .cover .time-picker .days .day`)
          .filter((someday) => {
            return someday + 1 > lastDay;
          })
          .remove();
      } else if (currentLastDay < lastDay) {
        for (let i = currentLastDay + 1; i <= lastDay; i++) {
          $(".admin-page .cover .time-picker .days").append(`
          <div class="day">${i}</div>
        `);
        }
      }

      if (
        $(".admin-page .cover .time-picker .days .day.selected").length === 0
      ) {
        $(".admin-page .cover .time-picker .days .day:last-child").addClass(
          "selected"
        );
      }

      setTimeout(() => {
        localStorage.setItem(
          "RS_year",
          $(".admin-page .cover .time-picker .years .year-input .year").val()
        );
        localStorage.setItem("RS_month", currentMonth === 0 ? 1 : currentMonth);
        refreshShowTime();
      }, 0);
    }
  );

  $("body").on(
    "click",
    ".admin-page .cover .time-picker .days .day:not(.disabled):not(.selected)",
    function () {
      $(this).addClass("selected").siblings().removeClass("selected");

      localStorage.setItem(
        "RS_day",
        $(".admin-page .cover .time-picker .days .day.selected").text()
      );
      refreshShowTime();
    }
  );

  $("body").on(
    "change",
    ".admin-page .cover .time-picker .hours input[type=number]",
    function () {
      let time = $(this).val();

      if ($(this).hasClass("hour")) {
        localStorage.setItem("RS_hour", time);
      } else {
        localStorage.setItem("RS_minute", time);
      }
      refreshShowTime();
    }
  );

  $("body").on("click", ".admin-page .cover .time-picker .reset-time", () => {
    let today = new Date();
    localStorage.setItem("RS_year", today.getFullYear());
    localStorage.setItem("RS_month", today.getMonth() + 1);
    localStorage.setItem("RS_day", today.getDate());
    localStorage.setItem("RS_hour", "00");
    localStorage.setItem("RS_minute", "00");

    $(".admin-page .cover .time-picker .years .year-input .year").val(
      today.getFullYear()
    );
    $(".admin-page .cover .time-picker .years .arrow.prev").addClass(
      "disabled"
    );
    $(".admin-page .cover .time-picker .months .container .month").css(
      "transform",
      `translateX(-${today.getMonth() * 106}%)`
    );
    $(".admin-page .cover .time-picker .months .arrow.prev").addClass(
      "disabled"
    );

    $(`.admin-page .cover .time-picker .days .day`)
      .filter((someday) => {
        return someday + 1 === today.getDate();
      })
      .addClass("selected")
      .siblings()
      .removeClass("selected");

    $(`.admin-page .cover .time-picker .days .day`)
      .filter((someday) => {
        return someday + 1 < today.getDate();
      })
      .addClass("disabled");

    $(".admin-page .cover .time-picker .hours .hour").val("00");
    $(".admin-page .cover .time-picker .hours .minute").val("00");

    refreshShowTime();
  });

  $("body").on("click", ".admin-page .container .options .option", function () {
    $(".loading-screen").fadeIn(400, async () => {
      let option = $(this).attr("data-option"),
        template = ``;

      switch (option) {
        case "statistics": {
          if (students.length && subjects.length && degrees.length) {
            let midDegrees = [],
            allCounter = 0,
            maleCounter = 0,
            midDegree = 0,
            femaleCounter = 0,
            midDegreeMale = 0,
            midDegreesMale = [],
            midDegreeFemale = 0,
            midDegreesFemale = [],
            maleSSNs = [],
            femaleSSNs = [];

          for await (let student of students) {
            if (student.gender === "ذكر") {
              maleSSNs.push(student.ssn);
            } else {
              femaleSSNs.push(student.ssn);
            }
          }

          for await (let subject of subjects) {
            let degree = 0,
              maleDegree = 0,
              femaleDegree = 0;

            allCounter = 0;
            maleCounter = 0;
            femaleCounter = 0;

            for await (let d of degrees) {
              for await (let d2 of d.degrees) {
                if (d2[0] === subject.id) {
                  degree += d2[1];
                  allCounter++;

                  if (maleSSNs.indexOf(d.ssn) > -1) {
                    maleDegree += d2[1];
                    maleCounter++;
                  }
    
                  if (femaleSSNs.indexOf(d.ssn) > -1) {
                    femaleDegree += d2[1];
                    femaleCounter++;
                  }
                }
              }
            }

            midDegrees.push({subject: subject.name, mid: (degree / allCounter).toFixed(2)});
            midDegreesMale.push({subject: subject.name, mid: (maleDegree / maleCounter).toFixed(2)});
            midDegreesFemale.push({subject: subject.name, mid: (femaleDegree / femaleCounter).toFixed(2)});
          }

          let i = 0;

          for await (let d of midDegrees) {
            midDegree += +midDegrees[i].mid;
            midDegreeMale += +midDegreesMale[i].mid;
            midDegreeFemale += +midDegreesFemale[i].mid;
            i++;
          }

          midDegree = (midDegree / midDegrees.length).toFixed(2);
          midDegreeMale = (midDegreeMale / midDegreesMale.length).toFixed(2);
          midDegreeFemale = (midDegreeFemale / midDegreesFemale.length).toFixed(2);

          template = `
          <div class="statistics-page">
            <div class="header">
              <div class="logo">
                <div class="icon logo-icon"></div>
              </div>
              <div class="title">نظام النتائج</div>
            </div>
            <div class="container">
              <div class="to-back">
                <div class="back-arrow">&langle;</div>
                <div class="page-title">الإحصائيات</div>
              </div>
              <div class="subjects-statistics">
                <div class="title">نسبة النجاح بالنسبة للمواد</div>
                <div class="statistics-table">
                    <div class="table-head">المواد</div>
                    <div class="table-head">الإحصائيات</div>
                    <div class="table-head">النسبة المئوية</div>
                    <div class="states">
                      <div class="selected">
                        <div class="open-arrow">&langle;</div>
                        <div class="name">الكل</div>
                      </div>
                      <div class="list">
                        <div class="option" data-option="الكل">الكل</div>
                        <div class="option" data-option="الخرطوم">الخرطوم</div>
                        <div class="option" data-option="الجزيرة">الجزيرة</div>
                        <div class="option" data-option="القضارف">القضارف</div>
                        <div class="option" data-option="كسلا">كسلا</div>
                        <div class="option" data-option="سنار">سنار</div>
                        <div class="option" data-option="البحر الأحمر">البحر الأحمر</div>
                        <div class="option" data-option="نهر النيل">نهر النيل</div>
                        <div class="option" data-option="النيل الأزرق">النيل الأزرق</div>
                        <div class="option" data-option="النيل الأبيض">النيل الأبيض</div>
                        <div class="option" data-option="الشمالية">الشمالية</div>
                        <div class="option" data-option="شمال دارفور">شمال دارفور</div>
                        <div class="option" data-option="جنوب دارفور">جنوب دارفور</div>
                        <div class="option" data-option="وسط دارفور">وسط دارفور</div>
                        <div class="option" data-option="غرب دارفور">غرب دارفور</div>
                        <div class="option" data-option="شرق دارفور">شرق دارفور</div>
                        <div class="option" data-option="شمال كردفان">شمال كردفان</div>
                        <div class="option" data-option="جنوب كردفان">جنوب كردفان</div>
                        <div class="option" data-option="غرب كردفان">غرب كردفان</div>
                      </div>
                    </div>`;
                    
          i = 0;

          for await (let d of midDegrees) {
            template += `
            <div class="subject">${d.subject}</div>
            <div class="statistic">
              <div class="male origin" style="width: ${midDegreesMale[i].mid}%"></div>
              <div class="female origin" style="width: ${midDegreesFemale[i].mid}%"></div>
              <div class="all origin active" style="width: ${midDegrees[i].mid}%"></div>
            </div>
            <div class="percentage">${midDegrees[i].mid}%</div>
            `;

            i++;
          }
                
          template += `</div>

                <div class="key-statistics">
                  <div class="key">
                    <span>الذكور:</span><span class="square"></span>
                  </div>
                  <div class="key">
                    <span>الإناث:</span><span class="square" style="--background: #EC407A;"></span>
                  </div>
                  <div class="key">
                    <span>الكل:</span><span class="square" style="--background: #66BB6A;"></span>
                  </div>
                </div>
              </div>

              <div class="gender-statistics">
                <div class="title">نسبة النجاح بالنسبة للطلاب</div>
                <div class="statistics">
                  <div class="statistic-box">
                    <div class="gender">ذكور</div>
                    <div class="percentage">
                      <div class="circle" style="--gradient-color: #29B6F6;"></div>
                      <div class="small-circle">${midDegreeMale}%</div>
                      <div class="cover-one" style="--degree: ${(+midDegreeMale / 100) * 360}deg"></div>
                      <div class="cover-two"></div>
                    </div>
                  </div>

                  <div class="statistic-box">
                    <div class="gender">إناث</div>
                    <div class="percentage">
                      <div class="circle" style="--gradient-color: #EC407A;"></div>
                      <div class="small-circle">${midDegreeFemale}%</div>
                      <div class="cover-one" style="--degree: ${(+midDegreeFemale / 100) * 360}deg"></div>
                      <div class="cover-two"></div>
                    </div>
                  </div>

                  <div class="statistic-box">
                    <div class="gender">الكل</div>
                    <div class="percentage">
                      <div class="circle" style="--gradient-color: #66BB6A;"></div>
                      <div class="small-circle">${midDegree}%</div>
                      <div class="cover-one" style="--degree: ${(+midDegree / 100) * 360}deg"></div>
                      <div class="cover-two"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
          } else {
            template = `
            <div class="statistics-page">
              <div class="header">
                <div class="logo">
                  <div class="icon logo-icon"></div>
                </div>
                <div class="title">نظام النتائج</div>
              </div>
              <div class="container">
                <div class="to-back">
                  <div class="back-arrow">&langle;</div>
                  <div class="page-title">الإحصائيات</div>
                </div>
                <div class="nothing">
                  لا يمكن بناء الإحصائيات لعدم توفر المعلومات الكافية، تأكد من توفر بيانات الطلاب والمواد ودرجات الطلاب.
                </div>
              </div>
            </div>
            `;
          }
        break;}

        case "students": {
          template = `
          <div class="students-page">
            <div class="header">
              <div class="logo">
                <div class="icon logo-icon"></div>
              </div>
              <div class="title">نظام النتائج</div>
            </div>
            <div class="container">
              <div class="to-back">
                <div class="back-arrow">&langle;</div>
                <div class="page-title">الطلاب</div>
              </div>
              <div class="students-table">
                <div class="table-head">جدول الطلاب</div>
                <div class="states">
                  <div class="selected">
                    <div class="open-arrow">&langle;</div>
                    <div class="name">الكل</div>
                  </div>
                  <div class="list">
                    <div class="option" data-option="الكل">الكل</div>
                    <div class="option" data-option="الخرطوم">الخرطوم</div>
                    <div class="option" data-option="الجزيرة">الجزيرة</div>
                    <div class="option" data-option="القضارف">القضارف</div>
                    <div class="option" data-option="كسلا">كسلا</div>
                    <div class="option" data-option="سنار">سنار</div>
                    <div class="option" data-option="البحر الأحمر">البحر الأحمر</div>
                    <div class="option" data-option="نهر النيل">نهر النيل</div>
                    <div class="option" data-option="النيل الأزرق">النيل الأزرق</div>
                    <div class="option" data-option="النيل الأبيض">النيل الأبيض</div>
                    <div class="option" data-option="الشمالية">الشمالية</div>
                    <div class="option" data-option="شمال دارفور">شمال دارفور</div>
                    <div class="option" data-option="جنوب دارفور">جنوب دارفور</div>
                    <div class="option" data-option="وسط دارفور">وسط دارفور</div>
                    <div class="option" data-option="غرب دارفور">غرب دارفور</div>
                    <div class="option" data-option="شرق دارفور">شرق دارفور</div>
                    <div class="option" data-option="شمال كردفان">شمال كردفان</div>
                    <div class="option" data-option="جنوب كردفان">جنوب كردفان</div>
                    <div class="option" data-option="غرب كردفان">غرب كردفان</div>
                  </div>
                </div>`;
          let i = 0;

          template += await createStudentsTable();
                
          template += `<div class="add">&plus;</div>
                ${createPagination(students.length, 1, studentsLimit)}
                <div class="wait-table">
                  <div class="circle">
                    <div class="cover-circle"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="confirm">
              <div class="head">هل أنت متأكد؟</div>
              <div class="body">
                <div class="message">هل أنت متأكد من أنك تريد حذف هذا الطالب من النظام؟</div>
                <div class="buttons">
                  <div class="yes">نعم</div>
                  <div class="no">لا</div>
                </div>
              </div>
            </div>

            <div class="cover">
              <div class="student-inputs">
                <div class="title">إضافة طالب جديد</div>
                <div class="inputs">
                  <div class="label">الاسم الأول</div>
                  <input type="text" class="first-name">
                  <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
                  <div class="label">الاسم الأوسط</div>
                  <input type="text" class="middle-name">
                  <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
                  <div class="label">الاسم الأخير</div>
                  <input type="text" class="last-name">
                  <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
                  <div class="label">الرقم الوطني</div>
                  <input type="number" class="ssn">
                  <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
                  <div class="label">العمر</div>
                  <input type="number" class="age">
                  <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
                  <div class="label">الجنس</div>
                  <div class="select-input gender">
                    <div class="selected">
                      <div class="open-arrow">&langle;</div>
                      <div class="name">ذكر</div>
                    </div>
                    <div class="list">
                      <div class="option" data-option="ذكر">ذكر</div>
                      <div class="option" data-option="أنثى">أنثى</div>
                    </div>
                  </div>
                  <div class="label">المدرسة</div>
                  <input type="text" class="school">
                  <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
                  <div class="label">الولاية</div>
                  <div class="select-input state">
                    <div class="selected">
                      <div class="open-arrow">&langle;</div>
                      <div class="name">الخرطوم</div>
                    </div>
                    <div class="list">
                      <div class="option" data-option="الخرطوم">الخرطوم</div>
                      <div class="option" data-option="الجزيرة">الجزيرة</div>
                      <div class="option" data-option="القضارف">القضارف</div>
                      <div class="option" data-option="كسلا">كسلا</div>
                      <div class="option" data-option="سنار">سنار</div>
                      <div class="option" data-option="البحر الأحمر">البحر الأحمر</div>
                      <div class="option" data-option="نهر النيل">نهر النيل</div>
                      <div class="option" data-option="النيل الأزرق">النيل الأزرق</div>
                      <div class="option" data-option="النيل الأبيض">النيل الأبيض</div>
                      <div class="option" data-option="الشمالية">الشمالية</div>
                      <div class="option" data-option="شمال دارفور">شمال دارفور</div>
                      <div class="option" data-option="جنوب دارفور">جنوب دارفور</div>
                      <div class="option" data-option="وسط دارفور">وسط دارفور</div>
                      <div class="option" data-option="غرب دارفور">غرب دارفور</div>
                      <div class="option" data-option="شرق دارفور">شرق دارفور</div>
                      <div class="option" data-option="شمال كردفان">شمال كردفان</div>
                      <div class="option" data-option="جنوب كردفان">جنوب كردفان</div>
                      <div class="option" data-option="غرب كردفان">غرب كردفان</div>
                    </div>
                  </div>
                  <div class="label">رقم الجلوس</div>
                  <input type="number" class="sitting-number">
                  <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
                  <div class="label">التخصص</div>
                  <div class="select-input major">
                    <div class="selected">
                      <div class="open-arrow">&langle;</div>
                      <div class="name">علمي</div>
                    </div>
                    <div class="list">
                      <div class="option" data-option="علمي">علمي</div>
                      <div class="option" data-option="أدبي">أدبي</div>
                    </div>
                  </div>
                </div>
                <div class="buttons">
                  <div class="send">
                    <p>إرسال البيانات</p>
                    <div class="dots">
                      <div class="dot"></div>
                      <div class="dot"></div>
                      <div class="dot"></div>
                    </div>
                  </div>
                  <div class="cancel">إلغاء الأمر</div>
                </div>
              </div>
            </div>
          </div>
          `;
        break;}

        case "subjects": {
          template = `
            <div class="subjects-page">
              <div class="header">
                <div class="logo">
                  <div class="icon logo-icon"></div>
                </div>
                <div class="title">نظام النتائج</div>
              </div>
              <div class="container">
                <div class="to-back">
                  <div class="back-arrow">&langle;</div>
                  <div class="page-title">المواد الدراسية</div>
                </div>
        
                <div class="subjects-table">
                  <div class="table-head">المواد الدراسية</div>
                  <div class="column title">
                    <div class="subject">المادة</div>
                    <div class="major">التخصص</div>
                  </div>`;

          if (subjects.length) {
            template += await createSubjectsTable();
          } else {
            template += `
              <div class="nothing">
                لا توجد أي مواد مضافة حتى الآن.
              </div>
            `;
          }
                  
          template += `<div class="add">&plus;</div>
                  <div class="footer-table"></div>
                  <div class="wait-table">
                    <div class="circle">
                      <div class="cover-circle"></div>
                    </div>
                  </div>
                  <div class="confirm">
                    <div class="head">هل أنت متأكد؟</div>
                    <div class="body">
                      <div class="message">هل أنت متأكد من أنك تريد حذف هذا الطالب من النظام؟</div>
                      <div class="buttons">
                        <div class="yes">نعم</div>
                        <div class="no">لا</div>
                      </div>
                    </div>
                  </div>
                  <div class="cover">
                    <div class="add-subject">
                      <div class="table-head">أضف مادة</div>
                      <div class="inputs">
                        <div class="label">المادة</div>
                        <input type="text" class="subject">
                        <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
                        <div class="label">النخصص</div>
                        <div class="majors">
                        <div class="selected">
                          <div class="open-arrow">&langle;</div>
                          <div class="name">مشترك</div>
                        </div>
                        <div class="list">
                          <div class="option" data-option="مشترك">مشترك</div>
                          <div class="option" data-option="علمي">علمي</div>
                          <div class="option" data-option="أدبي">أدبي</div>
                        </div>
                        </div>
                      </div>
                      <div class="buttons">
                        <div class="send">
                          <p>إرسال البيانات</p>
                          <div class="dots">
                            <div class="dot"></div>
                            <div class="dot"></div>
                            <div class="dot"></div>
                          </div>
                        </div>
                        <div class="cancel">إلغاء الأمر</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        break;}

        case "degrees": {
          template = `
          <div class="degrees-page">
            <div class="header">
              <div class="logo">
                <div class="icon logo-icon"></div>
              </div>
              <div class="title">نظام النتائج</div>
            </div>
            <div class="container">
              <div class="to-back">
                <div class="back-arrow">&langle;</div>
                <div class="page-title">الدرجات</div>
              </div>

              <div class="details-degrees">
                <div class="table-head">الدرجات بالتفصيل</div>
                <div class="states">
                  <div class="selected">
                    <div class="open-arrow">&langle;</div>
                    <div class="name">الكل</div>
                  </div>
                  <div class="list">
                    <div class="option" data-option="الكل">الكل</div>
                    <div class="option" data-option="الخرطوم">الخرطوم</div>
                    <div class="option" data-option="الجزيرة">الجزيرة</div>
                    <div class="option" data-option="القضارف">القضارف</div>
                    <div class="option" data-option="كسلا">كسلا</div>
                    <div class="option" data-option="سنار">سنار</div>
                    <div class="option" data-option="البحر الأحمر">البحر الأحمر</div>
                    <div class="option" data-option="نهر النيل">نهر النيل</div>
                    <div class="option" data-option="النيل الأزرق">النيل الأزرق</div>
                    <div class="option" data-option="النيل الأبيض">النيل الأبيض</div>
                    <div class="option" data-option="الشمالية">الشمالية</div>
                    <div class="option" data-option="شمال دارفور">شمال دارفور</div>
                    <div class="option" data-option="جنوب دارفور">جنوب دارفور</div>
                    <div class="option" data-option="وسط دارفور">وسط دارفور</div>
                    <div class="option" data-option="غرب دارفور">غرب دارفور</div>
                    <div class="option" data-option="شرق دارفور">شرق دارفور</div>
                    <div class="option" data-option="شمال كردفان">شمال كردفان</div>
                    <div class="option" data-option="جنوب كردفان">جنوب كردفان</div>
                    <div class="option" data-option="غرب كردفان">غرب كردفان</div>
                  </div>
                </div>
                <div class="details">`;
                  
          if (degrees.length) {
            template += await createDetailsDegreesTable();
          } else {
            template += `
              <div class="nothing">
                لا توجد درجات مسجلة حتى الآن.
              </div>
            `;
          }

          template += `</div>
                <div class="add">&plus;</div>`;

          template += createPagination(degrees.length);

          template += `
              <div class="wait-table">
                <div class="circle"></div>
              </div>
            </div>
              <div class="final-degrees">
                <div class="table-head">درجات الطلاب</div>
                <div class="states">
                  <div class="selected">
                    <div class="open-arrow">&langle;</div>
                    <div class="name">الكل</div>
                  </div>
                  <div class="list">
                    <div class="option" data-option="الكل">الكل</div>
                    <div class="option" data-option="الخرطوم">الخرطوم</div>
                    <div class="option" data-option="الجزيرة">الجزيرة</div>
                    <div class="option" data-option="القضارف">القضارف</div>
                    <div class="option" data-option="كسلا">كسلا</div>
                    <div class="option" data-option="سنار">سنار</div>
                    <div class="option" data-option="البحر الأحمر">البحر الأحمر</div>
                    <div class="option" data-option="نهر النيل">نهر النيل</div>
                    <div class="option" data-option="النيل الأزرق">النيل الأزرق</div>
                    <div class="option" data-option="النيل الأبيض">النيل الأبيض</div>
                    <div class="option" data-option="الشمالية">الشمالية</div>
                    <div class="option" data-option="شمال دارفور">شمال دارفور</div>
                    <div class="option" data-option="جنوب دارفور">جنوب دارفور</div>
                    <div class="option" data-option="وسط دارفور">وسط دارفور</div>
                    <div class="option" data-option="غرب دارفور">غرب دارفور</div>
                    <div class="option" data-option="شرق دارفور">شرق دارفور</div>
                    <div class="option" data-option="شمال كردفان">شمال كردفان</div>
                    <div class="option" data-option="جنوب كردفان">جنوب كردفان</div>
                    <div class="option" data-option="غرب كردفان">غرب كردفان</div>
                  </div>
                </div>
                <div class="degrees">`;

          if (degrees.length) {
            template += `
              <div class="student title">اسم الطالب</div>
              <div class="degree title">الدرجة الكلية</div>
            `;
            template += await createFinalDegreesTable();
          } else {
            template += `
              <div class="nothing">
                لا يوجد درجات مسجلة حتى الآن
              </div>
            `;
          }

          template += `</div>
                ${createPagination(degrees.length)}
                <div class="wait-table">
                  <div class="circle"></div>
                </div>
              </div>
              <div class="confirm">
                <div class="head">هل أنت متأكد؟</div>
                <div class="body">
                  <div class="message">هل أنت متأكد من أنك تريد حذف هذا الطالب من النظام؟</div>
                  <div class="buttons">
                    <div class="yes">نعم</div>
                    <div class="no">لا</div>
                  </div>
                </div>
              </div>
              <div class="cover">
                <div class="add-degree">
                  <div class="table-head">أضف درجات طالب</div>
                  <div class="students">
                    <div class="selected">
                      <div class="open-arrow">&langle;</div>
                      <div class="name"></div>
                    </div>
                    <div class="list"></div>
                  </div>
                  <div class="degrees"></div>
                  <div class="buttons">
                    <div class="send">
                      <p>إرسال البيانات</p>
                      <div class="dots">
                        <div class="dot"></div>
                        <div class="dot"></div>
                        <div class="dot"></div>
                      </div>
                    </div>
                    <div class="cancel">إلغاء الأمر</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          `;
        break;}
      }

      $(".loading-screen").before(template);
      $(".admin-page").remove();

      setTimeout(() => {
        $(".loading-screen").fadeOut();
      }, 0);
    });

    $(".loading-screen").css("display", "flex");
  });

  $("body").on("click", ".to-back .back-arrow", () => {
    $(".loading-screen").fadeIn(400, () => {
      adminPage(sessionStorage.getItem("RS_username"));
      timeDecrement = setInterval(updateTime, 1000);

      $(".admin-page").prev().remove();

      setTimeout(() => {
        $(".loading-screen").fadeOut();
      }, 0);
    });

    $(".loading-screen").css("display", "flex");
  });

  $("body").on("click", ".statistics-page .container .subjects-statistics .statistics-table .states .list .option", async function () {
    if ($(this).attr("data-option") !== $(".statistics-page .container .subjects-statistics .statistics-table .states .selected .name").
    text()) {
      let midDegrees = [],
          allCounter = 0,
          maleCounter = 0,
          midDegree = 0,
          femaleCounter = 0,
          midDegreeMale = 0,
          midDegreesMale = [],
          midDegreeFemale = 0,
          midDegreesFemale = [],
          maleSSNs = [],
          femaleSSNs = [],
          allSSNs = [],
          state = $(this).attr("data-option"),
          template = ``;

        for await (let student of students) {
          if (state === "الكل") {
            if (student.gender === "ذكر") {
              maleSSNs.push(student.ssn);
            } else {
              femaleSSNs.push(student.ssn);
            }

            allSSNs.push(student.ssn);
          } else {
            if (student.state === state) {
              if (student.gender === "ذكر") {
                maleSSNs.push(student.ssn);
              } else {
                femaleSSNs.push(student.ssn);
              }

              allSSNs.push(student.ssn);
            }
          }
        }

        for await (let subject of subjects) {
          let degree = 0,
            maleDegree = 0,
            femaleDegree = 0;

          allCounter = 0;
          maleCounter = 0;
          femaleCounter = 0;

          for await (let d of degrees) {
            for await (let d2 of d.degrees) {
              if (d2[0] === subject.id) {
                if (allSSNs.indexOf(d.ssn) > -1) {
                  degree += d2[1];
                  allCounter++; 
                }

                if (maleSSNs.indexOf(d.ssn) > -1) {
                  maleDegree += d2[1];
                  maleCounter++;
                }
  
                if (femaleSSNs.indexOf(d.ssn) > -1) {
                  femaleDegree += d2[1];
                  femaleCounter++;
                }
              }
            }
          }

          allCounter = (allCounter === 0) ? 1 : allCounter;
          maleCounter = (maleCounter === 0) ? 1 : maleCounter;
          femaleCounter = (femaleCounter === 0) ? 1 : femaleCounter;

          midDegrees.push({subject: subject.name, mid: (degree / allCounter).toFixed(2)});
          midDegreesMale.push({subject: subject.name, mid: (maleDegree / maleCounter).toFixed(2)});
          midDegreesFemale.push({subject: subject.name, mid: (femaleDegree / femaleCounter).toFixed(2)});
        }

        let i = 0;

        for await (let d of midDegrees) {
          midDegree += +midDegrees[i].mid;
          midDegreeMale += +midDegreesMale[i].mid;
          midDegreeFemale += +midDegreesFemale[i].mid;
          i++;
        }

        midDegree = (midDegree / midDegrees.length).toFixed(2);
        midDegreeMale = (midDegreeMale / midDegreesMale.length).toFixed(2);
        midDegreeFemale = (midDegreeFemale / midDegreesFemale.length).toFixed(2);

        i = 0;

        for await (let d of midDegrees) {
          template += `
          <div class="subject">${d.subject}</div>
          <div class="statistic">
            <div class="male origin" style="width: ${midDegreesMale[i].mid}%"></div>
            <div class="female origin" style="width: ${midDegreesFemale[i].mid}%"></div>
            <div class="all origin active" style="width: ${midDegrees[i].mid}%"></div>
          </div>
          <div class="percentage">${midDegrees[i].mid}%</div>
          `;

          i++;
        }

      $(".statistics-page .container .subjects-statistics .statistics-table").children(".subject, .statistic, .percentage").remove();
      $(".statistics-page .container .subjects-statistics .statistics-table .states").after(template);
      $(".statistics-page .container .gender-statistics .statistics .statistic-box .percentage .cover-one").eq(0).css("--degree", (midDegreeMale / 100) * 360 + "deg");
      $(".statistics-page .container .gender-statistics .statistics .statistic-box .percentage .small-circle").eq(0).text(midDegreeMale + "%");
      $(".statistics-page .container .gender-statistics .statistics .statistic-box .percentage .cover-one").eq(1).css("--degree", (midDegreeFemale/ 100) * 360 + "deg");
      $(".statistics-page .container .gender-statistics .statistics .statistic-box .percentage .small-circle").eq(1).text(midDegreeFemale + "%");
      $(".statistics-page .container .gender-statistics .statistics .statistic-box .percentage .cover-one").eq(2).css("--degree", (midDegree/ 100) * 360 + "deg");
      $(".statistics-page .container .gender-statistics .statistics .statistic-box .percentage .small-circle").eq(2).text(midDegree + "%");

      $(".statistics-page .container .subjects-statistics .statistics-table .states .selected .name").text(state);

    }

    $(this).parent().css("transform", "scaleY(0)");
  });

  $("body").on("click", ".students-page .container .students-table .states .list .option", function () {
    if ($(this).attr("data-option") !== $(".students-page .container .students-table .states .selected .name").text()) {
      $(".students-page .container .students-table .wait-table").fadeIn(400, async() => {
        $(this).parent().prev().children(".name").text($(this).attr("data-option"));
        let template = ``,
          i = 0;

        template = await createStudentsTable($(this).attr("data-option"));

        $(".students-page .container .students-table .student, .students-page .container .students-table .nothing").remove();
        $(".students-page .container .students-table .states").after(template);

        $(".students-page .container .students-table .pagination").html("");

        i = 0;

        if ($(this).attr("data-option") !== "الكل") {
          for await(let student of students) {
            if (student.state === $(this).attr("data-option")){
              i++;
            }
          }  
        } else {
          i = students.length
        }

        createPagination(i, 1, studentsLimit);

        setTimeout(() => {
          $(".students-page .container .students-table .wait-table").fadeOut();
        });
      });
      $(".students-page .container .students-table .wait-table").css("display", "flex");
    }
    $(".selected + .list").css("transform", "scaleY(0)");
    $(".selected .open-arrow").css("transform", "rotateZ(90deg)");
  });

  $("body").on("click", ".degrees-page .container .states .list .option", function () {
    if ($(this).attr("data-option") !== $(this).parents(".states").children(".selected").children(".name").text()) {
      let wait = $(this).parents(".states").siblings(".wait-table");

      wait.fadeIn(400, async () => {
        $(this).parents(".states").children(".selected").children(".name").text($(this).attr("data-option"));
        let template = ``,
          i = 0,
          state = $(this).attr("data-option"),
          thisTable = $(this).parents(".states").parent().attr("class");

        if (state !== "الكل") {
          for await (let s of students) {
            if (s.state === state) {
              i++;
            }
          }
        } else {
          i = degrees.length;
        }

        switch (thisTable) {
          case "details-degrees": {
            template = await createDetailsDegreesTable(state);
            $(this).parents(".states").siblings(".details").children(".student").remove();
            $(this).parents(".states").siblings(".details").prepend(template);
            createPagination(i, 1, detailsDegreesLimit, ".degrees-page .container .details-degrees");
          break;}

          case "final-degrees": {
            template = await createFinalDegreesTable(state);
            $(this).parents(".states").siblings(".degrees").children(".student:not(.title), .degree:not(.title)").remove();
            $(this).parents(".states").siblings(".degrees").append(template);
            createPagination(i, 1, finalDegreesLimit, ".degrees-page .container .final-degrees");
          break;}
        }

        setTimeout(() => {
          wait.fadeOut();
        }, 0);
      });
      wait.css("display", "flex");
    }

    $(this).parent().css("transform", "scaleY(0)");
    $(this).parent().siblings(".selected").children(".open-arrow").css("transform", "rotateZ(90deg)");
  });

  $("body").on("click", ".statistics-page .container .subjects-statistics .statistics-table .statistic > *:not(.active)", function () {
    $(this).addClass("active").siblings().removeClass("active");
    $(this).parent().next().text(this.style.width);
  });
  
  $("body").on("click", ".selected", function () {
    if ($(this).next().hasClass("list") && !$(this).parent().hasClass("disabled")) {
      $(".selected + .list").css("transform", "scaleY(0)");
      $(".selected .open-arrow").css("transform", "rotateZ(90deg)");
      
      if ($(this).next().css("transform") !== 'matrix(1, 0, 0, 1, 0, 0)') {
        $(this).next().css("transform", "scaleY(1)");
        $(this).children(".open-arrow").css("transform", "rotateZ(270deg)");
      }
    }
  });

  $("body").on("click", ".degrees-page .container .details-degrees .details .student:not(.open) .info-name .open-arrow, .students-page .container .students-table .student:not(.open) .info-name .open-arrow", function () {
    $(this).parents(".student").addClass("open").siblings().removeClass("open");
    $(".info").slideUp();
    $(this).parent().next().slideDown({
      start: function () {
        $(this).css("display", "grid");
      }
    });
  });

  $("body").on("click", ".degrees-page .container .details-degrees .details .student.open .info-name .open-arrow, .students-page .container .students-table .student.open .info-name .open-arrow", function () {
    $(this).parents(".student").removeClass("open");
    $(this).parent().next().slideUp();
  });

  $("body").on("click", ".subjects-page .container .subjects-table .add, .students-page .container .students-table .add", () => {
    $(".inputs input").val("");
    if ($(".cover .inputs .ssn").is("[disabled]")) {
      $(".students-page .cover .student-inputs .inputs .select-input .selected .name").map(function () {
        $(this).text($(this).parent().siblings(".list").children(":first-child").attr("data-option"));
      });
      $(".cover .inputs .ssn").removeAttr("disabled");
    } else {
      $(".subjects-page .container .subjects-table .cover .add-subject .inputs .majors .selected .name").text("مشترك")
    }

    $(".cover").fadeIn();
    $("body").css("overflow", "hidden");
  });

  $("body").on("click", ".degrees-page .container .details-degrees .add", async () => {
    let withoutDegrees = [],
      template = ``;

    $(".degrees-page .container .cover .add-degree .students").removeClass("disabled");

    for await (let student of students) {
      for (let i = 0; i < degrees.length; i++) {
        if (degrees[i].ssn === student.ssn) {
          break;
        }

        if (i === degrees.length - 1) {
          withoutDegrees.push([student.ssn, student.name, student.major]);
        }
      }
    }

    if (withoutDegrees.length) {
      $(".degrees-page .container .cover .add-degree .students .selected .name").text(withoutDegrees[0][1]);
      $(".degrees-page .container .cover .add-degree .students .selected .name").attr("data-ssn", withoutDegrees[0][0]);
      for await (let student of withoutDegrees) {
        template += `<div class="option" data-major="${student[2]}" data-ssn="${student[0]}" data-option="${student[1]}">${student[1]}</div>`;
      }
  
      $(".degrees-page .container .cover .add-degree .students .list").html(template);
  
      template = ``;
  
      for await (let subject of subjects) {
        if (subject.major === "مشترك" || subject.major === withoutDegrees[0][2]) {
          template += `
            <div class="label">${subject.name}</div>
            <input type="number" class="theDegree" data-id="${subject.id}" />
            <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
          `;
        }
      }
  
      $(".degrees-page .container .cover .add-degree .degrees").html(template);
    } else {
      $(".degrees-page .container .cover .add-degree .students").remove();
      $(".degrees-page .container .cover .add-degree .degrees").html(`
        <div class="nothing">لقد تم وضع الدرجات لجميع الطلاب المسجلين في النظام حتى الآن</div>
      `);
    }

    $(".cover").fadeIn();
    $("body").css("overflow", "hidden");
  });

  $("body").on("click", ".degrees-page .container .details-degrees .edit, .subjects-page .container .subjects-table .edit, .students-page .container .students-table .edit", async function () {
    let pageIs = $(this).parents(".container").parent().attr("class");

    switch (pageIs) {
      case "students-page": {
        let id = +$(this).parents(".info-name").siblings(".info").children(":nth-child(2)").text(),
          studentInfo = {};
        
        for await (let student of students) {
          if (id === student.ssn) {
            studentInfo = student;
            break;
          }
        }

        $(".cover .inputs .first-name").val(studentInfo.name.split(" ")[0]);
        $(".cover .inputs .middle-name").val(studentInfo.name.split(" ")[1]);
        $(".cover .inputs .last-name").val(studentInfo.name.split(" ")[2]);
        $(".cover .inputs .ssn").val(studentInfo.ssn);
        $(".cover .inputs .ssn").attr("disabled", "disabled");
        $(".cover .inputs .age").val(studentInfo.age);
        $(".students-page .cover .student-inputs .inputs .gender .selected .name").text(studentInfo.gender);
        $(".cover .inputs .school").val(studentInfo.school);
        $(".students-page .cover .student-inputs .inputs .state .selected .name").text(studentInfo.state);
        $(".cover .inputs .sitting-number").val(studentInfo["sitting-number"]);
        $(".students-page .cover .student-inputs .inputs .major .selected .name").text(studentInfo.major);
        $(".cover").fadeIn();
      break;}

      case "subjects-page": {
        $(".cover").addClass("editable");
        $(".cover").attr("data-id", $(this).parents(".major").siblings(".subject").attr("data-id"));
        $(".subjects-page .container .subjects-table .cover .add-subject .inputs .subject").val($(this).parents(".major").siblings(".subject").text());
        $(".subjects-page .container .subjects-table .cover .add-subject .inputs .majors .selected .name").text($(this).parents(".major").children(".name").text());
        $(".cover").fadeIn();
      break;}

      case "degrees-page": {
        let ssn = +$(this).parents(".student").attr("data-ssn"),
          name = $(this).parent().siblings(".name").text(),
          theDegrees = [],
          degreesWithSubjects = [],
          template = ``;
        $(".degrees-page .container .cover .add-degree .students").addClass("disabled");
        $(".degrees-page .container .cover .add-degree .students .selected .name").text(name);
        $(".degrees-page .container .cover .add-degree .students .selected .name").attr("data-ssn", ssn);

        for await (let degree of degrees) {
          if (degree.ssn === ssn) {
            theDegrees = degree.degrees;
            break;
          }
        }

        for await (let degree of theDegrees) {
          for (let i = 0; i < subjects.length; i++) {
            if (subjects[i].id === degree[0]) {
              degreesWithSubjects.push([degree[0], subjects[i].name, degree[1]]);
              break;
            }
          }
        }

        for await (let degree of degreesWithSubjects) {
          template += `
            <div class="label">${degree[1]}</div>
            <input type="number" class="theDegree" data-id="${degree[0]}" value="${degree[2]}" />
            <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
          `;
        }

        $(".degrees-page .container .cover .add-degree .degrees").html(template);

        $(".cover").fadeIn();
      break;}
    }
  });

  $("body").on("click", ".degrees-page .container .details-degrees .delete, .subjects-page .container .subjects-table .delete, .students-page .container .students-table .delete", function () {
    let pageIs = $(this).parents(".container").parent().attr("class"),
      id = 0;

    if (pageIs === "students-page") {
      id = +$(this).parents(".info-name").siblings(".info").children(":nth-child(2)").text();
    } else if (pageIs === "subjects-page") {
      id = +$(this).parents(".major").siblings(".subject").attr("data-id");
    } else if (pageIs === "degrees-page") {
      id = +$(this).parents(".student").attr("data-ssn");
    }

    $(".confirm").attr("data-id", id);
    $(".confirm").fadeIn(200);
  });

  $("body").on("change", ".inputs input", function () {
    if ($(this).css("border-color") === "rgb(244, 67, 54)") {
      if ($(this).val().trim() !== "") {
        $(this).removeAttr("style");
        $(this).next().css("display", "none");
      }
    }
  });

  $("body").on("click", ".inputs .selected + .list .option", function () {
    $(this).parent().prev().children(".name").text($(this).attr("data-option"));
    $(".selected + .list").css("transform", "scaleY(0)");
    $(".selected .open-arrow").css("transform", "rotateZ(90deg)");
  });

  $("body").on("click", ".degrees-page .container .cover .add-degree .students .list .option", async function () {
    if ($(".degrees-page .container .cover .add-degree .students .selected .name").text() !== $(this).attr("data-option")) {
      let template = ``;

      $(".degrees-page .container .cover .add-degree .students .selected .name").text($(this).attr("data-option"));
      $(".degrees-page .container .cover .add-degree .students .selected .name").attr("data-ssn", $(this).attr("data-ssn"));

      for await (let subject of subjects) {
        if (subject.major === "مشترك" || subject.major === $(this).attr("data-major")) {
          template += `
            <div class="label">${subject.name}</div>
            <input type="number" class="theDegree" data-id="${subject.id}" />
            <div class="error">لا يمكنك ترك هذا الحقل فارغاً.</div>
          `;
        }
      }
  
      $(".degrees-page .container .cover .add-degree .degrees").html(template);
    }

    $(".degrees-page .container .cover .add-degree .students .list").css("transform", "scaleY(0)");
  });

  $("body").on("click", ".cover .buttons .cancel", () => {
    $(".cover").fadeOut();
    $("body").removeAttr("style");
    $(".cover").removeAttr("data-id").removeClass("editable")
  });

  $("body").on("click", ".cover .buttons .send:not(.waiting)", async function () {
    $(this).addClass("waiting");

    let parent = $(".container").parent().attr("class");

    //`<div class="attention">فشل إرسال البيانات</div>`;

    $(".inputs .error").css("display", "none");

    switch (parent) {
      case "students-page": {

        $(".inputs input").map(function () {
          if ($(this).val().trim() === "") {
            $(this).css("border-color", "#f44336");
            $(this).next().css("display", "block");
          }
        });

        if ($(".inputs input[style]").length === 0) {
          let SSNs = [],
            SNs = [];

          for await (let student of students) {
            SSNs.push(student.ssn);
            
            if ($(".inputs .ssn").is("[disabled]")) {
              if (student.ssn !== +$(".inputs .ssn").val()) {
                SNs.push(student['sitting-number']);  
              }
            } else {
              SNs.push(student['sitting-number']);
            }
          }

          if (SSNs.indexOf(+$(".inputs .ssn").val()) > -1 && !$(".inputs .ssn").is("[disabled]")) {
            $(".inputs .ssn").css("border-color", "#f44336");
            $(".inputs .ssn").next().text("هذا الرقم الوطني موجود مسبقاً.").css("display", "block")
          }

          if (SNs.indexOf(+$(".inputs .sitting-number").val()) > -1) {
            $(".inputs .sitting-number").css("border-color", "#f44336");
            $(".inputs .sitting-number").next().text("رقم الجلوس هذا موجود مسبقاً، استخدم رقماً آخر.").css("display", "block")
          }

          if ($(".inputs .ssn").val().length !== 10) {
            $(".inputs .ssn").css("border-color", "#f44336");
            $(".inputs .ssn").next().text("يجب أن يكون طول الرقم الوطني 10 أرقام بالضبط.").css("display", "block")
          }

          if ($(".inputs .sitting-number").val().length !== 5) {
            $(".inputs .sitting-number").css("border-color", "#f44336");
            $(".inputs .sitting-number").next().text("يجب أن يكون طول رقم الجلوس 5 أرقام بالضبط.").css("display", "block")
          }
          
          if ($(".inputs input[style]").length === 0) {
            let ssn = +$(".inputs .ssn").val(),
                fullName = `${$(".inputs .first-name").val().trim()} ${$(".inputs .middle-name").val().trim()} ${$(".inputs .last-name").val().trim()}`,
                age = $(".inputs .age").val().trim(),
                gender = $(".inputs .gender .selected .name").text(),
                state = $(".inputs .state .selected .name").text(),
                school = $(".inputs .school").val().trim(),
                sn = +$(".inputs .sitting-number").val().trim(),
                major = $(".inputs .major .selected .name").text(),
                majorDiffrent = 0;

            if ($(".inputs .ssn").is("[disabled]")) {
              students.forEach(async student => {
                if (student.ssn === ssn) {

                  majorDiffrent = (student.major !== major) ? major : 0;

                  student.name = fullName;
                  student.age = age;
                  student.gender = gender;
                  student.state = state;
                  student.school = school;
                  student["sitting-number"] = sn;
                  student.major = major;

                  students.sort((a, b) => {
                    if (a.name > b.name) {
                      return 1;
                    }
              
                    if(a.name < b.name) {
                      return -1;
                    }
                  });

                  let theStudent = $(".students-page .container .students-table .student .info .value:nth-child(2)").filter(function () {
                    return $(this).text() == ssn
                  });
  
                  theStudent = theStudent.parents(".student");
  
                  theStudent.children(".info-name").children(".title").children(".name").text(fullName);
                  theStudent.children(".info").children(":nth-child(4)").text(age);
                  theStudent.children(".info").children(":nth-child(6)").text(gender);
                  theStudent.children(".info").children(":nth-child(8)").text(school);
                  theStudent.children(".info").children(":nth-child(10)").text(state);
                  theStudent.children(".info").children(":nth-child(12)").text(sn);
                  theStudent.children(".info").children(":nth-child(14)").text(major);

                  if (majorDiffrent !== 0) {
                    for await (let degree of degrees) {
                      if (degree.ssn === ssn) {
                        for await (let subject of subjects) {
                          if (subject.major === majorDiffrent) {
                            degree.degrees.push([subject.id, 0]);
                          } else if (subject.major !== "مشترك") {
                            for (let i = degree.degrees.length - 1; i >= 0; i--) {
                              if (degree.degrees[i][0] === subject.id) {
                                degree.degrees.splice(i, 1);
                              }
                            }
                          }
                        }
                        break;
                      }
                    }
                  }
                }
              });
            } else {
              let template = ``;
            
              students.push({
                "ssn": ssn,
                "name": fullName,
                "age": age,
                "gender": gender,
                "state": state,
                "school": school,
                "sitting-number": sn,
                "major": major
              });

              students.sort((a, b) => {
                if (a.name > b.name) {
                  return 1;
                }
          
                if(a.name < b.name) {
                  return -1;
                }
              });

              let currentPage = ($(".students-page .container .students-table .pagination .pages > .current").length) ? $(".students-page .container .students-table .pagination .pages > .current").text() : 1,
                currentState = $(".students-page .container .students-table .states .selected .name").text();
              
              template = await createStudentsTable($(".students-page .container .students-table .states .selected .name").text(), currentPage);
              $(".students-page .container .students-table .student, .students-page .container .students-table .nothing").remove();
              $(".students-page .container .students-table .states").after(template);


              let len = 0;

              for await (let student of students) {
                if (student.state === currentState) {
                  len++;
                }
              }

              createPagination(len, currentPage, studentsLimit);
            }

            setTimeout(() => {
              $(".cover").fadeOut();
              $(".inputs input").val("");
              $("body").removeAttr("style");
        
              $(".students-page .cover .student-inputs .inputs .select-input .selected .name").map(function () {
                $(this).text($(this).parent().siblings(".list").children(":first-child").attr("data-option"));
              });
        
              $(this).removeClass("waiting");
            }, 0);
          } else {
            $(this).removeClass("waiting");
          }
        } else {
          $(this).removeClass("waiting");
        }

      break;}

      case "subjects-page": {
        if ($(".subjects-page .container .subjects-table .cover .add-subject .inputs .subject").val().trim() === "") {
          $(".subjects-page .container .subjects-table .cover .add-subject .inputs .subject").css("border-color", "#f44336");
          $(".subjects-page .container .subjects-table .cover .add-subject .inputs .error").css("display", "block");
        }

        if (!$(".subjects-page .container .subjects-table .cover .add-subject .inputs .subject[style]").length) {
          let name = $(".subjects-page .container .subjects-table .cover .add-subject .inputs .subject").val().trim(),
              major = $(".subjects-page .container .subjects-table .cover .add-subject .inputs .majors .selected .name").text();
          if ($(".cover").hasClass("editable")) {
            let majorDiffrent = 0;

            subjects.forEach(async subject => {
              
              if (subject.id === +$(".cover").attr("data-id")) {
                if (subject.major !== major) {
                  majorDiffrent = major;
                }

                subject.name = name;
                subject.major = major;

                if (majorDiffrent !== 0 && majorDiffrent !== "مشترك") {
                  for await (let student of students) {
                    if (student.major === majorDiffrent) {
                      for (let i = 0; i < degrees.length; i++) {
                        if (degrees[i].ssn === student.ssn) {
                          let exists = 0;

                          for await (let d2 of degrees[i].degrees) {
                            if (d2[0] === subject.id) {
                              exists = 1;
                              break;
                            }
                          }

                          if (!exists) {
                            degrees[i].degrees.push([subject.id, 0]);
                            degrees[i].degrees.sort((a, b) => a[0] - b[0]);
                          }
                          break;
                        }
                      }
                    } else {
                      for (let i = 0; i < degrees.length; i++) {
                        if (degrees[i].ssn === student.ssn) {
                          for (let j = degrees[i].degrees.length - 1; j >= 0; j--) {
                            if (degrees[i].degrees[j][0] === subject.id) {
                              degrees[i].degrees.splice(j, 1);

                              break;
                            }
                          }
                          
                          break;
                        }
                      }
                    }
                  }
                } else if (majorDiffrent === "مشترك") {
                  for await (let degree of degrees) {
                    let exists = 0;

                    for await (let d2 of degree.degrees) {
                      if (d2[0] === subject.id) {
                        exists = 1;
                        break;
                      }
                    }

                    if (!exists) {
                      degree.degrees.push([subject.id, 0]);
                      degree.degrees.sort((a, b) => a[0] - b[0]);
                    }
                  }
                }
                return;
              }
            });

            let column = $(`.subjects-page .container .subjects-table .column:not(.title) .subject[data-id="${+$(".cover").attr("data-id")}"]`).parent();

            column.children(".subject").text(name);
            column.children(".major").children(".name").text(major);
          } else {
            let id = subjects[subjects.length - 1].id + 1;
  
            subjects.push({
              id,
              name,
              major
            });

            if (major === "مشترك") {
              for await (let degree of degrees) {
                degree.degrees.push([id, 0]);
                degree.degrees.sort((a, b) => a[0] - b[0]);
              }
            } else {
              for await (let degree of degrees) {
                for (let i = 0; i < students.length; i++) {
                  if (degree.ssn === students[i].ssn) {
                    if (students[i].major === major) {
                      degree.degrees.push([id, 0]);
                      degree.degrees.sort((a, b) => a[0] - b[0]);
                    }

                    break;
                  }
                }
              }
            }
  
            $(".subjects-page .container .subjects-table .column:not(.title)").remove();
            $(".subjects-page .container .subjects-table .column.title").after(await createSubjectsTable());
          }
          setTimeout(() => {
            $(".cover").fadeOut();
            $(".inputs input").val("");
            $("body").removeAttr("style");
      
            $(".students-page .cover .student-inputs .inputs .select-input .selected .name").map(function () {
              $(this).text($(this).parent().siblings(".list").children(":first-child").attr("data-option"));
            });
      
            $(this).removeClass("waiting");
          }, 0);
        } else {
          $(this).removeClass("waiting");
        }
      break;}

      case "degrees-page": {
        $(".cover .degrees input").removeAttr("style");
        $(".cover .degrees .error").removeAttr("style");

        await $(".cover .degrees input").map(function () {
          if ($(this).val().trim() === "") {
            $(this).css("border-color", "#f44336");
            $(this).next().css("display", "block");
          }
        });


        if ($(".cover .degrees input[style]").length === 0) {
          let currentDegrees = {
            ssn: 0,
            degrees: []
          },
            template = ``;

          currentDegrees.ssn = +$(".degrees-page .container .cover .add-degree .students .selected .name").attr("data-ssn");

          await $(".cover .degrees input").map(function () {
            let degree = +$(this).val();

            if (degree < 0) {
              degree = 0;
            } else if (degree > 100) {
              degree = 100;
            }

            currentDegrees.degrees.push([+$(this).attr("data-id"), degree]);
          });

          if ($(".degrees-page .container .cover .add-degree .students").hasClass("disabled")) {
            for await (let degree of degrees) {
              if (degree.ssn === currentDegrees.ssn) {
                degree.degrees = currentDegrees.degrees;
                break;
              }
            }

            template = await createDetailsDegreesTable($(".degrees-page .container .details-degrees .states .selected .name").text(), +$(".degrees-page .container .details-degrees .pagination .pages > .current").text());
            $(".degrees-page .container .details-degrees .details").children(".student").remove();
            $(".degrees-page .container .details-degrees .details").prepend(template);

            template = await createFinalDegreesTable($(".degrees-page .container .final-degrees .states .selected .name").text(), +$(".degrees-page .container .final-degrees .pagination .pages > .current").text());
            $(".degrees-page .container .final-degrees .degrees").children(".student:not(.title), .degree:not(.title)").remove();
            $(".degrees-page .container .final-degrees .degrees").append(template);

          } else {
            degrees.push(currentDegrees);

            template = await createDetailsDegreesTable($(".degrees-page .container .details-degrees .states .selected .name").text(), +$(".degrees-page .container .details-degrees .pagination .pages > .current").text());
            $(".degrees-page .container .details-degrees .details").children(".student").remove();
            $(".degrees-page .container .details-degrees .details").prepend(template);
            $(".degrees-page .container .details-degrees .pagination .pages > .pages-number").text(Math.ceil(degrees.length / detailsDegreesLimit));

            template = await createFinalDegreesTable($(".degrees-page .container .final-degrees .states .selected .name").text(), +$(".degrees-page .container .final-degrees .pagination .pages > .current").text());
            $(".degrees-page .container .final-degrees .degrees").children(".student:not(.title), .degree:not(.title)").remove();
            $(".degrees-page .container .final-degrees .degrees").append(template);
            $(".degrees-page .container .final-degrees .pagination .pages > .pages-number").text( Math.ceil(degrees.length / finalDegreesLimit));
          }

          setTimeout(() => {
            $(".cover").fadeOut();
            $(".cover .degrees input").val("");
            $("body").removeAttr("style");
      
            $(".degrees-page .container .cover .add-degree .students .selected .name").map(function () {
              $(this).text($(this).parent().siblings(".list").children(":first-child").attr("data-option"));
            });
      
            $(this).removeClass("waiting");
          }, 0);
        } else {
          $(this).removeClass("waiting");
        }
      break;}
    }
  });

  $("body").on("click", ".confirm .body .buttons .no", () => {
    $(".confirm").fadeOut(200);
  });

  $("body").on("click", ".confirm .body .buttons .yes", async () => {
    let id = +$(".confirm").attr("data-id"),
      pageIs = $(".container").parent().attr("class"),
      template = ``;

    $(".confirm").fadeOut(200);

    if (pageIs === "students-page") {
      $(".students-page .container .students-table .wait-table").fadeIn(400, async () => {
        let i = 0;
        for await (let student of students) {
          if (student.ssn === id) {
            students.splice(i, 1);
            break;
          }
          i++;
        }

        i = 0;

        for await(let degree of degrees) {
          if (degree.ssn === id) {
            degrees.splice(i, 1);
            break;
          }

          i++;
        }

        let state = $(".students-page .container .students-table .states .selected .name").text(),
          currentPage = +$(".students-page .container .students-table .pagination .pages > .current").text();

        if ($(".students-page .container .students-table .pagination .pages > .current").text() !== '') {
          currentPage = (currentPage > Math.ceil(students.length / studentsLimit)) ? Math.ceil(students.length / studentsLimit) : currentPage;
        } else {
          currentPage = 1;
        }
  
        template = await createStudentsTable(state, currentPage);
  
        $(".students-page .container .students-table .student, .students-page .container .students-table .nothing").remove();
        $(".students-page .container .students-table .states").after(template);

        let studentsNumber = students.length;

        if (state !== "الكل") {
          studentsNumber = 0;
          for await (student of students) {
            if (student.state === state) {
              studentsNumber++;
            }
          }
        }

        createPagination(studentsNumber, currentPage, studentsLimit);

        setTimeout(() => {
          $(".students-page .container .students-table .wait-table").fadeOut();
        }, 0);
      });
      $(".students-page .container .students-table .wait-table").css("display", "flex");
    } else if (pageIs === "subjects-page") {
      $(".subjects-page .container .subjects-table .wait-table").fadeIn(400, async () => {
        let i = 0;
        for await (let subject of subjects) {
          if (subject.id === id) {
            subjects.splice(i, 1);
            break;
          }
          i++;
        }

        for await (let degree of degrees) {
          for (let i = degree.degrees.length - 1; i >= 0; i--) {
            if (degree.degrees[i][0] === id) {
              degree.degrees.splice(i, 1);
            }
          }
        }
  
        $(".subjects-page .container .subjects-table .column:not(.title)").remove();

        $(".subjects-page .container .subjects-table .column.title").after(await createSubjectsTable());

        setTimeout(() => {
          $(".subjects-page .container .subjects-table .wait-table").fadeOut();
        }, 0);
      });
      $(".subjects-page .container .subjects-table .wait-table").css("display", "flex");
    } else if (pageIs === "degrees-page") {
      let i = 0,
        datailNumber = 0,
        finalNumber = 0,
        currentDetails = ($(".degrees-page .container .details-degrees .pagination .pages > .current").length) ? +$(".degrees-page .container .details-degrees .pagination .pages > .current").text() : 1,
        currerntFinal = ($(".degrees-page .container .final-degrees .pagination .pages > .current").length) ? +$(".degrees-page .container .final-degrees .pagination .pages > .current").text() : 1,
        detailsState = $(".degrees-page .container .details-degrees .states .selected .name").text(),
        finalState = $(".degrees-page .container .final-degrees .states .selected .name").text();
      
      for await (let degree of degrees) {
        if (degree.ssn === id) {
          degrees.splice(i, 1);
          break;
        }
        i++;
      }

      if (detailsState === "الكل") {
        datailNumber = degrees.length;
      }

      if (finalState === "الكل") {
        finalNumber = degrees.length;
      }
      
      for await (let student of students) {
        if (detailsState !== "الكل" && detailsState === student.state) {
          datailNumber++;
        }

        if (finalState !== "الكل" && finalState === student.state) {
          finalNumber++;
        }
      }

      template = await createDetailsDegreesTable(detailsState, currentDetails);
      $(".degrees-page .container .details-degrees .details").children(".student, .nothing").remove();
      $(".degrees-page .container .details-degrees .details").prepend(template);
      createPagination(datailNumber, currentDetails, detailsDegreesLimit, ".degrees-page .container .details-degrees");

      template = await createFinalDegreesTable(finalState, currerntFinal);
      $(".degrees-page .container .final-degrees .degrees").children(".student:not(.title), .degree:not(.title), .nothing").remove();
      $(".degrees-page .container .final-degrees .degrees").append(template);
      createPagination(finalNumber, currerntFinal, finalDegreesLimit, ".degrees-page .container .final-degrees");
      
    }
  });

  $("body").on("click", ".students-page .container .students-table .pagination .prev:not(.disabled), .students-page .container .students-table .pagination .next:not(.disabled)", function () {
    $(".students-page .container .students-table .wait-table").fadeIn(400, async () => {
      let current = +$(".students-page .container .students-table .pagination .pages > .current").text(),
        template = ``;

      if ($(this).hasClass("next")) {
        current += 1;
      } else {
        current -= 1;
      }

      template = await createStudentsTable($(".students-page .container .students-table .states .selected .name").text(), current);
      $(".students-page .container .students-table .student, .students-page .container .students-table .nothing").remove();
      $(".students-page .container .students-table .states").after(template);
      $(".students-page .container .students-table .pagination .pages > .current").text(current);
      $(".students-page .container .students-table .pagination .disabled").removeClass("disabled");

      if (current === 1) {
        $(".students-page .container .students-table .pagination .prev").addClass("disabled");
      } else if (current === +$(".students-page .container .students-table .pagination .pages > .pages-number").text()) {
        $(".students-page .container .students-table .pagination .next").addClass("disabled");
      }

      setTimeout(() => {
        $(".students-page .container .students-table .wait-table").fadeOut();
      }, 0);
    });
    $(".students-page .container .students-table .wait-table").css("display", "flex");
  });

  $("body").on("click", ".degrees-page .container .pagination .prev:not(.disabled), .degrees-page .container .pagination .next:not(.disabled)", function () {
    let wait = $(this).parent().siblings(".wait-table");

    wait.fadeIn(400, async () => {
      let table = $(this).parent().parent().attr("class"),
        current = +$(this).siblings(".pages").children(".current").text(),
        state = $(this).parent().siblings(".states").children(".selected").children(".name").text(),
        template = ``;

      $(this).parent().children(".disabled").removeClass("disabled");
      
      if ($(this).hasClass("next")) {
        current += 1;
      } else {
        current -= 1;
      }

      switch (table) {
        case "details-degrees": {
          template = await createDetailsDegreesTable(state, current);
          $(this).parent().siblings(".details").children(".student").remove();
          $(this).parent().siblings(".details").prepend(template);
        break;}

        case "final-degrees": {
          template = await createFinalDegreesTable(state, current);
          $(this).parent().siblings(".degrees").children(".student:not(.title), .degree:not(.title)").remove();
          $(this).parent().siblings(".degrees").append(template);
        break;}
      }

      $(this).siblings(".pages").children(".current").text(current);

      if (current === 1) {
        $(this).parent().children(".prev").addClass("disabled");
      } else if (current === +$(this).siblings(".pages").children(".pages-number").text()) {
        $(this).parent().children(".next").addClass("disabled");
      }

      setTimeout(() => {
        wait.fadeOut();
      }, 0);
    });
    wait.css("display", "flex");
  });

  $("body").on("click", ".student-page .container .degrees-table .print-button", () => {
    $(".loading-screen").fadeIn(400, async () => {
      let theDegrees = [],
        info = [],
        staticstic = [],
        totalDegree = 0,
        ssn = +sessionStorage.getItem("RS_username"),
        template1 = ``,
        template2 = ``;

      for await (let student of students) {
        if (student.ssn === ssn) {
          info = student;
          break;
        }
      }

      for await (let degree of degrees) {
        if (degree.ssn == ssn) {
          theDegrees = degree;
          break;
        }
      }

      for await (let degree of theDegrees.degrees) {
        for await (let subject of subjects) {
          if(degree[0] === subject.id) {
            template1 += `
              <div class="column">${subject.name}</div>
              <div class="column">${degree[1]}%</div>
            `;

            break;
          }
        }
        totalDegree += degree[1];
      }

      totalDegree = (totalDegree / theDegrees.degrees.length).toFixed(2);

      for await (let subject of subjects) {
        let stateDegree = 0,
          stateNumber = 0,
          countryDegree = 0,
          countryNumber = 0,
          theStudent = 0;

        if (subject.major === "مشترك" || subject.major === info.major) {
          for await (let degree of degrees) {
            let thisDegree = 0;
            for await (let student of students) {
              if (student.ssn === degree.ssn && student.state === info.state) {
                thisDegree = 1;
                break;
              }
            }

            for await (let d2 of theDegrees.degrees) {
              if (d2[0] === subject.id) {
                theStudent = d2[1];
              }
            }

            for await (let d2 of degree.degrees) {
              if (d2[0] === subject.name && degree.ssn === ssn) {
                theStudent = d2[1];
              }

              if (d2[0] === subject.id) {
                if (thisDegree) {
                  stateDegree += d2[1];
                  stateNumber++;
                }

                countryDegree += d2[1];
                countryNumber++;
                break;
              }
            }
          }

          stateNumber = (stateNumber === 0) ? 1 : stateNumber;
          countryNumber = (countryNumber === 0) ? 1 : countryNumber;

          stateDegree = (stateDegree / stateNumber).toFixed(2);
          countryDegree = (countryDegree / countryNumber).toFixed(2);

          staticstic.push({name: subject.name, student: theStudent.toFixed(2), state: stateDegree, country: countryDegree});
        }
      }

      for await (let s of staticstic) {
        template2 += `
          <div class="box">
            <div class="title">${s.name}</div>
            <div class="staticstic">
              <div class="row">معدل الطالب</div>
              <div class="row with-columns">
                <div class="column">
                  <div class="progress origin" style="--width: ${s.student + "%"}; --background: #03A9F4"></div>
                </div>
                <div class="column">${s.student}%</div>
              </div>
              <div class="row">متوسط معدل الولاية</div>
              <div class="row with-columns">
                <div class="column">
                  <div class="progress origin" style="--width: ${s.state + "%"}; --background: #4CAF50"></div>
                </div>
                <div class="column">${s.state}%</div>
              </div>
              <div class="row">متوسط معدل السودان</div>
              <div class="row with-columns">
                <div class="column">
                  <div class="progress origin" style="--width: ${s.country + "%"}; --background: #EF5350"></div>
                </div>
                <div class="column">${s.country}%</div>
              </div>
            </div>
          </div>
        `;
      }

      $(".loading-screen").before(`
        <div class="print-certificate">
          <div class="certificate">
            <div class="container">
              <div class="head">
                <div class="icon ministry-icon"></div>
                <div class="ministry-info">
                  <p>جمهورية السودان</p>
                  <p>وزارة التربية والتعليم</p>
                </div>
                <div class="ministry-info">
                  <p>Republic of the Sudan</p>
                  <p>Ministry of Education</p>
                </div>
                <div class="icon ministry-icon"></div>
              </div>
              <div class="body">
                <div class="student-info">
                  <div class="name">الاسم: ${info.name}</div>
                  <div class="major">التخصص: ${info.major}</div>
                  <div class="state">الولاية: ${info.state}</div>
                  <div class="school">المدرسة: ${info.school}</div>
                </div>

                <div class="degrees-table">
                  <div class="details">
                    <div class="column title">المادة</div>
                    <div class="column title">الدرجة</div>
                    ${template1}
                  </div>
                  <div class="final">
                    <div class="column">الدرجة الكلية</div>
                    <div class="column">${totalDegree}%</div>
                  </div>
                </div>

                <div class="statistics">
                  ${template2}
                </div>
              </div>
            </div>
            <div class="warning">أي تعديل أو إضافة أو حذف في هذه الوثيقة يلغيها</div>
          </div>
        </div>
      `);

      $(".student-page").remove();

      $(".print-certificate .certificate").width($(".print-certificate .certificate").height() * 0.75);

      let windowToPage = window.outerWidth / $(".print-certificate .certificate").width();

      if (windowToPage < 1) {
        $("html").css("zoom", ((window.outerWidth / $(".print-certificate .certificate").width()) * 100) - 5 + "%");
      }

      setTimeout(() => {
        $(".loading-screen").fadeOut();
      })
    });
    $(".loading-screen").css("display", "flex")
  });
});
