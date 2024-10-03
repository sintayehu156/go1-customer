var M=Object.defineProperty;var P=Object.getOwnPropertySymbols;var I=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable;var V=(l,e,t)=>e in l?M(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t,B=(l,e)=>{for(var t in e||(e={}))I.call(e,t)&&V(l,t,e[t]);if(P)for(var t of P(e))W.call(e,t)&&V(l,t,e[t]);return l};var L=(l,e,t)=>new Promise((a,h)=>{var g=n=>{try{p(t.next(n))}catch(c){h(c)}},m=n=>{try{p(t.throw(n))}catch(c){h(c)}},p=n=>n.done?a(n.value):Promise.resolve(n.value).then(g,m);p((t=t.apply(l,e)).next())});import{L as D}from"./LeftSidebar-DIvzo2_q.js";import{_ as E,P as j}from"./ListView-CH98j6XP.js";import{R as q}from"./RefreshButton-BoknG8mI.js";import{_ as G,b as H,r as d,c as J,d as K,o as Q,e as R,f as r,g as i,w as S,n as z,u as X,h as u,i as k,j as N,m as Y,t as Z}from"./index-CMQgrs3Q.js";import{_ as $}from"./Badge.vue_vue_type_script_setup_true_lang-AP7QJAam.js";import{_ as ee,a as ae}from"./FormControl.vue_vue_type_script_setup_true_lang-DxvH2exx.js";import"./index-mgISJYoh.js";const te={components:{LeftSidebar:D,ListView:E,Pagination:j,TextInput:ee,FormControl:ae,Badge:$,RefreshButton:q,Button:H},setup(){const l=d(!1),e=d([]),t=d([]),a=d(!1),h=d([{label:"Name",key:"name",width:"250px"},{label:"Address",key:"address_type",width:"200px"},{label:"City",key:"city",width:"200px"},{label:"State",key:"state",width:"200px"},{label:"Postal Code",key:"pincode",width:"200px"}]),g=J({url:"go1_customer.go1_customer.api.api.get_address",method:"get"});console.log("address",g);const m=()=>L(this,null,function*(){try{a.value=!0;const s=yield g.fetch();e.value=s.map(x=>B({},x)),console.log("Fetched data:",e.value)}catch(s){console.error("Error fetching data:",s)}finally{a.value=!1}}),p=()=>{m()},n=()=>{l.value=!l.value},c=X(),b=()=>{c.push({name:"addressNew"})},y=s=>{console.log("Row clicked:",s),s&&s.name?c.push({name:"addresses",params:{id:s.name}}):console.error("Row data is invalid:",s)},w=s=>{t.value=s},C=()=>{o.value="",f.value="",_.value="",v.value=""},o=d(""),f=d(""),_=d(""),v=d(""),T=K(()=>e.value.filter(s=>{const x=s.name.toLowerCase().includes(o.value.toLowerCase()),F=s.address_type.toLowerCase().includes(f.value.toLowerCase())||!f.value,O=s.city.toString().includes(_.value.toString())||!_.value,U=s.pincode.toString().includes(v.value.toString())||!v.value;return x&&F&&O&&U})),A=s=>{switch(s){case"Shipping":return{theme:"red"};case"Billing":return{theme:"blue"};case"Plant":return{theme:"green"};case"Warehouse":return{theme:"orange"};default:return{theme:"gray"}}};return Q(()=>{m()}),{isSidebarCollapsed:l,rows:e,columns:h,toggleSidebar:n,OpenClick:y,updatePaginatedRows:w,paginatedRows:t,openCreate:b,filterName:o,filterAddress:f,filterCity:_,filteredRows:T,filterPost:v,resetFilters:C,getaddress_typeTheme:A,reload:p,isLoading:a}}},se={class:"h-[calc(100vh)] overflow-hidden flex flex-col"},oe={class:"head-content"},le={class:"border-b bg-white px-5 py-6.5 sm:px-5"},ne={class:"float-right -mt-3"},ie={class:"main-content"},re={class:"fiter mb-2 flex gap-3"},de={class:"refers"},ce={key:0},ue={key:1},me={class:"font-medium text-gray-700 text-base",style:{"max-width":"170px",overflow:"hidden","text-overflow":"ellipsis","white-space":"nowrap",display:"block"}};function pe(l,e,t,a,h,g){const m=u("Button"),p=u("LeftSidebar"),n=u("TextInput"),c=u("FormControl"),b=u("RefreshButton"),y=u("Badge"),w=u("ListView"),C=u("Pagination");return k(),R("div",se,[r("div",{class:z(["head-layout",{collapsed:a.isSidebarCollapsed}])},[r("div",oe,[r("header",le,[e[5]||(e[5]=r("div",{class:"float-left -mt-3"},"Addresses",-1)),r("div",ne,[i(m,{variant:"solid",theme:"gray",size:"sm",label:"Button",loading:!1,loadingText:null,disabled:!1,link:null,onClick:a.openCreate},{default:S(()=>e[4]||(e[4]=[N(" + Create ")])),_:1},8,["onClick"])])])])],2),r("div",{class:z(["layout",{collapsed:a.isSidebarCollapsed}])},[i(p,{class:"z-[8]",isCollapsed:a.isSidebarCollapsed,onToggle:a.toggleSidebar},null,8,["isCollapsed","onToggle"]),r("div",ie,[r("div",re,[i(n,{type:"search",size:"sm",variant:"subtle",placeholder:"Name",modelValue:a.filterName,"onUpdate:modelValue":e[0]||(e[0]=o=>a.filterName=o)},null,8,["modelValue"]),i(c,{type:"select",options:[{},{label:"Billing",value:"Billing"},{label:"Shipping",value:"Shipping"},{label:"Office",value:"Office"},{label:"Postal",value:"Postal"},{label:"Plant",value:"Plant"},{label:"Personal",value:"Personal"},{label:"Shop",value:"Shop"},{label:"Subsidiary",value:"Subsidiary"},{label:"Warehouse",value:"Warehouse"},{label:"Other",value:"Other"},{label:"Permanent",value:"Permanent"},{label:"Current",value:"Current"}],size:"sm",variant:"subtle",placeholder:"address",modelValue:a.filterAddress,"onUpdate:modelValue":e[1]||(e[1]=o=>a.filterAddress=o),class:"w-52"},null,8,["modelValue"]),i(n,{type:"search",size:"sm",variant:"subtle",placeholder:"city",modelValue:a.filterCity,"onUpdate:modelValue":e[2]||(e[2]=o=>a.filterCity=o)},null,8,["modelValue"]),i(n,{type:"search",size:"sm",variant:"subtle",placeholder:"post code",modelValue:a.filterPost,"onUpdate:modelValue":e[3]||(e[3]=o=>a.filterPost=o)},null,8,["modelValue"]),i(m,{variant:"subtle",theme:"gray",size:"sm",onClick:a.resetFilters},{default:S(()=>e[6]||(e[6]=[N(" Reset")])),_:1},8,["onClick"]),r("div",de,[i(b,{onRefresh:a.reload,isLoading:a.isLoading},null,8,["onRefresh","isLoading"])])]),i(w,{class:"h-full",columns:a.columns,rows:a.paginatedRows,options:{getRowRoute:o=>({name:"AddressDetails",params:{id:o.name}}),selectable:!0,showTooltip:!0,resizeColumn:!0,emptyState:{title:"No records found"}},"row-key":"name",onRowClick:a.OpenClick},{cell:S(({item:o,column:f})=>[f.key==="address_type"?(k(),R("div",ce,[i(y,Y(a.getaddress_typeTheme(o),{size:"sm",label:o}),null,16,["label"])])):(k(),R("div",ue,[r("span",me,Z(o),1)]))]),_:1},8,["columns","rows","options","onRowClick"]),i(C,{rows:a.filteredRows,"onUpdate:paginatedRows":a.updatePaginatedRows},null,8,["rows","onUpdate:paginatedRows"])])],2)])}const Ce=G(te,[["render",pe],["__scopeId","data-v-801a5988"]]);export{Ce as default};
