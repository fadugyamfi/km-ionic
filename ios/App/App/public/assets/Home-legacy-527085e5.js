System.register(["./index-legacy-cc225d81.js","./ShopperHeader-legacy-1c091ae2.js","./SaleStore-legacy-4abf2d58.js","./NotificationButton-legacy-00006a2d.js","./Date-legacy-65bfc294.js","./KolaYellowButton-legacy-095e43ab.js","./disappointed-legacy-3c538a21.js","./ProductStore-legacy-39217fc5.js","./Product-legacy-3e97f985.js"],(function(e,l){"use strict";var o,n,t,a,s,r,u,d,c,i,f,S,p,y,g,I,h;return{setters:[e=>{o=e.d,n=e.i,t=e.I,a=e.a9,s=e.aa,r=e.ab,u=e.r,d=e.s,c=e._,i=e.x,f=e.o,S=e.c,p=e.w,y=e.e,g=e.g},e=>{I=e.S},e=>{h=e.u},null,null,null,null,null,null],execute:function(){const l=o({components:{IonPage:n,IonContent:t,IonGrid:a,IonRow:s,IonCol:r,IonButton:u,ShopperHeader:I},data:()=>({}),computed:{...d(h)},methods:{onAddSale(){this.saleStore.resetForNewSale(),this.$router.push("/vendor/sales/add-sale/select-agent")},onViewSales(){this.$router.push("/vendor/sales/history")}}});e("default",c(l,[["render",function(e,l,o,n,t,a){const s=i("ShopperHeader"),r=i("IonButton"),u=i("IonCol"),d=i("IonRow"),c=i("IonGrid"),I=i("ion-content"),h=i("ion-page");return f(),S(h,null,{default:p((()=>[y(s),y(I,{fullscreen:!0},{default:p((()=>[y(c,null,{default:p((()=>[y(d,null,{default:p((()=>[y(u,null,{default:p((()=>[y(r,{fill:"clear",color:"primarys",onClick:l[0]||(l[0]=l=>e.onViewSales())},{default:p((()=>[g(" View Sales ")])),_:1})])),_:1}),y(u,{class:"ion-justify-content-end ion-text-end"},{default:p((()=>[y(r,{fill:"clear",color:"primarys",onClick:l[1]||(l[1]=l=>e.onAddSale())},{default:p((()=>[g(" Add Sale ")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})}]]))}}}));
