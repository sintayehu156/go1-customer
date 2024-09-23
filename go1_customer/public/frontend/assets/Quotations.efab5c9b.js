var C=Object.defineProperty,R=Object.defineProperties;var k=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,L=Object.prototype.propertyIsEnumerable;var b=(a,e,t)=>e in a?C(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,h=(a,e)=>{for(var t in e||(e={}))S.call(e,t)&&b(a,t,e[t]);if(w)for(var t of w(e))L.call(e,t)&&b(a,t,e[t]);return a},v=(a,e)=>R(a,k(e));var y=(a,e,t)=>new Promise((o,d)=>{var u=n=>{try{l(t.next(n))}catch(i){d(i)}},c=n=>{try{l(t.throw(n))}catch(i){d(i)}},l=n=>n.done?o(n.value):Promise.resolve(n.value).then(u,c);l((t=t.apply(a,e)).next())});import{L as N}from"./LeftSidebar.894a8783.js";import{_ as Q,P as V}from"./ListView.0c88aa81.js";import{_ as T,l as m,c as B,u as j,m as q,e as g,o as D,f as O,n as r,g as _,w as P,p as z,q as x}from"./vendor.72004f8a.js";import"./index.feff435d.js";const E={components:{LeftSidebar:N,ListView:Q,Pagination:V},setup(){const a=m(!1),e=m([]),t=m([]),o=m([{label:"Name",key:"name",width:"200px"},{label:"Status",key:"status",width:"200px"},{label:"Date",key:"transaction_date",width:"200px"},{label:"Item",key:"item_name",width:"200px"},{label:"Total",key:"total",width:"200px"}]),d=B({url:"go1_customer.go1_customer.api.api.get_quotation",method:"get"}),u=()=>y(this,null,function*(){try{const s=yield d.fetch();e.value=s.map(p=>v(h({},p),{total:String(p.total),item_name:p.items.length>0?p.items[0].item_name:"No items"})),console.log("Fetched data:",e.value)}catch(s){console.error("Error fetching data:",s)}}),c=()=>{a.value=!a.value},l=j(),n=s=>{console.log("Row clicked:",s),s&&s.name?l.push({name:"QuotationDetails",params:{id:s.name}}):console.error("Row data is invalid:",s)},i=s=>{switch(s.status){case"Ordered":return"bg-green-100";case"Lost":return"bg-gray-100";case"Open":return"bg-red-100";case"Draft":return"bg-orange-100";case"Cancelled":return"bg-yellow-100";case"Expired":return"bg-gray-200";default:return""}},f=s=>{t.value=s};return q(()=>{u()}),{isSidebarCollapsed:a,paginatedRows:t,rows:e,columns:o,toggleSidebar:c,OpenClick:n,getStatusRowClass:i,updatePaginatedRows:f}}},I={class:"head-content"},U={class:"border-b bg-white px-5 py-2.5 sm:px-5 pb-[2.605rem]"},F={class:"float-right"},M={class:"main-content"};function A(a,e,t,o,d,u){const c=g("Button"),l=g("LeftSidebar"),n=g("ListView"),i=g("pagination");return D(),O("div",null,[r("div",{class:x(["head-layout",{collapsed:o.isSidebarCollapsed}])},[r("div",I,[r("header",U,[e[1]||(e[1]=r("div",{class:"float-left"},"Quotations",-1)),r("div",F,[_(c,{variant:"solid",theme:"gray",size:"sm",label:"+ New Quotation",loading:!1,loadingText:null,disabled:!1,link:null},{default:P(()=>e[0]||(e[0]=[z("+ New Quotation")])),_:1})])])])],2),r("div",{class:x(["layout",{collapsed:o.isSidebarCollapsed}])},[_(l,{isCollapsed:o.isSidebarCollapsed,onToggle:o.toggleSidebar},null,8,["isCollapsed","onToggle"]),r("div",M,[_(n,{class:"h-[500px]",columns:o.columns,rows:o.paginatedRows,options:{getRowRoute:f=>({name:"QuotationDetails",params:{id:f.name}}),selectable:!0,showTooltip:!0,resizeColumn:!0,emptyState:{title:"No records found"}},"row-key":"name",onRowClick:o.OpenClick},null,8,["columns","rows","options","onRowClick"]),_(i,{rows:o.rows,"onUpdate:paginatedRows":o.updatePaginatedRows},null,8,["rows","onUpdate:paginatedRows"])])],2)])}var X=T(E,[["render",A],["__scopeId","data-v-4ca23f88"]]);export{X as default};
