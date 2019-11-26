<template>
<div class="tm-video-player-controls" :class="classes" @click.stop="handleClick">
    <div class="tm-video-player__text" v-if="text">{{ text }}</div>

    <div class="tm-video-player__icon">
        <TmIcon :icon="icon" />
    </div>
</div>
</template>

<script>
import TmIcon from 'web-ui/icon/index'

export default {
    props: {
        icon: String,
        text: String,
        circle: Boolean,
        handleClick: Function,
        classes: {},
    },

    components: {
        TmIcon,
    },
}
</script>
