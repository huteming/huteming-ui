<template>
<div class="page-demo">
    <h1>倒计时结束</h1>

    <tm-clocker :start-time="maps[1].start" :end-time="maps[1].end" @end="handleEnd">
        <template slot-scope="scope">
            <div>{{ scope.days }}</div>
            <div>{{ scope.hours }}</div>
            <div>{{ scope.minutes }}</div>
            <div>{{ scope.seconds }}</div>
            <div>{{ scope.milliseconds }}</div>
        </template>
    </tm-clocker>

    <h2>持续进行</h2>

    <tm-clocker :start-time="maps[0].start" :end-time="maps[0].end">
        <template slot-scope="scope">
            <div>{{ scope.days }}</div>
            <div>{{ scope.hours }}</div>
            <div>{{ scope.minutes }}</div>
            <div>{{ scope.seconds }}</div>
            <div>{{ scope.milliseconds }}</div>
        </template>
    </tm-clocker>

    <h2>已结束</h2>

    <tm-clocker :start-time="maps[2].start" :end-time="maps[2].end">
        <template slot-scope="scope">
            <div>{{ scope.days }}</div>
            <div>{{ scope.hours }}</div>
            <div>{{ scope.minutes }}</div>
            <div>{{ scope.seconds }}</div>
            <div>{{ scope.milliseconds }}</div>
        </template>
    </tm-clocker>
</div>
</template>

<script>
export default {
    data () {
        return {
            maps: [
                { start: '2017-06-15 20:53:25', end: '2018-07-18 21:54:35' },
                { start: '2018-07-18 21:54:30', end: '2018-07-18 21:54:35' }, // 5s 结束
                { start: '2018-07-18 21:54:30', end: '2018-07-16 21:54:35' }, // 已结束
                { start: '', end: '' },
                { start: '2018-07-18 21:54:30', end: '' },
                { start: '', end: '2018-07-16 21:54:35' },
                { start: undefined, end: undefined }
            ],
            activeIndex: 1
        }
    },

    methods: {
        handleEnd () {
            alert('end')
        },
        handleReset () {
            const save = this.activeIndex
            this.activeIndex = 100
            this.$nextTick(() => {
                this.activeIndex = save
            })
        }
    },

    mounted () {
        setTimeout(() => {
            // this.activeIndex = 0
        }, 1500)
    },
}
</script>
