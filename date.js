//获取某一时间戳的凌晨时间戳

let date = new Date(1563270632485)
let year = date.getFullYear();
let month = date.getMonth() + 1;
let day = date.getDate();
let dateStr = [year, month, day].join('-');
let timestamp = new Date(dateStr);
timestamp.getTime();