(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e8e0c"],{"8ac0":function(n,t,o){"use strict";o.r(t);var c=function(){var n=this,t=n.$createElement,o=n._self._c||t;return o("div",{staticClass:"page-demo"},[o("button",{on:{click:n.handle1}},[n._v("normal")]),o("button",{on:{click:n.handle2}},[n._v("timeout 1s")]),o("button",{on:{click:n.handle5}},[n._v("vnode")]),o("button",{on:{click:n.handlePosition}},[n._v("位置")]),o("button",{on:{click:n.handle7}},[n._v("长文字")]),o("button",{on:{click:n.handle3}},[n._v(n._s(n.instance?"关闭":"打开"))]),o("button",{on:{click:n.handleSuccess}},[n._v("success")]),o("button",{on:{click:n.handleError}},[n._v("error")]),o("button",{on:{click:n.handleWarning}},[n._v("warning")]),o("button",{on:{click:n.handleLoading}},[n._v("loading")])])},e=[],a=o("91c1"),i={data:function(){return{instance:null}},methods:{handleSuccess:function(){a["a"].success("success",0)},handleError:function(){a["a"].error("error",0)},handleWarning:function(){a["a"].warning("success",0)},handleLoading:function(){var n=a["a"].loading();setTimeout((function(){n.close()}),2e3)},handle1:function(){Object(a["a"])("hello normal")},handle2:function(){Object(a["a"])("timeout 1s",1e3)},handle3:function(){this.instance?(this.instance.close(),this.instance=null):this.instance=Object(a["a"])("这个需要手动关闭",0,{onClose:function(){console.log("close")}})},handle5:function(){Object(a["a"])("<strong>这是 <i>HTML</i> 片段</strong>")},handle7:function(){Object(a["a"])("很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字")},handlePosition:function(){Object(a["a"])("提示信息",{position:"top"})}}},l=i,s=o("2877"),u=Object(s["a"])(l,c,e,!1,null,null,null);t["default"]=u.exports}}]);