System.register(["./index-legacy-cc225d81.js","./KolaYellowButton-legacy-095e43ab.js","./BusinessStore-legacy-6f130e52.js","./form-legacy-bf32c8f1.js","./useGeolocation-legacy-82c446db.js","./PinEntryField-legacy-8986b217.js","./Product-legacy-3e97f985.js","./index-legacy-d3e52be1.js"],(function(e,n){"use strict";var l,o,s,i,a,t,u,r,d,c,m,p,f,b,_,g,h,y,v,V,k,w,I,P,U,j,C,$,x,A,B,N,L,S,q;return{setters:[e=>{l=e.d,o=e.y,s=e.u,i=e.v,a=e.z,t=e.a,u=e.c,r=e.w,d=e.b,c=e.o,m=e.e,p=e.p,f=e.F,b=e.j,_=e.G,g=e.k,h=e.f,y=e.l,v=e.K,V=e.r,k=e.L,w=e.M,I=e.g,P=e.t,U=e.I,j=e.m,C=e.n,$=e.h,x=e.i,A=e.C},e=>{B=e.K},e=>{N=e.u},e=>{L=e.u},e=>{S=e.u},e=>{q=e.P},null,null],execute:function(){const n=h("h3",null,"You Are Almost There",-1),E=h("p",{class:"ion-margin-bottom",style:{"font-size":"0.8em"}}," Please enter your details below to finish setting up your account ",-1);e("default",l({__name:"Shopper",setup(e){let l=o(!1);const F=s(),K=i(),Y=L({name:"",business_location:"",business_name:"",pin:"",pin_confirmation:""}),z=a((()=>{const e=Y.fields;return e.name.length>0&&e.business_name.length>0&&e.business_location.length>0&&4==e.pin.length&&0==isNaN(Number(e.pin))&&e.pin==e.pin_confirmation})),G=N(),H=t(),M=async()=>{l.value=!0,K.blockUI("Hold On As We Create Your Business");try{var e,n,o;await G.createBusinessAsShopper({name:Y.fields.business_name,location:Y.fields.business_location,phone_number:null===(e=H.user)||void 0===e?void 0:e.phone_number,business_types_id:1,business_owner_name:Y.fields.name,business_owner_phone:null===(n=H.user)||void 0===n?void 0:n.phone_number})?(await H.changePin({phone_number:null===(o=H.user)||void 0===o?void 0:o.phone_number,pin:Y.fields.pin,pin_confirmation:Y.fields.pin_confirmation}),await H.fetchUserInfo(),await H.fetchUserBusinesses(),F.push("/shopper")):(K.unblockUI(),K.showError("Account Registration Failed. Please try again","","bottom","footer"))}catch(s){A(s)}finally{l.value=!1,K.unblockUI()}};return(e,o)=>(c(),u(d(x),null,{default:r((()=>[m(d(g),{class:"ion-no-border"},{default:r((()=>[m(d(p),null,{default:r((()=>[m(d(f),{slot:"start"},{default:r((()=>[m(d(b),{defaultHref:"/signup"})])),_:1}),m(d(_))])),_:1})])),_:1}),m(d(U),{class:"ion-padding"},{default:r((()=>[n,E,h("form",null,[m(d(y),{class:v(["kola-input ion-margin-bottom",{"ion-invalid ion-touched":d(Y).errors.name}]),label:e.$t("signup.shopper.fullName"),labelPlacement:"stacked",fill:"solid",modelValue:d(Y).fields.name,"onUpdate:modelValue":o[0]||(o[0]=e=>d(Y).fields.name=e),name:"name",onIonInput:o[1]||(o[1]=e=>d(Y).validate(e)),required:""},null,8,["class","label","modelValue"]),m(d(y),{class:v(["kola-input ion-margin-bottom",{"ion-invalid ion-touched":d(Y).errors.business_name}]),label:e.$t("signup.shopper.businessName"),labelPlacement:"stacked",fill:"solid",modelValue:d(Y).fields.business_name,"onUpdate:modelValue":o[2]||(o[2]=e=>d(Y).fields.business_name=e),name:"business_name",onIonInput:o[3]||(o[3]=e=>d(Y).validate(e)),required:""},null,8,["class","label","modelValue"]),m(d(y),{class:v(["kola-input",{"ion-invalid ion-touched":d(Y).errors.business_location}]),label:e.$t("signup.shopper.businessLocation"),labelPlacement:"stacked",fill:"solid",modelValue:d(Y).fields.business_location,"onUpdate:modelValue":o[4]||(o[4]=e=>d(Y).fields.business_location=e),name:"business_location",onIonInput:o[5]||(o[5]=e=>d(Y).validate(e)),required:""},null,8,["class","label","modelValue"]),m(d(V),{fill:"clear",color:"primary",style:{"text-transform":"none"},class:"ion-margin-bottom ion-text-start",onClick:o[6]||(o[6]=e=>(async()=>{const e=i(),{getCurrentLocation:n}=S();try{const e=await n();e&&(Y.fields.business_location=`${e.coords.latitude}, ${e.coords.longitude}`)}catch(l){e.showError("Cannot retrieve location info"),console.log(l)}})())},{default:r((()=>[m(d(k),{icon:d(w),style:{"margin-right":"5px"}},null,8,["icon"]),I(" "+P(e.$t("signup.vendor.location.useCurrentLocation")),1)])),_:1}),m(q,{name:"pin",label:e.$t("signup.shopper.newPinCode"),modelValue:d(Y).fields.pin,"onUpdate:modelValue":o[7]||(o[7]=e=>d(Y).fields.pin=e)},null,8,["label","modelValue"]),m(q,{name:"pin_confirmation",label:e.$t("signup.shopper.confirmPinCode"),modelValue:d(Y).fields.pin_confirmation,"onUpdate:modelValue":o[8]||(o[8]=e=>d(Y).fields.pin_confirmation=e)},null,8,["label","modelValue"])])])),_:1}),m(d($),{class:"ion-padding ion-no-border",id:"footer"},{default:r((()=>[m(B,{disabled:!z.value,onClick:M},{default:r((()=>[d(l)?(c(),u(d(j),{key:0,name:"crescent"})):(c(),u(d(C),{key:1},{default:r((()=>[I(P(e.$t("general.continue")),1)])),_:1}))])),_:1},8,["disabled"])])),_:1})])),_:1}))}}))}}}));