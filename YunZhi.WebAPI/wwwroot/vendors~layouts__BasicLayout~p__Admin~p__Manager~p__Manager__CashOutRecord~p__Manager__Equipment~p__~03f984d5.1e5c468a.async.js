(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[3],{"/hEp":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("CrYe"));function a(e){return e&&e.__esModule?e:{default:e}}var c=r;t.default=c,e.exports=c},AOa7:function(e,t,n){},CrYe:function(e,t,n){"use strict";var r=n("TqRt"),a=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n("q1tI")),o=r(n("r4ZK")),l=r(n("KQxl")),i=function(e,t){return c.createElement(l.default,Object.assign({},e,{ref:t,icon:o.default}))};i.displayName="ArrowRightOutlined";var s=c.forwardRef(i);t.default=s},FKOd:function(e,t,n){"use strict";n("YV/h"),n("cIOH"),n("AOa7"),n("lUTK"),n("qVdP"),n("Telt");var r=n("lSNA"),a=n.n(r),c=n("J4zp"),o=n.n(c),l=n("q1tI"),i=n.n(l),s=n("TSYQ"),u=n.n(s),f=n("h4NZ"),p=n.n(f),d=n("/hEp"),m=n.n(d),v=n("t23M"),b=n("H84U"),y=n("pVnL"),h=n.n(y),O=n("RIqP"),g=n.n(O),E=n("Zm9Q"),j=n("HQEm"),x=n.n(j),N=n("XBQK"),P=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},w=function(e){var t,n=e.prefixCls,r=e.separator,a=void 0===r?"/":r,c=e.children,o=e.overlay,i=e.dropdownProps,s=P(e,["prefixCls","separator","children","overlay","dropdownProps"]),u=l["useContext"](b["b"]),f=u.getPrefixCls,p=f("breadcrumb",n),d=function(e){return o?l["createElement"](N["a"],h()({overlay:o,placement:"bottomCenter"},i),l["createElement"]("span",{className:"".concat(p,"-overlay-link")},e,l["createElement"](x.a,null))):e};return t="href"in s?l["createElement"]("a",h()({className:"".concat(p,"-link")},s),c):l["createElement"]("span",h()({className:"".concat(p,"-link")},s),c),t=d(t),c?l["createElement"]("span",null,t,a&&""!==a&&l["createElement"]("span",{className:"".concat(p,"-separator")},a)):null};w.__ANT_BREADCRUMB_ITEM=!0;var C=w,S=function(e){var t=e.children,n=l["useContext"](b["b"]),r=n.getPrefixCls,a=r("breadcrumb");return l["createElement"]("span",{className:"".concat(a,"-separator")},t||"/")};S.__ANT_BREADCRUMB_SEPARATOR=!0;var k=S,R=n("BvKs"),_=n("uaoM"),T=n("0n0R"),I=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n};function M(e,t){if(!e.breadcrumbName)return null;var n=Object.keys(t).join("|"),r=e.breadcrumbName.replace(new RegExp(":(".concat(n,")"),"g"),(function(e,n){return t[n]||e}));return r}function D(e,t,n,r){var a=n.indexOf(e)===n.length-1,c=M(e,t);return a?l["createElement"]("span",null,c):l["createElement"]("a",{href:"#/".concat(r.join("/"))},c)}var H=function(e,t){return e=(e||"").replace(/^\//,""),Object.keys(t).forEach((function(n){e=e.replace(":".concat(n),t[n])})),e},A=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",n=arguments.length>2?arguments[2]:void 0,r=g()(e),a=H(t,n);return a&&r.push(a),r},B=function(e){var t,n=e.prefixCls,r=e.separator,c=void 0===r?"/":r,o=e.style,i=e.className,s=e.routes,f=e.children,p=e.itemRender,d=void 0===p?D:p,m=e.params,v=void 0===m?{}:m,y=I(e,["prefixCls","separator","style","className","routes","children","itemRender","params"]),O=l["useContext"](b["b"]),g=O.getPrefixCls,j=O.direction,x=g("breadcrumb",n);if(s&&s.length>0){var N=[];t=s.map((function(e){var t,n=H(e.path,v);return n&&N.push(n),e.children&&e.children.length&&(t=l["createElement"](R["a"],null,e.children.map((function(e){return l["createElement"](R["a"].Item,{key:e.path||e.breadcrumbName},d(e,v,s,A(N,e.path,v)))})))),l["createElement"](C,{overlay:t,separator:c,key:n||e.breadcrumbName},d(e,v,s,N))}))}else f&&(t=Object(E["a"])(f).map((function(e,t){return e?(Object(_["a"])(e.type&&(!0===e.type.__ANT_BREADCRUMB_ITEM||!0===e.type.__ANT_BREADCRUMB_SEPARATOR),"Breadcrumb","Only accepts Breadcrumb.Item and Breadcrumb.Separator as it's children"),Object(T["a"])(e,{separator:c,key:t})):e})));var P=u()(x,a()({},"".concat(x,"-rtl"),"rtl"===j),i);return l["createElement"]("div",h()({className:P,style:o},y),t)};B.Item=C,B.Separator=k;var Q=B,q=Q,K=n("Tckk"),L=n("gDlH"),Y=n("YMnH"),Z=function(e,t,n){return t&&n?l["createElement"](Y["a"],{componentName:"PageHeader"},(function(r){var a=r.back;return l["createElement"]("div",{className:"".concat(e,"-back")},l["createElement"](L["a"],{onClick:function(e){n&&n(e)},className:"".concat(e,"-back-button"),"aria-label":a},t))})):null},U=function(e){return l["createElement"](q,e)},z=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ltr";return void 0!==e.backIcon?e.backIcon:"rtl"===t?l["createElement"](m.a,null):l["createElement"](p.a,null)},W=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"ltr",r=t.title,a=t.avatar,c=t.subTitle,o=t.tags,i=t.extra,s=t.onBack,u="".concat(e,"-heading");if(r||c||o||i){var f=z(t,n),p=Z(e,f,s);return l["createElement"]("div",{className:u},l["createElement"]("div",{className:"".concat(u,"-left")},p,a&&l["createElement"](K["a"],a),r&&l["createElement"]("span",{className:"".concat(u,"-title"),title:"string"===typeof r?r:void 0},r),c&&l["createElement"]("span",{className:"".concat(u,"-sub-title"),title:"string"===typeof c?c:void 0},c),o&&l["createElement"]("span",{className:"".concat(u,"-tags")},o)),i&&l["createElement"]("span",{className:"".concat(u,"-extra")},i))}return null},F=function(e,t){return t?l["createElement"]("div",{className:"".concat(e,"-footer")},t):null},V=function(e,t){return l["createElement"]("div",{className:"".concat(e,"-content")},t)},X=function(e){var t=l["useState"](!1),n=o()(t,2),r=n[0],c=n[1],i=function(e){var t=e.width;c(t<768)};return l["createElement"](b["a"],null,(function(t){var n,c=t.getPrefixCls,o=t.pageHeader,s=t.direction,f=e.prefixCls,p=e.style,d=e.footer,m=e.children,b=e.breadcrumb,y=e.className,h=!0;"ghost"in e?h=e.ghost:o&&"ghost"in o&&(h=o.ghost);var O=c("page-header",f),g=b&&b.routes?U(b):null,E=u()(O,y,(n={"has-breadcrumb":g,"has-footer":d},a()(n,"".concat(O,"-ghost"),h),a()(n,"".concat(O,"-rtl"),"rtl"===s),a()(n,"".concat(O,"-compact"),r),n));return l["createElement"](v["a"],{onResize:i},l["createElement"]("div",{className:E,style:p},g,W(O,e,s),m&&V(O,m),F(O,d)))}))},J=X,G=(n("Znn+"),n("ZTPi")),$=n("jYQm"),ee=n("HTcj"),te=n("x3PY");n("lN3h");function ne(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function re(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ne(Object(n),!0).forEach((function(t){ae(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ne(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function ae(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function ce(e,t){if(null==e)return{};var n,r,a=oe(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function oe(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}function le(){return le=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},le.apply(this,arguments)}var ie=function(e){var t=e.tabList,n=e.tabActiveKey,r=e.onTabChange,a=e.tabBarExtraContent,c=e.tabProps,o=e.prefixedClassName;return t&&t.length?i.a.createElement(G["a"],le({className:"".concat(o,"-tabs"),activeKey:n,onChange:function(e){r&&r(e)},tabBarExtraContent:a},c),t.map((function(e,t){return i.a.createElement(G["a"].TabPane,le({},e,{tab:e.tab,key:e.key||t}))}))):null},se=function(e,t,n){return e||t?i.a.createElement("div",{className:"".concat(n,"-detail")},i.a.createElement("div",{className:"".concat(n,"-main")},i.a.createElement("div",{className:"".concat(n,"-row")},e&&i.a.createElement("div",{className:"".concat(n,"-content")},e),t&&i.a.createElement("div",{className:"".concat(n,"-extraContent")},t)))):null},ue=function(e,t){var n=e.title,r=e.content,a=e.pageHeaderRender,c=e.header,o=e.extraContent,l=(e.style,e.prefixCls),s=ce(e,["title","content","pageHeaderRender","header","extraContent","style","prefixCls"]);if(a)return a(re(re({},e),t));var u=n;return n||!1===n||(u=t.title),i.a.createElement(J,le({},t,{title:u},s,{footer:ie(re(re({},s),{},{prefixedClassName:t.prefixedClassName}))},c,{prefixCls:l}),se(r,o,t.prefixedClassName))},fe=function(e){var t=e.children,n=e.style,r=e.footer,a=e.ghost,c=e.prefixCls,o=void 0===c?"ant-pro":c,s=Object(l["useContext"])($["a"]),f="".concat(o,"-page-container"),p=u()(f,e.className,ae({},"".concat(o,"-page-container-ghost"),a));return i.a.createElement("div",{style:n,className:p},i.a.createElement("div",{className:"".concat(f,"-warp")},ue(e,re(re({},s),{},{prefixCls:void 0,prefixedClassName:f}))),i.a.createElement(ee["a"],null,t?i.a.createElement("div",null,i.a.createElement("div",{className:"".concat(f,"-children-content")},t),s.hasFooterToolbar&&i.a.createElement("div",{style:{height:48,marginTop:24}})):null),r&&i.a.createElement(te["a"],null,r))};t["a"]=fe},HQEm:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("Sj0X"));function a(e){return e&&e.__esModule?e:{default:e}}var c=r;t.default=c,e.exports=c},HTcj:function(e,t,n){"use strict";n("kZZr");var r=n("q1tI"),a=n.n(r),c=n("TSYQ"),o=n.n(c),l=n("jYQm"),i=function(e){var t=Object(r["useContext"])(l["a"]),n=e.children,c=e.contentWidth,i=e.className,s=e.style,u=e.prefixCls,f=void 0===u?"ant-pro":u,p=c||t.contentWidth,d="".concat(f,"-grid-content");return"Fixed"===p&&(d="".concat(f,"-grid-content wide")),a.a.createElement("div",{className:o()(d,i),style:s},a.a.createElement("div",{className:"".concat(f,"-grid-content-children")},n))};t["a"]=i},"ID/q":function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var r=n("cDf5"),a=n.n(r);function c(e,t){"function"===typeof e?e(t):"object"===a()(e)&&e&&"current"in e&&(e.current=t)}function o(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){t.forEach((function(t){c(t,e)}))}}},NZ0x:function(e,t,n){},Q9mQ:function(e,t,n){"use strict";n("cIOH"),n("UADf")},Sj0X:function(e,t,n){"use strict";var r=n("TqRt"),a=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n("q1tI")),o=r(n("XuBP")),l=r(n("KQxl")),i=function(e,t){return c.createElement(l.default,Object.assign({},e,{ref:t,icon:o.default}))};i.displayName="DownOutlined";var s=c.forwardRef(i);t.default=s},Tckk:function(e,t,n){"use strict";var r=n("pVnL"),a=n.n(r),c=n("lSNA"),o=n.n(c),l=n("J4zp"),i=n.n(l),s=n("q1tI"),u=n("TSYQ"),f=n.n(u),p=n("t23M"),d=n("H84U"),m=n("uaoM"),v=n("ID/q"),b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},y=function(e,t){var n,r,c=s["useState"](1),l=i()(c,2),u=l[0],y=l[1],h=s["useState"](!1),O=i()(h,2),g=O[0],E=O[1],j=s["useState"](!0),x=i()(j,2),N=x[0],P=x[1],w=s["useRef"](),C=s["useRef"](),S=Object(v["a"])(t,w),k=s["useContext"](d["b"]),R=k.getPrefixCls,_=function(){if(C.current&&w.current){var t=C.current.offsetWidth,n=w.current.offsetWidth;if(0!==t&&0!==n){var r=e.gap,a=void 0===r?4:r;2*a<n&&y(n-2*a<t?(n-2*a)/t:1)}}};s["useEffect"]((function(){E(!0)}),[]),s["useEffect"]((function(){P(!0),y(1)}),[e.src]),s["useEffect"]((function(){_()}),[e.gap]);var T=function(){var t=e.onError,n=t?t():void 0;!1!==n&&P(!1)},I=e.prefixCls,M=e.shape,D=e.size,H=e.src,A=e.srcSet,B=e.icon,Q=e.className,q=e.alt,K=e.draggable,L=e.children,Y=b(e,["prefixCls","shape","size","src","srcSet","icon","className","alt","draggable","children"]);Object(m["a"])(!("string"===typeof B&&B.length>2),"Avatar","`icon` is using ReactNode instead of string naming in v4. Please check `".concat(B,"` at https://ant.design/components/icon"));var Z,U=R("avatar",I),z=f()((n={},o()(n,"".concat(U,"-lg"),"large"===D),o()(n,"".concat(U,"-sm"),"small"===D),n)),W=f()(U,z,(r={},o()(r,"".concat(U,"-").concat(M),M),o()(r,"".concat(U,"-image"),H&&N),o()(r,"".concat(U,"-icon"),B),r),Q),F="number"===typeof D?{width:D,height:D,lineHeight:"".concat(D,"px"),fontSize:B?D/2:18}:{};if(H&&N)Z=s["createElement"]("img",{src:H,draggable:K,srcSet:A,onError:T,alt:q});else if(B)Z=B;else if(g||1!==u){var V="scale(".concat(u,") translateX(-50%)"),X={msTransform:V,WebkitTransform:V,transform:V},J="number"===typeof D?{lineHeight:"".concat(D,"px")}:{};Z=s["createElement"](p["a"],{onResize:_},s["createElement"]("span",{className:"".concat(U,"-string"),ref:function(e){C.current=e},style:a()(a()({},J),X)},L))}else Z=s["createElement"]("span",{className:"".concat(U,"-string"),style:{opacity:0},ref:function(e){C.current=e}},L);return delete Y.onError,delete Y.gap,s["createElement"]("span",a()({},Y,{style:a()(a()({},F),Y.style),className:W,ref:S}),Z)},h=s["forwardRef"](y);h.displayName="Avatar",h.defaultProps={shape:"circle",size:"default"};var O=h,g=n("Zm9Q"),E=n("0n0R"),j=n("diRs"),x=function(e){var t=s["useContext"](d["b"]),n=t.getPrefixCls,r=t.direction,a=e.prefixCls,c=e.className,l=void 0===c?"":c,i=e.maxCount,u=e.maxStyle,p=n("avatar-group",a),m=f()(p,o()({},"".concat(p,"-rtl"),"rtl"===r),l),v=e.children,b=e.maxPopoverPlacement,y=void 0===b?"top":b,h=Object(g["a"])(v).map((function(e,t){return Object(E["a"])(e,{key:"avatar-key-".concat(t)})})),x=h.length;if(i&&i<x){var N=h.slice(0,i),P=h.slice(i,x);return N.push(s["createElement"](j["a"],{key:"avatar-popover-key",content:P,trigger:"hover",placement:y,overlayClassName:"".concat(p,"-popover")},s["createElement"](O,{style:u},"+".concat(x-i)))),s["createElement"]("div",{className:m,style:e.style},N)}return s["createElement"]("div",{className:m,style:e.style},v)},N=x,P=O;P.Group=N;t["a"]=P},Telt:function(e,t,n){"use strict";n("cIOH"),n("ifDB"),n("Q9mQ")},UADf:function(e,t,n){},XuBP:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"}}]},name:"down",theme:"outlined"};t.default=r},"YV/h":function(e,t,n){},ayqn:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"}}]},name:"arrow-left",theme:"outlined"};t.default=r},bogI:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var r=function(e){if(!e)return null;var t="function"===typeof e;return t?e():e}},diRs:function(e,t,n){"use strict";var r=n("pVnL"),a=n.n(r),c=n("q1tI"),o=n("3S7+"),l=n("H84U"),i=n("bogI"),s=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},u=c["forwardRef"]((function(e,t){var n=e.prefixCls,r=e.title,u=e.content,f=s(e,["prefixCls","title","content"]),p=c["useContext"](l["b"]),d=p.getPrefixCls,m=function(e){return c["createElement"](c["Fragment"],null,r&&c["createElement"]("div",{className:"".concat(e,"-title")},Object(i["a"])(r)),c["createElement"]("div",{className:"".concat(e,"-inner-content")},Object(i["a"])(u)))},v=d("popover",n);return c["createElement"](o["a"],a()({},f,{prefixCls:v,ref:t,overlay:m(v)}))}));u.displayName="Popover",u.defaultProps={placement:"top",transitionName:"zoom-big",trigger:"hover",mouseEnterDelay:.1,mouseLeaveDelay:.1,overlayStyle:{}},t["a"]=u},gDlH:function(e,t,n){"use strict";var r=n("pVnL"),a=n.n(r),c=n("lwsE"),o=n.n(c),l=n("W8MJ"),i=n.n(l),s=n("7W2i"),u=n.n(s),f=n("LQ03"),p=n.n(f),d=n("q1tI"),m=n("4IlW"),v=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},b={border:0,background:"transparent",padding:0,lineHeight:"inherit",display:"inline-block"},y=function(e){u()(n,e);var t=p()(n);function n(){var e;return o()(this,n),e=t.apply(this,arguments),e.onKeyDown=function(e){var t=e.keyCode;t===m["a"].ENTER&&e.preventDefault()},e.onKeyUp=function(t){var n=t.keyCode,r=e.props.onClick;n===m["a"].ENTER&&r&&r()},e.setRef=function(t){e.div=t},e}return i()(n,[{key:"componentDidMount",value:function(){var e=this.props.autoFocus;e&&this.focus()}},{key:"focus",value:function(){this.div&&this.div.focus()}},{key:"blur",value:function(){this.div&&this.div.blur()}},{key:"render",value:function(){var e=this.props,t=e.style,n=e.noStyle,r=e.disabled,c=v(e,["style","noStyle","disabled"]),o={};return n||(o=a()({},b)),r&&(o.pointerEvents="none"),o=a()(a()({},o),t),d["createElement"]("div",a()({role:"button",tabIndex:0,ref:this.setRef},c,{onKeyDown:this.onKeyDown,onKeyUp:this.onKeyUp,style:o}))}}]),n}(d["Component"]);t["a"]=y},h4NZ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=a(n("jw4T"));function a(e){return e&&e.__esModule?e:{default:e}}var c=r;t.default=c,e.exports=c},ifDB:function(e,t,n){},jYQm:function(e,t,n){"use strict";var r=n("q1tI"),a=Object(r["createContext"])({});t["a"]=a},jw4T:function(e,t,n){"use strict";var r=n("TqRt"),a=n("284h");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var c=a(n("q1tI")),o=r(n("ayqn")),l=r(n("KQxl")),i=function(e,t){return c.createElement(l.default,Object.assign({},e,{ref:t,icon:o.default}))};i.displayName="ArrowLeftOutlined";var s=c.forwardRef(i);t.default=s},kZZr:function(e,t,n){},lN3h:function(e,t,n){},r4ZK:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"}}]},name:"arrow-right",theme:"outlined"};t.default=r},x3PY:function(e,t,n){"use strict";var r=n("q1tI"),a=n.n(r),c=n("TSYQ"),o=n.n(c),l=(n("NZ0x"),n("jYQm"));function i(){return i=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},i.apply(this,arguments)}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function u(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){f(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function f(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){if(null==e)return{};var n,r,a=d(e,t);if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}function d(e,t){if(null==e)return{};var n,r,a={},c=Object.keys(e);for(r=0;r<c.length;r++)n=c[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}var m=function(e){var t=e.children,n=e.prefixCls,c=void 0===n?"ant-pro":n,s=e.className,f=e.extra,d=e.style,m=e.renderContent,v=p(e,["children","prefixCls","className","extra","style","renderContent"]),b="".concat(c,"-footer-bar"),y=Object(r["useContext"])(l["a"]),h=Object(r["useMemo"])((function(){var e=y.hasSiderMenu,t=y.isMobile,n=y.siderWidth;if(e)return n?t?"100%":"calc(100% - ".concat(n,"px)"):"100%"}),[y.collapsed,y.hasSiderMenu,y.isMobile,y.siderWidth]),O=a.a.createElement(a.a.Fragment,null,a.a.createElement("div",{className:"".concat(b,"-left")},f),a.a.createElement("div",{className:"".concat(b,"-right")},t));return Object(r["useEffect"])((function(){return y&&(null===y||void 0===y?void 0:y.setHasFooterToolbar)?(null===y||void 0===y||y.setHasFooterToolbar(!0),function(){y&&(null===y||void 0===y?void 0:y.setHasFooterToolbar)&&(null===y||void 0===y||y.setHasFooterToolbar(!1))}):function(){}}),[]),a.a.createElement("div",i({className:o()(s,"".concat(b)),style:u({width:h},d)},v),m?m(u(u(u({},e),y),{},{leftWidth:h}),O):O)};t["a"]=m}}]);