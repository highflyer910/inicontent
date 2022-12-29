import{u as w,t as i,N as _}from"./useLanguage.d2d2312d.js";import{a as y,o as $,A as b,B as s,H as p,I as x,d2 as P,h as e,J as k}from"./entry.328b861b.js";import{u as I}from"./composables.618862be.js";import{u as R}from"./fetch.7103049b.js";import{G as T}from"./RenderSchema.758665a5.js";import{b as B}from"./index.d4f86f82.js";import{R as S}from"./RenderData.1a6bae2b.js";import{S as C}from"./Settings.9848080c.js";import{e as H,P as M}from"./RenderFields.4cf147db.js";import{e as V}from"./Trash.f7f2ca5d.js";import{N as h}from"./Space.59a4ec5d.js";import{b as d,N as n}from"./Icon.29c3922e.js";import{N as u}from"./Upload.0169452e.js";import"./index.ad61f358.js";import"./format-length.ad42f3fa.js";import"./vue.runtime.esm-bundler.6b4d84ea.js";import"./Scrollbar.ab988cec.js";import"./Scrollbar.0c5a84d0.js";import"./use-is-composing.b03ea0d7.js";import"./ColorPicker.73c99446.js";import"./Time.07060ce1.js";import"./FileText.6114aa05.js";import"./text.28dac007.js";import"./use-houdini.a45afe2f.js";import"./Image.ee9b4ccc.js";import"./RichEditor.e82d76d5.js";import"./Upload.c25d53d7.js";import"./Add.216a72f9.js";const E={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 24 24"},J=s("g",{fill:"none",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round","stroke-linejoin":"round"},[s("path",{d:"M17 17h2a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2"}),s("path",{d:"M17 9V5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v4"}),s("rect",{x:"7",y:"13",width:"10",height:"8",rx:"2"})],-1),K=[J],v=y({name:"Printer",render:function(r,o){return $(),b("svg",E,K)}}),ce=y({async setup(){w({ar:{print:"\u0637\u0628\u0627\u0639\u0629",edit:"\u062A\u0639\u062F\u064A\u0644"},en:{print:"Print",edit:"Edit"}});const a=p("Loading",()=>({}));a.value.PRINT=!1;const r=x(),o=p("database"),l=o.value.tables.find(t=>t.slug===r.params.slug).schema,c=p("User"),N=V(),{data:f}=await R(`https://api.inicontent.com/${r.params.db_slug}/${r.params.slug}/${r.params.id}?_options[show_deleted]=true${l?"&_options[columns]="+JSON.stringify(l.map(t=>T(t)).flat(1/0)):""}`,{headers:{Authorization:"Basic "+B.Buffer.from(`${c.value.username}:${c.value.password}`).toString("base64")},transform:t=>{var g;return(!t.result||!t.result.id)&&(N.error("Item not found"),setTimeout(()=>P(`/${r.params.db_slug}/tables/${r.params.slug}`),1e3)),(g=t.result)!=null?g:{}},initialCache:!1},"$MrFsniQhJx"),m=()=>(a.value.PRINT=!0,window.print(),a.value.PRINT=!1,!0);return I({title:`${o.value.name} | ${o.value.tables.find(t=>t.slug===r.params.slug).name} Table : ${r.params.id}`,link:[{rel:"icon",href:o.value.icon}]}),()=>e(_,{title:"View item",style:"height: fit-content",onKeyup:t=>t.preventDefault()&&t.code==="e"&&(t.ctrlKey||t.metaKey)?m():null},{header:()=>e(H,()=>`${o.value.tables.find(t=>t.slug===r.params.slug).name} #${f.value.id}`),"header-extra":()=>e(h,{},()=>[e(d,{},{trigger:()=>e(u,{disabled:!0,circle:!0,secondary:!0},{icon:()=>e(n,()=>e(C))}),default:()=>i("settings")}),e(k,{to:`${r.params.id}/edit`},()=>e(d,{},{trigger:()=>e(u,{circle:!0,secondary:!0,type:"info"},{icon:()=>e(n,()=>e(M))}),default:()=>i("edit")})),e(d,{},{trigger:()=>e(u,{circle:!0,secondary:!0,type:"primary",onClick:m,loading:a.value.PRINT},{icon:()=>e(n,()=>e(v))}),default:()=>i("print")})]),action:()=>e(h,{justify:"end"},()=>[e(u,{round:!0,secondary:!0,type:"primary",onClick:m,loading:a.value.PRINT},{icon:()=>e(n,()=>e(v)),default:()=>i("print")})]),default:()=>e(S,{modelValue:f.value,schema:l})})}});export{ce as default};
