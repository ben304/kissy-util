/**
 * @fileoverview placeHolder的js实现
 * @author 张挺 <zhangting@taobao.com>
 *
 */
KISSY.add('util/placeholder', function(S) {

    var D = S.DOM, E = S.Event;
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
        var isSupport = "placeholder" in document.createElement("input"),
            self = this;
        //支持html5的placeHolder属性
        if(isSupport) return;

        var defaultCfg = {
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
            }

            target = S.one(target);

            var placeHolderTip = target.attr('placeholder');

            if(!placeHolderTip) return;

            self._decorate = function() {
                //创建一个label
                var triggerLabel = self.triggerLabel = D.create(S.substitute('<label style="display: none">{tip}</label>', {
                    tip:placeHolderTip
                }));

                if(target.attr('id')) {
                    D.attr(triggerLabel, 'for', target.attr('id'));
                } else {
                    S.one(triggerLabel).on('click', function() {
                        target[0].focus();
                    });
                }

                //create parent
                if(cfg.wrap) {
                    var targetBox = D.create('<div class="placeholder" style="position: relative"></div>');
                    S.one(targetBox).appendTo(target.parent()).append(target);
                }

                //insertbefore target
                D.insertBefore(triggerLabel, target);

                //judge value && init form reset
                S.later(function() {
                    if(!target.val()) {
                        D.show(triggerLabel);
                    }
                }, 100);
            };

            target.on('focus', function(ev) {
                D.hide(self.triggerLabel);
            });

            target.on('blur', function(ev) {
                if(!target.val()) {
                    D.show(self.triggerLabel);
                }
            });

            self._decorate();

        },
        /**
         * 可以修改tip文案
         * @param newTip
         */
        text:function(newTip) {
            D.text(this.triggerLabel, newTip);
        }
    });

    //1.1.6 support
    S.namespace("Util");
    S.Util.placeholder = placeholder;

    return placeholder;
});