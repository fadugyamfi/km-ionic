System.register(["./index-legacy-cc225d81.js","./KolaWhiteButton-legacy-4f5d2134.js","./KolaYellowButton-legacy-095e43ab.js"],(function(t,e){"use strict";var o,n,a,l,u,i,c,s,d,r,f,k,B,g;return{setters:[t=>{o=t.d,n=t.a9,a=t.aa,l=t.ab,u=t._,i=t.x,c=t.o,s=t.c,d=t.w,r=t.e,f=t.g,k=t.t},t=>{B=t.K},t=>{g=t.K}],execute:function(){const e=o({props:{doDefaultBackAction:{default:!0,type:Boolean},backText:{default:"Back",type:String},continueText:{default:"Continue",type:String}},components:{IonGrid:n,IonRow:a,IonCol:l,KolaWhiteButton:B,KolaYellowButton:g},emits:["back","continue"],data:()=>({}),methods:{back(){this.doDefaultBackAction?this.$router.go(-1):this.$emit("back")}}});t("F",u(e,[["render",function(t,e,o,n,a,l){const u=i("KolaWhiteButton"),B=i("IonCol"),g=i("KolaYellowButton"),K=i("IonRow"),b=i("IonGrid");return c(),s(b,null,{default:d((()=>[r(K,null,{default:d((()=>[r(B,{size:"6"},{default:d((()=>[r(u,{onClick:e[0]||(e[0]=e=>t.back())},{default:d((()=>[f(k(t.backText),1)])),_:1})])),_:1}),r(B,{size:"6"},{default:d((()=>[r(g,{onClick:e[1]||(e[1]=e=>t.$emit("continue"))},{default:d((()=>[f(k(t.continueText),1)])),_:1})])),_:1})])),_:1})])),_:1})}]]))}}}));
