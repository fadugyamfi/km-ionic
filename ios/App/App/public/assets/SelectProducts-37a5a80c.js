import{d as y,a3 as Q,af as W,s as P,a as $,H as Z,ad as x,J as oo,q as k,a9 as T,aa as L,ab as E,L as A,C as H,_ as F,x as t,o as l,c as i,w as n,e,g as u,t as c,aI as eo,aJ as to,i as no,k as so,p as ao,F as ro,j as lo,G as co,r as io,h as uo,I as mo,ax as _o,aT as po,N as Io,n as fo,bd as ho,ae as So,m as go,v as Co,f as B,ao as bo,B as b,A as v,X as wo,Y as Bo}from"./index-f92ce253.js";import{u as G}from"./SaleStore-6ada4812.js";import{K as vo}from"./KolaYellowButton-490da95d.js";import{u as yo}from"./BusinessStore-3612150a.js";import{I as Po}from"./Image-ab8c6f04.js";import{P as $o}from"./ProductCard-5dcd7a90.js";import{u as ko}from"./ProductStore-cdc6633e.js";import"./Product-5dbe9562.js";import"./Date-1419e6d2.js";import"./index-bde9bf13.js";import"./index-ee3c01c5.js";import"./CartStore-fd5eecd8.js";import"./Order-423a7fc9.js";import"./FavoriteButton.vue_vue_type_script_setup_true_lang-6575d0e9.js";const To=y({data(){return{location:Q,locationOutline:W,customer:null}},computed:{...P(yo,G,$)},components:{IonCard:Z,IonAvatar:x,IonCardContent:oo,IonLabel:k,Image:Po,IonGrid:T,IonRow:L,IonCol:E,IonIcon:A},methods:{async loadSelectedCustomer(){try{const o=await this.businessStore.getBusinessCustomers(this.userStore.activeBusiness,300);this.customer=o.find(s=>s.id==this.saleStore.newSale.customer_id)}catch(o){H(o)}}},mounted(){this.loadSelectedCustomer()}});function Lo(o,s,d,K,R,N){const S=t("Image"),m=t("IonAvatar"),_=t("IonCol"),p=t("IonLabel"),g=t("IonIcon"),I=t("IonRow"),C=t("IonGrid"),f=t("IonCardContent"),h=t("IonCard");return l(),i(h,null,{default:n(()=>[e(f,null,{default:n(()=>[e(C,null,{default:n(()=>[e(I,null,{default:n(()=>[e(_,{size:"auto"},{default:n(()=>[e(m,null,{default:n(()=>{var r;return[e(S,{src:(r=o.customer)==null?void 0:r.logo},null,8,["src"])]}),_:1})]),_:1}),e(_,{class:"d-flex ion-align-items-start ion-justify-content-center flex-column"},{default:n(()=>[e(p,{class:"fw-semibold"},{default:n(()=>{var r;return[u(c((r=o.customer)==null?void 0:r.name),1)]}),_:1}),e(p,{class:"d-flex ion-align-items-center"},{default:n(()=>{var r;return[e(g,{icon:o.locationOutline},null,8,["icon"]),u(" "+c((r=o.customer)==null?void 0:r.location),1)]}),_:1})]),_:1})]),_:1})]),_:1})]),_:1})]),_:1})}const Eo=F(To,[["render",Lo],["__scopeId","data-v-d61943c7"]]),Ao=y({data(){return{search:eo,arrowBack:to,searchEnabled:!1,fetching:!1,products:[]}},mounted(){this.fetchProducts()},components:{IonPage:no,IonHeader:so,IonToolbar:ao,IonButtons:ro,IonBackButton:lo,IonTitle:co,IonButton:io,IonIcon:A,IonFooter:uo,KolaYellowButton:vo,IonContent:mo,SelectedCustomer:Eo,IonList:_o,IonListHeader:po,IonLabel:k,IonItem:Io,IonText:fo,IonCheckbox:ho,IonGrid:T,IonRow:L,IonCol:E,ProductCard:$o,IonSearchbar:So,IonSpinner:go},computed:{...P(G,ko,$)},methods:{async fetchProducts(o={}){var s;this.fetching=!0;try{const d={businesses_id:(s=this.userStore.activeBusiness)==null?void 0:s.id,limit:500,...o};this.products=await this.productStore.fetchProducts(d)}catch(d){H(d)}finally{this.fetching=!1}},isSelected(o){return this.saleStore.isProductSelected(o)},selectProduct(o){console.log(o),o.selected?this.saleStore.addProductToSale(o.product):this.saleStore.removeProductFromSale(o.product),console.log(this.saleStore.newSale)},onContinue(){var o;if(((o=this.saleStore.newSale.sale_items)==null?void 0:o.length)==0){Co().showError(this.$t("vendor.sales.selectProductsToContinue"),"","bottom","select-products-continue");return}this.$router.push("/vendor/sales/add-sale/configure-items")},toggleSearchEnabled(){this.searchEnabled=!this.searchEnabled},onSearch(o){this.fetchProducts({product_name_has:o.target.value})}}}),Ho={class:"ion-padding",style:{"padding-bottom":"0.35em"}},Fo={key:0,class:"ion-text-center"};function Go(o,s,d,K,R,N){const S=t("IonBackButton"),m=t("IonButtons"),_=t("IonTitle"),p=t("IonIcon"),g=t("IonButton"),I=t("IonToolbar"),C=t("IonSearchbar"),f=t("IonHeader"),h=t("IonLabel"),r=t("IonListHeader"),z=t("IonList"),V=t("SelectedCustomer"),Y=t("IonSpinner"),j=t("ProductCard"),q=t("IonCol"),D=t("IonRow"),J=t("IonGrid"),O=t("IonContent"),U=t("KolaYellowButton"),X=t("IonFooter"),M=t("IonPage");return l(),i(M,null,{default:n(()=>[B("section",Ho,[e(f,{classs:"ion-no-border",style:{"box-shadow":"none"}},{default:n(()=>[e(f,{class:"inner-header"},{default:n(()=>[e(I,null,{default:n(()=>[e(m,{slot:"start"},{default:n(()=>[e(S,{defaultHref:"/vendor/sales/add-sale/select-customer",icon:o.arrowBack,mode:"md"},null,8,["icon"])]),_:1}),e(_,{size:"small"},{default:n(()=>[B("b",null,c(o.$t("vendor.sales.addSale")),1)]),_:1}),e(m,{slot:"end"},{default:n(()=>[e(g,{color:"dark",onClick:s[0]||(s[0]=a=>o.toggleSearchEnabled())},{default:n(()=>[e(p,{icon:o.search,color:"dark"},null,8,["icon"])]),_:1})]),_:1})]),_:1}),o.searchEnabled?(l(),i(I,{key:0},{default:n(()=>[e(C,{placeholder:o.$t("vendor.sales.searchProducts")+"...",class:"search-input",onKeyup:s[1]||(s[1]=bo(a=>o.onSearch(a),["enter"])),onIonChange:s[2]||(s[2]=a=>o.onSearch(a))},null,8,["placeholder"])]),_:1})):b("",!0)]),_:1}),e(z,{lines:"none",class:"sales-select-list ion-padding-horizontal",style:{"margin-bottom":"0px"}},{default:n(()=>[e(r,{class:"d-flex ion-justify-content-between"},{default:n(()=>[e(h,{class:"fw-bold"},{default:n(()=>[u(c(o.$t("vendor.sales.selectProducts")),1)]),_:1}),e(h,{class:"fw-bold ion-text-end",color:"medium"},{default:n(()=>{var a;return[u(c(o.$t("vendor.sales.itemsSelected",{total:(a=o.saleStore.newSale.sale_items)==null?void 0:a.length})),1)]}),_:1})]),_:1})]),_:1})]),_:1})]),e(O,null,{default:n(()=>[e(V),o.fetching?(l(),v("div",Fo,[e(Y,{name:"crescent"})])):b("",!0),o.fetching?b("",!0):(l(),i(J,{key:1},{default:n(()=>[e(D,null,{default:n(()=>[(l(!0),v(Bo,null,wo(o.products,a=>(l(),i(q,{size:"6",key:a.id},{default:n(()=>[e(j,{product:a,showDescription:!1,showAddToCart:!1,showAddToFavorites:!1,showAddToSelected:!0,action:"toggleSelect","initially-selected":o.isSelected(a),onToggleSelect:s[3]||(s[3]=w=>o.selectProduct(w))},null,8,["product","initially-selected"])]),_:2},1024))),128))]),_:1})]),_:1}))]),_:1}),e(X,{class:"ion-padding ion-no-border"},{default:n(()=>{var a;return[e(U,{id:"select-products-continue",disabled:((a=o.saleStore.newSale.sale_items)==null?void 0:a.length)==0,onClick:s[4]||(s[4]=w=>o.onContinue())},{default:n(()=>[u(c(o.$t("general.continue")),1)]),_:1},8,["disabled"])]}),_:1})]),_:1})}const Qo=F(Ao,[["render",Go]]);export{Qo as default};
