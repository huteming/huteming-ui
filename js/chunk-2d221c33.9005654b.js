(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d221c33"],{cc74:function(s,C,E){"use strict";E.r(C);var t=function(){var s=this,C=s.$createElement;s._self._c;return s._m(0)},a=[function(){var s=this,C=s.$createElement,E=s._self._c||C;return E("section",{domProps:{innerHTML:s._s(s.content)}})}],n=(E("4160"),E("fb6a"),E("159b"),{created:function(){this.content=unescape("%3Cdiv%20class%3D%22card%22%3E%3Ch3%20id%3D%22yin-ru%22%3E%u5F15%u5165%3C/h3%3E%0A%3Cpre%3E%3Ccode%20class%3D%22language-js%22%3E%3Cspan%20class%3D%22hljs-keyword%22%3Eimport%3C/span%3E%20%7B%20Clocker%20%7D%20%3Cspan%20class%3D%22hljs-keyword%22%3Efrom%3C/span%3E%20%3Cspan%20class%3D%22hljs-string%22%3E%27@huteming/ui%27%3C/span%3E%0A%0AVue.use%28Clocker%29%0A%3Cspan%20class%3D%22hljs-comment%22%3E//%20Vue.component%28Clocker.name%2C%20Clocker%29%3C/span%3E%0A%3C/code%3E%3C/pre%3E%0A%3C/div%3E%3Cdiv%20class%3D%22card%22%3E%3Ch3%20id%3D%22li-zi%22%3E%u4F8B%u5B50%3C/h3%3E%0A%3Cpre%3E%3Ccode%20class%3D%22language-html%22%3E%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B%3Cspan%20class%3D%22hljs-name%22%3Etm-clocker%3C/span%3E%20%3Cspan%20class%3D%22hljs-attr%22%3E%3Astart-time%3C/span%3E%3D%3Cspan%20class%3D%22hljs-string%22%3E%22start%22%3C/span%3E%20%3Cspan%20class%3D%22hljs-attr%22%3E%3Aend-time%3C/span%3E%3D%3Cspan%20class%3D%22hljs-string%22%3E%22end%22%3C/span%3E%20@%3Cspan%20class%3D%22hljs-attr%22%3Eend%3C/span%3E%3D%3Cspan%20class%3D%22hljs-string%22%3E%22handleEnd%22%3C/span%3E%26gt%3B%3C/span%3E%0A%20%20%20%20%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B%3Cspan%20class%3D%22hljs-name%22%3Etemplate%3C/span%3E%20%3Cspan%20class%3D%22hljs-attr%22%3Eslot-scope%3C/span%3E%3D%3Cspan%20class%3D%22hljs-string%22%3E%22scope%22%3C/span%3E%26gt%3B%3C/span%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%7B%7B%20scope.whole%20%7D%7D%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B/%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%7B%7B%20scope.total%20%7D%7D%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B/%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%7B%7B%20scope.days%20%7D%7D%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B/%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%7B%7B%20scope.hours%20%7D%7D%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B/%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%7B%7B%20scope.minutes%20%7D%7D%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B/%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%0A%20%20%20%20%20%20%20%20%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%7B%7B%20scope.seconds%20%7D%7D%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B/%3Cspan%20class%3D%22hljs-name%22%3Ediv%3C/span%3E%26gt%3B%3C/span%3E%0A%20%20%20%20%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B/%3Cspan%20class%3D%22hljs-name%22%3Etemplate%3C/span%3E%26gt%3B%3C/span%3E%0A%3Cspan%20class%3D%22hljs-tag%22%3E%26lt%3B/%3Cspan%20class%3D%22hljs-name%22%3Etm-clocker%3C/span%3E%26gt%3B%3C/span%3E%0A%3C/code%3E%3C/pre%3E%0A%3C/div%3E%3Ch2%20id%3D%22api%22%3EAPI%3C/h2%3E%0A%3Cdiv%20class%3D%22card%22%3E%3Ch3%20id%3D%22props%22%3EProps%3C/h3%3E%0A%3Ctable%3E%0A%3Cthead%3E%0A%3Ctr%3E%0A%3Cth%3E%u53C2%u6570%3C/th%3E%0A%3Cth%3E%u8BF4%u660E%3C/th%3E%0A%3Cth%3E%u7C7B%u578B%3C/th%3E%0A%3Cth%3E%u53EF%u9009%u503C%3C/th%3E%0A%3Cth%3E%u9ED8%u8BA4%u503C%3C/th%3E%0A%3C/tr%3E%0A%3C/thead%3E%0A%3Ctbody%3E%0A%3Ctr%3E%0A%3Ctd%3EstartTime%3C/td%3E%0A%3Ctd%3E%u5F00%u59CB%u65F6%u95F4%3C/td%3E%0A%3Ctd%3EString%2C%20Number%2C%20Date%3C/td%3E%0A%3Ctd%3E%3C/td%3E%0A%3Ctd%3E%3Ccode%3Enow%3C/code%3E%3C/td%3E%0A%3C/tr%3E%0A%3Ctr%3E%0A%3Ctd%3EendTime%3C/td%3E%0A%3Ctd%3E%u7ED3%u675F%u65F6%u95F4%3C/td%3E%0A%3Ctd%3EString%2C%20Number%2C%20Date%3C/td%3E%0A%3Ctd%3E%3C/td%3E%0A%3Ctd%3E%3Ccode%3Enow%3C/code%3E%3C/td%3E%0A%3C/tr%3E%0A%3C/tbody%3E%0A%3C/table%3E%0A%3C/div%3E%3Cdiv%20class%3D%22card%22%3E%3Ch3%20id%3D%22slot-dui-xiang-can-shu%22%3Eslot%20%u5BF9%u8C61%u53C2%u6570%3C/h3%3E%0A%3Ctable%3E%0A%3Cthead%3E%0A%3Ctr%3E%0A%3Cth%3E%u53C2%u6570%3C/th%3E%0A%3Cth%3E%u8BF4%u660E%3C/th%3E%0A%3Cth%3E%u7C7B%u578B%3C/th%3E%0A%3Cth%3E%u53EF%u9009%u503C%3C/th%3E%0A%3Cth%3E%u9ED8%u8BA4%u503C%3C/th%3E%0A%3C/tr%3E%0A%3C/thead%3E%0A%3Ctbody%3E%0A%3Ctr%3E%0A%3Ctd%3Edays%3C/td%3E%0A%3Ctd%3E%u5269%u4F59%u5929%u6570%3C/td%3E%0A%3Ctd%3ENumber%3C/td%3E%0A%3Ctd%3E%3C/td%3E%0A%3Ctd%3E%3C/td%3E%0A%3C/tr%3E%0A%3Ctr%3E%0A%3Ctd%3Ehours%3C/td%3E%0A%3Ctd%3E%u5269%u4F59%u5C0F%u65F6%uFF0C24%u5C0F%u65F6%u4EE5%u5185%3C/td%3E%0A%3Ctd%3ENumber%3C/td%3E%0A%3Ctd%3E%3C/td%3E%0A%3Ctd%3E%3C/td%3E%0A%3C/tr%3E%0A%3Ctr%3E%0A%3Ctd%3Eminutes%3C/td%3E%0A%3Ctd%3E%u5269%u4F59%u5206%u949F%uFF0C60%u5206%u949F%u4EE5%u5185%3C/td%3E%0A%3Ctd%3ENumber%3C/td%3E%0A%3Ctd%3E%3C/td%3E%0A%3Ctd%3E%3C/td%3E%0A%3C/tr%3E%0A%3Ctr%3E%0A%3Ctd%3Eseconds%3C/td%3E%0A%3Ctd%3E%u5269%u4F59%u79D2%uFF0C60%u79D2%u4EE5%u5185%3C/td%3E%0A%3Ctd%3ENumber%3C/td%3E%0A%3Ctd%3E-%3C/td%3E%0A%3Ctd%3E-%3C/td%3E%0A%3C/tr%3E%0A%3Ctr%3E%0A%3Ctd%3Emilliseconds%3C/td%3E%0A%3Ctd%3E%u5269%u4F59%u603B%u6BEB%u79D2%3C/td%3E%0A%3Ctd%3ENumber%3C/td%3E%0A%3Ctd%3E-%3C/td%3E%0A%3Ctd%3E-%3C/td%3E%0A%3C/tr%3E%0A%3C/tbody%3E%0A%3C/table%3E%0A%3C/div%3E%3Cdiv%20class%3D%22card%22%3E%3Ch3%20id%3D%22events%22%3EEvents%3C/h3%3E%0A%3Ctable%3E%0A%3Cthead%3E%0A%3Ctr%3E%0A%3Cth%3Ename%3C/th%3E%0A%3Cth%3E%u8BF4%u660E%3C/th%3E%0A%3Cth%3E%u53C2%u6570%3C/th%3E%0A%3C/tr%3E%0A%3C/thead%3E%0A%3Ctbody%3E%0A%3Ctr%3E%0A%3Ctd%3Eend%3C/td%3E%0A%3Ctd%3E%u5012%u8BA1%u65F6%u7ED3%u675F%3C/td%3E%0A%3Ctd%3E%3C/td%3E%0A%3C/tr%3E%0A%3C/tbody%3E%0A%3C/table%3E%0A%3C/div%3E")},mounted:function(){var s=this,C=[].slice.call(this.$el.querySelectorAll("h2, h3, h4, h5"));C.forEach((function(C){C.addEventListener("click",s.scrollToAnchor)}))},methods:{scrollToAnchor:function(s){s.target.id&&this.$router.push({path:this.$route.path,hash:s.target.id})}}}),l=n,d=E("2877"),e=Object(d["a"])(l,t,a,!1,null,null,null);C["default"]=e.exports}}]);