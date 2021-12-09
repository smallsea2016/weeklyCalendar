"use strict";
/**
  * 周历控件
  * @param {string} container 必选,容器选择器
  * @param {date} options.defaultDate  可选,初始日期，默认为当前年月日
  * @param {Array} options.disabledDate  可选,不可用的日期
  * @param {Array} options.toDoDate  可选,待办日期
  * @param {function} options.clickDate 点击日期的回调，携带参数为对象形式,包含年月日
  * @param {function} options.getSelectedDate 获取选中的值,默认获取当天日期,携带参数为对象形式,包含年月日
*/
function weeklyCalendar(container,options) {
  var options = options || {};
  /*简化选择器操作*/
  var $$ = function (selector) {
    return document.querySelector(container + ' [role=' + selector + ']');
  }
  /**
   * 补零
  */
  var zeroize = function(n){
    var r = (n < 10 ? "0" + n : n);
    return r
  };

  var d = options['defaultDate'] ? new Date(options['defaultDate']) : new Date();
  var activeDay =  d.getDay(),
    activeDate = zeroize(d.getDate()),
    activeMonth = zeroize(d.getMonth() + 1),
    activeYear = d.getFullYear();
  var lis = $$('weeklyCalendarView').getElementsByTagName('li'),
    aTags = $$('weeklyCalendarView').getElementsByTagName('a');

  /*创建星期*/
  var creatWeek = function () {
    var span = '';
    var weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    for (var i = 0, len = weeks_ch.length; i < len; i++) {
      span += '<li>' + weeks_ch[i] + '</li>';
    };
    $$('weeks_ch').innerHTML = span;
  }
  creatWeek();

  /*动态设置年月*/
  var setYearMonth = function () {
    $$('year_selector').innerHTML = zeroize(parseInt(aTags[0].dataset.year));
    $$('month_selector').innerHTML = zeroize(parseInt(aTags[0].title));
  }

  /**
    * 计算过去或者是未来时间
    * @param {return} obj 返回的月份和日期  
    * @param {number} num 过去或者是未来的某天
  */
  var calcTime = function (num) {
    var num = num || 0,
      someTime = d.getTime() + (24 * 60 * 60 * 1000) * num,
      someYear = new Date(someTime).getFullYear(),
      someMonth = zeroize(new Date(someTime).getMonth() + 1), //未来月
      someDate = zeroize(new Date(someTime).getDate()); //未来天
    var obj = {
      "year": someYear,
      "month": someMonth,
      "date": someDate
    };
    return obj;
  }

  /**
   * 创建周历
   * @param {Number} someDay 星期几
  */
  var creatWeekCalendar = function (someDay) {
    var _d = new Date();
    var currDate = zeroize(_d.getDate()),
      currMonth = zeroize(_d.getMonth() + 1),
      currYear = _d.getFullYear();    
    var a = '';
    for (var i = someDay, len = someDay + 7; i < len; i++) {
        //当天日期
      if (calcTime(i).year === currYear && calcTime(i).month === currMonth && calcTime(i).date === currDate) {
        a += '<li class="active" data-role="active"><a href="javascript:;" data-year="' + calcTime(i).year + '" data-month="' + calcTime(i).month + '" data-date="' + calcTime(i).date + '"  title="' + calcTime(i).month + '月">' + calcTime(i).date + '</a></li>';
      }else if//选中的日期
       (calcTime(i).year === activeYear && calcTime(i).month === activeMonth && calcTime(i).date === activeDate) {
        a += '<li class="clickActive"><a href="javascript:;" data-year="' + calcTime(i).year + '" data-month="' + calcTime(i).month + '" data-date="' + calcTime(i).date + '" title="' + calcTime(i).month + '月">' + calcTime(i).date + '</a></li>';
      } else {
        a += '<li><a href="javascript:;" data-year="' + calcTime(i).year + '" data-month="' + calcTime(i).month + '" data-date="' + calcTime(i).date + '" title="' + calcTime(i).month + '月">' + calcTime(i).date + '</a></li>';
      }
    };
    $$('weeklyCalendarView').innerHTML = a;
  }

  /*设置日期状态*/
  var setStatus = function(type){
      var typeMap = {
        disabledDate: 'is-disabled',
        toDoDate:'is-todo'
      }
      var arr = options[type] || []; //禁用日期数组
      var splitArr = null, arrYear = null, arrMonth = null, arrDate = null;
      var maxLen = 366;
      if (arr.length > maxLen) {
        throw new Error('不可选日期天数限制' + maxLen +'天内')
      }
      //禁用的日期
      if (arr.length) {          
        for (var index = 0; index < arr.length; index++) {
          splitArr = arr[index].split('-');
          arrYear = splitArr[0];
          arrMonth = splitArr[1];
          arrDate = splitArr[2];
          // console.log(arrYear, arrMonth, arrDate)
          for (var j = 0; j < aTags.length; j++) {
            // console.log(aTags[j].dataset.year, aTags[j].dataset.month, aTags[j].dataset.date);
            if ((arrYear === aTags[j].dataset.year) && (arrMonth === aTags[j].dataset.month) && (arrDate === aTags[j].dataset.date)) {
              aTags[j].classList.add(typeMap[type])
            }
          }
        }
      }
  }

  /*初始化周历*/
  var init = function () {
    creatWeekCalendar(-activeDay);
    setYearMonth();
    setStatus('disabledDate');
    setStatus('toDoDate');
  }
  init()

  //设置初始点击次数
  $$('weeklyCalendarView').setAttribute('clickedTimes', 0);
  //获取点击次数
  var clickedTimes = $$('weeklyCalendarView').getAttribute('clickedTimes');
  var weekNum = $$('week_selector').getAttribute('week');
  /*前一周和后一周方法*/
  var changeWeek = function (clickedTimes, weekNum) {
    creatWeekCalendar(-activeDay - (7 * clickedTimes));
    $$('weeklyCalendarView').setAttribute('clickedTimes', clickedTimes);   
    setYearMonth();
    setStatus('disabledDate');
    setStatus('toDoDate');
    //动态设置周，这里周计算有点问题，所以周已经隐藏了，周设置属性，仅作为点击前一周和后一周计算的时候显示周视图
    $$('week_selector').innerHTML = weekNum;
    $$('week_selector').setAttribute('week', weekNum);
  }

  /*前一周*/
  $$('prev_week').onclick = function () {
    clickedTimes++;
    weekNum--;
    changeWeek(clickedTimes, weekNum);
  }

  /*后一周*/
  $$('next_week').onclick = function () {
    clickedTimes--;
    weekNum++;
    changeWeek(clickedTimes, weekNum);
  }

  /*选择日期*/
  var selectedYear = null,
      selectedMonth = null,
      selectedDate = null,
      selectedDateTime = {};
  $$('weeklyCalendarView').onclick = function (e) {
    var tagName = e.target.tagName.toLowerCase();
    if (tagName === "a") {
      for (var i = 0, len = lis.length; i < len; i++) {
        lis[i].className = '';
        if ((lis[i].className.indexOf('clickActive') < 0) && lis[i].dataset.role === 'active'){
          lis[i].className = 'active';
        }
      }
      e.target.parentNode.className = "clickActive";
      selectedYear = e.target.getAttribute('data-year');
      selectedMonth = zeroize(parseInt(e.target.title));
      selectedDate = e.target.innerHTML;
      selectedDateTime = {
        "year": selectedYear,
        "month": selectedMonth,
        "date": selectedDate
      }
      options['clickDate'] && options['clickDate'](selectedDateTime);
      options['getSelectedDate'] && options['getSelectedDate'](selectedDateTime)
    }
  }

  if (!selectedYear) {
    selectedDateTime = {
      "year": activeYear,
      "month": activeMonth,
      "date": activeDate
    }
    options['getSelectedDate'] && options['getSelectedDate'](selectedDateTime)
  }
}
