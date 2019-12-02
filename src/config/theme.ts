import { Config } from './types'

export default <Config>{
    rootPath: 'theme',
    headTitle: '个性化',
    sideGroup: [
        {
            sideTitle: '',
            children: [
                {
                    childPath: '',
                    chineseName: '概览',
                    doc: () => import('packages/ui-styles/README.md'),
                    example: () => import('packages/ui-styles/demo/basic.vue'),
                },
            ],
        },
    ],
}
