System.register(["./index-legacy-cc225d81.js","./ShopperHeader-legacy-1c091ae2.js","./ModeToggleCard-legacy-885dff17.js","./BusinessStore-legacy-6f130e52.js","./shopping-cart-legacy-d1c8a800.js","./NotificationButton-legacy-00006a2d.js","./Date-legacy-65bfc294.js","./KolaYellowButton-legacy-095e43ab.js","./disappointed-legacy-3c538a21.js","./ProductStore-legacy-39217fc5.js","./Product-legacy-3e97f985.js"],(function(e,o){"use strict";var t,n,a,s,r,i,d,c,l,u,p,m,g,h,f,v,b,y,x,w,I,_,C,k,j,B,S,z,E,A,F;return{setters:[e=>{t=e.d,n=e.ad,a=e.s,s=e.a,r=e._,i=e.x,d=e.o,c=e.A,l=e.f,u=e.e,p=e.w,m=e.R,g=e.S,h=e.t,f=e.H,v=e.J,b=e.a9,y=e.aa,x=e.ab,w=e.n,I=e.Q,_=e.r,C=e.c,k=e.g,j=e.b,B=e.I,S=e.i},e=>{z=e.S},e=>{E=e.M},e=>{A=e.u},e=>{F=e._},null,null,null,null,null,null],execute:function(){var o=document.createElement("style");o.textContent=".banner[data-v-7698a9e7]{position:relative;margin-bottom:40px}.banner img[data-v-7698a9e7]{max-width:100%;width:100%}.banner aside[data-v-7698a9e7]{position:absolute;bottom:-15%;left:5%}.banner aside ion-avatar[data-v-7698a9e7]{border-radius:50%;background-color:#f5f5f5;border:solid 1px #ccc;display:flex;align-items:center;justify-content:center;width:90px;height:90px}.banner aside ion-avatar .initials[data-v-7698a9e7]{font-size:48px}section[data-v-e378cc87]{width:90%;margin:0 auto 1.5em}section h4[data-v-e378cc87]{font-size:1em;font-weight:700}section p[data-v-e378cc87]{font-size:.75em;font-weight:400;color:#74787c;margin-top:0}ion-card[data-v-245d1579]{--background: #FFFBF5}ion-card ion-card-content[data-v-245d1579]{--padding-top: 50px}.intro-point[data-v-245d1579]{display:flex;align-items:start;margin-bottom:1em}.intro-point .icon[data-v-245d1579]{background-color:rgba(245,170,41,.2);min-width:50px;min-height:50px;border-radius:50%;padding:12px;margin-right:10px}.content h6[data-v-245d1579]{font-weight:700;font-size:1em;margin-bottom:5px;margin-top:5px;color:#111}.content p[data-v-245d1579]{margin-top:0;margin-bottom:0;font-size:.75em;line-height:1.8em;color:#74787c}.intro-btn[data-v-245d1579]{text-transform:none;font-weight:700;font-size:.85em}.intro-btn.success[data-v-245d1579]{--background: #66F48E;--color: #101828;--box-shadow: none;--border-radius: 8px;margin-bottom:3em}.intro-btn.warning[data-v-245d1579]{--background: #F5AA29;--color: #101828;--box-shadow: none;--border-radius: 8px;margin-top:1em}.shopper-home-section header{display:flex;align-items:center;justify-content:space-between;font-size:.9em}.shopper-home-section header h6{font-weight:700;font-size:.9em;margin:0}.shopper-home-section header a{padding:3px 10px}\n",document.head.appendChild(o);const $=t({data:()=>({defaultBanner:"/images/vendor/banner.png"}),components:{IonAvatar:n},computed:{...a(A,s)},methods:{onLoadError(e){e.target.src=this.defaultBanner}},mounted(){this.businessStore.loadCachedBusinesses()}}),R={class:"banner"},T=["src"],W=(e=>(m("data-v-7698a9e7"),e=e(),g(),e))((()=>l("span",{class:"initials"},"RV",-1))),H=r($,[["render",function(e,o,t,n,a,s){var r;const m=i("IonAvatar");return d(),c("section",R,[l("img",{src:(null===(r=e.userStore.activeBusiness)||void 0===r?void 0:r.logo)||e.defaultBanner,onError:o[0]||(o[0]=o=>e.onLoadError(o))},null,40,T),l("aside",null,[u(m,{size:""},{default:p((()=>[W])),_:1})])])}],["__scopeId","data-v-7698a9e7"]]),L=t({data:()=>({orders:[]})}),O={class:"ion-text-center"},K=(e=>(m("data-v-e378cc87"),e=e(),g(),e))((()=>l("img",{src:F,width:"70",height:"70"},null,-1))),P={key:0},D={key:1},G=r(L,[["render",function(e,o,t,n,a,s){return d(),c("section",O,[K,0==e.orders.length?(d(),c("section",P,[l("h4",null,h(e.$t("vendor.home.yourOrderListIsEmpty")),1),l("p",null,h(e.$t("vendor.home.emptyListInstruction")),1)])):(d(),c("section",D,[l("h4",null,h(e.$t("vendor.home.youHaveXNewOrders",{orders:e.orders.length})),1),l("p",null,h(e.$t("vendor.home.pleaseTapOrdersButtonBelowToSeeThem")),1)]))])}],["__scopeId","data-v-e378cc87"]]),M=t({data:()=>({}),components:{IonCard:f,IonCardContent:v,IonGrid:b,IonRow:y,IonCol:x,IonText:w,IonImg:I,IonButton:_},methods:{openWhatsAppChat(){window.open("https://wa.me/233270404501","_system","location=yes")}}}),N=e=>(m("data-v-245d1579"),e=e(),g(),e),Q={class:"intro-point"},Y={class:"icon"},q=N((()=>l("section",{class:"content"},[l("h6",null,"Invite Customers"),l("p",null," Invite your customers offline to find your store and shop from you. Shops who use this approach see a spike in order value and repeat purchases ")],-1))),J={class:"intro-point"},U={class:"icon"},V=N((()=>l("section",{class:"content"},[l("h6",null,"Promote Your Store"),l("p",null," Kola connects you with a diverse community of customers actively seeking quality products like yours. We promote your store for FREE for 4 weeks. Keep promoting your store to get more orders ")],-1))),X={class:"intro-point"},Z={class:"icon"},ee=N((()=>l("section",{class:"content"},[l("h6",null,"Offers, discounts & promotions"),l("p",null," Shops who offer discounts and FREE Delivery receive 2x more orders. Get in touch with us to set up your first promotion. We use data to help you optimise for sales ")],-1))),oe=r(M,[["render",function(e,o,t,n,a,s){const r=i("IonImg"),c=i("IonButton"),m=i("IonCardContent"),g=i("IonCard");return d(),C(g,null,{default:p((()=>[u(m,null,{default:p((()=>[l("section",Q,[l("span",Y,[u(r,{src:"/images/vendor/coin-stack.svg"})]),q]),u(c,{expand:"block",class:"intro-btn success ion-margin-bottom"},{default:p((()=>[k(h(e.$t("vendor.home.inviteCustomers")),1)])),_:1}),l("section",J,[l("span",U,[u(r,{src:"/images/vendor/trending.svg"})]),V]),l("section",X,[l("span",Z,[u(r,{src:"/images/vendor/phone-outgoing.svg"})]),ee]),u(c,{expand:"block",class:"intro-btn warning ion-margin-bottom",onClick:o[0]||(o[0]=o=>e.openWhatsAppChat())},{default:p((()=>[k(h(e.$t("vendor.home.chatWithUs")),1)])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-245d1579"]]);e("default",t({__name:"Home",setup:e=>(e,o)=>(d(),C(j(S),null,{default:p((()=>[u(z),u(j(B),{fullscreen:!0},{default:p((()=>[u(H),u(G),u(oe),u(E)])),_:1})])),_:1}))}))}}}));
