var date_options = [{ month: "2-digit", day: "2-digit", year: "numeric" }];
var date_options_date = { month: "long", day: "2-digit", year: "numeric" };
var hour_options = [
  { hour: "2-digit", minute: "2-digit", second: "2-digit", hourCycle: "h12" },
];
class MyDateTimeService {
  parseTimeString({ timeString }) {
    var time = new Date(timeString);
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(time);
    }
    var result = new Intl.DateTimeFormat("en", { weekday: "short" }).format(
      time
    );
    result += " " + date_options.map(format).join("/");
    result += " at " + hour_options.map(format).join(":");
    return result;
  }
  parseTimeStringToDate({ timeString }) {
    var time = new Date(timeString);
    return new Intl.DateTimeFormat("en", date_options_date).format(time);
  }
  getTimeDifference({ timeString }) {
    var diff = (Date.now() - Date.parse(timeString)) / 1000;
    if (diff < 60) {
      return Math.floor(diff) + "s";
    }
    var min = Math.floor(diff / 60);
    if (min < 60) {
      return min + "m";
    }
    var hour = Math.floor(min / 60);
    if (hour < 24) {
      return hour + "h";
    }
    var day = Math.floor(hour / 24);
    if (day < 30) {
      return day + "d";
    }
    var month = Math.floor(day / 30);
    if (month < 12) {
      return month + "mth";
    } else {
      return Math.floor(month / 12) + "y";
    }
  }
  getLongTimeDifference({ timeString }) {
    var diff = (Date.now() - Date.parse(timeString)) / 1000;
    if (diff < 60) {
      if (diff == 1) {
        return Math.floor(diff) + " second ago";
      } else {
        return Math.floor(diff) + " seconds ago";
      }
    }
    var min = Math.floor(diff / 60);
    if (min < 60) {
      if (min == 1) {
        return min + " minute ago";
      } else {
        return min + " minutes ago";
      }
    }
    var hour = Math.floor(min / 60);
    if (hour < 24) {
      if (hour == 1) {
        return hour + " hour ago";
      } else {
        return hour + " hours ago";
      }
    }
    var day = Math.floor(hour / 24);
    if (day < 30) {
      if (day == 1) {
        return day + " day ago";
      } else {
        return day + " days ago";
      }
    }
    var month = Math.floor(day / 30);
    if (month < 12) {
      if (month == 1) {
        return month + " month ago";
      } else {
        return month + " months ago";
      }
    } else {
      if (month == 12) {
        return Math.floor(month / 12) + " year ago";
      } else {
        return Math.floor(month / 12) + " years ago";
      }
    }
  }
}

export default new MyDateTimeService();
