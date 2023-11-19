import{u as A,t as s,N as C}from"./useLanguage.d2d2312d.js";import{a as L,H as g,I as S,d2 as $,C as k,h as e,J as B}from"./entry.328b861b.js";import{u as I}from"./composables.618862be.js";import{u as _}from"./fetch.7103049b.js";import{G as R}from"./RenderSchema.758665a5.js";import{b as h}from"./index.d4f86f82.js";import"./RenderData.1a6bae2b.js";import{e as x,R as z}from"./RenderFields.4cf147db.js";import{E as F}from"./Eye.3da6862a.js";import{N as b}from"./Popconfirm.d94c8c87.js";import{e as K,T,D,f as O}from"./Trash.f7f2ca5d.js";import{S as P}from"./Send.fa62402a.js";import{N as U}from"./Space.59a4ec5d.js";import{b as c,N as o}from"./Icon.29c3922e.js";import{N as i}from"./Upload.0169452e.js";import"./index.ad61f358.js";import"./format-length.ad42f3fa.js";import"./vue.runtime.esm-bundler.6b4d84ea.js";import"./Scrollbar.ab988cec.js";import"./Scrollbar.0c5a84d0.js";import"./use-is-composing.b03ea0d7.js";import"./ColorPicker.73c99446.js";import"./Time.07060ce1.js";import"./FileText.6114aa05.js";import"./text.28dac007.js";import"./use-houdini.a45afe2f.js";import"./Image.ee9b4ccc.js";import"./RichEditor.e82d76d5.js";import"./Upload.c25d53d7.js";import"./Add.216a72f9.js";const ye=L({async setup(){A({ar:{view:"\u0645\u064F\u0639\u0627\u064A\u0646\u0629",update:"\u062D\u0650\u0641\u0638",publish:"\u0646\u0634\u0631",delete:"\u062D\u0630\u0641",move_to_trash:"\u0646\u0642\u0644 \u0644\u0633\u0644\u0629 \u0627\u0644\u0645\u0647\u0645\u0644\u0627\u062A",confirm_delete:"\u0647\u0644 \u0627\u0646\u062A \u0645\u062A\u0623\u0643\u062F\u061F",confirm_delete_permanently:"\u062D\u0630\u0641 \u0628\u0635\u0641\u0629 \u0646\u0647\u0627\u0626\u064A\u0629?"},en:{view:"View",update:"Update",publish:"Publish",delete:"Delete",move_to_trash:"Move to trash",confirm_delete:"Are you sure?",confirm_delete_permanently:"Delete Permanently?"}});const l=g("Loading",()=>({}));l.value.UPDATE=!1,l.value.DELETE=!1,l.value.EDITOR=!1;const t=S(),d=g("database"),v=d.value.tables.find(a=>a.slug===t.params.slug).schema,u=g("User"),n=K(),{data:r}=await _(`https://api.inicontent.com/${t.params.db_slug}/${t.params.slug}/${t.params.id}?_options[show_deleted]=true${v?"&_options[columns]="+JSON.stringify(v.map(a=>R(a)).flat(1/0)):""}`,{headers:{Authorization:"Basic "+h.Buffer.from(`${u.value.username}:${u.value.password}`).toString("base64")},transform:a=>{var p;return(!a.result||!a.result.id)&&(n.error("Item not found"),setTimeout(()=>$(`/${t.params.db_slug}/tables/${t.params.slug}`),1e3)),(p=a.result)!=null?p:{}},initialCache:!1},"$ZURzP8xYba"),y=k(),m=async(a=!1)=>{var p;(p=y.value)==null||p.validate(async N=>{if(N)n.error("The inputs are Invalid");else{l.value.UPDATE=!0;const{deleted_at:V,...w}=r.value,{data:f}=await _(`https://api.inicontent.com/${t.params.db_slug}/${t.params.slug}/${t.params.id}!`,{headers:{Authorization:"Basic "+h.Buffer.from(`${u.value.username}:${u.value.password}`).toString("base64")},method:"PUT",body:r.value.deleted_at&&a?w:r.value,initialCache:!1},"$wBT4AU00xD");f.value.result&&f.value.result.id?(r.value=f.value.result,n.success(f.value.message.en)):n.error(f.value.message.en),l.value.UPDATE=!1}})},E=async()=>{l.value.DELETE=!0;const{data:a}=await _(`https://api.inicontent.com/${t.params.db_slug}/${t.params.slug}/${t.params.id}`,{headers:{Authorization:"Basic "+h.Buffer.from(`${u.value.username}:${u.value.password}`).toString("base64")},method:"DELETE",initialCache:!1},"$qdgkg4zOqu");if(a.value.code===204){if(n.success(a.value.message.en),l.value.DELETE=!1,r.value.deleted_at)return $(`/${t.params.db_slug}/tables/${t.params.slug}`);r.value=a.value.result}else n.error(a.value.message.en);l.value.DELETE=!1};return I({title:`${d.value.name} | ${d.value.tables.find(a=>a.slug===t.params.slug).name} Table : ${t.params.id}`,link:[{rel:"icon",href:d.value.icon}]}),()=>e(C,{title:"Edit item",style:"height: fit-content",onKeyup:a=>a.preventDefault()&&a.code==="s"&&(a.ctrlKey||a.metaKey)?m():null},{header:()=>e(x,()=>`${d.value.tables.find(a=>a.slug===t.params.slug).name} #${r.value.id}`),"header-extra":()=>e(U,{},()=>[e(B,{to:`/${t.params.db_slug}/tables/${t.params.slug}/${t.params.id}`},()=>e(c,{},{trigger:()=>e(i,{circle:!0,secondary:!0},{icon:()=>e(o,()=>e(F))}),default:()=>s("view")})),e(b,{onPositiveClick:E},{trigger:()=>e(c,{},{trigger:()=>e(i,{secondary:!0,circle:!0,type:"error",loading:l.value.DELETE},{icon:()=>e(o,()=>e(T))}),default:()=>r.value.deleted_at?s("delete"):s("move_to_trash")}),default:()=>r.value.deleted_at?s("confirm_delete_permanently"):s("confirm_delete")}),e(c,{},{trigger:()=>e(i,{secondary:!0,circle:!0,type:r.value.deleted_at?"info":"primary",onClick:m,loading:l.value.UPDATE},{icon:()=>e(o,()=>e(D))}),default:()=>s("update")}),r.value.deleted_at?e(c,{},{trigger:()=>e(i,{secondary:!0,circle:!0,type:"primary",onClick:()=>m(!0),loading:l.value.UPDATE},{icon:()=>e(o,()=>e(P))}),default:()=>s("publish")}):null]),action:()=>e(U,{justify:"end"},()=>[e(b,{onPositiveClick:E},{trigger:()=>e(i,{round:!0,secondary:!0,type:"error",loading:l.value.DELETE},{icon:()=>e(o,()=>e(T)),default:()=>r.value.deleted_at?s("delete"):s("move_to_trash")}),default:()=>r.value.deleted_at?s("confirm_delete_permanently"):s("confirm_delete")}),e(i,{round:!0,secondary:!0,type:r.value.deleted_at?"info":"primary",onClick:m,loading:l.value.UPDATE},{icon:()=>e(o,()=>e(D)),default:()=>s("update")}),r.value.deleted_at?e(i,{round:!0,secondary:!0,type:"primary",onClick:()=>m(!0),loading:l.value.UPDATE},{icon:()=>e(o,()=>e(P)),default:()=>s("publish")}):null]),default:()=>e(O,{model:r.value,ref:y},()=>e(z,{modelValue:r.value,"onUpdate:modelValue":a=>r.value=a,schema:v}))})}});export{ye as default};
