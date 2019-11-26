module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',

    transformIgnorePatterns: [
        '/node_modules/'
    ],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
        '^packages/(.*)$': '<rootDir>/packages/$1',
        '^ui/(.*)$': '<rootDir>/packages/ui/src/$1',
        '^tests/(.*)$': '<rootDir>/tests/$1',
    },

    testMatch: [
        '<rootDir>/packages/**/__tests__/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
    ],

    testURL: 'http://localhost/#/hello?mainUnion=mainUnion&subUnion=subUnion&key=value&num=1',

    // issues: https://github.com/hustcc/jest-canvas-mock/issues/2
    setupFiles: ['jest-canvas-mock'],

    // collectCoverage: true,
    collectCoverageFrom: [
        'packages/**/src/*.{js,vue,ts,tsx}',
        'packages/@ui/**/src/*.{js,vue,ts,tsx}',
        'packages/assets/js/PropSync.ts', // 自定义装饰器
        '!packages/ui-tab/src/*.{js,vue,ts}',
        '!packages/ui-video/src/*.{js,vue,ts}',
        '!packages/ui-mp3/src/*.{js,vue,ts}',
        '!packages/ui-mp4/src/*.{js,vue,ts}',
        '!packages/ui-audio-player/src/*.{js,vue,ts}',
        '!packages/ui-video-player/src/*.{js,vue,ts}',
        '!packages/ui-ripple/src/*.{js,vue,ts}',
    ],

    // ['html', 'text-summary', 'json', 'lcov', 'text', 'clover'],
    coverageReporters: ['html', 'text-summary', 'lcov'],
}
