function datePicker() {
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
    var getDays = function(month, year) {
      var days = 0;
      if (month === 1) {
          if (((year % 100) === 0) && ((year % 400) === 0)){
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
    // displaying calender
    var showCalender = function(month, year, days) {
        //var dp = new datePicker();
        var tr = document.createElement('tr');
        tr.border = 1;
        var datepicker = new datePicker();
        for ( var i = 0; i < monthNames.length; i++)
        {
          if (month === i)
          {
              thead = document.createElement('th');
              thead.border =1 ;
              thead.colspan = 7;
              thead.rowspan = 1;
              thead.id = "calenderTable";
              thead.innerHTML = '<button onclick="' + datepicker +'.prevMonth()" > &#8249</button>' + '<span id="monthName">'+ monthNames[i] + '</span><span id="yearName"> ' + year + '</span><button onclick="' + datepicker +'.nextMonth()" > &#8250</button>';
              tr.appendChild(thead);
              break;
          }
        }
        table.appendChild(tr);
        var t = document.createElement('tr');
        for (var w = 0; w < dayNames.length; w++)
        {
          var th = document.createElement('th');
          th.innerHTML = dayNames[w];
          t.appendChild(th);
        }
        table.appendChild(t);

        var firstDay = new Date(year, month, 1);//starting day of month
        var startDay = firstDay.getDay();// week id for staring day
        var rows = Math.ceil(days/7);
        var digit = 1;
        var dayValue = 1;
        for (var m = 0; m < rows; m++)
        {
            var row = document.createElement('tr');
            row.id = '"'+(m+2) +'"row"';
            row.border = 1;
            for (var j = 0; j < 7; j++)
            {
                var td = document.createElement('td');
                td.border = 1;
                if (digit < startDay)
                {
                    td.innerHTML = "";
                }
                else {
                    if (digit === startDay)
                    {
                        td.innerHTML = dayValue;
                        dayValue++;
                        digit++;
                    }
                    else {
                        if (dayValue < days)
                        {
                            td.innerHTML = dayValue;
                            dayValue++;
                            digit++;
                        }
                        else{
                          if (dayValue === days)
                          {
                              td.innerHTML = dayValue;
                              dayValue++;
                              digit++;
                          }
                          else {
                              dayValue = 1;
                              digit = 1;
                              break;
                          }
                        }
                    }
                }
                row.appendChild(td);
            }
            table.appendChild(row);
        }
    };
    /*var t1 = document.createElement('tr');
    var thead = document.createElement('th');
    thead.innerHTML = '<button onclick="' + dp +'.prevMonth()" > &#8249</button>' + '<span id="monthName">'+ monthNames[curMonth] + '</span><span id="yearName"> ' + curYear + '</span><button onclick="' + dp +'.nextMonth()" > &#8250</button>';
    t1.appendChild(thead);
    table.appendChild(t1);
    var t = document.createElement('tr');
    for (var j = 0; j < dayNames.length; j++)
    {
      var th = document.createElement('th');
      th.innerHTML = dayNames[j];
      t.appendChild(th);
    }
    table.appendChild(t);*/
    var number = getDays(curMonth, curYear);
    showCalender(curMonth, curYear, number);
    // previous month to the calender
    var prevMonth = function() {
        var mn = document.getElementById('monthName');
        var monthid = monthNames.indexOf(mn);
        var year = document.getElementById('yearName');
        if ((monthid > 0) && (monthid < 11))
        {
            var days =getDays(month, year);
            showCalender((monthid - 1), year, days);
        }
        else {
            monthid = 11;
            year = year - 1;
            var daysCal =getDays(month, year);
            showCalender(monthid, year);
        }
    };
    // next month to the calender
    var nextMonth = function() {
      var mn = document.getElementById('monthName');
      var monthid = monthNames.indexOf(mn);
        if (monthid < 11)
        {
            var days =getDays(month, curYear);
            showCalender((monthid + 1), year, days);
        }
        else{
            monthid = 0;
            year = year + 1;
            var daysCal =getDays(month, curYear);
            showCalender(monthid, year, daysCal);
        }
    };
    calenderDiv.appendChild(table);
}
