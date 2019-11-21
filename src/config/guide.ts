export default [
    {
        title: '',
        modules: [
            {
                path: 'quickstart',
                title: '快速开始',
                docs: () => import('packages/ui/README.md'),
            },
            {
                path: 'changelog',
                title: '更新日志',
                docs: () => import('packages/ui/CHANGELOG.md'),
            },
        ],
    },
]
