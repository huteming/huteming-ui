(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d230bf8"],{ee35:function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"page-demo"},[e("demo-cell",{attrs:{body:"loading"}},[e("tm-switch",{model:{value:t.loading,callback:function(n){t.loading=n},expression:"loading"}})],1),e("demo-cell",{attrs:{body:"use background"}},[e("tm-switch",{model:{value:t.background,callback:function(n){t.background=n},expression:"background"}})],1),e("demo-cell",{attrs:{body:"use text"}},[e("tm-field",{attrs:{placeholder:"请输入"},model:{value:t.text,callback:function(n){t.text=n},expression:"text"}})],1),e("demo-divider",[t._v("分隔线")]),e("div",{directives:[{name:"loading",rawName:"v-loading",value:{loading:t.loading,text:t.text,background:t.backgroundStr,duration:t.duration,openAnimation:!0,closeAnimation:!0},expression:"{ loading, text, background: backgroundStr, duration, openAnimation: true, closeAnimation: true }"}],staticStyle:{position:"relative"}},t._l(t.count,(function(n){return e("h1",{key:n},[t._v("hello world")])})),0)],1)},a=[],i=e("a831"),d={data:function(){return{loading:!0,text:"",background:!1,duration:1e3,count:1}},computed:{backgroundStr:function(){return this.background?"#000":""}},mounted:function(){},directives:{Loading:i["a"]}},l=d,r=e("2877"),c=Object(r["a"])(l,o,a,!1,null,null,null);n["default"]=c.exports}}]);