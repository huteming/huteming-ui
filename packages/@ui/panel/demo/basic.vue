<template>
<div class="demo">
    <tm-divider>2019.9.2 改版</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论"
        decoration="￥99"
        btn="￥68">
        <tm-flex align="center" slot="extra">
            <tm-flex-item>
                <img src="http://jhsy-img.caizhu.com/fejhsy/images/v1.4.7/icon-v.png" alt="" style="width: .8rem; height: .24rem;">
            </tm-flex-item>
            <tm-flex-item>
                <span class="demo-price">￥0</span>
            </tm-flex-item>
        </tm-flex>

        <tm-flex class="demo-footer" slot="image-extra" align="center">
            <tm-flex-item>
                <img src="http://jhsy-img.caizhu.com/fejhsy/images/v1.4.7/icon-vf.png" alt="" style="display: block; width: .84rem; height: .32rem;">
            </tm-flex-item>

            <tm-flex-item :grow="1">
                <tm-flex align="center" justify="end">
                    <tm-flex-item>
                        <img src="http://jhsy-img.caizhu.com/fejhsy/images/v1.4.7/icon-u.png" alt="" style="display: block; width: .16rem; height: .16rem;">
                    </tm-flex-item>
                    <tm-flex-item class="demo-footer-text">
                        <span>13.3万</span>
                    </tm-flex-item>
                </tm-flex>
            </tm-flex-item>
        </tm-flex>
    </tm-panel>

    <tm-divider>多行省略</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论"
        description="极北咖啡CEO，GYL全球青年领导力创始人极北咖啡CEO，GYL全球青年领导力创始人"
        tip="加入学习"
        decoration="￥99"
        btn="￥2.99">
    </tm-panel>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论"
        description="极北咖啡CEO，GYL全球青年领导力创始人极北咖啡CEO，GYL全球青年领导力创始人"
        tip="加入学习"
        decoration="￥99"
        btn="￥2.99">
    </tm-panel>

    <tm-divider>title多行</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论张萌人生效率手册：时间管理课高效人生的法制，时间管理方法论"
        description="极北咖啡CEO"
        tip="加入学习"
        decoration="￥99"
        btn="￥2.99">
    </tm-panel>

    <tm-divider>description多行</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册"
        description="极北咖啡CEO，GYL全球青年领导力创始人极北咖啡CEO，GYL全球青年领导力创始人"
        tip="加入学习"
        decoration="￥99"
        btn="￥2.99">
    </tm-panel>

    <tm-divider>单行</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册"
        description="极北咖啡CEO"
        tip="加入学习"
        decoration="￥99"
        btn="￥2.99">
    </tm-panel>

    <tm-divider>description缺省</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制"
        tip="加入学习"
        decoration="￥99"
        btn="￥2.99">
    </tm-panel>

    <tm-divider>tip缺省</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制"
        decoration="￥99"
        btn="￥2.99">
    </tm-panel>

    <tm-divider>decoration缺省</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制"
        btn="￥2.99">
    </tm-panel>

    <tm-divider>btn缺省</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制">
    </tm-panel>

    <tm-divider>自定义title</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        tip="学习"
        decoration="￥99"
        btn="￥2.99">
        <div slot="title">
            <img src="./images/icon-listen.png" alt="" style="width: .66rem; height: .46rem; display: inline-block; vertical-align: middle">
            <span>张萌人生效率手册：时间管理课高效人生的法制</span>
        </div>
    </tm-panel>

    <tm-divider>自定义description</tm-divider>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制"
        tip="学习"
        decoration="￥99"
        btn="￥2.99">
        <img src="./images/icon-du.png" alt="" style="width: .86rem; height: .4rem;" slot="description">
        <img src="./images/icon-du.png" alt="" style="width: .86rem; height: .4rem;" slot="description">
        <img src="./images/icon-du.png" alt="" style="width: .86rem; height: .4rem;" slot="description">
        <img src="./images/icon-du.png" alt="" style="width: .86rem; height: .4rem;" slot="description">
        <img src="./images/icon-du.png" alt="" style="width: .86rem; height: .4rem;" slot="description">
        <img src="./images/icon-du.png" alt="" style="width: .86rem; height: .4rem;" slot="description">
        <img src="./images/icon-du.png" alt="" style="width: .86rem; height: .4rem;" slot="description">
    </tm-panel>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册：时间管理课高效人生的法制"
        tip="学习"
        decoration="￥99"
        btn="￥2.99">
        <img src="./images/icon-listen.png" alt="" style="width: .66rem; height: .46rem;" slot="description">
        <img src="./images/icon-listen.png" alt="" style="width: .66rem; height: .46rem;" slot="description">
    </tm-panel>
    <tm-panel
        image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5"
        title="张萌人生效率手册"
        tip="学习"
        decoration="￥99"
        btn="￥2.99">
        <img src="./images/icon-listen.png" alt="" style="width: .66rem; height: .46rem;" slot="description">
        <img src="./images/icon-listen.png" alt="" style="width: .66rem; height: .46rem;" slot="description">
    </tm-panel>

    <tm-divider>自定义btn</tm-divider>
    <tm-panel image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5" title="hello" tip="学习" decoration="￥99">
        <div  slot="btn">
            <div style="height: 20px; width: 30px; background: pink;"></div>
            <img src="./images/icon-vip.png" alt="" style="height: .32rem;">
        </div>
    </tm-panel>

    <tm-divider>image内浮动元素</tm-divider>
    <tm-panel image="http://jhsy-img.caizhu.com/Fr2mInO7RA7KfVwpO6EcL1E7NyE5" title="hello" tip="学习" decoration="￥99" btn="btn">
        <img src="./images/icon-unsign.png" alt="" style="position: absolute; top: 0; right: 0; width: .78rem; height: .78rem;" slot="image-extra">
    </tm-panel>
</div>
</template>

<script>
import TmPanel from '../index'

export default {
    data () {
        return {
            time: false,
        }
    },

    mounted () {
        setTimeout(() => {
            this.time = true
        }, 1500)
    },

    components: {
        TmPanel,
    },
}
</script>

<style lang="scss" scoped>
.demo {
    min-height: 100vh;
    background: #f6f6f6;

    &-price {
        font-size: .28rem;
        line-height: .4rem;
        color: rgba(230, 198, 136, 1);
    }

    &-footer {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: .32rem;
        padding-right: .04rem;
        background: rgba(0, 0, 0, .3);
        box-sizing: border-box;

        &-text {
            font-size: .2rem;
            line-height: .28rem;
            color: rgba(255, 255, 255, 1);
            text-align: right;
        }
    }
}
</style>
