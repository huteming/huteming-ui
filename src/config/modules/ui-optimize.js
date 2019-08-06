export default [
    {
        path: 'infinite-scroll',
        title: '无限滚动',
        docs: () => import('web-ui/infinite-scroll/README.md'),
        example: () => import('web-ui/infinite-scroll/demo/basic.vue'),
    },
    {
        path: 'anchor',
        title: '锚点',
        docs: () => import('web-ui/anchor/README.md'),
        example: () => import('web-ui/anchor/demo/basic.vue'),
    },
    {
        path: 'guide',
        title: '引导',
        docs: () => import('web-ui/guide/README.md'),
        example: () => import('web-ui/guide/demo/basic.vue'),
    },
    {
        path: 'audio',
        title: '音频 Audio',
        docs: () => import('web-ui/audio/README.md'),
        example: () => import('web-ui/audio/demo/basic.vue'),
    },
    {
        path: 'mp3',
        title: '音频 Mp3',
        docs: () => import('web-ui/mp3/README.md'),
        example: () => import('web-ui/mp3/demo/basic.vue'),
    },
    {
        path: 'video',
        title: '视频 video',
        docs: () => import('web-ui/video/README.md'),
        example: () => import('web-ui/video/demo/basic.vue'),
    },
    {
        path: 'mp4',
        title: '视频 video',
        docs: () => import('web-ui/mp4/README.md'),
        example: () => import('web-ui/mp4/demo/basic.vue'),
    },
]
