// Your code here
function createEmployeeRecord(array) {
    let Obj = {
        firstName: `${array[0]}`,
        familyName: `${array[1]}`,
        title: `${array[2]}`,
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return Obj
}
function createEmployeeRecords(nestedArr) {
    return nestedArr.map(createEmployeeRecord)
}



function createTimeInEvent(record, dateStamp) {
    let Obj = {
        type: "TimeIn",
        hour: Number(dateStamp.substr(dateStamp.length - 4)),
        date: `${dateStamp.substring(0, 10)}`
    }
    record.timeInEvents.push(Obj)
    return record

}

function createTimeOutEvent(record, dateStamp) {
    let Obj = {
        type: "TimeOut",
        hour: Number(dateStamp.substr(dateStamp.length - 4)),
        date: `${dateStamp.substring(0, 10)}`
    }
    record.timeOutEvents.push(Obj)
    return record
}

function hoursWorkedOnDate(record, datework) {
    let In, Out
    for (let i = 0; i < record.timeInEvents.length; i++) {

        if (record.timeInEvents[i].date === datework) {
            In = record.timeInEvents[i].hour 
        }
        
    }
    for (let i = 0; i < record.timeOutEvents.length; i++) {
        if (record.timeOutEvents[i].date === datework) {
            Out = record.timeOutEvents[i].hour  
        }
    }
    return (Out - In)/100
}

function wagesEarnedOnDate(record,date){
    let wage = record.payPerHour
    return hoursWorkedOnDate(record,date)*wage
}

function allWagesFor(record) {
    const date_array=[]
    for (let i = 0; i < record.timeInEvents.length; i++) {
        date_array.push(record.timeInEvents[i].date)
    }
   let sumAlldates = []
    for (let i = 0; i < date_array.length; i++) {
      sumAlldates.push(wagesEarnedOnDate(record,date_array[i]))
    
    }
    return sumAlldates.reduce((a,b)=>a+b)
 
}

function calculatePayroll(Array){
    let payroll_amount=0
    for (let i = 0; i < Array.length; i++) {
        payroll_amount = payroll_amount + allWagesFor(Array[i])
    //    return Array[i].reduce((a,b)=> a+b)
    }
   return payroll_amount
}