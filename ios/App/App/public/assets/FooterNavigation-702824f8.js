import{d as f,a9 as m,aa as _,ab as k,_ as B,x as t,o as C,c as I,w as o,e,g as i,t as l}from"./index-f92ce253.js";import{K as $}from"./KolaWhiteButton-71dee6cb.js";import{K as w}from"./KolaYellowButton-490da95d.js";const K=f({props:{doDefaultBackAction:{default:!0,type:Boolean},backText:{default:"Back",type:String},continueText:{default:"Continue",type:String}},components:{IonGrid:m,IonRow:_,IonCol:k,KolaWhiteButton:$,KolaYellowButton:w},emits:["back","continue"],data(){return{}},methods:{back(){if(this.doDefaultBackAction){this.$router.go(-1);return}this.$emit("back")}}});function b(n,a,g,x,h,T){const r=t("KolaWhiteButton"),s=t("IonCol"),c=t("KolaYellowButton"),u=t("IonRow"),p=t("IonGrid");return C(),I(p,null,{default:o(()=>[e(u,null,{default:o(()=>[e(s,{size:"6"},{default:o(()=>[e(r,{onClick:a[0]||(a[0]=d=>n.back())},{default:o(()=>[i(l(n.backText),1)]),_:1})]),_:1}),e(s,{size:"6"},{default:o(()=>[e(c,{onClick:a[1]||(a[1]=d=>n.$emit("continue"))},{default:o(()=>[i(l(n.continueText),1)]),_:1})]),_:1})]),_:1})]),_:1})}const G=B(K,[["render",b]]);export{G as F};
