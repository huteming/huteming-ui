<template>
<div class="tm-cell">
    <div class="tm-cell__hd" v-if="title || $slots.title">
        <slot name="title">{{ title }}</slot>
    </div>

    <div class="tm-cell__bd" v-if="description || $slots.default">
        <slot>{{ description }}</slot>
    </div>

    <div class="tm-cell__ft" v-if="tip || $slots.tip">
        <slot name="tip"></slot>
    </div>

    <div class="tm-cell__link" v-if="link"></div>
</div>
</template>

<script>
export default {
    name: 'TmCell',

    props: {
        title: String,
        description: String,
        tip: String,
        link: Boolean,
    },
}
</script>
