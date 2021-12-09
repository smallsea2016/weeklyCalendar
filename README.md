# weeklyCalendar
>weeklyCalendar，周历控件。

纯js，不依赖第三方库<br/>
支持设置默认选中日期<br/>
支持设置禁用日期<br/>

##### js使用示例:
```js
  // 默认周历
  weeklyCalendar('#j_weeklyCalendar',{
     //点击日期回调
    clickDate:function(dateTime){
      console.log(dateTime);
    }
  });  
  
  //设置默认选中日期
  weeklyCalendar('#j_weeklyCalendar2',{
    defaultDate:'2019-01-31',
    //获取选中日期
    getSelectedDate:function(dateTime){  
      console.log("selected",dateTime);
    }
  });  

  //设置禁用日期
  weeklyCalendar('#j_weeklyCalendar3',{
    disabledDate:['2019-01-18','2019-01-19','2019-01-20'],
    clickDate:function(dateTime){
      console.log(dateTime);
    }
  });  

  //设置待办日期
  weeklyCalendar('#j_weeklyCalendar4',{
    toDoDate:['2021-12-13','2021-12-15'],
    clickDate:function(dateTime){
      console.log(dateTime);
    }
  }); 
```
