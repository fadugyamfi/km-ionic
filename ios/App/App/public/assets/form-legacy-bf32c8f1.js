System.register(["./index-legacy-cc225d81.js"],(function(r,e){"use strict";var s;return{setters:[r=>{s=r.aX}],execute:function(){r("u",(function(r){return s({fields:r,processing:!1,error:null,errors:{},async submit(r){if(!this.processing){this.error=null,this.processing=!0;try{await r(this.fields)}catch(e){this.error=e}finally{this.processing=!1}}},hasErrors(){return Object.keys(this.errors).some((r=>0!=this.errors[r]))},validate(r){const e=r.target,s=e.value,t=e.name;this.errors[t]=!1,!e.required||s&&""!=s||(this.errors[t]=!0)},validateSelectInput(r){const e=r.target,s=e.value,t=e.name;this.errors[t]=!1,!e.required||s&&""!=s||(this.errors[t]=!0)}})}))}}}));