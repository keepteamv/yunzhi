(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"6VBw":function(e,n,a){"use strict";var t=a("ODXe"),r=a("rePB"),o=a("Ff2n"),i=a("q1tI"),c=a("TSYQ"),l=a.n(c),s=a("VTBJ"),u=a("Qi1f"),d={primaryColor:"#333",secondaryColor:"#E6E6E6",calculated:!1};function f(e){var n=e.primaryColor,a=e.secondaryColor;d.primaryColor=n,d.secondaryColor=a||Object(u["b"])(n),d.calculated=!!a}function m(){return Object(s["a"])({},d)}var g=function(e){var n=e.icon,a=e.className,t=e.onClick,r=e.style,i=e.primaryColor,c=e.secondaryColor,l=Object(o["a"])(e,["icon","className","onClick","style","primaryColor","secondaryColor"]),f=d;if(i&&(f={primaryColor:i,secondaryColor:c||Object(u["b"])(i)}),Object(u["f"])(),Object(u["g"])(Object(u["c"])(n),"icon should be icon definiton, but got ".concat(n)),!Object(u["c"])(n))return null;var m=n;return m&&"function"===typeof m.icon&&(m=Object(s["a"])(Object(s["a"])({},m),{},{icon:m.icon(f.primaryColor,f.secondaryColor)})),Object(u["a"])(m.icon,"svg-".concat(m.name),Object(s["a"])({className:a,onClick:t,style:r,"data-icon":m.name,width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true"},l))};g.displayName="IconReact",g.getTwoToneColors=m,g.setTwoToneColors=f;var p=g;function y(e){var n=Object(u["d"])(e),a=Object(t["a"])(n,2),r=a[0],o=a[1];return p.setTwoToneColors({primaryColor:r,secondaryColor:o})}function b(){var e=p.getTwoToneColors();return e.calculated?[e.primaryColor,e.secondaryColor]:e.primaryColor}y("#1890ff");var h=i["forwardRef"]((function(e,n){var a=e.className,c=e.icon,s=e.spin,d=e.rotate,f=e.tabIndex,m=e.onClick,g=e.twoToneColor,y=Object(o["a"])(e,["className","icon","spin","rotate","tabIndex","onClick","twoToneColor"]),b=l()("anticon",Object(r["a"])({},"anticon-".concat(c.name),Boolean(c.name)),a),h=l()({"anticon-spin":!!s||"loading"===c.name}),v=f;void 0===v&&m&&(v=-1);var C=d?{msTransform:"rotate(".concat(d,"deg)"),transform:"rotate(".concat(d,"deg)")}:void 0,k=Object(u["d"])(g),_=Object(t["a"])(k,2),T=_[0],j=_[1];return i["createElement"]("span",Object.assign({role:"img","aria-label":c.name},y,{ref:n,tabIndex:v,onClick:m,className:b}),i["createElement"](p,{className:h,icon:c,primaryColor:T,secondaryColor:j,style:C}))}));h.displayName="AntdIcon",h.getTwoToneColor=b,h.setTwoToneColor=y;n["a"]=h},"EC8/":function(e,n,a){e.exports={iconGroup:"iconGroup___3jZ4H",anticon:"anticon___8Wwtd",rankingList:"rankingList___10guE",rankingItemNumber:"rankingItemNumber___1nn__",active:"active___2Fh7J",rankingItemTitle:"rankingItemTitle___Kl_eZ",salesExtra:"salesExtra___3m6bT",currentDate:"currentDate___v438v",salesCard:"salesCard___1kjZI",salesBar:"salesBar___18el7",salesRank:"salesRank___oHchN",salesCardExtra:"salesCardExtra___1KB9C",salesTypeRadio:"salesTypeRadio___1RCbf",offlineCard:"offlineCard___3MsKy",trendText:"trendText___3sdDa",rankingTitle:"rankingTitle___1l_Go",salesExtraWrap:"salesExtraWrap___3Nz2-"}},GZ0F:function(e,n,a){"use strict";var t=a("q1tI"),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M176 511a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0zm280 0a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"ellipsis",theme:"outlined"},o=r,i=a("6VBw"),c=function(e,n){return t["createElement"](i["a"],Object.assign({},e,{ref:n,icon:o}))};c.displayName="EllipsisOutlined";n["a"]=t["forwardRef"](c)},HTcj:function(e,n,a){"use strict";a("kZZr");var t=a("q1tI"),r=a.n(t),o=a("TSYQ"),i=a.n(o),c=a("jYQm"),l=function(e){var n=Object(t["useContext"])(c["a"]),a=e.children,o=e.contentWidth,l=e.className,s=e.style,u=e.prefixCls,d=void 0===u?"ant-pro":u,f=o||n.contentWidth,m="".concat(d,"-grid-content");return"Fixed"===f&&(m="".concat(d,"-grid-content wide")),r.a.createElement("div",{className:i()(m,l),style:s},r.a.createElement("div",{className:"".concat(d,"-grid-content-children")},a))};n["a"]=l},N3Gg:function(e,n,a){"use strict";a.r(n);a("14J3");var t=a("BMrR"),r=(a("jCWc"),a("kPKH")),o=(a("qVdP"),a("jsC+")),i=(a("lUTK"),a("BvKs")),c=a("fWQN"),l=a("mtLc"),s=a("yKVA"),u=a("879j"),d=a("GZ0F"),f=a("q1tI"),m=a.n(f),g=a("HTcj"),p=a("9kvl"),y=(a("T2oS"),a("W9HT")),b=function(){return m.a.createElement("div",{style:{paddingTop:100,textAlign:"center"}},m.a.createElement(y["a"],{size:"large"}))},h=a("wd/R"),v=a.n(h);function C(e){return 1*e<10?"0".concat(e):e}function k(e){var n=new Date,a=864e5;if("today"===e)return n.setHours(0),n.setMinutes(0),n.setSeconds(0),[v()(n),v()(n.getTime()+(a-1e3))];if("week"===e){var t=n.getDay();n.setHours(0),n.setMinutes(0),n.setSeconds(0),0===t?t=6:t-=1;var r=n.getTime()-t*a;return[v()(r),v()(r+(7*a-1e3))]}var o=n.getFullYear();if("month"===e){var i=n.getMonth(),c=v()(n).add(1,"months"),l=c.year(),s=c.month();return[v()("".concat(o,"-").concat(C(i+1),"-01 00:00:00")),v()(v()("".concat(l,"-").concat(C(s+1),"-01 00:00:00")).valueOf()-1e3)]}return[v()("".concat(o,"-01-01 00:00:00")),v()("".concat(o,"-12-31 23:59:59"))]}var _=a("EC8/"),T=a.n(_),j=m.a.lazy((function(){return Promise.all([a.e(0),a.e(4),a.e(5),a.e(34)]).then(a.bind(null,"QxLb"))})),E=m.a.lazy((function(){return Promise.all([a.e(0),a.e(4),a.e(33),a.e(5),a.e(37)]).then(a.bind(null,"Ue1E"))})),O=m.a.lazy((function(){return Promise.all([a.e(0),a.e(4),a.e(6),a.e(31),a.e(32)]).then(a.bind(null,"3mt1"))})),w=m.a.lazy((function(){return Promise.all([a.e(0),a.e(4),a.e(5),a.e(35)]).then(a.bind(null,"l/l1"))})),x=m.a.lazy((function(){return Promise.all([a.e(0),a.e(4),a.e(5),a.e(36)]).then(a.bind(null,"/Ipg"))})),D=function(e){Object(s["a"])(a,e);var n=Object(u["a"])(a);function a(){var e;Object(c["a"])(this,a);for(var t=arguments.length,r=new Array(t),o=0;o<t;o++)r[o]=arguments[o];return e=n.call.apply(n,[this].concat(r)),e.state={salesType:"all",currentTabKey:"",rangePickerValue:k("year")},e.reqRef=0,e.timeoutId=0,e.handleChangeSalesType=function(n){e.setState({salesType:n.target.value})},e.handleTabChange=function(n){e.setState({currentTabKey:n})},e.handleRangePickerChange=function(n){var a=e.props.dispatch;e.setState({rangePickerValue:n}),a({type:"index/fetchSalesData"})},e.selectDate=function(n){var a=e.props.dispatch;e.setState({rangePickerValue:k(n)}),a({type:"index/fetchSalesData"})},e.isActive=function(n){var a=e.state.rangePickerValue;if(!a)return"";var t=k(n);return t&&a[0]&&a[1]&&a[0].isSame(t[0],"day")&&a[1].isSame(t[1],"day")?T.a.currentDate:""},e}return Object(l["a"])(a,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;this.reqRef=requestAnimationFrame((function(){e({type:"index/fetch"})}))}},{key:"componentWillUnmount",value:function(){var e=this.props.dispatch;e({type:"index/clear"}),cancelAnimationFrame(this.reqRef),clearTimeout(this.timeoutId)}},{key:"render",value:function(){var e,n=this.state,a=n.rangePickerValue,c=n.salesType,l=n.currentTabKey,s=this.props,u=s.index,p=s.loading,y=u.visitData,h=u.visitData2,v=u.salesData,C=u.searchData,k=u.offlineData,_=u.offlineChartData,D=u.salesTypeData,N=u.salesTypeDataOnline,I=u.salesTypeDataOffline;e="all"===c?D:"online"===c?N:I;var S=m.a.createElement(i["a"],null,m.a.createElement(i["a"].Item,null,"\u64cd\u4f5c\u4e00"),m.a.createElement(i["a"].Item,null,"\u64cd\u4f5c\u4e8c")),P=m.a.createElement("span",{className:T.a.iconGroup},m.a.createElement(o["a"],{overlay:S,placement:"bottomRight"},m.a.createElement(d["a"],null))),R=l||k[0]&&k[0].name;return m.a.createElement(g["a"],null,m.a.createElement(m.a.Fragment,null,m.a.createElement(f["Suspense"],{fallback:m.a.createElement(b,null)},m.a.createElement(j,{loading:p,visitData:y})),m.a.createElement(f["Suspense"],{fallback:null},m.a.createElement(E,{rangePickerValue:a,salesData:v,isActive:this.isActive,handleRangePickerChange:this.handleRangePickerChange,loading:p,selectDate:this.selectDate})),m.a.createElement(t["a"],{gutter:24,style:{marginTop:24}},m.a.createElement(r["a"],{xl:12,lg:24,md:24,sm:24,xs:24},m.a.createElement(f["Suspense"],{fallback:null},m.a.createElement(O,{loading:p,visitData2:h,searchData:C,dropdownGroup:P}))),m.a.createElement(r["a"],{xl:12,lg:24,md:24,sm:24,xs:24},m.a.createElement(f["Suspense"],{fallback:null},m.a.createElement(w,{dropdownGroup:P,salesType:c,loading:p,salesPieData:e,handleChangeSalesType:this.handleChangeSalesType})))),m.a.createElement(f["Suspense"],{fallback:null},m.a.createElement(x,{activeKey:R,loading:p,offlineData:k,offlineChartData:_,handleTabChange:this.handleTabChange}))))}}]),a}(f["Component"]);n["default"]=Object(p["d"])((function(e){var n=e.index,a=e.loading;return{index:n,loading:a.effects["index/fetch"]}}))(D)},Qi1f:function(e,n,a){"use strict";a.d(n,"g",(function(){return u})),a.d(n,"c",(function(){return d})),a.d(n,"a",(function(){return m})),a.d(n,"b",(function(){return g})),a.d(n,"d",(function(){return p})),a.d(n,"e",(function(){return y})),a.d(n,"f",(function(){return v}));var t=a("VTBJ"),r=a("U8pU"),o=a("HXN9"),i=a("q1tI"),c=a.n(i),l=a("Kwbf"),s=a("Gu+u");function u(e,n){Object(l["a"])(e,"[@ant-design/icons] ".concat(n))}function d(e){return"object"===Object(r["a"])(e)&&"string"===typeof e.name&&"string"===typeof e.theme&&("object"===Object(r["a"])(e.icon)||"function"===typeof e.icon)}function f(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return Object.keys(e).reduce((function(n,a){var t=e[a];switch(a){case"class":n.className=t,delete n.class;break;default:n[a]=t}return n}),{})}function m(e,n,a){return a?c.a.createElement(e.tag,Object(t["a"])(Object(t["a"])({key:n},f(e.attrs)),a),(e.children||[]).map((function(a,t){return m(a,"".concat(n,"-").concat(e.tag,"-").concat(t))}))):c.a.createElement(e.tag,Object(t["a"])({key:n},f(e.attrs)),(e.children||[]).map((function(a,t){return m(a,"".concat(n,"-").concat(e.tag,"-").concat(t))})))}function g(e){return Object(o["generate"])(e)[0]}function p(e){return e?Array.isArray(e)?e:[e]:[]}var y={width:"1em",height:"1em",fill:"currentColor","aria-hidden":"true",focusable:"false"},b="\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n",h=!1,v=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b;Object(i["useEffect"])((function(){h||(Object(s["insertCss"])(e,{prepend:!0}),h=!0)}),[])}},jYQm:function(e,n,a){"use strict";var t=a("q1tI"),r=Object(t["createContext"])({});n["a"]=r},kZZr:function(e,n,a){}}]);