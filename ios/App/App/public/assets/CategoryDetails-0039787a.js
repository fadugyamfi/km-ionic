import{d as _,aj as g,y as i,E as y,o as s,c as l,w as a,f as I,e as t,b as e,p as C,F as d,j as h,G as v,g as B,t as k,k as w,A as m,m as x,B as p,a9 as N,aa as P,X as b,Y as S,I as V,i as j,ab as D}from"./index-f92ce253.js";import{N as T}from"./NotificationButton-bfbf6cba.js";import{u as z}from"./ProductCategoryStore-e7d4d5d2.js";import{P as E}from"./ProductCard-5dcd7a90.js";import"./Date-1419e6d2.js";import"./KolaYellowButton-490da95d.js";import"./disappointed-59090e3a.js";import"./Product-5dbe9562.js";import"./Image-ab8c6f04.js";import"./index-bde9bf13.js";import"./index-ee3c01c5.js";import"./CartStore-fd5eecd8.js";import"./Order-423a7fc9.js";import"./BusinessStore-3612150a.js";import"./FavoriteButton.vue_vue_type_script_setup_true_lang-6575d0e9.js";import"./ProductStore-cdc6633e.js";const F={class:"ion-padding"},G={key:0,class:"ion-text-center d-flex ion-justify-content-center ion-padding"},oe=_({__name:"CategoryDetails",setup(H){const u=z(),f=g(),n=i(),c=i([]),r=i(!1);return y(async()=>{r.value=!0,n.value=await u.getCategory(+f.params.id),c.value=await u.fetchCategoryProducts(n.value),r.value=!1}),(R,A)=>(s(),l(e(j),null,{default:a(()=>[I("section",F,[t(e(w),{class:"inner-header"},{default:a(()=>[t(e(C),{class:"ion-align-items-center"},{default:a(()=>[t(e(d),{slot:"start"},{default:a(()=>[t(e(h),{defaultHref:"/shopper/home/categories"})]),_:1}),t(e(v),{size:"small",class:"fw-bold"},{default:a(()=>{var o;return[B(k((o=n.value)==null?void 0:o.name),1)]}),_:1}),t(e(d),{slot:"end"},{default:a(()=>[t(T)]),_:1})]),_:1})]),_:1})]),t(e(V),{fullscreen:!0},{default:a(()=>[r.value?(s(),m("section",G,[t(e(x),{name:"crescent"})])):p("",!0),r.value?p("",!0):(s(),l(e(N),{key:1},{default:a(()=>[t(e(P),null,{default:a(()=>[(s(!0),m(S,null,b(c.value,o=>(s(),l(e(D),{size:"6",key:o.id},{default:a(()=>[t(E,{product:o,showDescription:!1},null,8,["product"])]),_:2},1024))),128))]),_:1})]),_:1}))]),_:1})]),_:1}))}});export{oe as default};
