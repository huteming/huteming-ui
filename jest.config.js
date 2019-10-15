module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue',
        'ts',
        'tsx'
    ],

    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest',
        '^.+\\.tsx?$': 'ts-jest'
    },

    transformIgnorePatterns: [
        '/node_modules/'
    ],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^web/(.*)$': '<rootDir>/packages/$1',
        '^web-ui/(.*)$': '<rootDir>/packages/@ui/$1',
        '^web-util/(.*)$': '<rootDir>/packages/@util/$1',
        '^web-cli/(.*)$': '<rootDir>/packages/@cli/$1',
    },

    snapshotSerializers: [
        'jest-serializer-vue'
    ],

    testMatch: [
        '<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
        '<rootDir>/tests/ui/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
        '<rootDir>/tests/common/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
    ],

    testURL: 'http://localhost/#/hello?mainUnion=mainUnion&subUnion=subUnion&key=value&num=1',

    watchPlugins: [
        'jest-watch-typeahead/filename',
        'jest-watch-typeahead/testname'
    ],

    // issues: https://github.com/hustcc/jest-canvas-mock/issues/2
    setupFiles: ['jest-canvas-mock'],

    // collectCoverage: true,
    collectCoverageFrom: [
        'packages/@util/**/src/*.{js,vue,ts,tsx}',
        'packages/@ui/**/src/*.{js,vue,ts,tsx}',
        'packages/assets/js/PropSync.ts', // 自定义装饰器
        '!packages/@ui/tab/src/*.{js,vue,ts}',
        '!packages/@ui/audio/src/*.{js,vue,ts}',
        '!packages/@ui/video/src/*.{js,vue,ts}',
        '!packages/@ui/mp3/src/*.{js,vue,ts}',
        '!packages/@ui/mp4/src/*.{js,vue,ts}',
        '!packages/@ui/audio-player/src/*.{js,vue,ts}',
        '!packages/@ui/video-player/src/*.{js,vue,ts}',
        '!packages/@ui/ripple/src/*.{js,vue,ts}',
    ],

    coverageReporters: ['html', 'text-summary'],

    globals: {
        'ts-jest': {
            babelConfig: true
        }
    }
}
