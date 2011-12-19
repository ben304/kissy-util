/**
 * @fileoverview placeHolder的js实现
 * @author 张挺 <zhangting@taobao.com>
 *
 */
KISSY.add('util/placeholder', function(S) {

    var $=S.all,
        WRAP_TMPL='<div class="placeholder" style="position: relative;display:'+(S.UA.ie>7?'inline-block':'inline')+';zoom:1;"></div>',
        TIP_TMPL='<label style="display: none;position:absolute;left:0;top:0;">{tip}</label>',
        isSupport = "placeholder" in document.createElement("input");
        
    /**
     * config{
     *  el：{HtmlElement}目标表单元素
     *  wrap: {Boolean} default true 需要创建一个父容器
     * }
     *
     * 支持两种方式：
     * 1、html5的placeholder属性
     * 2、其他浏览器的支持
     */
    function placeholder(el, cfg) {  
        //支持html5的placeHolder属性
        if(isSupport) return;

        var self=this,
        defaultCfg = {
            wrap:true
        };

        if(self instanceof placeholder) {
            var config = S.merge(defaultCfg, cfg);
            self._init(el, config);
        } else {
            return new placeholder(el, cfg);
        }
    }

    S.augment(placeholder, {
        _init:function(target, cfg) {
            var self = this;

            if(!target) {
                S.log('[placeholder] has no target to decorate');
                return;
            }

            target = $(target);

            var placeHolderTip = target.attr('placeholder');

            if(!placeHolderTip) return;

            function _decorate() {
                //创建一个label
                var str=S.substitute(TIP_TMPL, {
                    tip:placeHolderTip
                });
                var triggerLabel = self.triggerLabel = $(str);
                triggerLabel.css("width",target.css("width"));
                if(target.attr('id')) {
                    triggerLabel.attr('for', target.attr('id'));
                } else {
                    triggerLabel.on('click', function() {
                        target[0].focus();
                    });
                }

                //create parent               
                var targetBox = $(WRAP_TMPL);
                targetBox.appendTo(target.parent())
                .append(target);

                //insertbefore target
               triggerLabel.insertBefore(target);

                //judge value && init form reset
                S.later(function() {
                    if(!target.val()) {
                        triggerLabel.show();
                    }
                }, 100);
            };

            target.on('focus', function(ev) {
                self.triggerLabel.hide();
            });

            target.on('blur', function(ev) {
                if(!target.val()) {
                    self.triggerLabel.show();
                }
            });

            _decorate();

        },
        /**
         * 可以修改tip文案
         * @param newTip
         */
        text:function(newTip) {
            this.triggerLabel.text(newTip);
        }
    });

    return placeholder;
});