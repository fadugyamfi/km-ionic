!function(){function t(t,s,e){return(s=function(t){var s=function(t,s){if("object"!=typeof t||null===t)return t;var e=t[Symbol.toPrimitive];if(void 0!==e){var i=e.call(t,s||"default");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===s?String:Number)(t)}(t,"string");return"symbol"==typeof s?s:String(s)}(s))in t?Object.defineProperty(t,s,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[s]=e,t}System.register(["./index-legacy-cc225d81.js","./Product-legacy-3e97f985.js","./Date-legacy-65bfc294.js"],(function(s,e){"use strict";var i,n,a,d,r,o,u,l;return{setters:[t=>{i=t.am,n=t.a4,a=t.a5,d=t.a,r=t.a6,o=t.C},t=>{u=t.P},t=>{l=t.f}],execute:function(){const e=1,c=5;class _{constructor(s){t(this,"id",void 0),t(this,"name",void 0),t(this,"description",void 0),Object.assign(this,s)}}s("S",_);class h{constructor(s){t(this,"id",void 0),t(this,"businesses_id",void 0),t(this,"cms_users_id",void 0),t(this,"sale_types_id",void 0),t(this,"payment_modes_id",void 0),t(this,"customer_id",void 0),t(this,"credits_id",void 0),t(this,"gps_location",void 0),t(this,"delivery_location",void 0),t(this,"product_units_id",void 0),t(this,"sale_started_at",void 0),t(this,"sale_ended_at",void 0),t(this,"total_items",0),t(this,"total_sales_price",0),t(this,"total_discount",0),t(this,"created_at",void 0),t(this,"sale_items",[]),t(this,"sale_items_count",0),t(this,"_product",void 0),t(this,"_business",void 0),t(this,"_customer",void 0),t(this,"_saleType",void 0),this.update(s)}update(t){Object.assign(this,t)}isCreditSale(){return this.sale_types_id==c}isCashSale(){return this.sale_types_id==e}get product(){return this._product}set product(t){this._product=t?new u(t):null}get customer(){return this._customer}set customer(t){this._customer=t?new i(t):null}get business(){return this._business}set business(t){this._business=t?new i(t):null}get sale_type(){return this._saleType}set sale_type(t){this._saleType=t?new _(t):null}}class p{constructor(s){t(this,"id",void 0),t(this,"businesses_id",void 0),t(this,"products_id",void 0),t(this,"quantity",0),t(this,"unit_price",0),t(this,"total_price",0),t(this,"_product",void 0),this.update(s)}update(t){Object.assign(this,t)}get product(){return this._product}set product(t){this._product=t?new u(t):null}}new n;s("u",a("sale",{state:()=>({newSale:new h({}),sales:[]}),actions:{resetForNewSale(){var t,s;const e=d();this.newSale=new h({businesses_id:null===(t=e.activeBusiness)||void 0===t?void 0:t.id,cms_users_id:null===(s=e.user)||void 0===s?void 0:s.id,credits_id:1,gps_location:"-",delivery_location:"Ghana",product_units_id:1,payment_modes_id:1,sale_types_id:1,sale_started_at:l((new Date).toISOString()),sale_ended_at:"",total_items:0,total_sales_price:0,total_discount:0,description:""})},addProductToSale(t){var s;const e=new p({quantity:1,unit_price:t.product_price,total_price:t.product_price,products_id:t.id,product:t,product_units_id:1,currencies_id:1,cms_users_id:this.newSale.cms_users_id,businesses_id:this.newSale.businesses_id,description:"",is_on_sale:0});null===(s=this.newSale.sale_items)||void 0===s||s.push(e)},removeProductFromSale(t){var s,e;const i=null===(s=this.newSale.sale_items)||void 0===s?void 0:s.findIndex((s=>s.products_id==t.id));null===(e=this.newSale.sale_items)||void 0===e||e.splice(i,1)},isProductSelected(t){var s;const e=null===(s=this.newSale.sale_items)||void 0===s?void 0:s.findIndex((s=>s.products_id==t.id));return!isNaN(e)&&e>-1},async recordSale(){return this.newSale.update({sale_ended_at:l((new Date).toISOString())}),r.post("/v2/sales",this.newSale).then((t=>{const s=new h(t.data.data);return this.sales.unshift(s),s})).catch((t=>(o(t),null)))},async fetchSales(t={}){var s;const e={businesses_id:null===(s=d().activeBusiness)||void 0===s?void 0:s.id,limit:50,...t};return r.get("/v2/sales",{params:e}).then((t=>(this.sales=t.data.data.map((t=>new h(t))),this.sales))).catch((t=>(o(t),[])))},async fetchSale(t,s={}){const e={...s};return r.get(`/v2/sales/${t}`,{params:e}).then((t=>new h(t.data.data))).catch((t=>(o(t),null)))},async deleteSale(t){return r.delete(`/v2/sales/${t.id}`).then((()=>{const s=this.sales.findIndex((s=>s.id==t.id));s>-1&&this.sales.splice(s,1)})).catch((t=>{o(t)}))}}}))}}}))}();