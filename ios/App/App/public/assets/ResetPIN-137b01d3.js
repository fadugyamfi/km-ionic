import{d as P,u as _,a as b,v as g,z as I,D as w,E as V,c as y,w as i,b as e,o as C,e as o,p as k,j as B,k as N,f as d,t as p,I as S,g as U,h as v,i as E}from"./index-f92ce253.js";import{K as R}from"./KolaYellowButton-490da95d.js";import{u as $}from"./form-59f00665.js";import{P as c}from"./PinEntryField-06300d43.js";const F={style:{"font-size":"14px"}},T={style:{"margin-top":"50px"}},j=P({__name:"ResetPIN",setup(Y){const f=_(),r=b(),s=g(),n=$({phone_number:r.verification.phone_number,pin:"",pin_confirmation:""}),m=I(()=>n.fields.pin.length==4&&n.fields.pin_confirmation.length==4&&n.fields.pin_confirmation==n.fields.pin),l=w(),h=async()=>{try{await r.changePin(n.fields)?(s.showSuccess(l.t("auth.resetPin.pinSuccessfullyReset")),setTimeout(async()=>{s.blockUI(l.t("auth.resetPin.loadingYourAccountInfo")),await r.fetchUserInfo(),await r.fetchUserBusinesses(),f.replace("/shopper"),s.unblockUI()},500)):s.showError(l.t("auth.resetPin.pinResetFailed"))}catch(t){s.showError(l.t("auth.resetPin.pinResetFailed"))}};return V(()=>{r.verification.phone_number||(s.showError("auth.resetPin.phoneNumberRequired"),f.replace("/auth/login"))}),(t,a)=>(C(),y(e(E),null,{default:i(()=>[o(e(N),{class:"ion-no-border"},{default:i(()=>[o(e(k),null,{default:i(()=>[o(e(B),{slot:"start"})]),_:1})]),_:1}),o(e(S),{class:"ion-padding"},{default:i(()=>[d("h3",null,p(t.$t("auth.resetPin.resettingYourPIN")),1),d("p",F,p(t.$t("auth.resetPin.pleaseEnterAndConfirmYourNewPin")),1),d("div",T,[o(c,{name:"pin",label:t.$t("signup.shopper.newPinCode"),modelValue:e(n).fields.pin,"onUpdate:modelValue":a[0]||(a[0]=u=>e(n).fields.pin=u)},null,8,["label","modelValue"]),o(c,{name:"pin_confirmation",label:t.$t("signup.shopper.confirmPinCode"),modelValue:e(n).fields.pin_confirmation,"onUpdate:modelValue":a[1]||(a[1]=u=>e(n).fields.pin_confirmation=u)},null,8,["label","modelValue"])])]),_:1}),o(e(v),{class:"ion-padding"},{default:i(()=>[o(R,{disabled:!m.value,onClick:a[2]||(a[2]=u=>h())},{default:i(()=>[U(p(t.$t("general.continue")),1)]),_:1},8,["disabled"])]),_:1})]),_:1}))}});export{j as default};
