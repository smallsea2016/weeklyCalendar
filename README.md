# weeklyCalendar
### weeklyCalendar(selector,object)
>weeklyCalendar，周历控件。

纯js，不依赖第三方库  
支持设置默认选中日期  
支持设置禁用日期  

### Attributes

| 参数                    | 说明                  | 类型     | 可选值 | 默认值 |
| ----------------------- | -------------------- | -------- | ------| ------- |
| selector                | 选择器                | String   | -    | -        | 
| object.isStartMon       | 是否从周一开始        | Boolean   | -    | -        | 
| object.toDoDate         | 设置待办日期          | Array    | -     | -        | 
| object.disabledDate     | 设置禁用日期          | Array    | -     | -        |  
| object.clickDate        | 点击日期回调          | Function | -     | dateTime |  
| object.getSelectedDate  | 获取选中日期          | Function | -     | dateTime |  
  

  
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

  
  //设置周一开始
    weeklyCalendar('#j_weeklyCalendar5',{        
      isStartMon: true
  }); 
```
