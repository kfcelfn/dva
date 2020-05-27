export default {
  disableCSSModules: true,   //禁用css modules,  自动可以使用less
  publicPath: '/',   //配置生产环境的 publicPath，开发环境下永远为 /
  alias: {   //配置路径
    '@': `${__dirname}/src`,
    '@@': `${__dirname}/src/components`,
  },
  extraBabelPlugins: [   //antd按需加载
    ['import', { 'libraryName': 'antd', 'libraryDirectory': 'es', 'style': 'css' }]
  ],
  proxy: {  //跨域
    '/aps': {
      target: 'https://api.baxiaobu.com',
      changeOrigin: true,
      pathRewrite: {
        '^/aps': '',
      }
    },
  }
}