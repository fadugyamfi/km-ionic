import{d as P,j as y,I as S,h as v,k as C,l as N,i as T,m as V,n as w,p as F,q as A,r as U,s as Y,v as E,a as H,_ as K,x as n,c as p,w as t,o as u,e,f as r,t as a,g as i}from"./index-f92ce253.js";import{K as L}from"./KolaYellowButton-490da95d.js";import{P as D}from"./PhoneInput-d6078719.js";import{P as O}from"./PinEntryField-06300d43.js";import"./form-59f00665.js";const j=P({components:{KolaYellowButton:L,IonBackButton:y,IonContent:S,IonFooter:v,IonHeader:C,IonInput:N,IonPage:T,IonSpinner:V,IonText:w,IonToolbar:F,PhoneInput:D,IonLabel:A,IonButton:U,PinEntryField:O},data(){return{fetching:!1,phoneNumber:"",pin:""}},computed:{...Y(H,E)},methods:{login(){this.fetching=!0,this.userStore.login({phone_number:this.phoneNumber,pin:this.pin}).then(()=>this.$router.replace("/shopper/home")).catch(async o=>{this.toastStore.showError(o.message||this.$t("Authentication Failed Unknown"),"","bottom","footer")}).finally(()=>this.fetching=!1)},forgotPIN(){this.userStore.resettingPIN=!0,this.$router.push("/auth/verify-number")},handleOnChange(){},handleOnComplete(){}}});const q={class:"header"},x={class:"subtext"},z={class:"ion-margin-top"},G={class:"ion-padding-top ion-padding-bottom"},J={class:"pin-entry"};function M(o,s,Q,R,W,X){const m=n("IonBackButton"),g=n("IonToolbar"),_=n("IonHeader"),h=n("PhoneInput"),f=n("PinEntryField"),d=n("IonButton"),c=n("IonText"),I=n("IonContent"),b=n("IonSpinner"),B=n("KolaYellowButton"),$=n("IonFooter"),k=n("IonPage");return u(),p(k,null,{default:t(()=>[e(_,{class:"ion-no-border"},{default:t(()=>[e(g,null,{default:t(()=>[e(m,{slot:"start"})]),_:1})]),_:1}),e(I,{class:"ion-padding"},{default:t(()=>[r("h3",q,a(o.$t("auth.login.goodToSeeYouAgain")),1),r("p",x,a(o.$t("auth.login.enterDetailsBelowToLogin")),1),r("div",z,[r("section",G,[e(h,{modelValue:o.phoneNumber,"onUpdate:modelValue":s[0]||(s[0]=l=>o.phoneNumber=l)},null,8,["modelValue"])]),r("section",J,[e(f,{modelValue:o.pin,"onUpdate:modelValue":s[1]||(s[1]=l=>o.pin=l),label:o.$t("general.pin")},null,8,["modelValue","label"])]),e(d,{fill:"clear",color:"dark",onClick:s[2]||(s[2]=l=>o.forgotPIN()),style:{"text-transform":"none","padding-left":"0px"}},{default:t(()=>[i(a(o.$t("auth.login.forgotYourPin")),1)]),_:1})]),e(d,{expand:"block",fill:"clear",color:"dark","router-link":"/signup",class:"login-prompt"},{default:t(()=>[i(a(o.$t("auth.login.dontHaveAnAccount"))+"  ",1),e(c,{color:"primary",class:"trigger"},{default:t(()=>[i(a(o.$t("auth.login.signUp")),1)]),_:1})]),_:1})]),_:1}),e($,{class:"ion-padding ion-no-border",id:"footer"},{default:t(()=>[e(B,{onClick:s[3]||(s[3]=l=>o.login())},{default:t(()=>[o.fetching?(u(),p(b,{key:0,name:"crescent"})):(u(),p(c,{key:1},{default:t(()=>[i(a(o.$t("auth.login.login")),1)]),_:1}))]),_:1})]),_:1})]),_:1})}const so=K(j,[["render",M],["__scopeId","data-v-11ccc55c"]]);export{so as default};