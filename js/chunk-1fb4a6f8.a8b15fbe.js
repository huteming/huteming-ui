(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1fb4a6f8"],{c22d:function(e,a,t){},c5d6:function(e,a,t){"use strict";var i=t("c22d"),d=t.n(i);d.a},dce4:function(e,a,t){"use strict";t.r(a);var i=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"page-example page-demo"},[t("button",{on:{click:function(a){e.disabled=!e.disabled}}},[e._v("toggle disabled: "+e._s(e.disabled))]),t("TmImage",{directives:[{name:"image-picker",rawName:"v-image-picker",value:{onload:e.handleLoad,disabled:e.disabled},expression:"{ onload: handleLoad, disabled: disabled }"}],staticStyle:{width:"100px",height:"100px",margin:"0 auto"},attrs:{src:e.image,hold:""}})],1)},d=[],n=t("284c"),s={data:function(){return{image:"",imageCompressed:"",images:[],disabled:!1}},computed:{max:function(){return 4-this.images.length}},mounted:function(){},methods:{handleLoad:function(e){this.image=e},handleLoadMultiple:function(e){var a;(a=this.images).push.apply(a,Object(n["a"])(e))},handleImageLoad:function(){var e=getComputedStyle(this.$refs.image),a=e.width,t=e.height;alert(a),alert(t)}}},l=s,o=(t("c5d6"),t("2877")),c=Object(o["a"])(l,i,d,!1,null,"5b272296",null);a["default"]=c.exports}}]);