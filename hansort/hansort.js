/**
 * @fileoverview 支持汉字拼音的排序
 * @desc 提供 数组/列表 按拼音或 Unicode 编码排序。因为在不支持默认拼音排序的
 *       操作系统里需要加载一个 50k+(压缩后) ~ 80k+ 的汉字列表，所以慎用
 * @author 筱谷 <xiaogu.gxb@taobao.com>
 */

//筛选字符，低位用 sort()，汉字区间用 pinyinsort()，高位还是用回 sort();
//换了方法，直接在 pinyinSort 里对比高低位字节码的方式搞定了；

KISSY.add('util/hansort', function(S, D) {

    var defaultCfg = {
            orderBy: "Pinyin",
            sort: 0
        },
    systemSort = 0,
    testArr = ["\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d","\u4e03"];


    //还是决定在初始阶段就判断系统默认的排序算法
    testArr.sort(function(a, b){return a.localeCompare(b)});
    if(testArr.toString() == ["\u4e8c", "\u516d", "\u4e03", "\u4e09", "\u56db", "\u4e94", "\u4e00"].toString()) {
      systemSort = 2;
    }
    else {
      // 先请求 Pinyinsort
      S.getScript('pinyinsort.js');
      if(testArr.toString() == ["\u4e00", "\u4e03", "\u4e09", "\u4e8c", "\u4e94", "\u516d", "\u56db"].toString()) {
        systemSort = 1;
      }
    }

  
  /**
   * 功能
   * @param {Object} [arr = HTMLElement|Array] 需要排序的列表，可以是列表（ul/ol/select），也可以是 NodeList 或 数组
   * @param {Object} [cfg = {orderBy: 0 System| 1 Unicode| 2 Pinyin, sort: 0 ASC| 1 DESC}]  
   * @return {Array} 排好序的数组
   */
  function hanSort(el, cfg){
    //首先把 el 对象标准化，全转成数组，单个格式为 [key, textcontent, rawcontent]；
    var compareArr = [],
      returnArr = [];
    if(!S.isArray(el) && el) {
      if(S.isString(el) && /^(?:#([\w-]+))?\s*([\w-]+|\*)?\.?([\w-]+)?$/i.test(el))
        el = D.get(el);
      var _nn = "";
      if(_nn = el.nodeName()){
        if(_nn == "ol" || _nn == "ul") {
          S.each(D.query('li', el), function(item, key){
            this.push([key, D.text(item), item]);
          }, compareArr)
        }
        else if(_nn == "select") {
          S.each(D.query('option', el), function(item, key){
            this.push([key, D.text(item), item]);
          }, compareArr)          
        }
      }
    }
    else {
      S.each(el, function(item, key){
        var text = !S.isString(item)?D.text(item):item;
        this.push([key, text, item]);
      }, compareArr)
    }
    if(!compareArr) {
      S.log("Invail format or empty data", "Error");
    }

    //覆盖配置参数
    cfg = S.merge(defaultCfg, cfg);

    //然后判断排序方式；
    if(cfg.orderBy == 0 || cfg.orderBy == "System") {
      compareArr.sort(function(a,b){
        return a.localeCompare(b)
      })
    }
    else if(cfg.orderBy == 1 || cfg.orderBy == "Unicode") {
      if(systemSort == 0) {
        compareArr.sort(function(a,b){
          return a[1].localeCompare(b[1])
        })
      }
      else {
        compareArr.sort(function(a,b){
            if(a[1] === b[1]) return 0;
            var _aKey = '',
                _bKey = '',
                _len  = a[1].length > b[1].length? a[1].length : b[1].length;

            for(var i = 0; i < _len; i++) {
                var _k = a[1].charCodeAt(i) - b[1].charCodeAt(i);
                if(_k > 0) {
                    _aKey += '1'; _bKey += '0';
                }
                else if(_k < 0) {
                    _aKey += '0'; _bKey += '1';
                }
            }
            return _aKey - _bKey;
            })
      }
    }
    else if(cfg.orderBy == 2 || cfg.orderBy == "Pinyin") {
      if(systemSort == 2) {
        compareArr.sort(function(a,b){
          return a[1].localeCompare(b[1])
        })
      }
      else {
          //这个地方可能会出现使用时 pinyinsort 还未完全加载的情况。
//          S.Util.pinyinsort(compareArr)
          if(!window.PINYINSORT)
            arguments.callee(el, cfg)
          else
            window.PINYINSORT(compareArr);
      }
    }

    //最后根据正反序返回数组；
    for(var i = 0; i < compareArr.length; i++){
      returnArr.push(compareArr[i][2]);
    }
    if(cfg.sort == 1 || cfg.sort == "DESC") returnArr.reverse();
    return returnArr;

  }
  
  //兼容老版本kissy
    S.namespace("Util");
    S.Util.hansort=hanSort;

    return hanSort;
}, {
    requires: ["dom"]
});

//必需先 use 一下以加载 pinyinsort，在 kissy 1.3 中 attach 全是 false
KISSY.use('util/hansort', function() {});

