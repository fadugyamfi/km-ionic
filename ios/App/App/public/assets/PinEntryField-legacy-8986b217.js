System.register(["./index-legacy-cc225d81.js","./form-legacy-bf32c8f1.js"],(function(e,n){"use strict";var o,l,i,t,a,s,m,r,u,d,c,f,p,I,b;return{setters:[e=>{o=e.d,l=e.N,i=e.l,t=e.r,a=e.L,s=e.O,m=e.P,r=e._,u=e.x,d=e.A,c=e.e,f=e.w,p=e.K,I=e.o},e=>{b=e.u}],execute:function(){const n=o({props:["modelValue","name","label","model"],components:{IonItem:l,IonInput:i,IonButton:t,IonIcon:a},emits:["update:modelValue"],data(){return{eye:s,eyeOff:m,pinVisible:!1,form:b({[this.name]:""})}},methods:{onInput(e){this.form.validate(e),this.$emit("update:modelValue",this.form.fields[this.name])}}}),V={class:"kola-input-item"};e("P",r(n,[["render",function(e,n,o,l,i,t){const a=u("IonInput"),s=u("IonIcon"),m=u("IonButton"),r=u("IonItem");return I(),d("div",V,[c(r,{lines:"none",class:p({"ion-invalid ion-touched":e.form.errors[e.name]})},{default:f((()=>[c(a,{ref:"pin",class:p({"ion-invalid ion-touched":e.form.errors[e.name]}),label:e.label,labelPlacement:"stacked",modelValue:e.form.fields[e.name],"onUpdate:modelValue":n[0]||(n[0]=n=>e.form.fields[e.name]=n),type:e.pinVisible?"number":"password",maxlength:4,name:e.name,onIonInput:n[1]||(n[1]=n=>e.onInput(n)),required:""},null,8,["class","label","modelValue","type","name"]),c(m,{fill:"clear",color:"medium",onClick:n[2]||(n[2]=n=>e.pinVisible=!e.pinVisible)},{default:f((()=>[c(s,{slot:"icon-only",icon:e.pinVisible?e.eye:e.eyeOff},null,8,["icon"])])),_:1})])),_:1},8,["class"])])}]]))}}}));