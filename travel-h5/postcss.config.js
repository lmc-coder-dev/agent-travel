export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,      // 设计稿宽度（Vant 默认 375）
      unitPrecision: 5,        // vw 保留的小数位数
      viewportUnit: 'vw',      // 转换后的单位
      selectorBlackList: [],   // 不需要转换的类名
      minPixelValue: 1,        // 小于等于 1px 不转换
      mediaQuery: false,       // 媒体查询里的 px 不转换
    },
  },
}
