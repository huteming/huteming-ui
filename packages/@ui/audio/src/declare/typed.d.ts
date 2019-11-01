/**
 * 音频内部就绪状态
 * initial => setup => seeking => ready
 * @param {String} initial 初始值
 * @param {String} setup dom装载就绪
 * @param {String} seeking 进度设置就绪
 * @param {String} ready 音频准备就绪，可以播放
 */
export type AudioState = 'initial' | 'setup' | 'seeked' | 'ready'
