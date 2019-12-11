<template>
<div class="page-demo page-example">
    <div class="group" v-for="item in icons" :key="item.icon">
        <TmIcon class="group-icon" :icon="item.icon" :class="item.class" />
        <div class="group-text">{{ item.icon }}</div>
    </div>
</div>
</template>

<script>
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
                    icon: 'play_circle_outline',
                },
                {
                    icon: 'pause',
                },
                {
                    icon: 'pause_circle_outline',
                },
                {
                    icon: 'skip_next',
                },
                {
                    icon: 'skip_previous',
                },
                {
                    icon: 'playlist_play',
                },
                {
                    icon: 'replay',
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
                {
                    icon: 'expand_less',
                },
                {
                    icon: 'expand_more',
                },
                {
                    icon: 'volume_up',
                },
                {
                    icon: 'edit',
                },
                {
                    icon: 'thumb_up',
                },
                {
                    icon: 'dehaze',
                },
                {
                    icon: 'lock',
                },
                {
                    icon: 'lock_open',
                },
                {
                    icon: 'menu',
                },
                {
                    icon: 'fast_forward',
                },
                {
                    icon: 'fast_rewind',
                },
            ],
        }
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
