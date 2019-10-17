<template>
<div class="demo-block">
    <div class="source">
        <slot name="source"></slot>
    </div>

    <div class="meta" ref="meta">
    </div>

    <div class="demo-block-control" ref="control">
        <el-tooltip effect="dark" content="显示代码" placement="top">
            <i class="el-icon-search" @click="isExpanded = true"></i>
        </el-tooltip>
    </div>

    <el-dialog title="提示" :visible.sync="isExpanded" @open="handleOpened">
        <div class="description" v-if="$slots.default" slot="title">
            <slot></slot>
        </div>

        <div class="highlight">
            <slot name="highlight"></slot>
        </div>
    </el-dialog>
</div>
</template>

<script>
import { stripScript, stripStyle, stripTemplate } from '@/assets/js/util'
import hljs from 'highlight.js'

export default {
    name: 'DemoBlock',

    data () {
        return {
            codepen: {
                script: '',
                html: '',
                style: ''
            },
            isExpanded: false,
        }
    },

    created () {
        const highlight = this.$slots.highlight
        if (highlight && highlight[0]) {
            let code = ''
            let cur = highlight[0]
            if (cur.tag === 'pre' && (cur.children && cur.children[0])) {
                cur = cur.children[0]
                if (cur.tag === 'code') {
                    code = cur.children[0].text
                }
            }
            if (code) {
                this.codepen.html = stripTemplate(code)
                this.codepen.script = stripScript(code)
                this.codepen.style = stripStyle(code)
            }
        }
    },

    mounted () {
    },

    methods: {
        async handleOpened () {
            await this.$nextTick()
            const blocks = document.querySelectorAll('pre code:not(.hljs)')
            Array.prototype.forEach.call(blocks, hljs.highlightBlock)
        },
    },
}
</script>

<style lang="scss">
.demo-block {
    background: #f7f7f7;
    border: solid 1px #ebebeb;
    border-radius: 3px;
    transition: .2s;

    &:hover {
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6), 0 2px 4px 0 rgba(232, 237, 250, .5);
    }
    code {
        font-family: Menlo, Monaco, Consolas, Courier, monospace;
    }
    .demo-button {
        float: right;
    }
    .source {
        background: #fff;
        width: 375px;
        margin: 24px auto;
    }
    .meta {
        background-color: #fafafa;
        border-top: solid 1px #eaeefb;
        overflow: hidden;
        height: 0;
        transition: height .2s;
    }
    .description {
        padding: 20px;
        box-sizing: border-box;
        border: solid 1px #ebebeb;
        border-radius: 3px;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        word-break: break-word;
        margin: 10px;
        background-color: #fff;
        p {
            margin: 0;
            line-height: 26px;
        }
        code {
            color: #5e6d82;
            background-color: #e6effb;
            margin: 0 4px;
            display: inline-block;
            padding: 1px 5px;
            font-size: 12px;
            border-radius: 3px;
            height: 18px;
            line-height: 18px;
        }
    }
    .highlight {
        pre {
            margin: 0;
        }
        code.hljs {
            margin: 0;
            border: none;
            max-height: none;
            border-radius: 0;
            &::before {
                content: none;
            }
        }
    }
    .demo-block-control {
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: solid 1px #eaeefb;
        height: 44px;
        box-sizing: border-box;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        text-align: center;
        margin-top: -1px;
        color: #d3dce6;
        position: relative;

        i {
            font-size: 16px;
            line-height: 44px;
            transition: .3s;
            cursor: pointer;
            &:hover {
                color: #409EFF;
            }
        }
    }
}
</style>
