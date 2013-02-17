if(!List) {
    var sc = document.createElement('script');
    sc.src = "hanzi.test.js";
    document.body.appendChild(sc);
}
if(!List){
    var List = List_str.split(",");
}
var arr = ["中文","中国","淘宝","腾讯","啊","啊哦"];

arr.sort(function(a,b){
    if(a === b) return 0;
    if(a.length > b.length) {
        _a = a; _b = b;
    }
    else {
        _a = b; _b = a;
    }
    var _aKey = '', 
        _bKey = '';

    for(var i = 0; i < _a.length; i++) {
        if(List.indexOf(_a[i]) > List.indexOf(_b[i])) {
            _aKey += '1'; _bKey += '0';
        }
        else {
            _aKey += '0'; _bKey += '1';
        }
    }
    return _aKey - _bKey;
        
        

})
console.log(arr);
