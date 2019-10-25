<template>
<section class="page">
    <div>
        <tm-turntable
            :initial="initial"
            :board="board"
            :pointer="pointer"
            :ranges="ranges"
            @end="handleEnd"
            @click-pointer="handlePointerClick"
            :disabled="disabled"
            ref="turn">
        </tm-turntable>
    </div>
    <button @click="handleClick">start</button>
    <button @click="stop">end</button>
    <button @click="mockerror">测试异常</button>
    <!-- <div style="height: 300px;">
        <tm-turntable
            :initial="initial"
            :board="board"
            :pointer="pointer2"
            :ranges="ranges"
            @end="handleEnd"
            @click-pointer="handlePointerClick"
            :disabled="disabled"
            ref="turn"
            :style-pointer="{ width: '112px', height: '142px' }">
            <div class="demo">hello</div>
        </tm-turntable>
    </div>
    <div style="width: 300px;">
        <tm-turntable
            :initial="initial"
            :board="board"
            :pointer="pointer"
            :ranges="ranges"
            @end="handleEnd"
            @click-pointer="handlePointerClick"
            :disabled="disabled"
            ref="turn">
            <div class="demo">hello</div>
        </tm-turntable>
    </div> -->
</section>
</template>

<script>
import board from './images/board.png'
import pointer from './images/pointer.png'
import pointer2 from './images/pointer@2.png'

export default {
    data () {
        return {
            initial: 40,
            disabled: false,

            board,
            pointer,
            pointer2,
            ranges: [
                { value: 'a', angle: 15 },
                { value: '谢谢', angle: 30 },
                { value: '空1', angle: 30 },
                { value: '加油', angle: 30 },
                { value: '三', angle: 30 },
                { value: '运气', angle: 30 },
                { value: '空2', angle: 30 },
                { value: '再接再厉', angle: 30 },
                { value: 'er', angle: 30 },
                { value: 'zhu nin', angle: 30 },
                { value: 'kong', angle: 30 },
                { value: 'buyao', angle: 30 },
                { value: 'b', angle: 15 },
            ],
        }
    },

    watch: {
    },

    mounted () {
        setTimeout(() => {
            // this.initial = '加油'
        }, 1000)
    },

    methods: {
        handlePointerClick () {
            this.$refs.turn.start()
        },
        handleEnd (item) {
            console.log(item)
        },
        handleClick () {
            this.$refs.turn.start()
        },
        stop () {
            this.$refs.turn.stop()
        },
        mockerror () {
            this.$refs.turn.start()
            setTimeout(() => {
                this.$toast('异常啦')
                this.$refs.turn.reset()
            }, 2000)
        },
    },
}
</script>

<style lang="scss" scoped>
.demo {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
