// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  let timeInEvents = [];
  let timeOutEvents = [];
  //   console.log(payPerHour);
  return { firstName: `${firstName}`, familyName: `${familyName}`, title: `${title}`, payPerHour: payPerHour, timeInEvents, timeOutEvents };
}

function createEmployeeRecords(array) {
  let arr = [];
  for (let i = 0; i < array.length; i++) {
    let a = Object.assign({}, array[i]);

    arr.push(createEmployeeRecord(Object.values(a)));
    // console.log(createEmployeeRecord(Object.values(a)))
  }
  return arr;
}

function createTimeInEvent(obj, date) {
  // console.log(date)
  const d = date.substring(0, date.indexOf(" "));
  const h = date.substring(date.indexOf(" ") + 1);
  obj.timeInEvents.push({ type: "TimeIn", hour: parseInt(h), date: d });
  return obj;
}
function createTimeOutEvent(obj, date) {
  // console.log(date)
  const d = date.substring(0, date.indexOf(" "));
  const h = date.substring(date.indexOf(" ") + 1);
  // console.log(d);
  // console.log(h);
  obj.timeOutEvents.push({ type: "TimeOut", hour: parseInt(h), date: d });
  return obj;
}

function hoursWorkedOnDate(obj, date) {
  // console.log(date)
  // console.log(obj)
  // console.log(obj.timeInEvents[0].hour)
  //  console.log(obj.timeOutEvents[0].hour)

  let timeOut = obj.timeOutEvents.find(function (e) {
    let validation = e.date === date;
    return validation;
  });
  let timeIn = obj.timeInEvents.find(function (e) {
    let validation = e.date === date;
    return validation;
  });
  // console.log(timeOut.hour);
  // console.log(timeIn.hour);
  return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(obj, date) {
  // console.log(date)
  //  console.log(obj)
  //  console.log(hoursWorkedOnDate(obj,date))
  let workHour = hoursWorkedOnDate(obj, date);
  let payRate = obj.payPerHour;

  return payRate * workHour;
}

function allWagesFor(Object) {
  let payTime = Object.timeInEvents.map(function (e) {
    return e.date;
  });
  const payable = payTime.reduce(function (memo, d) {
    return memo + wagesEarnedOnDate(Object, d);
  }, 0);
  return payable;
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find(function (e) {
    e.firstName === firstName;
  });
}

function calculatePayroll(array) {
  return array.reduce(function (memo, d) {
    // console.log(allWagesFor(d));
    return memo + allWagesFor(d);
  }, 0);
}
