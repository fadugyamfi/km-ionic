System.register(["./index-legacy-cc225d81.js","./KolaYellowButton-legacy-095e43ab.js","./SaleStore-legacy-4abf2d58.js","./Image-legacy-0949e555.js","./BusinessStore-legacy-6f130e52.js","./Product-legacy-3e97f985.js","./Date-legacy-65bfc294.js","./index-legacy-92c3b46a.js","./index-legacy-d3e52be1.js"],(function(e,n){"use strict";var t,o,a,s,l,r,i,c,d,u,h,g,f,I,m,S,_,b,v,y,p,C,k,w,A,B,x,j,L,T,R,$,E,H,K,P,Y,z,F,q,D,G,J,N,Q,X,M;return{setters:[e=>{t=e.d,o=e.i,a=e.k,s=e.p,l=e.F,r=e.r,i=e.j,c=e.L,d=e.G,u=e.I,h=e.ax,g=e.N,f=e.aT,I=e.q,m=e.ad,S=e.bd,_=e.n,b=e.h,v=e.Q,y=e.m,p=e.bl,C=e.bm,k=e.ae,w=e.aI,A=e.as,B=e.aJ,x=e.s,j=e.a,L=e.C,T=e.v,R=e._,$=e.x,E=e.o,H=e.c,K=e.w,P=e.f,Y=e.e,z=e.t,F=e.B,q=e.A,D=e.g,G=e.X,J=e.Y},e=>{N=e.K},e=>{Q=e.u},e=>{X=e.I},e=>{M=e.u},null,null,null,null],execute:function(){const n=t({components:{IonPage:o,IonHeader:a,IonToolbar:s,IonButtons:l,IonButton:r,IonBackButton:i,IonIcon:c,IonTitle:d,IonContent:u,IonList:h,IonItem:g,IonListHeader:f,IonLabel:I,IonAvatar:m,IonCheckbox:S,IonText:_,IonFooter:b,KolaYellowButton:N,IonImg:v,Image:X,IonSpinner:y,IonRefresher:p,IonRefresherContent:C,IonSearchbar:k},data:()=>({search:w,close:A,arrowBack:B,fetching:!1,refreshing:!1,searchEnabled:!1,agents:[],filteredAgents:[]}),computed:{...x(j,Q,M)},methods:{async handleRefresh(e){this.refreshing=!0,await this.fetchSaleAgents(),this.refreshing=!1,e.target.complete()},async fetchSaleAgents(){this.fetching=!0;try{this.agents=await this.businessStore.getBusinessSaleAgents(this.userStore.activeBusiness,200,this.refreshing),this.filteredAgents=this.agents}catch(e){L(e)}finally{this.fetching=!1}},selectAgent(e){this.saleStore.newSale.cms_users_id=e.id},onContinue(){this.saleStore.newSale.cms_users_id?this.$router.push("/vendor/sales/add-sale/select-sale-type"):T().showError(this.$t("vendor.sales.selectAgentToContinue"),"","bottom","agent-continue")},onSearch(e){var n;const t=null===(n=e.target)||void 0===n?void 0:n.value;this.filteredAgents=this.agents.filter((e=>{var n;return null===(n=e.name)||void 0===n?void 0:n.toLowerCase().includes(t.toLowerCase())}))}},mounted(){this.fetchSaleAgents()}}),O={class:"ion-padding"},U={key:0,class:"ion-text-center ion-padding"},V={class:"ion-no-margin"};e("default",R(n,[["render",function(e,n,t,o,a,s){const l=$("IonBackButton"),r=$("IonButtons"),i=$("IonTitle"),c=$("IonIcon"),d=$("ion-button"),u=$("IonToolbar"),h=$("IonSearchbar"),g=$("IonHeader"),f=$("IonRefresherContent"),I=$("IonRefresher"),m=$("IonSpinner"),S=$("IonLabel"),_=$("IonListHeader"),b=$("Image"),v=$("IonAvatar"),y=$("IonText"),p=$("IonCheckbox"),C=$("IonItem"),k=$("IonList"),w=$("IonContent"),A=$("KolaYellowButton"),B=$("IonFooter"),x=$("IonPage");return E(),H(x,null,{default:K((()=>[P("section",O,[Y(g,{class:"ion-no-border",style:{"box-shadow":"none"}},{default:K((()=>[Y(u,{class:"inner-header"},{default:K((()=>[Y(r,{slot:"start"},{default:K((()=>[Y(l,{defaultHref:"/vendor/sales",icon:e.arrowBack,mode:"md"},null,8,["icon"])])),_:1}),Y(i,{size:"small"},{default:K((()=>[P("b",null,z(e.$t("vendor.sales.addSale")),1)])),_:1}),Y(r,{slot:"end"},{default:K((()=>[Y(d,{onClick:n[0]||(n[0]=n=>e.searchEnabled=!e.searchEnabled),color:"dark"},{default:K((()=>[Y(c,{icon:e.search},null,8,["icon"])])),_:1})])),_:1})])),_:1}),e.searchEnabled?(E(),H(u,{key:0},{default:K((()=>[Y(h,{placeholder:e.$t("vendor.sales.filterAgents")+"...",class:"search-input",onKeyup:n[1]||(n[1]=n=>e.onSearch(n)),onIonChange:n[2]||(n[2]=n=>e.onSearch(n)),onIonClear:n[3]||(n[3]=n=>e.onSearch(n)),onIonCancel:n[4]||(n[4]=n=>e.onSearch(n))},null,8,["placeholder"])])),_:1})):F("",!0)])),_:1})]),Y(w,null,{default:K((()=>[Y(I,{ref:"refresher",slot:"fixed",onIonRefresh:n[5]||(n[5]=n=>e.handleRefresh(n))},{default:K((()=>[Y(f,{pullingIcon:"crescent"})])),_:1},512),e.fetching?(E(),q("div",U,[Y(m,{name:"crescent"})])):F("",!0),e.fetching?F("",!0):(E(),H(k,{key:1,lines:"none",class:"ion-padding-horizontal sales-select-list simple"},{default:K((()=>[Y(_,null,{default:K((()=>[Y(S,{class:"fw-bold"},{default:K((()=>[D(z(e.$t("vendor.sales.selectSaleAgent")),1)])),_:1})])),_:1}),(E(!0),q(J,null,G(e.filteredAgents,(n=>(E(),H(C,{key:n.id,onClick:t=>e.selectAgent(n)},{default:K((()=>[Y(v,{slot:"start"},{default:K((()=>[Y(b,{src:n.image},null,8,["src"])])),_:2},1024),Y(S,null,{default:K((()=>[P("p",V,z(n.name),1),Y(y,{color:"medium",class:"font-medium"},{default:K((()=>{var t;return[D(z((null===(t=n.role)||void 0===t?void 0:t.name)||e.$t("vendor.sales.saleAgent")),1)]})),_:2},1024)])),_:2},1024),Y(p,{"aria-label":n.name,slot:"end",mode:"ios",value:n.id,checked:e.saleStore.newSale.cms_users_id==n.id},null,8,["aria-label","value","checked"])])),_:2},1032,["onClick"])))),128))])),_:1}))])),_:1}),Y(B,{class:"ion-padding ion-no-border"},{default:K((()=>[Y(A,{id:"agent-continue",disabled:!e.saleStore.newSale.cms_users_id,onClick:n[6]||(n[6]=n=>e.onContinue())},{default:K((()=>[D(z(e.$t("general.continue")),1)])),_:1},8,["disabled"])])),_:1})])),_:1})}]]))}}}));