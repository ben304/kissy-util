/**
 @fileOverview make flash input accessible
 @author yiminghe@gmail.com
 @see http://dougr.net/2011/07/05/automatically-setting-swf-object-focus/
      http://stackoverflow.com/questions/594821/object-focus-problem-with-safari-and-chrome-browsers  
      http://code.google.com/p/chromium/issues/detail?id=27868
**/
(function(S){
        // depth-first
        function nextSource(n,filter){
            // child            
            var next=n.first();
            // no child,next sibling
            if(!next){
                next=n.next();
            }
            var parent=n;
            // no silbling , climb up parent,find uncle
            while(!next&&(parent=parent.parent())){
                // parent's next
                next=parent.next();
            }
            // ancestor has no sibling
            if(!next){
                return null;
            }
            // first filter uncle
            if(filter(next)){
                return next;
            }
            // uncle is not ok,then depth-first find uncle
            return nextSource(next,filter);
        }
        
        // depth-first
        // reverse order
        function prevSource(n,filter){
            // child            
            var next=S.one(n[0].lastChild);
            // no child,next sibling
            if(!next){
                next=n.prev();
            }
            var parent=n;
            // no silbling , climb up parent,find uncle
            while(!next&&(parent=parent.parent())){
                // parent's next
                next=parent.prev();
            }
            // ancestor has no sibling
            if(!next){
                return null;
            }
            // first filter uncle
            if(filter(next)){
                return next;
            }
            // uncle is not ok,then depth-first find uncle
            return prevSource(next,filter);
            
        }
        function filter(e){
            return e[0].nodeType==1&&e[0].offsetHeight && e[0].offsetWidth &&e.attr("tabindex")>=0;
        }
        S.namespace("util");
        S.util.AccessibleFlash=function(ob,tabindex){
            ob=S.one(ob);
            var flash=S.UA.ie?ob:ob.one("embed");        
            flash.attr("tabindex",tabindex||0);
            if(!S.UA.ie){
                flash[0].addEventListener("keypress",function(e){
                    if(e.keyCode==9){
                        var next;
                        if(e.shiftKey){                
                            next=prevSource(flash,filter);
                        } else{
                            next=nextSource(flash,filter);
                        }                    
                        if(next){
                            next[0].focus();
                        }
                    }
                },false);
            }
        };
})(KISSY);