(this.webpackJsonpnotes=this.webpackJsonpnotes||[]).push([[0],{39:function(t,n,e){},40:function(t,n,e){"use strict";e.r(n);var c=e(15),r=e.n(c),o=e(2),i=e(6),a=e(3),u=e(0),s=function(t){var n=t.note,e=t.toggleImportance,c=n.important?"make not important":"important";return Object(u.jsxs)("li",{className:"note",children:[n.content,Object(u.jsx)("button",{onClick:e,children:c})]})},l=function(t){var n=t.message;return null===n?null:Object(u.jsx)("div",{className:"error",children:n})},j=function(){return Object(u.jsxs)("div",{style:{color:"green",fontStyle:"italic",fonSize:16},children:[Object(u.jsx)("br",{}),Object(u.jsx)("em",{children:"Note app, Department of Computer Science, Gleb Tishchenko 2021"})]})},b=e(4),f=e.n(b),d="/api/notes",h=function(){return f.a.get(d).then((function(t){return t.data}))},O=function(t){return f.a.post(d,t).then((function(t){return t.data}))},m=function(t,n){var e=f.a.put("".concat(d,"/").concat(t),n);return console.log(e),e.then((function(t){return t.data}))},p=function(t){var n=Object(o.useState)([]),e=Object(a.a)(n,2),c=e[0],r=e[1],b=Object(o.useState)(""),f=Object(a.a)(b,2),d=f[0],p=f[1],x=Object(o.useState)(!0),v=Object(a.a)(x,2),g=v[0],S=v[1],k=Object(o.useState)(null),w=Object(a.a)(k,2),y=w[0],N=w[1];Object(o.useEffect)((function(){h().then((function(t){r(t)}))}),[]);var C=g?c:c.filter((function(t){return t.important}));return Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("h2",{children:"All Notes:"}),Object(u.jsx)(l,{message:y}),Object(u.jsx)("div",{children:Object(u.jsxs)("button",{onClick:function(){return S(!g)},children:["show ",g?"important":"all"]})}),Object(u.jsx)("ul",{children:C.map((function(t){return Object(u.jsx)(s,{note:t,toggleImportance:function(){return function(t){var n=c.find((function(n){return n.id===t})),e=Object(i.a)(Object(i.a)({},n),{},{important:!n.important});m(t,e).then((function(n){r(c.map((function(e){return e.id!==t?e:n})))})).catch((function(e){N("Note ".concat(n.content," was already removed from server")),setTimeout((function(){N(null)}),5e3),r(c.filter((function(n){return n.id!==t})))}))}(t.id)}},t.id)}))}),Object(u.jsx)("h2",{children:"Add new note"}),Object(u.jsxs)("form",{onSubmit:function(t){t.preventDefault();var n={content:d,date:(new Date).toISOString(),important:Math.random()>.5,id:c.length+1};O(n).then((function(t){r(c.concat(t)),p("")}))},children:[Object(u.jsx)("input",{value:d,onChange:function(t){console.group(t.target.value),p(t.target.value)}}),Object(u.jsx)("button",{type:"submit",children:"save"})]}),Object(u.jsx)(j,{})]})};e(39);r.a.render(Object(u.jsx)(p,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.142ea2cf.chunk.js.map