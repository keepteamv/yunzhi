(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{L9NX:function(t,e,n){"use strict";n.r(e);var r=n("fWQN"),a=n("mtLc"),c=n("yKVA"),o=n("879j"),i=n("q1tI"),s=n.n(i),u=n("tbuW"),l=n("Ty5D"),d=n("9kvl"),p=n("s4NR"),h=function(t){Object(c["a"])(n,t);var e=Object(o["a"])(n);function n(){var t;Object(r["a"])(this,n);for(var a=arguments.length,c=new Array(a),o=0;o<a;o++)c[o]=arguments[o];return t=e.call.apply(e,[this].concat(c)),t.state={isReady:!1},t}return Object(a["a"])(n,[{key:"componentDidMount",value:function(){this.setState({isReady:!0});var t=this.props.dispatch;t&&t({type:"user/fetchCurrent"})}},{key:"render",value:function(){var t=this.state.isReady,e=this.props,n=e.children,r=e.loading,a=e.currentUser,c=a&&a.token,o=Object(p["stringify"])({redirect:window.location.href});return!c&&r||!t?s.a.createElement(u["a"],null):c||"/account/login"===window.location.pathname?n:s.a.createElement(l["c"],{to:"/account/login?".concat(o)})}}]),n}(s.a.Component);e["default"]=Object(d["d"])((function(t){var e=t.user,n=t.loading;return{currentUser:e.currentUser,loading:n.models.user}}))(h)}}]);