System.register(["./index-legacy-cc225d81.js"],(function(t,e){"use strict";var n,r,s;return{setters:[t=>{n=t.br,r=t.bs,s=t.bt}],execute:function(){
/*!
       * (C) Ionic http://ionicframework.com - MIT License
       */
t("createSwipeBackGesture",((t,e,i,o,c)=>{const a=t.ownerDocument.defaultView;let u=n(t);const l=t=>u?-t.deltaX:t.deltaX;return r({el:t,gestureName:"goback-swipe",gesturePriority:101,threshold:10,canStart:r=>(u=n(t),(t=>{const{startX:e}=t;return u?e>=a.innerWidth-50:e<=50})(r)&&e()),onStart:i,onMove:t=>{const e=l(t)/a.innerWidth;o(e)},onEnd:t=>{const e=l(t),n=a.innerWidth,r=e/n,i=(t=>u?-t.velocityX:t.velocityX)(t),o=i>=0&&(i>.2||e>n/2),d=(o?1-r:r)*n;let h=0;if(d>5){const t=d/Math.abs(i);h=Math.min(t,540)}c(o,r<=0?.01:s(0,r,.9999),h)}})}))}}}));
