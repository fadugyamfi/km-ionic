import{d as y,i as P,k,p as B,F as _,j as $,G as w,I as N,H as F,J as H,h as T,l as O,U,V as q,r as A,L as G,N as K,O as Y,P as D,s as L,_ as R,x as t,o as W,c as j,w as i,e as s,f as r,K as l,t as z,W as E,g as d}from"./index-f92ce253.js";import{F as J}from"./FooterNavigation-702824f8.js";import{u as M}from"./ProductCategoryStore-e7d4d5d2.js";import{u as Q}from"./LocationStore-7a6561ad.js";import{u as X}from"./BusinessStore-3612150a.js";import{u as Z}from"./form-59f00665.js";import{H as x}from"./HeaderArea-a6edf1a2.js";import"./KolaWhiteButton-71dee6cb.js";import"./KolaYellowButton-490da95d.js";import"./Product-5dbe9562.js";const oo=y({components:{IonPage:P,IonHeader:k,IonToolbar:B,IonButtons:_,IonBackButton:$,IonTitle:w,IonContent:N,IonCard:F,IonCardContent:H,IonFooter:T,FooterNavigation:J,IonInput:O,IonSelect:U,IonSelectOption:q,IonButton:A,HeaderArea:x,IonIcon:G,IonItem:K},data(){return{eye:Y,eyeOff:D,pinVisible:!1,confPinVisible:!1,form:Z({})}},computed:{...L(M,Q,X)},methods:{formValid(){return this.businessStore.registration.user.pin!=this.businessStore.registration.user.pin_confirmation&&(this.form.errors.pin=!0,this.form.errors.pin_confirmation=!0),this.businessStore.registration.user.pin.length==4&&this.businessStore.registration.user.pin_confirmation.length==4&&this.businessStore.registration.user.pin==this.businessStore.registration.user.pin_confirmation&&this.businessStore.registration.business_owner_name.length>2},onContinue(){this.form.hasErrors()||!this.formValid()||(this.businessStore.cacheRegistrationInfo(),this.$router.push("/signup/vendor/business-info"))}},mounted(){this.businessStore.loadCachedRegistrationInfo()}}),no={class:"fw-bold font-medium",style:{"margin-bottom":"3px","margin-top":"30px"}},eo=r("p",{class:"font-small",style:{"margin-top":"0px","margin-bottom":"20px"}},[d(" Create a "),r("b",null,"4-Digit PIN code"),d(" for subsequent logins after signup ")],-1),so={class:"kola-input-item"},to={class:"kola-input-item"};function io(o,n,ro,ao,lo,uo){const f=t("IonBackButton"),b=t("IonButtons"),I=t("IonTitle"),g=t("IonToolbar"),c=t("IonHeader"),V=t("HeaderArea"),a=t("IonInput"),u=t("IonIcon"),m=t("IonButton"),p=t("IonItem"),S=t("IonContent"),v=t("FooterNavigation"),h=t("IonFooter"),C=t("IonPage");return W(),j(C,null,{default:i(()=>[s(c,{class:"ion-no-border"},{default:i(()=>[s(g,null,{default:i(()=>[s(b,{slot:"start"},{default:i(()=>[s(f,{defaultHref:"/signup/vendor/summary"})]),_:1}),s(I)]),_:1})]),_:1}),s(S,{class:"ion-padding"},{default:i(()=>[s(V,{title:o.$t("signup.vendor.letsGetYouSellingOnKola"),subtext:o.$t("signup.vendor.summary.weWantToGetToKnowYou")},null,8,["title","subtext"]),r("form",{method:"post",ref:"form",onSubmit:n[10]||(n[10]=E(e=>o.onContinue(),["prevent"]))},[r("main",null,[s(a,{class:l(["kola-input ion-margin-bottom",{"ion-invalid ion-touched":o.form.errors.business_owner_name}]),label:o.$t("signup.vendor.fullName"),labelPlacement:"stacked",fill:"solid",modelValue:o.businessStore.registration.business_owner_name,"onUpdate:modelValue":n[0]||(n[0]=e=>o.businessStore.registration.business_owner_name=e),required:"",name:"business_owner_name",onIonInput:n[1]||(n[1]=e=>o.form.validate(e))},null,8,["class","label","modelValue"]),s(a,{class:l(["kola-input ion-margin-bottom",{"ion-invalid ion-touched":o.form.errors.phone_number}]),label:o.$t("general.phoneNumber"),labelPlacement:"stacked",fill:"solid",modelValue:o.businessStore.registration.phone_number,"onUpdate:modelValue":n[2]||(n[2]=e=>o.businessStore.registration.phone_number=e),type:"text",name:"phone_number",readonly:!0,onIonInput:n[3]||(n[3]=e=>o.form.validate(e))},null,8,["class","label","modelValue"]),r("h6",no,z(o.$t("signup.vendor.secureYourAccount")),1),eo,r("div",so,[s(p,{lines:"none"},{default:i(()=>[s(a,{ref:"pin",class:l({"ion-invalid ion-touched":o.form.errors.pin}),label:o.$t("signup.shopper.newPinCode"),labelPlacement:"stacked",modelValue:o.businessStore.registration.user.pin,"onUpdate:modelValue":n[4]||(n[4]=e=>o.businessStore.registration.user.pin=e),type:o.pinVisible?"number":"password",maxlength:4,name:"pin",onIonInput:n[5]||(n[5]=e=>o.form.validate(e)),required:""},null,8,["class","label","modelValue","type"]),s(m,{fill:"clear",color:"medium",onClick:n[6]||(n[6]=e=>o.pinVisible=!o.pinVisible)},{default:i(()=>[s(u,{slot:"icon-only",icon:o.pinVisible?o.eye:o.eyeOff},null,8,["icon"])]),_:1})]),_:1})]),r("div",to,[s(p,{lines:"none"},{default:i(()=>[s(a,{class:l({"ion-invalid ion-touched":o.form.errors.pin_confirmation}),label:o.$t("signup.shopper.confirmPinCode"),labelPlacement:"stacked",modelValue:o.businessStore.registration.user.pin_confirmation,"onUpdate:modelValue":n[7]||(n[7]=e=>o.businessStore.registration.user.pin_confirmation=e),name:"pin_confirmation",type:o.confPinVisible?"number":"password",maxlength:4,onIonInput:n[8]||(n[8]=e=>o.form.validate(e)),required:""},null,8,["class","label","modelValue","type"]),s(m,{fill:"clear",color:"medium",onClick:n[9]||(n[9]=e=>o.confPinVisible=!o.confPinVisible)},{default:i(()=>[s(u,{slot:"icon-only",icon:o.confPinVisible?o.eye:o.eyeOff},null,8,["icon"])]),_:1})]),_:1})])])],544)]),_:1}),s(h,{class:"ion-padding ion-no-border"},{default:i(()=>[s(v,{onContinue:n[11]||(n[11]=e=>o.onContinue())})]),_:1})]),_:1})}const ho=R(oo,[["render",io]]);export{ho as default};