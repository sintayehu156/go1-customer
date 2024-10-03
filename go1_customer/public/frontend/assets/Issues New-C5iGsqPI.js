var f=(y,s,l)=>new Promise((e,d)=>{var p=o=>{try{i(l.next(o))}catch(c){d(c)}},u=o=>{try{i(l.throw(o))}catch(c){d(c)}},i=o=>o.done?e(o.value):Promise.resolve(o.value).then(p,u);i((l=l.apply(y,s)).next())});import{L as w}from"./LeftSidebar-DIvzo2_q.js";import{_ as O,b as j,r,o as z,e as B,f as t,g as n,n as g,t as I,u as E,h as _,i as k}from"./index-CMQgrs3Q.js";import{_ as D}from"./Breadcrumbs.vue_vue_type_script_setup_true_lang-CtZvVT_t.js";import{a as L}from"./FormControl.vue_vue_type_script_setup_true_lang-DxvH2exx.js";import"./index-mgISJYoh.js";const P={components:{LeftSidebar:w,Breadcrumbs:D,Button:j,FormControl:L},setup(){const y=E(),s=r(!1),l=r(""),e=r(""),d=r(""),p=r(""),u=r(""),i=r([]),o=r([]),c=r([{label:"Issues",route:{name:"issue"}},{label:"Create Issue",route:{}}]),a=[{label:"Open",value:"Open"},{label:"Closed",value:"Closed"},{label:"Replied",value:"Replied"},{label:"On Hold",value:"On Hold"},{label:"Resolved",value:"Resolved"}],h=()=>{l.value="",e.value="",d.value="",u.value="",p.value=""},C=()=>f(this,null,function*(){const m={subject:l.value,status:e.value,priority:p.value,description:d.value,customer:u.value};try{if(!(yield fetch("/api/resource/Issue",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(m)})).ok)throw new Error("Error creating issue");y.push({name:"issue"})}catch(b){console.error("Error creating issue:",b)}}),V=()=>f(this,null,function*(){try{const b=yield(yield fetch('/api/resource/Customer?fields=["name"]')).json();i.value=b.data.map(v=>({label:v.name,value:v.name}))}catch(m){console.error("Error fetching customers:",m)}}),x=()=>f(this,null,function*(){try{const b=yield(yield fetch('/api/resource/Issue Priority?fields=["name"]')).json();o.value=b.data.map(v=>({label:v.name,value:v.name}))}catch(m){console.error("Error fetching priorities:",m)}}),S=()=>{s.value=!s.value};return z(()=>f(this,null,function*(){yield V(),yield x()})),{isSidebarCollapsed:s,subject:l,status:e,description:d,priority:p,customer:u,customOption:i,priorityOption:o,breadcrumbsList:c,statusOptions:a,cancelEditing:h,createIssue:C,toggleSidebar:S}}},R={class:"head-content"},U={class:"border-b bg-white px-5 py-6.5 pb-[2.625rem] sm:px-5 mb-12"},N={class:"main-content"},T={class:"bg-white shadow-md rounded-lg p-6 space-y-6 pb-[2.625rem]"},F={class:"float-left mb-1 text-9xl font-bold text-gray-800 -mt-2",style:{"font-size":"1.85rem"}},H={class:"text-9xl font-bold text-gray-600",style:{"font-size":"1rem"}},J={class:"p-2"},M={class:"float-right flex gap-4"};function q(y,s,l,e,d,p){const u=_("Breadcrumbs"),i=_("LeftSidebar"),o=_("FormControl"),c=_("Button");return k(),B("div",null,[t("div",{class:g(["head-layout",{collapsed:e.isSidebarCollapsed}])},[t("div",R,[t("header",U,[n(u,{items:e.breadcrumbsList,class:"float-left"},null,8,["items"])])])],2),t("div",{class:g(["layout",{collapsed:e.isSidebarCollapsed}])},[n(i,{isCollapsed:e.isSidebarCollapsed,onToggle:e.toggleSidebar},null,8,["isCollapsed","onToggle"]),t("div",N,[t("div",T,[t("div",F,[s[5]||(s[5]=t("p",null,"Issue",-1)),t("p",H,I(e.subject),1)]),s[6]||(s[6]=t("div",{class:"border-b pb-7 pt-10"},null,-1)),t("div",J,[n(o,{type:"text",size:"md",variant:"subtle",placeholder:"subject",label:"Subject",modelValue:e.subject,"onUpdate:modelValue":s[0]||(s[0]=a=>e.subject=a),class:"mb-5"},null,8,["modelValue"]),n(o,{type:"select",size:"md",options:e.statusOptions,variant:"subtle",placeholder:"status",label:"Status",modelValue:e.status,"onUpdate:modelValue":s[1]||(s[1]=a=>e.status=a),class:"mb-5 text-gray-1000 text-base"},null,8,["options","modelValue"]),n(o,{type:"select",size:"md",variant:"subtle",options:e.customOption,label:"Customer",modelValue:e.customer,"onUpdate:modelValue":s[2]||(s[2]=a=>e.customer=a),class:"mb-5"},null,8,["options","modelValue"]),n(o,{type:"textarea",size:"md",variant:"subtle",placeholder:"Placeholder",label:"Description",modelValue:e.description,"onUpdate:modelValue":s[3]||(s[3]=a=>e.description=a),class:"mb-5"},null,8,["modelValue"]),n(o,{type:"select",size:"md",variant:"subtle",options:e.priorityOption,placeholder:"Placeholder",label:"Priority",modelValue:e.priority,"onUpdate:modelValue":s[4]||(s[4]=a=>e.priority=a),class:"mb-5"},null,8,["options","modelValue"]),t("div",M,[n(c,{variant:"subtle",theme:"gray",size:"md",label:"Discard",onClick:e.cancelEditing},null,8,["onClick"]),n(c,{variant:"solid",theme:"gray",size:"md",label:"Submit",onClick:e.createIssue},null,8,["onClick"])])])])])],2)])}const Y=O(P,[["render",q],["__scopeId","data-v-2c523067"]]);export{Y as default};
