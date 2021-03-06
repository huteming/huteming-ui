import assert from 'assert'

describe('ui entry', () => {
    const names = [
        {
            name: 'Anchor', // 整体打包模块名
            lib: 'anchor', // 按需加载目录名
        },
        {
            name: 'TmTurntable',
            lib: 'tm-turntable',
            registName: 'TmTurntable',
        },
        {
            name: 'ImagePicker',
            lib: 'image-picker',
        },
        {
            name: 'InfiniteScroll',
            lib: 'infinite-scroll',
        },
        {
            name: 'Loading',
            lib: 'loading',
        },
        {
            name: 'Message',
            lib: 'message',
            registName: '$message',
        },
        {
            name: 'TmBtnPay',
            lib: 'tm-btn-pay',
        },
        {
            name: 'TmCarousel',
            lib: 'tm-carousel',
            child: {
                name: 'TmCarouselItem',
                lib: 'tm-carousel-item',
            },
        },
        {
            name: 'TmCarouselItem',
            lib: 'tm-carousel-item',
        },
        {
            name: 'TmCell',
            lib: 'tm-cell',
        },
        {
            name: 'TmClocker',
            lib: 'tm-clocker',
        },
        {
            name: 'TmDialog',
            lib: 'tm-dialog',
        },
        {
            name: 'TmEmpty',
            lib: 'tm-empty',
        },
        {
            name: 'TmField',
            lib: 'tm-field',
        },
        {
            name: 'TmFlex',
            lib: 'tm-flex',
            child: {
                name: 'TmFlexItem',
                lib: 'tm-flex-item',
            },
        },
        {
            name: 'TmFlexItem',
            lib: 'tm-flex-item',
        },
        {
            name: 'TmIcon',
            lib: 'tm-icon',
        },
        {
            name: 'TmImage',
            lib: 'tm-image',
        },
        {
            name: 'TmPanel',
            lib: 'tm-panel',
        },
        {
            name: 'TmPickerAddress',
            lib: 'tm-picker-address',
        },
        {
            name: 'TmPickerDatetime',
            lib: 'tm-picker-datetime',
        },
        {
            name: 'TmPickerRange',
            lib: 'tm-picker-range',
        },
        {
            name: 'TmPopup',
            lib: 'tm-popup',
        },
        {
            name: 'Toast',
            lib: 'toast',
        },
        {
            name: 'TmCollapse',
            lib: 'tm-collapse',
        },
        {
            name: 'Guide',
            lib: 'guide',
        },
        {
            name: 'TmNoticeBar',
            lib: 'tm-notice-bar',
        },
        {
            name: 'TmTransitionCollapse',
            lib: 'tm-transition-collapse',
        },
        {
            name: 'TmWingBlank',
            lib: 'tm-wing-blank',
        },
        {
            name: 'TmWhiteSpace',
            lib: 'tm-white-space',
        },
        {
            name: 'Ripple',
            lib: 'ripple',
        },
        {
            name: 'TmAudioPlayer',
            lib: 'tm-audio-player',
        },
        {
            name: 'TmVideoPlayer',
            lib: 'tm-video-player',
        },
        {
            name: 'TmSwitch',
            lib: 'tm-switch',
        },
        {
            name: 'TmToolbar',
            lib: 'tm-toolbar',
        },
    ]

    names.forEach(({ name, lib, child, noInstall, registName }) => {
        it(name, () => {
            // 整体打包入口
            const pack = require('web/ui/index').default
            const _module = pack[name]
            assert.strictEqual(typeof pack.install, 'function')
            assert.ok(_module)
            assert.strictEqual(_module.registName || _module.name, registName || name)
            if (!noInstall) {
                assert.strictEqual(typeof _module.install, 'function')
            }

            // 按需加载入口
            const _lib = require(`web/ui/lib/${lib}/index`).default
            assert.ok(_lib)
            assert.strictEqual(_lib.registName || _lib.name, registName || name)
            if (!noInstall) {
                assert.strictEqual(typeof _lib.install, 'function')
            }

            // 检查子元素
            if (child) {
                assert.strictEqual(_module.item, pack[child.name])

                const _libChild = require(`web/ui/lib/${child.lib}/index`)
                assert.strictEqual(_lib.item, _libChild.default)
            }
        })
    })
})
