import{a as q,H as v,C as b,h as e,J as y}from"./entry.328b861b.js";import{u as $}from"./composables.618862be.js";import{u as z}from"./fetch.7103049b.js";import{b as _}from"./index.d4f86f82.js";import{N as L}from"./RenderData.1a6bae2b.js";import{S as E}from"./Settings.9848080c.js";import{N as p,b as m,U as M,g as Z,P as A}from"./Upload.0169452e.js";import{e as x,f as P,h as o,N as R,T as V,D as B}from"./Trash.f7f2ca5d.js";import{N as i}from"./Icon.29c3922e.js";import{N as I}from"./RenderSchema.758665a5.js";import{a as F,b as G}from"./Upload.c25d53d7.js";import{N as J}from"./text.28dac007.js";import{a as C,b as O,c as H,d as f}from"./RenderFields.4cf147db.js";import{N as c}from"./Space.59a4ec5d.js";import{N as S}from"./headers.0190276e.js";import{v as W,w as j}from"./FileText.6114aa05.js";import{N as D}from"./useLanguage.d2d2312d.js";import"./index.ad61f358.js";import"./ColorPicker.73c99446.js";import"./format-length.ad42f3fa.js";import"./Time.07060ce1.js";import"./Scrollbar.ab988cec.js";import"./Scrollbar.0c5a84d0.js";import"./Image.ee9b4ccc.js";import"./RichEditor.e82d76d5.js";import"./use-is-composing.b03ea0d7.js";import"./vue.runtime.esm-bundler.6b4d84ea.js";import"./Add.216a72f9.js";import"./use-houdini.a45afe2f.js";const Se=q({async setup(){const d=v("Loading",()=>({}));d.value.AddNewDatabase=!1;const n=v("database"),k=v("Window",()=>({width:0})),s=v("User"),h=x(),g=b(!1),w=b(null),l=b(),T=async()=>{var a;(a=w.value)==null||a.validate(async r=>{if(r)h.error("The inputs are Invalid");else{d.value.AddNewDatabase=!0;const{data:t}=await z(`https://api.inicontent.com/inicontent/db/${l.value.id}!`,{headers:{Authorization:"Basic "+_.Buffer.from(`${s.value.username}:${s.value.password}`).toString("base64")},method:"PUT",body:l.value,initialCache:!1},"$ZYDV5EOqR5");t.value.result?(n.value=t.value.result,d.value.AddNewDatabase=!1,g.value=!1,h.success(t.value.message.en)):h.error(t.value.message.en),d.value.AddNewDatabase=!1}})};return $({title:`${n.value.name} | Tables`,link:[{rel:"icon",href:n.value.icon}]}),()=>e(D,{title:"Pick a Table",style:"background: none",bordered:!1},{"header-extra":()=>s.value&&s.value.role==="admin"?e(p,{circle:!0,onClick:()=>(l.value=JSON.parse(JSON.stringify(n.value)),g.value=!0)},{icon:()=>e(i,()=>e(E))}):null,default:()=>[s.value&&s.value.role==="admin"?e(I,{show:g.value,"on-update:show":a=>g.value=a,style:{width:k.value.width>600?"600px":"100%"},preset:"card",title:"Create new Database",bordered:!1,size:"huge",segmented:{content:"soft",footer:"soft"}},{default:()=>e(P,{ref:w,model:l.value,rules:{name:{required:!0,message:"Please give your database a name",trigger:["input","blur"]},slug:{required:!0,message:"Please give your database a unique slug",trigger:["input","blur"]},allowed_domains:{required:!0,validator(a,r){if(r){var t=!0;return r.forEach(u=>{u?u==="*"||u.charAt(0)==="#"?t=!0:/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/.test(u)||(t=new Error("This is not a valid link")):t=new Error("This field is required")}),t}else return new Error("This field is required")},trigger:["input","blur"]}}},()=>[e(o,{label:"Name",path:"name"},()=>e(m,{value:l.value.name,onUpdateValue:a=>(l.value.name=a,l.value.slug=a.toLowerCase().replace(/ /g,"_").replace(/[^\[a-zA-Zء-ي]-_+/g,""))})),e(o,{label:"Slug",path:"slug"},()=>e(m,{disabled:!!l.value.id,value:l.value.slug,onUpdateValue:a=>l.value.slug=a.toLowerCase().replace(/ /g,"_").replace(/[^\[a-zA-Zء-ي]-_+/g,"")})),e(o,{label:"Icon",path:"icon"},()=>e(F,{directoryDnd:!0,max:1,multiple:!1,accept:"image/*",action:"https://api.inicontent.com/inicontent/assets",headers:{Authorization:"Basic "+_.Buffer.from(`${s.value.username}:${s.value.password}`).toString("base64")},fileList:l.value.icon?[{id:l.value.icon.split("/").pop().split("#")[0].split("?")[0],name:l.value.icon.split("/").pop().split("#")[0].split("?")[0],status:"finished",url:l.value.icon}]:void 0,onRemove:({file:a})=>(delete l.value.icon,!0),onFinish:({file:a,event:r})=>{const t=JSON.parse(r.target.response).result.public_url;return l.value.icon=t,a.url=t,a.name=t.split("/").pop().split("#")[0].split("?")[0],a},listType:"image"},()=>e(G,()=>[e("div",{style:{"margin-bottom":"12px"}},e(i,{size:48,depth:3},()=>e(M))),e(J,{style:{"font-size":"16px"}},()=>"Click or drag a file to this area to upload")]))),e(o,{label:"Allowed Domains",path:"allowed_domains"},()=>e(C,{value:l.value.allowed_domains,onUpdateValue:a=>l.value.allowed_domains=a},{input:({submit:a,deactivate:r})=>e(m,{onBlur:r,onChange:a},{suffix:()=>e(i,()=>e(Z))})})),e(o,{label:"Roles",path:"roles"},()=>{var a;return e(C,{value:["admin","user","guest",...(a=l.value.roles)!=null?a:[]],onCreate:r=>l.value.roles?l.value.roles.push(r.toLowerCase().replace(/ /g,"_").replace(/[^\[a-zA-Zء-ي]-_+/g,"")):l.value.roles=[r.toLowerCase().replace(/ /g,"_").replace(/[^\[a-zA-Zء-ي]-_+/g,"")],renderTag:(r,t)=>e(R,{type:t>2?"default":"primary",disabled:t<3,closable:t>2,onClose:()=>(l.value.roles.splice(t,1),l.value.roles.length===0?delete l.value.roles:"")},{default:()=>r.charAt(0).toUpperCase()+r.slice(1).replaceAll("_"," ")})})}),e(c,()=>[e(S,()=>"Tables"),e(p,{size:"small",circle:!0,onClick:()=>l.value.tables.push({name:"",slug:"",allowed_methods:{}})},{icon:()=>e(i,()=>e(A))})]),e(O,{columns:[{title:"Name",width:100,key:"name",render(a,r){return e(o,{showLabel:!1,path:`tables.${r}.name`,disabled:a.slug==="user",rule:{required:!0,validator(t,u){return u?!0:new Error("This field is required")},trigger:["input","blur"]}},()=>e(m,{value:a.name,disabled:a.slug==="user",onUpdateValue:t=>(l.value.tables[r].name=t,l.value.tables[r].slug=t.toLowerCase().replace(/ /g,"_").replace(/[^\[a-zA-Zء-ي]-_+/g,""))}))}},{title:"Slug",width:100,key:"slug",render(a,r){return e(o,{disabled:!!(l.value.id||a.slug==="user"),showLabel:!1,path:`tables.${r}.slug`,rule:{required:!0,validator(t,u){return u?!0:new Error("This field is required")},trigger:["input","blur"]}},()=>e(m,{disabled:!!(l.value.id||a.slug==="user"),value:a.slug,onUpdateValue:t=>l.value.tables[r].slug=["user","assets","session"].includes(t.toLowerCase().replace(/ /g,"_").replace(/[^\[a-zA-Zء-ي]-_+/g,""))?t.toLowerCase().replace(/ /g,"_").replace(/[^\[a-zA-Zء-ي]-_+/g,""):null}))}},{title:"Allowed methods",width:100,key:"allowed_methods",render:(a,r)=>{var t;return["user","guest",...(t=l.value.roles)!=null?t:[]].map(u=>e(o,{label:u.charAt(0).toUpperCase()+u.slice(1).replaceAll("_"," "),path:`tables.${r}.allowed_methods.${u}`},()=>{var N;return e(H,{disabled:a.slug==="user",value:l.value.tables[r]&&l.value.tables[r].allowed_methods?Array.from((N=l.value.tables[r].allowed_methods[u])!=null?N:""):["c","r","u"],onUpdateValue:U=>l.value.tables[r].allowed_methods[u]=U.join(""),itemStyle:"display: flex"},()=>e(c,()=>[e(f,{value:"c",label:"Create"}),e(f,{value:"r",label:"Read"}),e(f,{value:"u",label:"Update"}),e(f,{value:"d",label:"Delete"})]))}))}},{title:"Actions",fixed:"right",align:"center",width:60,key:"actions",render(a,r){return e(p,{strong:!0,secondary:!0,circle:!0,type:"error",disabled:a.slug==="user",onClick(){delete l.value.tables[r]}},{icon:()=>e(i,()=>e(V))})}}],data:l.value.tables.filter(a=>a.slug==="user").length>0?l.value.tables:[...l.value.tables,{name:"User",slug:"user",schema:[{name:"Username",type:"text",required:!0,key:Date.now().toString(36)+Math.random().toString(36).substring(2)},{name:"Password",type:"password",required:!0,key:Date.now().toString(36)+Math.random().toString(36).substring(2)},{name:"Email",type:"email",required:!1,key:Date.now().toString(36)+Math.random().toString(36).substring(2)},{name:"Role",type:"role",required:!0,key:Date.now().toString(36)+Math.random().toString(36).substring(2)}]}],scrollX:700})]),footer:()=>e(c,{justify:"end"},()=>[e(p,{loading:d.value.AddNewDatabase,onClick:T},{default:()=>"Save",icon:()=>e(i,()=>e(B))})])}):null,e(W,{xGap:12,yGap:12,cols:"1 500:2 800:4"},()=>n.value.tables.filter(({slug:a,allowed_methods:r})=>s.value&&(s.value.role==="admin"||a==="user"||r&&r[s.value.role]&&r[s.value.role].includes("r"))).map(a=>e(j,()=>e(y,{to:`/${n.value.slug}/tables/${a.slug}`},()=>e(D,{style:"height: 100%",headerStyle:"height: 100%",hoverable:!0},{header:()=>e(c,()=>[e(L,{borderRadius:50},()=>e(i,{style:"font-style: normal"},()=>a.name.charAt(0))),e(S,{style:"margin-bottom: 0"},()=>a.name)]),"header-extra":()=>e(c,()=>[s.value&&s.value.role&&(s.value.role==="admin"||a.allowed_methods&&a.allowed_methods[s.value.role]&&a.allowed_methods[s.value.role].includes("c"))?e(y,{to:`/${n.value.slug}/tables/${a.slug}/new`},()=>e(p,{circle:!0},{icon:()=>e(i,()=>e(A))})):null])})))))]})}});export{Se as default};
