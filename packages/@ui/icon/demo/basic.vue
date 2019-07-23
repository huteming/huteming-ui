<template>
<div class="page-example">
    <div class="group" v-for="item in icons" :key="item.icon">
        <TmIcon class="group-icon" :icon="item.icon" :class="item.class" />
        <div class="group-text">{{ item.icon }}</div>
    </div>
</div>
</template>

<script>
import TmIcon from '../index'

export default {
    data () {
        return {
            icons: [
                {
                    icon: 'arrow_forward',
                },
                {
                    icon: 'play',
                },
                {
                    icon: 'clear',
                },
                {
                    icon: 'loading',
                },
                {
                    icon: 'qrcode',
                },
            ],
        }
    },

    components: {
        TmIcon,
    },
}
</script>

<style lang="scss" scoped>
.page-example {
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: 20px 0;
}

.group {
    margin-bottom: 15px;
    flex: 0 0 (100% / 3);
    text-align: center;

    &-icon {
        font-size: 32px;
    }

    &-text {
        margin-top: 10px;
    }
}
</style>
