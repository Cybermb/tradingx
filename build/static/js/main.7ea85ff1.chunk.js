(this.webpackJsonptradingx=this.webpackJsonptradingx||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},16:function(e,t,n){},17:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(8),i=n.n(c),o=(n(13),n(14),n(6)),u=n(1),s=n.n(u),l=n(5),m=n(2),p="https://try.readme.io/https://api-pub.bitfinex.com/v2/",f="candles/trade:1m:tXRPUSD/hist";function h(){return(h=Object(l.a)(s.a.mark((function e(){var t,n,a,r,c,i=arguments;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=i.length>0&&void 0!==i[0]?i[0]:100,n="limit=".concat(t,"&sort=-1"),e.prev=2,e.next=5,fetch("".concat(p,"/").concat(f,"?").concat(n));case 5:return a=e.sent,e.next=8,a.json();case 8:return r=e.sent,c=Object(o.a)(r.map((function(e){var t=Object(m.a)(e,6);return{timestamp:t[0],open:t[1],close:t[2],high:t[3],low:t[4],volume:t[5]}}))),e.abrupt("return",c);case 13:e.prev=13,e.t0=e.catch(2),console.log(e.t0);case 16:return e.abrupt("return",[]);case 17:case"end":return e.stop()}}),e,null,[[2,13]])})))).apply(this,arguments)}var d=function(){return h.apply(this,arguments)},v=function(e){e.data;var t=r.a.useState([]),n=Object(m.a)(t,2),a=n[0],c=n[1],i=r.a.useState(!0),u=Object(m.a)(i,2),p=(u[0],u[1],r.a.useState({max:0,min:0,margin:10})),f=Object(m.a)(p,2),h=f[0],v=f[1],b=function(){var e=Object(l.a)(s.a.mark((function e(){var t,n,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d();case 2:t=e.sent,n=0,a=0,t.forEach((function(e){e.high>n&&(n=e.high),e.low>a&&(a=e.low)})),c(t),v({max:n,min:a,margin:n-a}),console.log("margin:",n-a);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return r.a.useEffect((function(){b()}),[]),r.a.createElement("div",{className:"c1ltezqz"},r.a.createElement("div",{className:"c1f0j0e2"},a.map((function(e,t){return r.a.createElement(g,{key:"candle".concat(t),candleData:e,candleViewData:h})}))),r.a.createElement("div",{className:"c17eezq4"},function(e){var t=e.max,n=e.min;return Object(o.a)(Array.from(Array(10).keys()).map((function(e,a){return Number((t-n)*a/10+n).toFixed(4)})))}(h).map((function(e,t){return r.a.createElement("div",{key:"value".concat(t)},e)}))))},g=function(e){var t=e.candleData,n=e.candleViewData,a=t.high,c=t.low,i=t.open,o=t.close,u=n.max,s=(n.min,n.margin),l=(a-c)/s*100,m=i<=o,p=m?"#0f0":"#f00",f=(u-a)/s*100,h=(i-o)/s*(m?-100:100),d=(m?a-o:a-i)/s*100;return r.a.createElement("div",{className:"c1e58sbq",style:{height:l,top:f}},r.a.createElement("div",{className:"c11pi6hg",style:{height:h,backgroundColor:p,top:d}}),r.a.createElement("div",{className:"ckuhspx",style:{backgroundColor:p}}))};n(16);var b=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(v,null))},E=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,18)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;n(e),a(e),r(e),c(e),i(e)}))};i.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(b,null)),document.getElementById("root")),E()}},[[17,1,2]]]);
//# sourceMappingURL=main.7ea85ff1.chunk.js.map