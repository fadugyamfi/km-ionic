System.register(["./index-legacy-cc225d81.js","./Product-legacy-3e97f985.js","./Image-legacy-0949e555.js","./CartStore-legacy-eb98406a.js","./FavoriteButton.vue_vue_type_script_setup_true_lang-legacy-c3e7b736.js"],(function(t,e){"use strict";var o,a,d,i,n,c,r,l,s,p,u,g,h,m,f,v,b,y,x,w,_,I,k,C,S,B,T,j;return{setters:[t=>{o=t.d,a=t.af,d=t.bc,i=t.H,n=t.ag,c=t.J,r=t.ah,l=t.ai,s=t.L,p=t.r,u=t.ac,g=t.bd,h=t._,m=t.x,f=t.o,v=t.A,b=t.e,y=t.w,x=t.c,w=t.B,_=t.W,I=t.K,k=t.f,C=t.t},t=>{S=t.P},t=>{B=t.I},t=>{T=t.u},t=>{j=t._}],execute:function(){var e=document.createElement("style");e.textContent=".line-clamp[data-v-150a97a7]{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}.product-card ion-card[data-v-150a97a7]{width:96%;min-width:148px;margin:0 auto}.product-card ion-card .product-image[data-v-150a97a7]{height:100px;object-fit:contain;padding:5px}.product-card ion-card .product-image.float[data-v-150a97a7]{position:absolute;height:1px}.product-card ion-card ion-card-header[data-v-150a97a7]{text-align:left;padding:10px}.product-card ion-card ion-card-header .product-title[data-v-150a97a7]{font-size:.95em;font-weight:600;margin-top:0;margin-bottom:5px;text-overflow:ellipsis;overflow:hidden;height:40px;color:#111}.product-card ion-card ion-card-header .pricing[data-v-150a97a7]{font-size:.93em;font-weight:400;color:#212121}.product-card ion-card ion-card-header .product-description[data-v-150a97a7]{font-size:.85em;margin-top:5px;color:#9e9e9e}.product-card ion-card ion-card-header ion-card-subtitle[data-v-150a97a7]{font-size:.8em;padding:0;margin:0;color:#bdbdbd;text-wrap:nowrap;text-overflow:ellipsis;overflow:hidden}.product-card ion-card ion-card-content[data-v-150a97a7]{display:flex;align-items:center;justify-content:space-between;font-size:.8em}.product-card ion-card ion-card-content .distance[data-v-150a97a7]{color:#666eed}.product-card .favorite-button[data-v-150a97a7]{--padding-start: 2px;--padding-end: 2px;--padding-top: 2px;--padding-bottom: 2px;position:absolute;top:0;right:5px;min-height:24px;font-size:12px;border-radius:50%;background:white;border:solid 1px #f1f1f1}.product-card ion-checkbox[data-v-150a97a7]{position:absolute;top:10px;right:10px}\n",document.head.appendChild(e);const A=o({props:{product:{required:!0,type:S},tall:{default:!1,type:Boolean},showDescription:{default:!0,type:Boolean},showAddToCart:{default:!0,type:Boolean},showAddToFavorites:{default:!0,type:Boolean},showAddToSelected:{default:!1,type:Boolean},initiallySelected:{default:!1,type:Boolean},action:{default:"viewProduct",type:String},business:{defaut:null,type:Object}},data:()=>({locationOutline:a,addCircleOutline:d,imgLoaded:!1,selected:!1,noImage:"/images/product-placeholder.png"}),emits:["toggleSelect"],components:{IonCard:i,IonCardHeader:n,IonCardContent:c,IonCardTitle:r,IonCardSubtitle:l,IonIcon:s,IonButton:p,Image:B,IonSkeletonText:u,FavoriteButton:j,IonCheckbox:g},methods:{doAction(){"viewProduct"==this.action&&this.viewProduct(),"toggleSelect"==this.action&&this.toggleSelected()},viewProduct(){this.$router.push(`/shopper/products/${this.product.id}`)},toggleSelected(){this.selected=!this.selected,this.$emit("toggleSelect",{selected:this.selected,product:this.product})},addToCart(){this.business&&!this.product.business&&(this.product.business=this.business),T().addProduct(this.product,1)}},beforeMount(){this.selected=this.initiallySelected}}),P={class:"product-card"},z={class:"d-flex ion-align-items-center ion-justify-content-between"},L={class:"product-title fw-semibold line-clamp"},F={class:"pricing d-flex ion-justify-content-between"},q={class:"ion-text-end"},O={key:0},H={key:1},V={key:2},$={key:0,class:"product-description"},D={class:"ion-no-margin"};t("P",h(A,[["render",function(t,e,o,a,d,i){const n=m("FavoriteButton"),c=m("IonCheckbox"),r=m("Image"),l=m("IonSkeletonText"),s=m("IonIcon"),p=m("IonButton"),u=m("IonCardHeader"),g=m("ion-card");return f(),v("section",P,[b(g,{onClick:e[4]||(e[4]=e=>t.doAction())},{default:y((()=>[t.showAddToFavorites?(f(),x(n,{key:0,class:"favorite-button",product:t.product,color:"dark"},null,8,["product"])):w("",!0),t.showAddToSelected?(f(),x(c,{key:1,mode:"ios",onClick:e[0]||(e[0]=_((()=>{}),["prevent"])),modelValue:t.selected,"onUpdate:modelValue":e[1]||(e[1]=e=>t.selected=e)},null,8,["modelValue"])):w("",!0),b(r,{class:I(["product-image",{float:!t.imgLoaded}]),alt:t.product.product_name,src:t.product.image,"no-img-src":t.noImage,onLoaded:e[2]||(e[2]=e=>t.imgLoaded=!0)},null,8,["class","alt","src","no-img-src"]),t.imgLoaded?w("",!0):(f(),x(l,{key:2,animated:!0,class:"product-image"})),b(u,null,{default:y((()=>{var o;return[k("section",z,[k("p",L,C(t.product.product_name),1),t.showAddToCart?(f(),x(p,{key:0,fill:"clear",color:"medium",onClick:e[3]||(e[3]=_((e=>t.addToCart()),["prevent","stop"])),class:"ion-no-padding ion-no-margin"},{default:y((()=>[b(s,{size:"large",slot:"icon-only",icon:t.addCircleOutline},null,8,["icon"])])),_:1})):w("",!0)]),k("section",F,[k("span",null,C(null===(o=t.product.currency)||void 0===o?void 0:o.symbol)+" "+C(t.product.product_price),1),k("span",q,[t.product.weight_value?(f(),v("span",O,C(t.product.weight_value)+"kg",1)):w("",!0),t.product.weight_value&&t.product.group_quantity?(f(),v("span",H,"/")):w("",!0),t.product.group_quantity?(f(),v("span",V,C(t.product.group_quantity)+"pcs",1)):w("",!0)])]),t.showDescription&&t.product.product_description?(f(),v("section",$,[k("p",D,C(t.product.product_description),1)])):w("",!0)]})),_:1})])),_:1})])}],["__scopeId","data-v-150a97a7"]]))}}}));