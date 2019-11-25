<template>
<div class="phone">
    <iframe class="phone-page" frameborder="0" :src="examplePath">
    </iframe>

    <!-- <el-scrollbar class="phone-page" :wrap-class="$style['container-scrollable']">
        <router-view name="example"></router-view>
    </el-scrollbar> -->
</div>
</template>

<script>
export default {
    name: 'phone',

    computed: {
        examplePath () {
            const { origin, pathname } = location
            const { path } = this.$route.meta

            return `${origin}${pathname}#/example/${path}`
        }
    }
}
</script>

<style lang="scss" scoped>
.phone {
    position: fixed;
    top: 130px;
    right: calc((100vw - 1680px) / 2);
    width: 375px;
    height: 667px;
    // margin-left: 20px;
    // padding: 100px 15px;
    // background-image: url('~@/assets/images/phone.png');
    // background-repeat: no-repeat;
    // background-size: 100%;
    border-radius: 6px;
    box-shadow: #ebedf0 0 4px 12px;
    box-sizing: border-box;
    overflow: hidden;

    &-page {
        width: 100%;
        height: 667px;
        background-color: #fff;
    }
}
</style>
