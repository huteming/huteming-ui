(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2cdb85c8"],{"51fa":function(e,n,t){"use strict";t.r(n);var a=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"demo"},[t("button",{on:{click:function(n){return e.$refs.field.focus()}}},[e._v("click to focus")]),t("div",{staticClass:"demo-header"},[e._v("表单")]),t("demo-cell",{attrs:{title:"qq"}},[t("TmField",{ref:"field",attrs:{placeholder:"请输入qq号"},on:{focus:function(n){return e.handleLog("force")},blur:function(n){return e.handleLog("blur")},change:function(n){return e.handleLog("change")}},model:{value:e.value1,callback:function(n){e.value1=n},expression:"value1"}})],1),t("div",{staticClass:"demo-header"},[e._v("文本域")]),t("demo-cell",[t("TmField",{attrs:{type:"textarea",rows:"3",placeholder:"请输入文本"},on:{focus:function(n){return e.handleLog("force")},blur:function(n){return e.handleLog("blur")},change:e.handleLog},model:{value:e.value2,callback:function(n){e.value2=n},expression:"value2"}})],1)],1)},o=[],c=(t("99af"),t("c975"),t("d3b7"),t("96cf"),{data:function(){return{value1:"",value2:"",visible:!1}},watch:{value1:function(e){console.log("watch",e,e.indexOf("\n"))},value2:function(e){console.log("watch",e,e.indexOf("\n"))},visible:function(e){return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:if(!e){n.next=4;break}return n.next=3,regeneratorRuntime.awrap(this.$nextTick());case 3:this.$refs.field.focus();case 4:case"end":return n.stop()}}),null,this)}},mounted:function(){},methods:{handleBlur:function(){},handleSubmit:function(){this.$message("hello")},handleLog:function(e){for(var n,t=arguments.length,a=new Array(t>1?t-1:0),o=1;o<t;o++)a[o-1]=arguments[o];(n=console).log.apply(n,[e].concat(a))}}}),l=c,u=(t("d03e"),t("2877")),r=Object(u["a"])(l,a,o,!1,null,"28e15b60",null);n["default"]=r.exports},9360:function(e,n,t){},d03e:function(e,n,t){"use strict";var a=t("9360"),o=t.n(a);o.a}}]);