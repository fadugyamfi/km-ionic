import{d as w,i as y,k as T,p as R,F as v,j as N,G as $,r as K,L as A,I as L,h as G,ad as H,ax as q,N as E,q as F,ae as O,ac as V,a9 as Y,aa as z,ab as j,as as W,ak as X,aq as x,at as D,au as J,al as M,s as Q,C as U,_ as Z,x as e,o as r,c,w as n,e as t,g as oo,ao as eo,A as p,B as l,X as to,Y as no}from"./index-f92ce253.js";import{u as ao}from"./ProductStore-cdc6633e.js";import{K as so}from"./KolaYellowButton-490da95d.js";import{K as ro}from"./KolaWhiteButton-71dee6cb.js";import{I as co}from"./Image-ab8c6f04.js";import{S as lo,a as uo}from"./swiper-vue-d81855d3.js";import{P as io}from"./ProductCard-5dcd7a90.js";import{N as po}from"./NoResults-eb849132.js";import"./Product-5dbe9562.js";import"./index-bde9bf13.js";import"./index-ee3c01c5.js";import"./CartStore-fd5eecd8.js";import"./Order-423a7fc9.js";import"./BusinessStore-3612150a.js";import"./FavoriteButton.vue_vue_type_script_setup_true_lang-6575d0e9.js";import"./disappointed-59090e3a.js";const mo=w({components:{IonPage:y,IonHeader:T,IonToolbar:R,IonButtons:v,IonBackButton:N,IonTitle:$,IonButton:K,IonIcon:A,IonContent:L,IonFooter:G,KolaYellowButton:so,KolaWhiteButton:ro,Image:co,Swiper:lo,SwiperSlide:uo,IonAvatar:H,IonList:q,IonItem:E,IonLabel:F,IonSearchbar:O,IonSkeletonText:V,ProductCard:io,IonGrid:Y,IonRow:z,IonCol:j,NoResults:po},data(){return{close:W,heartOutline:X,cartOutline:x,shareOutline:D,cart:J,heart:M,fetching:!1,products:null,defaultBanner:"/images/vendor/banner.png"}},computed:{...Q(ao)},methods:{async fetchSearchedProducts(){this.fetching=!0;try{this.products=await this.productStore.fetchSearchedProducts()}catch(o){U(o)}finally{this.fetching=!1}},onSearch(o){var a;this.productStore.searchTerm=(a=o.target)==null?void 0:a.value,this.products=[],this.fetchSearchedProducts()},onLoadError(o){o.target.src=this.defaultBanner},viewProduct(o){this.$router.push("/shopper/products/".concat(o.id))}},mounted(){this.fetchSearchedProducts()}});const ho={key:0};function Io(o,a,fo,_o,So,go){const m=e("IonBackButton"),h=e("IonButtons"),I=e("IonTitle"),u=e("IonToolbar"),f=e("IonSearchbar"),_=e("IonHeader"),i=e("IonSkeletonText"),S=e("NoResults"),g=e("ProductCard"),B=e("IonCol"),C=e("IonRow"),k=e("IonGrid"),P=e("IonContent"),b=e("IonPage");return r(),c(b,null,{default:n(()=>[t(_,{class:"ion-no-border"},{default:n(()=>[t(u,null,{default:n(()=>[t(h,{slot:"start"},{default:n(()=>[t(m,{defaultHref:"/shopper/home",icon:o.close},null,8,["icon"])]),_:1}),t(I,{size:"small"},{default:n(()=>[oo("Search Results")]),_:1})]),_:1}),t(u,null,{default:n(()=>[t(f,{class:"search-input",placeholder:"Search...",onKeyup:a[0]||(a[0]=eo(s=>o.onSearch(s),["enter"])),onIonChange:a[1]||(a[1]=s=>o.onSearch(s)),onIonClear:a[2]||(a[2]=s=>o.onSearch(s))})]),_:1})]),_:1}),t(P,null,{default:n(()=>{var s;return[o.fetching?(r(),p("section",ho,[t(i,{animated:!0}),t(i,{animated:!0})])):l("",!0),((s=o.products)==null?void 0:s.length)==0&&!o.fetching?(r(),c(S,{key:1,title:o.$t("shopper.businesses.noResultsAvailable"),description:o.$t("shopper.businesses.pleaseTryYourSearchAgain")},null,8,["title","description"])):l("",!0),!o.fetching&&o.products?(r(),c(k,{key:2},{default:n(()=>[t(C,null,{default:n(()=>[(r(!0),p(no,null,to(o.products,d=>(r(),c(B,{size:"6",key:d.id},{default:n(()=>[t(g,{product:d,"show-description":!1},null,8,["product"])]),_:2},1024))),128))]),_:1})]),_:1})):l("",!0)]}),_:1})]),_:1})}const Ho=Z(mo,[["render",Io],["__scopeId","data-v-a84a4371"]]);export{Ho as default};