System.register(["./index-legacy-cc225d81.js","./PhoneInput-legacy-cd301a0b.js","./KolaYellowButton-legacy-095e43ab.js","./BusinessStore-legacy-6f130e52.js","./Product-legacy-3e97f985.js"],(function(n,o){"use strict";var e,t,i,r,a,s,l,d,u,c,p,f,g,h,m,v,b,x,y,I,k,w,_,z,C,P,S,j,B,N;return{setters:[n=>{e=n.d,t=n.i,i=n.k,r=n.p,a=n.F,s=n.j,l=n.G,d=n.I,u=n.l,c=n.n,p=n.q,f=n.Q,g=n.r,h=n.m,m=n.a,v=n.v,b=n.C,x=n._,y=n.x,I=n.o,k=n.c,w=n.w,_=n.e,z=n.f,C=n.g,P=n.R,S=n.S},n=>{j=n.P},n=>{B=n.K},n=>{N=n.u},null],execute:function(){var o=document.createElement("style");o.textContent='.vendor-signup-intro .intro-header[data-v-f17fa848]{background-color:rgba(0,0,0,.918);padding:15px;color:#fff;position:relative}.vendor-signup-intro .intro-header[data-v-f17fa848]:before{content:" ";display:block;position:absolute;left:0;top:0;width:100%;height:100%;opacity:.1;background-image:url(/images/vendor/signup-intro-bg.png);background-repeat:no-repeat;background-position:50% 0;background-size:cover}.vendor-signup-intro .intro-header ion-input[data-v-f17fa848]{--border-color: white;--border-radius: 16px;--color: white;--padding-bottom: 5px;--padding-top: 5px;--highlight-color-focused: orange;font-size:.9em;min-height:42px}.vendor-signup-intro .intro-header .join-text[data-v-f17fa848]{font-size:.75em;margin-bottom:30px}.vendor-signup-intro .intro-header .login-prompt[data-v-f17fa848]{font-size:.8em;text-transform:none;color:#fff;font-weight:400}.vendor-signup-intro .iti[data-v-f17fa848]{width:100%}.vendor-signup-intro .iti .phone-input[data-v-f17fa848]{background-color:transparent;color:#f9f9f9;border:solid 1px #f1f1f1;border-radius:10px;padding:10px 30px 10px 60px;width:100%}.vendor-signup-intro .iti .phone-input[data-v-f17fa848]::placeholder{color:#f1f1f1}.vendor-signup-intro .iti[data-v-f17fa848]:focus{border-color:#74787c}.vendor-signup-intro .intro-point[data-v-f17fa848]{display:flex;align-items:start;padding:8px 10px}.vendor-signup-intro .intro-point .icon[data-v-f17fa848]{background-color:rgba(245,170,41,.2);min-width:50px;min-height:50px;border-radius:50%;padding:12px;margin-right:10px}.vendor-signup-intro .intro-point .content h6[data-v-f17fa848]{font-weight:700;font-size:.85em;margin-bottom:5px;margin-top:5px}.vendor-signup-intro .intro-point .content p[data-v-f17fa848]{margin-top:0;margin-bottom:0;font-size:.65em;line-height:1.8em;color:#74787c}.vendor-signup-intro .intro-footer[data-v-f17fa848]{background-color:#fffbf5;padding:30px}.vendor-signup-intro .intro-footer h6[data-v-f17fa848]{font-size:.8em;font-weight:700;margin-bottom:20px;margin-top:0;text-align:center}.vendor-signup-intro .intro-footer ion-button[data-v-f17fa848]{font-size:.7em;--border-radius: 10px;--border-width: 1px;text-transform:none;font-weight:700}\n',document.head.appendChild(o);const q=e({components:{IonPage:t,IonHeader:i,IonToolbar:r,IonButtons:a,IonBackButton:s,IonTitle:l,IonContent:d,IonInput:u,PhoneInput:j,KolaYellowButton:B,IonText:c,IonLabel:p,IonImg:f,IonButton:g,IonSpinner:h},data:()=>({phoneNumber:"",validating:!1}),methods:{onContinue(){const n=m(),o=v(),e=N();this.phoneNumber?(this.validating=!0,n.verifyPhoneNumber({phone_number:this.phoneNumber}).then((n=>{const t=n.data;!t.two_factor_auth_sent&&t.has_pin_number?(this.$router.push("/auth/login"),o.showError("Account already exists. Please login to continue")):(e.registration.phone_number=this.phoneNumber,e.registration.business_owner_phone=this.phoneNumber,e.cacheRegistrationInfo(),this.$router.push("/auth/verify-otp"))})).catch((n=>{b(n)})).finally((()=>this.validating=!1))):o.showError("Phone Number Required")}},mounted(){N().clearCachedRegistrationInfo()}}),K=n=>(P("data-v-f17fa848"),n=n(),S(),n),R={class:"intro-header"},A={class:"d-flex ion-justify-content-center"},E=K((()=>z("h5",null,"Join us to unlock a world of opportunities",-1))),T=K((()=>z("p",{class:"join-text"}," Join our vibrant community of vendors & retailers and start maximizing your sales potential today ",-1))),L={class:"ion-padding"},V={class:"intro-point"},Y={class:"icon"},H=K((()=>z("section",{class:"content"},[z("h6",null,"Increase Sales"),z("p",null," Leverage our marketing tools and personalized recommendations to captivate customers and increase your sales potential. ")],-1))),J={class:"intro-point"},$={class:"icon"},F=K((()=>z("section",{class:"content"},[z("h6",null,"Maximize your reach"),z("p",null," Kola connects you with a diverse community of customers actively seeking quality products like yours. ")],-1))),G={class:"intro-point"},M={class:"icon"},Q=K((()=>z("section",{class:"content"},[z("h6",null,"Reliable Support"),z("p",null," Whether you have questions, need technical guidance, our experts are here to provide reliable support and ensure your success. ")],-1))),U={class:"intro-footer"},W=K((()=>z("h6",null," Experience the benefits of thriving online and watch your business flourish like never before ",-1)));n("default",x(q,[["render",function(n,o,e,t,i,r){const a=y("IonImg"),s=y("PhoneInput"),l=y("IonSpinner"),d=y("IonText"),u=y("KolaYellowButton"),c=y("IonButton"),p=y("IonContent"),f=y("IonPage");return I(),k(f,{class:"vendor-signup-intro"},{default:w((()=>[_(p,{fullscreen:!0},{default:w((()=>[z("header",R,[z("p",A,[_(a,{src:"/images/kola-logo.svg"})]),E,T,z("section",null,[_(s,{modelValue:n.phoneNumber,"onUpdate:modelValue":o[0]||(o[0]=o=>n.phoneNumber=o),required:!0},null,8,["modelValue"]),_(u,{class:"ion-margin-top",onClick:o[1]||(o[1]=o=>n.onContinue())},{default:w((()=>[n.validating?(I(),k(l,{key:0,name:"crescent"})):(I(),k(d,{key:1},{default:w((()=>[C("Start Selling")])),_:1}))])),_:1}),_(c,{class:"ion-margin-top login-prompt",fill:"clear",expand:"block","router-link":"/auth/login"},{default:w((()=>[C(" Already Have An Account?  "),_(d,{color:"warning",class:"fw-bold"},{default:w((()=>[C("Log in")])),_:1})])),_:1})])]),z("main",L,[z("section",V,[z("span",Y,[_(a,{src:"/images/vendor/coin-stack.svg"})]),H]),z("section",J,[z("span",$,[_(a,{src:"/images/vendor/trending.svg"})]),F]),z("section",G,[z("span",M,[_(a,{src:"/images/vendor/phone-outgoing.svg"})]),Q])]),z("footer",U,[W,_(c,{fill:"outline",expand:"block",color:"dark",onClick:o[2]||(o[2]=o=>n.onContinue())},{default:w((()=>[C(" Sign up ")])),_:1})])])),_:1})])),_:1})}],["__scopeId","data-v-f17fa848"]]))}}}));