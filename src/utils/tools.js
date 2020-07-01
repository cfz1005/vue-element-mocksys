export let formatDate = (date) => {
    date = new Date(date);
    let yy = date.getFullYear();
    let mm = date.getMonth() + 1;
    let dd = date.getDate();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    mm = mm > 10 ? mm : "0" + mm;
    dd = dd > 10 ? dd : "0" + dd;
    h = h > 10 ? h : "0" + h;
    m = m > 10 ? m : "0" + m;
    s = s > 10 ? s : "0" + s;

    return yy + "-" + mm + "-" + dd + " " + h + ":" + m + ":" + s;
}


export let getDateDiff = (timeStamp) => {
    var _minute = 1000 * 60;
    var _hour = _minute * 60;
    var _day = _hour * 24;
    var _halfamonth = _day * 15;
    var _month = _day * 30;
    var _now = new Date().getTime();
    var _diffValue = _now - timeStamp;
    var result = '';
    if (_diffValue < 0) {
        return formatDateTime(timeStamp);
    };
    var _yearC = _diffValue / (12 * _month)
    var _monthC = _diffValue / _month;
    var _weekC = _diffValue / (7 * _day);
    var _dayC = _diffValue / _day;
    var _hourC = _diffValue / _hour;
    var _minC = _diffValue / _minute;
    if (new Date().getFullYear() != new Date(timeStamp).getFullYear()) {      // 不是当年的
        result = formatDateTime(timeStamp, "y-m-d h:m");
    } else if (_dayC > 1) {                                                 // 当年非当天的
        result = formatDateTime(timeStamp, "m-d h:m");
    } else if (_hourC >= 1) {
        result = "" + parseInt(_hourC) + "小时前";
    } else if (_minC >= 1) {
        result = "" + parseInt(_minC) + "分钟前";
    } else
        result = "刚刚";
    return result;

}

export let formatDateTime = (timeStamp, format) => {
    var date = new Date();
    date.setTime(timeStamp);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;

    if (format) {
        if (format == "y-m-d")
            return y + '-' + m + '-' + d;
        else if (format == "y-m-d h:m")
            return y + '-' + m + '-' + d + " " + h + ":" + minute;
        else if (format == "m-d h:m")
            return m + '-' + d + " " + h + ":" + minute;
    } else {
        return y + '-' + m + '-' + d + " " + h + ":" + minute;
    }
}

export let copyText = (text) => {
    const input = document.createElement("input");
    input.setAttribute("value", text);
    input.setAttribute("readonly", "readonly");
    document.body.appendChild(input);

    input.select();
    if (input.setSelectionRange) {
        input.setSelectionRange(0, 99999);
    }

    let flag = false;
    if (document.execCommand) {
        document.execCommand("copy");
        flag = true;
    }
    document.body.removeChild(input);

    return flag;
}