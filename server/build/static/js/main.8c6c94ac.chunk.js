(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{40:function(e,t,n){e.exports=n(75)},45:function(e,t,n){},48:function(e,t,n){},71:function(e,t){},75:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(36),i=n.n(a),c=(n(45),n(22)),s=n.n(c),l=n(14),u=n(37),p=n(38),d=n(4),h=n(5),m=n(7),v=n(6),f=n(15),k=n(8),x=(n(48),n(39)),y=n.n(x),b=n(1),C=n.n(b),j=function(e){function t(){var e,n;Object(d.a)(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(n=Object(m.a)(this,(e=Object(v.a)(t)).call.apply(e,[this].concat(r)))).handlePixelClick=function(e,t){var o=""===n.props.matrix[e][t]?n.props.color:"";n.props.onChange(e,t,o)},n.handlePointerMove=function(e){var t=e.currentTarget.getBoundingClientRect(),o=Math.round((e.clientX-t.left)/t.width*100),r=Math.round((e.clientY-t.top)/t.height*100);n.props.onPointerMove(o,r)},n}return Object(k.a)(t,e),Object(h.a)(t,[{key:"shouldComponentUpdate",value:function(e,t){return e.color!==this.props.color||!C.a.isEqual(e.matrix,this.props.matrix)||!C.a.isEqual(e.pointerFriends,this.props.pointerFriends)}},{key:"render",value:function(){var e=this,t=this.props.matrix||[],n=this.props.pointerFriends;return r.a.createElement("section",{className:"pixel-canvas",onPointerMove:this.handlePointerMove},r.a.createElement("div",{className:"canvas-rows"},t.map(function(t,n){return r.a.createElement("div",{className:"canvas-row",key:n},t.map(function(t,o){return r.a.createElement(w,{color:t,onClick:function(){return e.handlePixelClick(n,o)},key:t+o})}))})),r.a.createElement("div",{className:"pointer-friends"},C.a.map(n,function(e,t){var n={left:e.xPercent+"%",top:e.yPercent+"%",backgroundColor:e.color};return r.a.createElement("div",{className:"pointer-friend",style:n,key:t})})))}}]),t}(r.a.Component),w=function(e){function t(){return Object(d.a)(this,t),Object(m.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(k.a)(t,e),Object(h.a)(t,[{key:"shouldComponentUpdate",value:function(e){return e.color!==this.props.color}},{key:"render",value:function(){var e=this.props,t=e.color,n=e.onClick;return r.a.createElement("div",{className:"pixel",style:{backgroundColor:t,borderColor:t},onClick:n})}}]),t}(r.a.Component),O="https://draw-collab.herokuapp.com/",P=function(e){function t(){var e;return Object(d.a)(this,t),(e=Object(m.a)(this,Object(v.a)(t).call(this))).setUpSocket=Object(p.a)(s.a.mark(function t(){return s.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:e.socket=y.a.connect(O),e.socket.on("init",function(t){var n=t.sessionKey,o=t.color,r=t.canvas,a=t.pointers;e.sessionKey=n,e.color=o,e.setState({matrix:r.matrix,pointerFriends:a})}),e.socket.on("canvas",function(t){e.setState({matrix:t.matrix})}),e.socket.on("pixel",function(t){var n=t.r,o=t.c,r=t.value;e.setState(function(e){var t=C.a.cloneDeep(e.matrix);return t[n][o]=r,{matrix:t}})}),e.socket.on("pointer",function(t){var n=t.sessionKey,o=t.color,r=t.xPercent,a=t.yPercent;e.setState(function(e){return{pointerFriends:Object(u.a)({},e.pointerFriends,Object(l.a)({},n,{xPercent:r,yPercent:a,color:o}))}})}),e.socket.on("userDisconnected",function(t){var n=t.sessionKey;e.setState(function(e){return{pointerFriends:C.a.omit(e.pointerFriends,n)}})}),e.state.loaded=!0;case 7:case"end":return t.stop()}},t)})),e.handlePixelChange=function(t,n,o){e.socket.emit("pixel",{r:t,c:n,value:o})},e.handlePointerMove=function(t,n){var o=Object(f.a)(e).sessionKey;e.socket.emit("pointer",{sessionKey:o,xPercent:t,yPercent:n})},e.clearCanvas=function(){e.socket.emit("clear")},e.state={matrix:null,pointerFriends:{},loaded:!1},e}return Object(k.a)(t,e),Object(h.a)(t,[{key:"componentDidMount",value:function(){this.setUpSocket()}},{key:"componentWillUnmount",value:function(){this.socket.disconnect()}},{key:"shouldComponentUpdate",value:function(e,t){return!C.a.isEqual(t.matrix,this.state.matrix)||!C.a.isEqual(t.pointerFriends,this.state.pointerFriends)}},{key:"render",value:function(){return this.state.loaded?r.a.createElement("main",{className:"App"},r.a.createElement(j,{matrix:this.state.matrix,color:this.color,onChange:this.handlePixelChange,onPointerMove:this.handlePointerMove,pointerFriends:this.state.pointerFriends}),r.a.createElement("button",{onClick:this.clearCanvas},"Clear")):r.a.createElement("p",null,"loading...")}}]),t}(o.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(P,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[40,1,2]]]);
//# sourceMappingURL=main.8c6c94ac.chunk.js.map