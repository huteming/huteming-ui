<template>
<div class="tm-panel">
    <div class="tm-panel-image">
        <img :src="image" alt="" class="tm-panel-image-img">
        <slot name="image-extra"></slot>
    </div>

    <div class="tm-panel-title">
        <slot name="title">{{ title }}</slot>
    </div>

    <div class="tm-panel-description" :class="{ 'is-custom': $slots.description }">
        <div class="tm-panel-description-text" v-if="!$slots.description">{{ description }}</div>

        <div class="tm-panel-description-imgs" v-else>
            <slot name="description"></slot>
        </div>
    </div>

    <div class="tm-panel-tip">{{ tip }}</div>

    <div class="tm-panel-decoration">{{ decoration }}</div>

    <div class="tm-panel-btn">
        <slot name="btn">{{ btn }}</slot>
    </div>

    <div class="tm-panel-extra" v-if="$slots.extra">
        <slot name="extra"></slot>
    </div>
</div>
</template>

<script>
export default {
    name: 'TmPanel',

    props: {
        image: String,
        title: String,
        description: String,
        tip: String,
        decoration: String,
        btn: String,
    },

    computed: {
    },
}
</script>
