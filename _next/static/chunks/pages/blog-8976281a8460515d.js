(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[195],{46055:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/blog",function(){return n(7460)}])},67433:function(e,t,n){"use strict";var a=n(85893),s=n(41664),c=n.n(s),r=n(47535);let o=e=>{let{directory:t,post:n,idx:s}=e;return(0,a.jsxs)("li",{className:"card card__post",children:[(0,a.jsx)(c(),{href:"/".concat(t,"/").concat(n.slug),children:(0,a.jsx)("div",{className:"card__post__keyVisual",style:{backgroundImage:"url(".concat(n.keyVisual||"/images/undefined.jpg",")")}})}),(0,a.jsxs)("div",{className:"card__post__info_wrapper",children:[(0,a.jsxs)("div",{children:[(0,a.jsx)("span",{className:"card__post__category",children:n.category}),(0,a.jsx)("span",{className:"card__post__date",children:(0,r.W)(n.date)})]}),(0,a.jsx)(c(),{href:"/".concat(t,"/").concat(n.slug),children:(0,a.jsx)("h1",{className:"card__post__title",children:n.title})}),(0,a.jsx)("div",{children:n.tags&&n.tags.map((e,n)=>(0,a.jsx)("a",{href:"/".concat(t,"/?tag=").concat(encodeURIComponent(e)),children:(0,a.jsx)("span",{className:"card__post__tag",children:e},n)}))})]})]},"card__post__".concat(s))};t.Z=o},47535:function(e,t,n){"use strict";n.d(t,{W:function(){return a}});let a=e=>(e=new Date(e),"".concat(e.getFullYear()," - ").concat(e.getMonth()+1," - ").concat(e.getDate()))},7460:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return u}});var a=n(85893),s=n(67294),c=n(9675),r=n.n(c);n(41664);var o=n(67433),l=n(26821),i=n(11163);let d=e=>{let{data:t,title:n,description:c}=e,d=(0,i.useRouter)(),u=t.map(e=>r()(e)).map(e=>e.data),_=Array.from(new Set(u.map(e=>e.tags).flat())).sort(),p=u.filter(e=>!d.query.tag||e.tags.includes(d.query.tag)).sort(function(e,t){return-(e.date-t.date)}),h=(e,t)=>()=>{t.getBoundingClientRect().top<45?e.classList.add("jostled"):e.classList.remove("jostled")};return(0,s.useEffect)(()=>{if(document){let e=document.querySelector("header .logo"),t=document.querySelector(".container > h1");if(e&&t&&window){let n=h(e,t);return window.addEventListener("scroll",n),()=>{window.removeEventListener("scroll",n),e.classList.remove("jostled")}}}}),(0,a.jsxs)(l.Z,{children:[(0,a.jsx)("h1",{children:"Blog ✍"}),(0,a.jsx)("span",{children:"Tag:\xa0"}),(0,a.jsxs)("select",{name:"select-post-tag",id:"select-post-tag",value:d.query.tag,onChange:e=>{d.push({pathname:"/blog",query:{tag:e.target.value}})},children:[(0,a.jsx)("option",{value:"",children:"All"},"option__0"),_.map((e,t)=>(0,a.jsx)("option",{value:e,children:e},"option__".concat(t+1)))]}),(0,a.jsx)("div",{children:(0,a.jsx)("ul",{className:"card_container",children:p.map((e,t)=>(0,a.jsx)(o.Z,{directory:"blog",post:e,idx:t},t))})})]})};var u=!0;t.default=d},11163:function(e,t,n){e.exports=n(80880)},33596:function(){}},function(e){e.O(0,[146,675,664,774,888,179],function(){return e(e.s=46055)}),_N_E=e.O()}]);