/**
 * @fileoverview 格式化日期字符串
 * @author zhangting <zhangting@taobao.com>
 *
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
            }
        }
    }, DATE_PATTERN);

    var formatHandle = function() {

        return {
            decorate: function(date, formatString, cfg) {
                var la = cfg && LANG[cfg.lang] ? LANG[cfg.lang] : LANG.CN;
                if(!formatString) {
                    formatString = DATE_PATTERN.DATE_FMT_3;
                }
                /*
                var d = {
                    "M+" : date.getMonth()+1, //月份
                    "d+" : date.getDate(), //日
                    "h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
                    "H+" : date.getHours(), //小时
                    "m+" : date.getMinutes(), //分
                    "s+" : date.getSeconds(), //秒
                    "q+" : Math.floor((date.getMonth()+3)/3), //季度
                    "S" : date.getMilliseconds() //毫秒
                };

                if(/(y+)/.test(formatString)){
                    formatString=formatString.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
                }

                if(/(E+)/.test(formatString)){
                    formatString=formatString.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "\u661f\u671f" : "\u5468") : "")+week[date.getDay()+""]);
                }
                for(var k in d){
                    if(new RegExp("("+ k +")").test(fmt)){
                        formatString = formatString.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                    }
                }

                */

                var o = {};

                o[formatString.match(/y+/)] = date.getFullYear();
                o[formatString.match(/M+/)] = date.getMonth()+1;
                o[formatString.match(/d+/)] = date.getDate();


                var yearKey = formatString.match(/y+/);
                if(yearKey) {
                    formatString = formatString.replace(/(y+)/, "{$1}");
                }

                formatString = formatString.replace(/(M+)/, "{$1}");
                formatString = formatString.replace(/(d+)/, "{$1}");
                formatString = formatString.replace(/(H+)/, "{$1}");
                formatString = formatString.replace(/(m+)/, "{$1}");
                formatString = formatString.replace(/(s+)/, "{$1}");

                return S.substitute(formatString, o);

            }
        }
    }();

    S.mix(DateFormat, LANG);

    S.namespace("Util");
    S.Util.DateFormat = DateFormat;

    return DateFormat;
});