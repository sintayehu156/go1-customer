var N=Object.defineProperty,M=Object.defineProperties;var z=Object.getOwnPropertyDescriptors;var S=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,B=Object.prototype.propertyIsEnumerable;var x=(l,e,t)=>e in l?N(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t,k=(l,e)=>{for(var t in e||(e={}))I.call(e,t)&&x(l,t,e[t]);if(S)for(var t of S(e))B.call(e,t)&&x(l,t,e[t]);return l},P=(l,e)=>M(l,z(e));var D=(l,e,t)=>new Promise((a,p)=>{var v=n=>{try{r(t.next(n))}catch(i){p(i)}},f=n=>{try{r(t.throw(n))}catch(i){p(i)}},r=n=>n.done?a(n.value):Promise.resolve(n.value).then(v,f);r((t=t.apply(l,e)).next())});import{L as O}from"./LeftSidebar-DIvzo2_q.js";import{_ as U,P as q}from"./ListView-CH98j6XP.js";import{_ as F,r as d,c as j,d as E,o as A,e as C,f as c,n as V,g as m,w as G,u as H,h as u,i as R,m as J,t as K}from"./index-CMQgrs3Q.js";import{_ as Q}from"./Badge.vue_vue_type_script_setup_true_lang-AP7QJAam.js";import{D as W}from"./DatePicker-C2mdXG1R.js";import{_ as X,a as Y}from"./FormControl.vue_vue_type_script_setup_true_lang-DxvH2exx.js";import"./index-mgISJYoh.js";const Z={components:{LeftSidebar:O,ListView:U,Pagination:q,TextInput:X,FormControl:Y,Badge:Q,DatePicker:W},setup(){const l=d(!1),e=d([]),t=d([]),a=d([{label:"Name",key:"name",width:"250px"},{label:"Status",key:"status",width:"200px"},{label:"Date",key:"transaction_date",width:"200px"},{label:"Item",key:"item_name",width:"200px"}]),p=j({url:"go1_customer.go1_customer.api.api.get_material_request",method:"get"}),v=()=>D(this,null,function*(){try{const o=yield p.fetch();e.value=o.map(g=>P(k({},g),{total:String(g.total),item_name:g.items.map(y=>y.item_name).join(", ")||"No items"})),console.log("Fetched data:",e.value)}catch(o){console.error("Error fetching data:",o)}}),f=()=>{l.value=!l.value},r=H(),n=o=>{console.log("Row clicked:",o),o&&o.name?r.push({name:"MaterialRDetails",params:{id:o.name}}):console.error("Row data is invalid:",o)},i=o=>{t.value=o},b=d(""),_=d(""),h=d(""),s=E(()=>e.value.filter(o=>{const g=o.name.toLowerCase().includes(b.value.toLowerCase()),y=o.status.toLowerCase().includes(_.value.toLowerCase())||!_.value,L=h.value.split("-").reverse().join("-"),T=o.transaction_date&&o.transaction_date.includes(L);return g&&y&&T})),w=o=>{switch(o){case"Draft":return{theme:"red"};case"Submitted":return{theme:"blue"};case"Cancelled":return{theme:"green"};case"Pending":return{theme:"orange"};default:return{theme:"gray"}}};return A(()=>{v()}),{isSidebarCollapsed:l,rows:e,columns:a,toggleSidebar:f,OpenClick:n,updatePaginatedRows:i,paginatedRows:t,filterName:b,filterStatus:_,filteredRows:s,filterDate:h,getStatusTheme:w}}},$={class:"main-content"},ee={class:"fiter mb-2 flex gap-3"},ae={key:0},te={key:1},oe={class:"font-medium text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}};function le(l,e,t,a,p,v){const f=u("LeftSidebar"),r=u("TextInput"),n=u("FormControl"),i=u("DatePicker"),b=u("Badge"),_=u("ListView"),h=u("Pagination");return R(),C("div",null,[c("div",{class:V(["head-layout",{collapsed:a.isSidebarCollapsed}])},e[3]||(e[3]=[c("div",{class:"head-content"},[c("header",{class:"border-b bg-white px-5 py-2.5 sm:px-5"}," Material Request ")],-1)]),2),c("div",{class:V(["layout",{collapsed:a.isSidebarCollapsed}])},[m(f,{class:"z-[8]",isCollapsed:a.isSidebarCollapsed,onToggle:a.toggleSidebar},null,8,["isCollapsed","onToggle"]),c("div",$,[c("div",ee,[m(r,{type:"search",size:"sm",variant:"subtle",placeholder:"Name",modelValue:a.filterName,"onUpdate:modelValue":e[0]||(e[0]=s=>a.filterName=s)},null,8,["modelValue"]),m(n,{type:"select",options:[{},{label:"Draft",value:"Draft"},{label:"Submitted",value:"Submitted"},{label:"Stopped",value:"Stopped"},{label:"Partially Ordered",value:"Partially Ordered"},{label:"Pending",value:"Pending"},{label:"Cancelled",value:"Cancelled"},{label:"Issued",value:"Issued"},{label:"Transferred",value:"Transferred"},{label:"Received",value:"Received"},{label:"Partially Received",value:"Partially Received"},{label:"Ordered",value:"Ordered"}],size:"sm",variant:"subtle",placeholder:"Status",modelValue:a.filterStatus,"onUpdate:modelValue":e[1]||(e[1]=s=>a.filterStatus=s),class:"w-52"},null,8,["modelValue"]),m(i,{class:"border-none",size:"md",variant:"subtle",placeholder:"Date",modelValue:a.filterDate,"onUpdate:modelValue":e[2]||(e[2]=s=>a.filterDate=s)},null,8,["modelValue"])]),m(_,{class:"h-[500px]",columns:a.columns,rows:a.paginatedRows,options:{getRowRoute:s=>({name:"MaterialRDetails",params:{id:s.name}}),selectable:!0,showTooltip:!0,resizeColumn:!0,emptyState:{title:"No records found"}},"row-key":"name",onRowClick:a.OpenClick},{cell:G(({item:s,column:w})=>[w.key==="status"?(R(),C("div",ae,[m(b,J(a.getStatusTheme(s),{size:"sm",label:s}),null,16,["label"])])):(R(),C("div",te,[c("span",oe,K(s),1)]))]),_:1},8,["columns","rows","options","onRowClick"]),m(h,{rows:a.filteredRows,"onUpdate:paginatedRows":a.updatePaginatedRows},null,8,["rows","onUpdate:paginatedRows"])])],2)])}const pe=F(Z,[["render",le],["__scopeId","data-v-c70f391b"]]);export{pe as default};
