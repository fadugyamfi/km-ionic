System.register(["./index-legacy-cc225d81.js","./FooterNavigation-legacy-71f03198.js","./HeaderArea-legacy-c85e7844.js","./BusinessStore-legacy-6f130e52.js","./form-legacy-bf32c8f1.js","./KolaWhiteButton-legacy-4f5d2134.js","./KolaYellowButton-legacy-095e43ab.js","./Product-legacy-3e97f985.js"],(function(e,o){"use strict";var n,t,a,l,r,i,s,u,d,c,m,_,b,g,f,p,I,h,v,y,S,q,V,B,C,k,$,j,P;return{setters:[e=>{n=e.d,t=e.i,a=e.k,l=e.p,r=e.F,i=e.j,s=e.G,u=e.I,d=e.H,c=e.J,m=e.h,_=e.l,b=e.U,g=e.V,f=e.s,p=e._,I=e.x,h=e.o,v=e.c,y=e.w,S=e.e,q=e.f,V=e.K,B=e.g,C=e.t},e=>{k=e.F},e=>{$=e.H},e=>{j=e.u},e=>{P=e.u},null,null,null],execute:function(){const o=n({components:{IonPage:t,IonHeader:a,IonToolbar:l,IonButtons:r,IonBackButton:i,IonTitle:s,IonContent:u,IonCard:d,IonCardContent:c,IonFooter:m,FooterNavigation:k,HeaderArea:$,IonInput:_,IonSelect:b,IonSelectOption:g},data:()=>({form:P({})}),computed:{...f(j)},mounted(){this.businessStore.loadCachedRegistrationInfo()},methods:{onContinue(){this.form.hasErrors()||(this.businessStore.cacheRegistrationInfo(),this.$router.push("/signup/vendor/upload-photo"))}}});e("default",p(o,[["render",function(e,o,n,t,a,l){const r=I("IonBackButton"),i=I("IonButtons"),s=I("IonTitle"),u=I("IonToolbar"),d=I("IonHeader"),c=I("HeaderArea"),m=I("IonInput"),_=I("IonSelectOption"),b=I("IonSelect"),g=I("IonContent"),f=I("FooterNavigation"),p=I("IonFooter"),k=I("IonPage");return h(),v(k,null,{default:y((()=>[S(d,{class:"ion-no-border"},{default:y((()=>[S(u,null,{default:y((()=>[S(i,{slot:"start"},{default:y((()=>[S(r,{defaultHref:"/signup/vendor/location-info"})])),_:1}),S(s)])),_:1})])),_:1}),S(g,{class:"ion-padding"},{default:y((()=>[S(c,{title:e.$t("signup.vendor.letsGetToKnowYourBusiness"),subtext:e.$t("signup.vendor.helpUsUnderstandYourBusiness")},null,8,["title","subtext"]),q("main",null,[S(m,{class:V(["kola-input ion-margin-bottom",{"ion-invalid ion-touched":e.form.errors.number_of_unique_products}]),label:e.$t("signup.vendor.howManyUniqueProductsDoYouSell"),labelPlacement:"stacked",fill:"solid",modelValue:e.businessStore.registration.attributes.number_of_unique_products,"onUpdate:modelValue":o[0]||(o[0]=o=>e.businessStore.registration.attributes.number_of_unique_products=o),required:"",name:"number_of_unique_products",type:"number",min:"0",onIonInput:o[1]||(o[1]=o=>e.form.validate(o))},null,8,["class","label","modelValue"]),S(m,{class:V(["kola-input ion-margin-bottom",{"ion-invalid ion-touched":e.form.errors.catalog_update_frequency}]),label:e.$t("signup.vendor.howOftenDoYouAddNewProductsToYourCatalog"),labelPlacement:"stacked",fill:"solid",modelValue:e.businessStore.registration.attributes.catalog_update_frequency,"onUpdate:modelValue":o[2]||(o[2]=o=>e.businessStore.registration.attributes.catalog_update_frequency=o),required:"",name:"catalog_update_frequency",onIonInput:o[3]||(o[3]=o=>e.form.validate(o))},null,8,["class","label","modelValue"]),S(m,{class:V(["kola-input ion-margin-bottom",{"ion-invalid ion-touched":e.form.errors.number_of_small_retailers}]),label:e.$t("signup.vendor.howManySmallRetailersSellYourProducts"),labelPlacement:"stacked",fill:"solid",modelValue:e.businessStore.registration.attributes.number_of_small_retailers,"onUpdate:modelValue":o[4]||(o[4]=o=>e.businessStore.registration.attributes.number_of_small_retailers=o),required:"",name:"number_of_small_retailers",type:"number",min:"0",onIonInput:o[5]||(o[5]=o=>e.form.validate(o))},null,8,["class","label","modelValue"]),S(b,{class:V(["kola-input ion-margin-bottom",{"ion-invalid ion-touched":e.form.errors.brand_is_in_large_retail_chain}]),label:e.$t("signup.vendor.isYourBrandInAnyLargeRetailChains"),labelPlacement:"stacked",fill:"solid",modelValue:e.businessStore.registration.attributes.brand_is_in_large_retail_chain,"onUpdate:modelValue":o[6]||(o[6]=o=>e.businessStore.registration.attributes.brand_is_in_large_retail_chain=o),required:"",name:"brand_is_in_large_retail_chain",onIonChange:o[7]||(o[7]=o=>e.form.validateSelectInput(o))},{default:y((()=>[S(_,{value:e.$t("general.no")},{default:y((()=>[B(C(e.$t("general.no")),1)])),_:1},8,["value"]),S(_,{value:e.$t("general.yes")},{default:y((()=>[B(C(e.$t("general.yes")),1)])),_:1},8,["value"])])),_:1},8,["label","class","modelValue"])])])),_:1}),S(p,{class:"ion-padding ion-no-border"},{default:y((()=>[S(f,{onContinue:o[8]||(o[8]=o=>e.onContinue())})])),_:1})])),_:1})}]]))}}}));