function datePicker(){
    var curDate = new Date();
    var year = curDate.getFullYear();
    var curMonth = curDate.getMonth();
    var day = curDate.getDay();
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September','October', 'November', 'December'];
    var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var calenderDiv = document.getElementById('calender');
    var table = document.createElement('table');
    table.id = 'calender';

    var displayDays = function(mon, number){
      var firstDay = new Date(year, mon, 1);
      var startDay = firstDay.getDay();
    };
    var showCalender = function(month){
        var num = 0;
        for(var l = 0; l <= 11; l++)
        {
            if(month === l)
            {
               if((month === 3) || (month === 5) || (month === 8) || (month === 10))
               {
                  num =30;
               }
               else{
                  if(month === 1)
                  {
                      if(((year%4) === 0) || ((year%100) !== 0) || ((year%400) === 0))
                      {
                          num = 29;
                      }
                      else{
                          num = 28;
                      }
                  }
                  else{
                      num = 31;
                  }
               }
            }
        }
        var dp =new datePicker();
        var tr = document.createElement('tr');
        for ( var i = 0; i < monthNames.length; i++)
        {
          if(month === i)
          {
            var thead = document.createElement('th');
            thead.innerHTML = '<button onclick="' + dp +'.prevMonth()" > &#003c</button>' + monthNames[i] + ' ' + year + '<button onclick="' + dp +'.nextMonth()" > &#003e</button>';
            tr.appendChild(thead);
            break;
          }
        }
        table.appendChild(tr);
        buildCalender();
        displayDays(month, num);
    };
    var prevMonth = function(){
        if((curMonth > 0) && (curMonth < 11))
        {
            showCalender((curMonth - 1));
        }
    };
    var nextMonth = function(){
        if(curMonth < 11)
        {
            showCalender((curMonth + 1));
        }
    };
    var buildCalender = function(){
        var t = document.createElement('tr');
        for(var j = 0; j < dayNames.length; j++)
        {
          var th = document.createElement('th');
          th.innerHTML = dayNames[j];
          t.appendChild(th);
        }
        table.appendChild(t);
    };
    calenderDiv.appendChild(table);
}
