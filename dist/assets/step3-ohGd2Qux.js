import{d as v,r,a as f,o as g,n as b,p as s,b as a,k as V,x as h,A as x,z as k,O as w,D as y,E as B,G as C,v as N,H as q}from"./index-DizytlvP.js";const F={style:{margin:"16px"}},S=v({__name:"step3",setup(G){x();const d=k(),t=r(""),o=r(""),p=f(()=>t.value.length<6?!0:t.value!=o.value);function m(){w({tel:localStorage.getItem("tel")||"",password:t.value}).then(n=>{y(n.data.message),d.push("/login")})}return(n,e)=>{const u=B,i=C,c=N,_=q;return g(),b(_,null,{default:s(()=>[a(i,{inset:""},{default:s(()=>[a(u,{style:{height:"60px"},modelValue:t.value,"onUpdate:modelValue":e[0]||(e[0]=l=>t.value=l),name:"密码",label:"密码",placeholder:"请输入密码",rules:[{required:!0,message:"请填写密码"}]},null,8,["modelValue"]),a(u,{style:{height:"60px"},modelValue:o.value,"onUpdate:modelValue":e[1]||(e[1]=l=>o.value=l),name:"密码",label:"密码",placeholder:"请再次输入密码",rules:[{required:!0,message:"请再次填写密码"}]},null,8,["modelValue"])]),_:1}),V("div",F,[a(c,{onClick:m,disabled:p.value,round:"",block:"",color:"#f66","native-type":"submit"},{default:s(()=>e[2]||(e[2]=[h(" 注册 ")])),_:1},8,["disabled"])])]),_:1})}}});export{S as default};
