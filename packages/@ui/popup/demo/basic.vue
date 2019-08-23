<template>
<div class="page">
    <!-- middle -->
    <div style="height: 20px;"></div>
    <button @click="visibleDefault = !visibleDefault">default</button>

    <tm-popup v-model="visibleDefault" class="default">
        <div>popup</div>
        <p>/ ˈpɑpˌʌp /</p>
        <p>n. 弹出式; [棒]内野飞球; 自动起跳式装置</p>
        <p>adj. 弹起的; 有自动起跳装置的</p>
    </tm-popup>

    <!-- top -->
    <div style="height: 20px;"></div>
    <button @click="visibleTop = !visibleTop">top</button>

    <tm-popup v-model="visibleTop" class="top" position="top">
        <div>更新成功</div>
    </tm-popup>

    <!-- bottom -->
    <div style="height: 20px;"></div>
    <button @click="visibleBottom = !visibleBottom">bottom</button>

    <tm-popup class="bottom bg-white" v-model="visibleBottom" position="bottom" close-on-move>
        <button type="primary" @click="visibleBottom = !visibleBottom">close</button>
    </tm-popup>

    <!-- left -->
    <div style="height: 20px;"></div>
    <button @click="visibleLeft = !visibleLeft">left</button>

    <tm-popup class="left bg-white" v-model="visibleLeft" position="left">
        <button type="primary" @click="visibleLeft = !visibleLeft">close</button>

        <div style="height: 200vh;">empty</div>
    </tm-popup>

    <!-- right -->
    <div style="height: 20px;"></div>
    <button @click="visibleRight = !visibleRight">right</button>

    <tm-popup class="right bg-white" v-model="visibleRight" position="right">
        <button type="primary" @click="visibleRight = !visibleRight">close</button>
    </tm-popup>

    <!-- event -->
    <div style="height: 20px;"></div>
    <button @click="visibleEvent = !visibleEvent">event</button>

    <tm-popup class="event bg-white" v-model="visibleEvent" position="right" @open="handleOpen" @close="handleClose" @closed="handleClosed" :before-close="handleBeforeClose">
        <button type="primary" @click="visibleEvent = !visibleEvent">close</button>
    </tm-popup>

    <div style="height: 100vh;">empty</div>
</div>
</template>

<script>
import Popup from '../index'

export default {
    data () {
        return {
            visibleDefault: false,
            visibleBottom: false,
            visibleTop: false,
            visibleLeft: false,
            visibleRight: false,
            visibleEvent: false
        }
    },

    computed: {
    },

    methods: {
        handleBeforeClose (done) {
            console.log('close 1.5s later')
            setTimeout(done, 1500)
        },
        handleOpen () {
            console.log('open')
        },
        handleClose () {
            console.log('close')
        },
        handleClosed () {
            console.log('closed')
        }
    },

    components: {
        TmPopup: Popup,
    },
}
</script>

<style lang="scss" scoped>
.bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 200px;
}

.default {
    div {
        font-size: 20px;
        color: #26a2ff;
        font-weight: 400;
        line-height: 2;
    }

    p {
        margin-bottom: 10px;
    }
}

.image {
    display: block;
    width: 100%;
    border: none;
    height: 200px;
}

.bg-white {
    background: #fff;
}
</style>
