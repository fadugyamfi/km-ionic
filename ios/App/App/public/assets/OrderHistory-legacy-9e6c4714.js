System.register(["./index-legacy-cc225d81.js","./NotificationButton-legacy-00006a2d.js","./OrderStore-legacy-13b28f11.js","./Filters-legacy-f119b4cd.js","./Image-legacy-0949e555.js","./FilterOrdersSheet-legacy-b4b10bd3.js","./Date-legacy-65bfc294.js","./NoResults-legacy-ea71beec.js","./KolaYellowButton-legacy-095e43ab.js","./disappointed-legacy-3c538a21.js","./Order-legacy-de27059d.js","./Product-legacy-3e97f985.js","./Number-legacy-044d9086.js","./index-legacy-92c3b46a.js","./index-legacy-d3e52be1.js"],(function(e,t){"use strict";var n,o,a,l,i,r,s,d,u,c,h,p,f,g,I,m,v,_,b,O,y,S,w,x,D,j,C,F,k,B,M,P,L,N,H,T,$,z,A,E,R,K,U,q,G,J,Y,Q,W,X,V,Z,ee,te,ne,oe,ae,le,ie,re;return{setters:[e=>{n=e.d,o=e.ad,a=e.ar,l=e.L,i=e.N,r=e.q,s=e.ax,d=e.az,u=e.I,c=e.ac,h=e.r,p=e.ap,f=e.n,g=e.s,I=e.aA,m=e.aB,v=e.aC,_=e.aD,b=e.aE,O=e.aF,y=e.aG,S=e.aH,w=e._,x=e.x,D=e.o,j=e.c,C=e.w,F=e.A,k=e.X,B=e.Y,M=e.e,P=e.g,L=e.aI,N=e.aJ,H=e.aK,T=e.aL,$=e.aM,z=e.i,A=e.k,E=e.p,R=e.aN,K=e.aO,U=e.F,q=e.j,G=e.G,J=e.m,Y=e.C,Q=e.t,W=e.aP,X=e.aQ,V=e.f,Z=e.B},e=>{ee=e.N},e=>{te=e.u},e=>{ne=e.f},e=>{oe=e.I},e=>{ae=e.O,le=e.F},e=>{ie=e.f},e=>{re=e.N},null,null,null,null,null,null,null],execute:function(){var t=document.createElement("style");t.textContent=".order-list[data-v-310f2d5a]{--padding: 10px;--border-radius: 20px;--background: #fff;justify-content:center}.item[data-v-310f2d5a]{--align-content: center;--justify-content: center;--align-items: center}.badge[data-v-310f2d5a]{align-content:center;justify-content:center}.ion-content[data-v-b9685494]{--align-items: center;--padding-top: 10px;--padding-bottom: 10px;--padding-left: 10px;--padding-right: 10px;--text-align: justify;--white-space: normal;--border-radius: 10px}.ion-segment-button[data-v-b9685494]{--padding-top: 10px;--padding-bottom: 10px;--padding-left: 10px;--padding-right: 10px}\n",document.head.appendChild(t);const se=n({props:{orders:{type:Array,required:!0}},components:{IonAvatar:o,IonBadge:a,IonIcon:l,IonItem:i,IonLabel:r,IonList:s,IonPopover:d,IonContent:u,IonSkeletonText:c,IonButton:h,IonChip:p,IonText:f,Image:oe,OrderListItem:ae},computed:{...g(te)},data:()=>({sync:I,create:m,trash:v,chatbubble:_,chatbubbleOutline:b,createOutline:O,ellipsisHorizontal:y,trashOutline:S,event:null,openPopover:-1,selectedOrder:null,showConfirmDeleteModal:!1,filters:ne}),methods:{openMenu(e,t){this.event=e,this.openPopover=t},closeMenu(){this.openPopover=-1,this.event=null},deleteSale(e){this.selectedOrder=e,this.showConfirmDeleteModal=!0,this.closeMenu()},async onConfirmDelete(){var e;this.showConfirmDeleteModal=!1,await this.orderStore.deleteOrder(null===(e=this.selectedOrder)||void 0===e?void 0:e.id)},viewDetails(e){this.$emit("view-details",e),this.$router.push(`/shopper/orders/${e.id}`)}}}),de=n({data:()=>({search:L,arrowBack:N,ellipsisHorizontal:y,filter:H,optionsOutline:T,add:$,fetching:!1,filters:ne,showFilterSheet:!1,searchFilters:{start_dt:"",end_dt:""}}),components:{IonPage:z,IonHeader:A,IonToolbar:E,IonContent:u,IonSegmentButton:R,IonSegment:K,IonLabel:r,IonButtons:U,IonBackButton:q,IonBadge:a,IonTitle:G,PlacedOrderList:w(se,[["render",function(e,t,n,o,a,l){const i=x("ion-icon"),r=x("ion-item"),s=x("IonList"),d=x("IonContent"),u=x("IonPopover"),c=x("OrderListItem");return D(),j(s,{lines:"full"},{default:C((()=>[(D(!0),F(B,null,k(e.orders,((n,o)=>(D(),j(c,{key:n.id,order:n,onClick:t=>e.viewDetails(n),onOpenMenu:t=>e.openMenu(t,o)},{popover:C((()=>[M(u,{event:e.event,isOpen:e.openPopover==o,onDidDismiss:t[0]||(t[0]=t=>e.openPopover=-1)},{default:C((()=>[M(d,{class:"ion-no-padding"},{default:C((()=>[M(s,{lines:"full",class:"ion-no-padding"},{default:C((()=>[M(r,{button:!0,lines:"full","aria-label":"sync"},{default:C((()=>[M(i,{slot:"start",icon:e.sync,"aria-hidden":"true"},null,8,["icon"]),P(" Re-order ")])),_:1}),M(r,{button:!0,lines:"full"},{default:C((()=>[M(i,{slot:"start",icon:e.chatbubbleOutline},null,8,["icon"]),P(" Message Supplier ")])),_:1}),M(r,{button:!0,lines:"full"},{default:C((()=>[M(i,{slot:"start",icon:e.createOutline},null,8,["icon"]),P(" Edit Order ")])),_:1}),M(r,{button:!0,lines:"full"},{default:C((()=>[M(i,{slot:"start",icon:e.trashOutline},null,8,["icon"]),P(" Delete ")])),_:1})])),_:1})])),_:1})])),_:2},1032,["event","isOpen"])])),_:2},1032,["order","onClick","onOpenMenu"])))),128))])),_:1})}],["__scopeId","data-v-310f2d5a"]]),NotificationButton:ee,IonButton:h,IonIcon:l,FilterOrdersSheet:le,NoResults:re,IonSpinner:J},computed:{...g(te)},methods:{async fetchOrders(){try{this.fetching=!0,await this.orderStore.fetchPlacedOrders(this.searchFilters)}catch(e){Y(e)}finally{this.fetching=!1}},onSegmentChanged(e){let t=new Date,n=new Date;switch(e.detail.value){case"pastmonth":t.setMonth(t.getMonth()-1);break;case"today":t.setDate(t.getDate()-1);break;case"thisweek":t.setDate(t.getDate()-7)}this.searchFilters.start_dt=ie(t.toISOString()),this.searchFilters.end_dt=ie(n.toISOString()),this.fetchOrders()},onFilterUpdate(e){this.searchFilters.start_dt=e.start_dt,this.searchFilters.end_dt=e.end_dt||ie((new Date).toISOString()),this.fetchOrders()}},mounted(){this.onSegmentChanged(new CustomEvent("load",{detail:{value:"thisweek"}}))}}),ue={class:"ion-padding ion-text-center"};e("default",w(de,[["render",function(e,t,n,o,a,l){const i=x("ion-back-button"),r=x("ion-buttons"),s=x("IonTitle"),d=x("IonIcon"),u=x("IonButton"),c=x("NotificationButton"),h=x("ion-toolbar"),p=x("ion-header"),f=x("IonLabel"),g=x("IonSegmentButton"),I=x("IonSegment"),m=x("IonToolbar"),v=x("IonHeader"),_=x("IonSpinner"),b=x("NoResults"),O=x("PlacedOrderList"),y=x("FilterOrdersSheet"),S=x("ion-content"),w=x("ion-page");return D(),j(w,null,{default:C((()=>[M(v,{class:"ion-padding ion-no-border"},{default:C((()=>[M(p,{class:"inner-header"},{default:C((()=>[M(h,{class:"ion-align-items-center"},{default:C((()=>[M(r,{slot:"start"},{default:C((()=>[M(i,{defaultHref:"/shopper/home"})])),_:1}),M(s,{size:"small",class:"fw-bold"},{default:C((()=>[P("Order History")])),_:1}),M(r,{slot:"end"},{default:C((()=>[M(u,{onClick:t[0]||(t[0]=t=>e.showFilterSheet=!0),color:"dark"},{default:C((()=>[M(d,{icon:e.optionsOutline},null,8,["icon"])])),_:1}),M(c)])),_:1})])),_:1})])),_:1}),M(m,null,{default:C((()=>[M(I,{value:"thisweek",mode:"ios",onIonChange:t[1]||(t[1]=t=>e.onSegmentChanged(t))},{default:C((()=>[M(g,{value:"today"},{default:C((()=>[M(f,null,{default:C((()=>[P(Q(e.$t("general.today")),1)])),_:1})])),_:1}),M(g,{value:"thisweek"},{default:C((()=>[M(f,null,{default:C((()=>[P(Q(e.$t("general.thisWeek")),1)])),_:1})])),_:1}),M(g,{value:"pastmonth"},{default:C((()=>[M(f,null,{default:C((()=>[P(Q(e.$t("general.pastMonth")),1)])),_:1})])),_:1})])),_:1})])),_:1})])),_:1}),M(S,null,{default:C((()=>{var n;return[W(V("div",ue,[M(_,{name:"crescent"})],512),[[X,e.fetching]]),W(V("section",null,[0==(null===(n=e.orderStore.orders)||void 0===n?void 0:n.length)?(D(),j(b,{key:0})):Z("",!0),M(O,{orders:e.orderStore.orders},null,8,["orders"])],512),[[X,!e.fetching]]),M(y,{isOpen:e.showFilterSheet,onDidDismiss:t[2]||(t[2]=t=>e.showFilterSheet=!1),onUpdate:t[3]||(t[3]=t=>e.onFilterUpdate(t))},null,8,["isOpen"])]})),_:1})])),_:1})}],["__scopeId","data-v-b9685494"]]))}}}));