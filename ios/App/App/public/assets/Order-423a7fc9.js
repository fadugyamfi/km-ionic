var u=Object.defineProperty;var _=(e,s,r)=>s in e?u(e,s,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[s]=r;var t=(e,s,r)=>(_(e,typeof s!="symbol"?s+"":s,r),r);import{aZ as c,am as i}from"./index-f92ce253.js";import{P as o}from"./Product-5dbe9562.js";class d{constructor(s){t(this,"id");t(this,"businesses_id");t(this,"products_id");t(this,"product_name");t(this,"product_image");t(this,"product_price");t(this,"currencies_id");t(this,"currency_symbol");t(this,"product_units_id");t(this,"unit_price");t(this,"total_price");t(this,"quantity",1);t(this,"_product");t(this,"_currency");Object.assign(this,s)}update(s){Object.assign(this,s)}get product(){return this._product}set product(s){this._product=s?new o(s):null}get currency(){return this._currency}set currency(s){this._currency=new c(s||{symbol:"GHS"})}}class n{constructor(s){t(this,"id");t(this,"order_id");t(this,"businesses_id");t(this,"cms_users_id");t(this,"order_status_id");t(this,"comment");t(this,"created_at");Object.assign(this,s)}update(s){Object.assign(this,s)}}class h{constructor(s){t(this,"id");t(this,"businesses_id");t(this,"customer_id");t(this,"total_order_amount");t(this,"order_status_id");t(this,"created_at");t(this,"order_status");t(this,"start_dt");t(this,"product_units_id");t(this,"_order_status_histories",[]);t(this,"_order_items",[]);t(this,"_customer");t(this,"_business");t(this,"_currency");Object.assign(this,s)}update(s){Object.assign(this,s)}getTotal(){return this.order_items.reduce((s,r)=>s+(r.total_price||0),0)}get order_items(){return this._order_items}set order_items(s){this._order_items=s?s.map(r=>new d(r)):[]}get customer(){return this._customer}set customer(s){this._customer=new i(s||{})}get business(){return this._business}set business(s){this._business=new i(s||{})}get order_status_histories(){return this._order_status_histories}set order_status_histories(s){this._order_status_histories=s==null?void 0:s.map(r=>new n(r))}getLastOrderStatusHistory(s){return this.order_status_histories.find(r=>r.order_status_id==s)}}export{h as O,d as a};
