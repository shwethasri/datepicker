function datePicker(datepicker) {
    var curDate = new Date();
    var curYear = curDate.getFullYear();
    var curMonth = curDate.getMonth();
    var day = curDate.getDay();
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var noofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    var calenderDiv = document.getElementById('calenderDiv');
    var table = document.createElement('table');
    table.id = 'calender';
    table.border = 1;
    //getting how many days in month
    var getDays = function(month, year) {
      var days = 0;
      if (month === 1) {
          if (((year % 100) === 0) && ((year % 400) === 0)) {
              days = 29;
          }
          else {
              if ((year % 4) === 0) {
                  days = 29;
              }
              else {
                  days = noofDays[1];
              }
          }
      }
      else {
          days = noofDays[month];
      }
      return days;
    };
    //displaying days in calender
    var displayDays = function(month, year, days) {
      var firstDay = new Date(year, month, 1);//starting day of month
      var startDay = firstDay.getDay();// week id for staring day
      var rows = Math.ceil(days/7);
      //rows in calender
      var digit = 1;
      var dayValue = 1;
      var setMonth = document.getElementById('monthName');
      setMonth.innerHTML = monthNames[month];
      var setYear = document.getElementById('yearName');
      setYear.innerHTML = year;
      for (var m = 0; m < rows; m++) {
          var row = document.getElementById('row'+(m+3) +'');
          row.border = 1;
          for (var j = 0; j < 7; j++) {
              var td = document.getElementById('cell'+ digit +'');
              td.border = 1;
              if ((startDay === 5) && (days === 31)){
                  var t = document.getElementById('cell1');
                  t.innerHTML = days;
              }
              if ((startDay === 6) && (days === 31)){
                  var newValue = document.getElementById('cell1');
                  newValue.innerHTML = days - 1;
                  var newVal = document.getElementById('cell2');
                  newVal.innerHTML = days;
              }
              if ((startDay === 6) && (days === 30)){
                  var tValue = document.getElementById('cell1');
                  tValue.innerHTML = days;
              }
              if (digit <= startDay) {
                  td.innerHTML = "";
                  digit++;
              }
              else {
                  /*if (digit === startDay) {
                      td.innerHTML = dayValue;
                      dayValue++;
                      digit++;
                  }
                  else {*/
                      if (dayValue < days) {
                          if (curDate === dayValue) {
                              td.className = "currentDate";
                          }
                          td.innerHTML = dayValue;
                          dayValue++;
                          digit++;
                      }
                      else {
                        if (dayValue === days) {
                            td.innerHTML = dayValue;
                            dayValue++;
                            digit++;
                        }
                        else {
                          td.innerHTML = "";
                            dayValue = 1;
                            digit = 1;
                        }
                      }
                  //}
              }
          }
      }
    };
    // displaying calender
    var buildCalender = function() {
        //var dp = new datePicker();
        var tr = document.createElement('tr');
        tr.border = 1;
        for ( var i = 0; i < monthNames.length; i++) {
          if (curMonth === i) {
              thead = document.createElement('th');
              thead.border = 1;
              thead.setAttribute('colspan', 7);
              thead.id = "calenderTable";
              thead.innerHTML = '<button onclick="' + datepicker +'.prevMonth()" > &#8249</button>' + '<span id="monthName">'+ monthNames[i] + '</span><span id="yearName"> ' + curYear + '</span><button onclick="' + datepicker +'.nextMonth()" > &#8250</button>';
              tr.appendChild(thead);
              break;
          }
        }
        table.appendChild(tr);
        var t = document.createElement('tr');
        for (var w = 0; w < dayNames.length; w++) {
          var th = document.createElement('th');
          th.innerHTML = dayNames[w];
          t.appendChild(th);
        }
        table.appendChild(t);
        var days = getDays(curMonth, curYear);
        var firstDay = new Date(curYear, curMonth, 1);//starting day of month
        var startDay = firstDay.getDay();// week id for staring day
        var rows = 0;
        if (((startDay === 5) || (startDay === 6)) && (days === 31)) {
            rows = Math.ceil(days/7) + 1;
        }
        else {
            rows = Math.ceil(days/7);
        }
        var digit = 1;
        var dayValue = 1;
        for (var m = 0; m < rows; m++) {
            var row = document.createElement('tr');
            row.id = 'row'+(m+3) +'';
            row.border = 1;
            for (var j = 0; j < 7; j++) {
                var td = document.createElement('td');
                td.border = 1;
                td.id = 'cell'+ digit +'';

                if (digit <= startDay) {
                    td.innerHTML = "";
                    digit++;
                }
                else {
                    /*if (digit === startDay) {
                        td.innerHTML = dayValue;
                        dayValue++;
                        digit++;
                    }
                    else {*/
                        if ((dayValue <= days) && (digit > startDay)) {
                            if (curDate === dayValue) {
                                td.className = "currentDate";
                            }
                            td.innerHTML = dayValue;
                            dayValue++;
                            digit++;
                        }

                          else {
                              td.innerHTML = "";
                              dayValue = 1;
                              digit = 1;
                          }
                    //}
                }
                row.appendChild(td);
            }
            table.appendChild(row);
        }
        calenderDiv.appendChild(table);
    };
    // previous month to the calender
    var prevMonth = function() {
        var getMonthName = document.getElementById('monthName').innerHTML;
        var monthId = monthNames.indexOf(getMonthName);
        var year = parseInt(document.getElementById('yearName').innerHTML);
        var days = 0;
        if ((monthId > 0) && (monthId <= 11)) {
            monthId = monthId - 1;
        }
        else {
            monthId = 11;
            if (year === curYear) {
                year = curYear - 1;
            }
            else {
                year = year - 1;
            }
        }
        days = getDays(monthId, year);
        displayDays(month, year, days);
    };
    // next month to the calender
    var nextMonth = function() {
      var getMonthName = document.getElementById('monthName').innerHTML;
      var monthId = monthNames.indexOf(getMonthName);
      var year = parseInt(document.getElementById('yearName').innerHTML);
      var days = 0;
        if ((monthId >= 0) && (monthId < 11)) {
            monthId = monthId + 1;
        }
        else {
            monthId = 0;
            if (year === curYear) {
                year = curYear + 1;
            }
            else {
                year = year + 1;
            }
        }
        days = getDays(monthId, year);
        displayDays(month, year, days);
    };
}
