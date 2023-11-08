import{d as v,y as J,x as t,o as a,c as $,w as o,e,g as u,t as m,_ as w,r as E,p as U,F as A,A as g,H as T,Y as H,X as D,R as W,S as X,f as k,aR as M,N as j,q as z,aS as Q,L as x,a9 as Z,aa as ee,ab as oe,ag as L,J as te,ax as K,ad as P,aT as ne,ac as re,n as se,aU as F,aV as ae,aW as de,K as ce,k as ie,j as le,G as _e,i as ue,U as pe,V as me,ai as Ie,ah as fe,I as he,m as ye,aE as ge,s as be,C as Oe}from"./index-f92ce253.js";import{u as q}from"./OrderStore-6d589189.js";import{I as N}from"./Image-ab8c6f04.js";import{S as Se,a as $e}from"./swiper-vue-d81855d3.js";import{f as R}from"./Filters-875bda85.js";import{K as ve}from"./KolaYellowButton-490da95d.js";import"./Order-423a7fc9.js";import"./Product-5dbe9562.js";import"./index-bde9bf13.js";import"./index-ee3c01c5.js";import"./Date-1419e6d2.js";import"./Number-6d4d03a9.js";const we=v({__name:"OrdersCard",setup(n){const r=J(0);return(h,C)=>{const I=t("ion-text"),p=t("ion-col"),d=t("ion-row"),i=t("ion-card");return a(),$(i,{class:"order-card"},{default:o(()=>[e(d,{class:"row"},{default:o(()=>[e(p,{size:"auto"},{default:o(()=>[e(I,{class:"item-text"},{default:o(()=>[u("Order Total")]),_:1})]),_:1}),e(p,{class:"ion-text-end"},{default:o(()=>[e(I,{class:"order-price"},{default:o(()=>[u(m(r.value),1)]),_:1})]),_:1})]),_:1}),e(d,{class:"divider-row"},{default:o(()=>[e(p,{class:"divider-col"})]),_:1}),e(d,{class:"row"},{default:o(()=>[e(p,{size:"auto"},{default:o(()=>[e(I,{class:"item-text"},{default:o(()=>[u("Estimated Delivery")]),_:1})]),_:1}),e(p,{class:"ion-text-end"},{default:o(()=>[e(I,{class:"item-price"},{default:o(()=>[u("TBD")]),_:1})]),_:1})]),_:1})]),_:1})}}});const Ce=w(we,[["__scopeId","data-v-8f4ccfd6"]]),ke=v({props:[],components:{IonButton:E,IonToolbar:U,IonButtons:A}});function Be(n,r,h,C,I,p){const d=t("ion-button"),i=t("ion-buttons"),l=t("ion-toolbar");return a(),g("section",null,[e(l,null,{default:o(()=>[e(i,{slot:"primary"},{default:o(()=>[e(d,{color:"yellow"},{default:o(()=>[u("Update")]),_:1})]),_:1})]),_:1})])}const He=w(ke,[["render",Be],["__scopeId","data-v-be58ca14"]]),Te=v({props:{order:{type:Object,required:!0}},data(){return{swiperOptions:{slidesPerView:1,autoplay:{delay:3e3},pagination:{el:".swiper-pagination",clickable:!0}}}},components:{Swiper:Se,SwiperSlide:$e,IonCard:T,Image:N}});const De=n=>(W("data-v-9901bbc6"),n=n(),X(),n),xe={class:"order-slider"},Le=De(()=>k("div",{class:"swiper-pagination"},null,-1));function Ve(n,r,h,C,I,p){const d=t("Image"),i=t("IonCard"),l=t("SwiperSlide"),f=t("Swiper");return a(),g("div",xe,[e(f,{ref:"swiper","slides-per-view":1,pagination:!0},{default:o(()=>{var y;return[(a(!0),g(H,null,D((y=n.order)==null?void 0:y.order_items,(b,O)=>(a(),$(l,{key:O},{default:o(()=>[e(i,null,{default:o(()=>{var _;return[e(d,{src:(_=b.product)==null?void 0:_.image},null,8,["src"])]}),_:2},1024)]),_:2},1024))),128)),Le]}),_:1},512)])}const Fe=w(Te,[["render",Ve],["__scopeId","data-v-9901bbc6"]]),Ee=v({components:{IonAccordion:M,IonItem:j,IonLabel:z,IonThumbnail:Q,IonIcon:x,Image:N,IonGrid:Z,IonRow:ee,IonCol:oe,IonCard:T,IonCardHeader:L,IonCardContent:te,IonList:K},props:{order:{type:Object,required:!0}},data(){return{Filters:R}},methods:{update(){var n;this.$router.push({name:"OrderUpdate",params:{id:(n=this.order)==null?void 0:n.id}})}}});function Ue(n,r,h,C,I,p){const d=t("Image"),i=t("IonThumbnail"),l=t("IonLabel"),f=t("IonItem"),y=t("IonCardHeader"),b=t("IonList"),O=t("IonCardContent"),_=t("IonCard");return a(),$(_,null,{default:o(()=>[e(y,{class:"ion-no-padding"},{default:o(()=>[e(f,{lines:"none"},{default:o(()=>[e(i,{slot:"start"},{default:o(()=>{var c,s;return[e(d,{src:(s=(c=n.order)==null?void 0:c.business)==null?void 0:s.logo},null,8,["src"])]}),_:1}),e(l,{class:"font-medium"},{default:o(()=>{var c,s;return[u(m((s=(c=n.order)==null?void 0:c.customer)==null?void 0:s.name),1)]}),_:1})]),_:1})]),_:1}),e(O,{class:"ion-no-padding"},{default:o(()=>[e(b,{lines:"none"},{default:o(()=>{var c;return[(a(!0),g(H,null,D((c=n.order)==null?void 0:c.order_items,s=>(a(),$(f,{key:s.id},{default:o(()=>[e(l,{class:"ion-text-wrap font-medium"},{default:o(()=>{var S;return[u(m((S=s.product)==null?void 0:S.product_name),1)]}),_:2},1024),e(l,{slot:"end",class:"font-medium text-end"},{default:o(()=>{var S,B;return[u(m(n.Filters.currency((S=s.product)==null?void 0:S.product_price,(B=s.currency)==null?void 0:B.symbol)),1)]}),_:2},1024)]),_:2},1024))),128))]}),_:1})]),_:1})]),_:1})}const Ae=w(Ee,[["render",Ue],["__scopeId","data-v-57908c3b"]]),je=v({components:{IonAvatar:P,IonIcon:x,IonItem:j,IonLabel:z,IonList:K,IonListHeader:ne,IonSkeletonText:re,IonCard:T,IonCardHeader:L,IonText:se},props:{order:{type:Object}},data(){return{Filters:R,orderStatuses:[{id:1,name:"Order Placed",icon:F},{id:4,name:"Order Confirmed",icon:ae},{id:6,name:"Out For Delivery",icon:F},{id:7,name:"Delivered",icon:de}]}},methods:{isActive(n){var r;return((r=this.order)==null?void 0:r.order_status_id)==n.id},getHistoryEntry(n){var h;return(h=this.order)==null?void 0:h.getLastOrderStatusHistory(n.id)}},setup(){return q(),{getIconForStatus:r=>r==="Confirmed"?"checkmark-circle":r==="Out for Delivery"?"truck":r==="Delivered"?"checkmark-done":"alert-circle"}}});const ze={class:"ion-no-margin"},Ke={class:"font-small"};function Pe(n,r,h,C,I,p){const d=t("IonText"),i=t("IonCardHeader"),l=t("IonCard"),f=t("ion-icon"),y=t("ion-label"),b=t("ion-item"),O=t("IonList");return a(),g(H,null,[e(l,{class:"header-card"},{default:o(()=>[e(i,null,{default:o(()=>[e(d,{color:"dark"},{default:o(()=>[u(m(n.$t("shopper.orders.orderStatus")),1)]),_:1})]),_:1})]),_:1}),e(l,null,{default:o(()=>[e(O,{lines:"none"},{default:o(()=>[(a(!0),g(H,null,D(n.orderStatuses,(_,c)=>(a(),$(b,{key:c},{default:o(()=>[e(f,{icon:_.icon,slot:"start",class:ce(["status-icon",{active:n.isActive(_)}])},null,8,["icon","class"]),e(y,null,{default:o(()=>{var s;return[k("h3",ze,m(_.name),1),k("p",Ke,m(n.getHistoryEntry(_)?n.Filters.date((s=n.getHistoryEntry(_))==null?void 0:s.created_at,"short"):""),1)]}),_:2},1024),e(f,{slot:"end",icon:c<n.orderStatuses.length-1?"arrow-forward":""},null,8,["icon"])]),_:2},1024))),128))]),_:1})]),_:1})],64)}const qe=w(je,[["render",Pe],["__scopeId","data-v-78ee9cf7"]]),Ne=v({components:{IonHeader:ie,IonToolbar:U,IonButtons:A,IonBackButton:le,IonTitle:_e,IonPage:ue,IonSelect:pe,IonSelectOption:me,IonAvatar:P,IonCard:T,IonCardHeader:L,IonCardSubtitle:Ie,IonCardTitle:fe,IonIcon:x,IonContent:he,OrdersCard:Ce,UpdateButon:He,IonButton:E,OrderImages:Fe,IonSpinner:ye,OrderDetailItems:Ae,KolaYellowButton:ve,OrderStatusHistoryView:qe},name:"OrderDetails",data(){return{loading:!1,chatbubbleOutline:ge,order:null}},async mounted(){await this.loadOrder()},computed:{...be(q)},methods:{async loadOrder(){this.loading=!0;const n=+this.$route.params.id;this.order=this.orderStore.orders.find(r=>r.id==n);try{this.order=await this.orderStore.fetchOrder(n)}catch(r){Oe(r)}finally{this.loading=!1}}}});const Re={class:"ion-padding"},Ye={key:0,class:"d-flex ion-justify-content-center ion-padding"},Ge={key:1},Je={class:"ion-padding-horizontal update-button-section"};function We(n,r,h,C,I,p){const d=t("IonBackButton"),i=t("IonButtons"),l=t("IonTitle"),f=t("IonIcon"),y=t("IonButton"),b=t("IonToolbar"),O=t("IonHeader"),_=t("IonSpinner"),c=t("OrderImages"),s=t("OrderDetailItems"),S=t("KolaYellowButton"),B=t("OrderStatusHistoryView"),Y=t("ion-content"),G=t("IonPage");return a(),$(G,null,{default:o(()=>[k("section",Re,[e(O,{class:"inner-header"},{default:o(()=>[e(b,{class:"ion-align-items-center"},{default:o(()=>[e(i,{slot:"start"},{default:o(()=>[e(d,{defaultHref:"/shopper/orders"})]),_:1}),e(l,{size:"small",class:"fw-bold"},{default:o(()=>{var V;return[u(m(n.$t("shopper.orders.orderDetails"))+" - #"+m((V=n.order)==null?void 0:V.id),1)]}),_:1}),e(i,{slot:"end"},{default:o(()=>[e(y,null,{default:o(()=>[e(f,{slot:"icon-only",icon:n.chatbubbleOutline},null,8,["icon"])]),_:1})]),_:1})]),_:1})]),_:1})]),e(Y,{fullscreen:!0},{default:o(()=>[n.loading?(a(),g("section",Ye,[e(_,{name:"crescent"})])):(a(),g("section",Ge,[e(c,{order:n.order},null,8,["order"]),e(s,{order:n.order},null,8,["order"]),k("section",Je,[e(S,null,{default:o(()=>[u(m("Update"))]),_:1})]),e(B,{order:n.order},null,8,["order"])]))]),_:1})]),_:1})}const io=w(Ne,[["render",We],["__scopeId","data-v-5280448a"]]);export{io as default};