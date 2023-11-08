System.register(["./index-legacy-cc225d81.js","./FooterNavigation-legacy-71f03198.js","./HeaderArea-legacy-c85e7844.js","./index-legacy-d3e52be1.js","./index-legacy-92c3b46a.js","./BusinessStore-legacy-6f130e52.js"],(function(t,e){"use strict";var o,a,n,i,s,r,l,u,c,h,d,p,g,m,b,I,f,w,y,P,v,k,C,_,x,F,S,B,j,R,T,A,D,H,U,O,G;return{setters:[t=>{o=t.a7,a=t.y,n=t.a8,i=t.d,s=t.i,r=t.k,l=t.p,u=t.F,c=t.j,h=t.G,d=t.I,p=t.H,g=t.J,m=t.h,b=t.Q,I=t.r,f=t.s,w=t.v,y=t.a,P=t.C,v=t._,k=t.x,C=t.o,_=t.c,x=t.w,F=t.e,S=t.f,B=t.B,j=t.g,R=t.t},t=>{T=t.F},t=>{A=t.H},t=>{D=t.r,H=t.C},t=>{U=t.F,O=t.D},t=>{G=t.u}],execute:function(){var N,$,M;t("C",N),function(t){t.Prompt="PROMPT",t.Camera="CAMERA",t.Photos="PHOTOS"}(N||t("C",N={})),t("a",$),function(t){t.Rear="REAR",t.Front="FRONT"}($||t("a",$={})),function(t){t.Uri="uri",t.Base64="base64",t.DataUrl="dataUrl"}(M||(M={}));const E=D("Camera",{web:()=>o((()=>e.import("./web-legacy-a0b7d8c1.js")),void 0).then((t=>new t.CameraWeb))}),J=()=>{const t=a([]),e=async t=>{const e=await fetch(t.webPath),o=await e.blob(),a=await(t=>new Promise(((e,o)=>{const a=new FileReader;a.onerror=o,a.onload=()=>{e(a.result)},a.readAsDataURL(t)})))(o);return a};return{photos:t,takePhoto:async()=>{const o=await E.getPhoto({resultType:M.Uri,source:N.Camera,quality:100}),a={filepath:Date.now()+".jpeg",webviewPath:o.webPath,base64Data:await e(o)};t.value=[a,...t.value]},getPhotoAsBase64:e,savePicture:async(t,o)=>{let a;a=n("hybrid")?(await U.readFile({path:t.path})).data:await e(t);const i=await U.writeFile({path:o,data:a,directory:O.Data});return n("hybrid")?{filepath:i.uri,webviewPath:H.convertFileSrc(i.uri)}:{filepath:o,webviewPath:t.webPath}},pickImages:async()=>{const o=await E.pickImages({height:1024,width:2048});t.value=await Promise.all(o.photos.map((async t=>({filepath:t.path,webviewPath:t.webPath,base64Data:await e(t)}))))}}},V=i({components:{IonPage:s,IonHeader:r,IonToolbar:l,IonButtons:u,IonBackButton:c,IonTitle:h,IonContent:d,IonCard:p,IonCardContent:g,IonFooter:m,FooterNavigation:T,HeaderArea:A,IonImg:b,IonButton:I},data:()=>({photo:null}),mounted(){this.businessStore.loadCachedRegistrationInfo()},computed:{...f(G)},methods:{async pickImages(){const{takePhoto:t,photos:e,pickImages:o}=J();try{await o(),this.photo=e.value?e.value[0]:null,this.photo&&(this.businessStore.registration.logo_image=this.photo.base64Data)}catch(a){console.log(a)}},async takePhoto(){const{takePhoto:t,photos:e,pickImages:o}=J();try{await t(),this.photo=e.value?e.value[0]:null,this.photo&&(this.businessStore.registration.logo_image=this.photo.base64Data)}catch(a){console.log(a)}},async onContinue(){const t=w(),e=y();this.businessStore.cacheRegistrationInfo(),t.blockUI(this.$t("Registering Your Business. Please hold"));try{await this.businessStore.createBusinessAsVendor()&&(e.changePin({phone_number:this.businessStore.registration.business_owner_phone,pin:this.businessStore.registration.user.pin,pin_confirmation:this.businessStore.registration.user.pin_confirmation}),this.$router.push("/signup/vendor/signup-complete"))}catch(o){P(o)}finally{t.unblockUI()}}}}),Y={class:"ion-padding-top"},q=S("p",{class:"font-medium"},"Tap to upload",-1),z=S("p",{class:"font-medium"},"SVG, PNG, JPG or GIF (max. 2048x1080px)",-1),L={class:"ion-text-center"},Q=v(V,[["render",function(t,e,o,a,n,i){const s=k("IonBackButton"),r=k("IonButtons"),l=k("IonTitle"),u=k("IonToolbar"),c=k("IonHeader"),h=k("HeaderArea"),d=k("IonImg"),p=k("IonCardContent"),g=k("IonCard"),m=k("IonButton"),b=k("IonContent"),I=k("FooterNavigation"),f=k("IonFooter"),w=k("IonPage");return C(),_(w,null,{default:x((()=>[F(c,{class:"ion-no-border"},{default:x((()=>[F(u,null,{default:x((()=>[F(r,{slot:"start"},{default:x((()=>[F(s,{defaultHref:"/signup/vendor/stock-info"})])),_:1}),F(l)])),_:1})])),_:1}),F(b,{class:"ion-padding"},{default:x((()=>[F(h,{title:t.$t("signup.vendor.uploadYourProfilePhoto"),subtext:t.$t("signup.vendor.uploadInstructions")},null,8,["title","subtext"]),S("main",Y,[F(g,{color:"light"},{default:x((()=>[t.photo?(C(),_(d,{key:0,src:t.photo.webviewPath,onClick:e[0]||(e[0]=e=>t.pickImages())},null,8,["src"])):B("",!0),t.photo?B("",!0):(C(),_(p,{key:1,onClick:e[1]||(e[1]=e=>t.pickImages()),class:"d-flex ion-justify-content-center ion-align-items-center flex-column",style:{height:"200px"}},{default:x((()=>[F(d,{src:"/images/vendor/featured-image.svg",style:{width:"64px","margin-bottom":"15px"}}),q,z])),_:1}))])),_:1}),S("p",L,[F(m,{color:"primary",onClick:e[2]||(e[2]=e=>t.takePhoto())},{default:x((()=>[j(R("Take Photo"))])),_:1})])])])),_:1}),F(f,{class:"ion-padding ion-no-border"},{default:x((()=>[F(I,{onContinue:e[3]||(e[3]=e=>t.onContinue())})])),_:1})])),_:1})}]]),W=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));t("U",W)}}}));