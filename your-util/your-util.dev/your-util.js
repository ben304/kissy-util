/**
 * @fileoverview function
 * @desc function description
 * @author your-name<your-email>
 */
 
 //代码开发阶段后u请保留文件夹的“.dev”后缀
 //代码完成开发后，即可去掉文件夹的“.dev”后缀，并在kissy-util文件夹下的index.html里添加上你的链接
 //如果你的demo需要编写DOM，建议使用kissy-dpl/base/里的代码以节约开发时间


KISSY.add('util/your-util', function(S) {

    var D = S.DOM, E = S.Event, doc = document;
	
	//定义变量和常量
	
	/**
	 * 功能
	 * @param {String} [triggerCls = 'S_ViewCode'] 触发元素的class。注释具体格式参见jsdoc规范。
	 * @return
	 */
	function yourUtil(param){
		
		//参数处理
		
		//方法主体		
	}
	
	//私有方法
	
	//兼容老版本kissy
    S.namespace("Util");
    S.Util.yourUtil=yourUtil;

    return yourUtil;
});

/**
 * NOTE:
 * 		2011.mm.dd
 * 		-your note
 */
