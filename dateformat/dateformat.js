/**
 * @fileoverview 格式化日期字符串
 * @author zhangting <zhangting@taobao.com>
 * @version 0.1
 */
KISSY.add('util/dateformat', function(S) {

    var DATE_PATTERN = {
        TIME_PATTERN:"yyyy-MM-dd HH:mm:ss",
        TIME_PATTERN_SHORT:"dd/MM/yy HH:mm:ss",
        TIME_PATTERN_SHORT_1:"yyyy/MM/dd HH:mm",
        TIME_PATTERN_SESSION:"yyyyMMddHHmmss",
        DATE_FMT_0:"yyyyMMdd",
        DATE_FMT_1:"yyyy/MM/dd",
        DATE_FMT_2:"yyyy/MM/dd hh:mm:ss",
        DATE_FMT_3:"yyyy-MM-dd"
    };

    var LANG = {
        CN:'CN',
        EN:'EN'
    };

    var DateFormat = S.mix({
        format:function(date, formatString, cfg) {
            if(date instanceof Date) {
                return formatHandle.decorate(date, formatString, cfg);
            } else {
                //TODO string to date
                S.log('date parameter is not an instance of Date', 'info');
            }
        }
    }, DATE_PATTERN);

    var WEEK = {};

    WEEK[LANG.CN] = [
        '日','一','二','三','四','五','六'
    ];

    WEEK[LANG.EN] = [
        ['Sun','Mon','Tue','Wed','Thur','Fri','Sat'],
        ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    ];

    var MONTH = [
        ['Jan.','Feb.','Mar.','Apr.','May.','June.','July.','Aug.','Sept.','Oct.','Nov.','Dec.'],
        ['January','February','March','April','May','June','July','August','September','October','November','December']
    ];

    var formatHandle = function() {

        return {
            decorate: function(date, formatString, cfg) {
                var la = cfg && LANG[cfg.lang] ? LANG[cfg.lang] : LANG.CN;
                if(!formatString && formatString!= '') {
                    formatString = DATE_PATTERN.DATE_FMT_3;
                }

                var o = {
                    "M+" : date.getMonth()+1, //月份
                    "d+" : date.getDate(), //日
                    "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
                    "H+" : date.getHours(), //小时
                    "m+" : date.getMinutes(), //分
                    "s+" : date.getSeconds(), //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S+" : date.getMilliseconds() //毫秒
                };

                while(/(y+)/.test(formatString)){
                    formatString=formatString.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                }

                while(/(M+)/.test(formatString)){
                    var mon = date.getMonth()+1;
                    if(la === LANG.EN) {
                        formatString = formatString.replace(RegExp.$1, (RegExp.$1.length>1) ? MONTH[1][mon] : MONTH[0][mon]);
                    } else {
                        formatString = formatString.replace(RegExp.$1, (RegExp.$1.length==1) ? (mon) : (("00"+ mon).substr((""+ mon).length)));
                    }
                }

                for(var k in o){
                    while(new RegExp("("+ k +")").test(formatString)){
                        formatString = formatString.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                    }
                }

                while(/(E+)/.test(formatString)){
                    if(la === LANG.EN) {
                        formatString=formatString.replace(RegExp.$1, (RegExp.$1.length>1 ? WEEK[la][1][date.getDay()+""] : WEEK[la][0][date.getDay()+""]));
                    } else {
                        formatString=formatString.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+WEEK[la][date.getDay()+""]);
                    }
                }

                return formatString;
            }
        }
    }();

    S.mix(DateFormat, LANG);

    S.namespace("Util");
    S.Util.DateFormat = DateFormat;

    return DateFormat;
});