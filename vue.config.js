'use strict' // 启用严格模式，以更严格的语法检查，提高代码的健壮性
const path = require('path') // 引入 Node.js 内置的 path 模块，用于处理和转换文件路径
const defaultSettings = require('./src/settings.js') // 引入项目的默认设置，包括项目标题等

// 定义一个函数，用于简化路径的拼接
function resolve(dir) {
  return path.join(__dirname, dir) // 将传入的目录与当前目录进行拼接，返回绝对路径
}

// 从默认设置中获取项目的标题，如果未设置则使用 'vue Admin Template' 作为默认标题
const name = defaultSettings.title || 'vue Admin Template' // 页面标题

// 导出项目的配置对象
module.exports = {
  publicPath: './',
  // 当运行 'vue-cli-service build' 时生成的生产环境构建文件的目录，默认为 'dist'
  outputDir: 'dist',
  // 放置生成的静态资源（js、css、img、fonts）的目录，默认为 ''
  assetsDir: 'static',
  // 是否在保存时使用 eslint-loader 进行代码检查，仅在开发环境下开启
  lintOnSave: process.env.NODE_ENV === 'development',
  // 指定需要 Babel 转译的特定依赖包，以解决第三方库的兼容性问题
  transpileDependencies: [
    'color-parse',
    'ol'
  ],
  // 是否在生产环境下生成 source map 文件，设置为 false 以加速生产环境构建
  productionSourceMap: false,
  // 开发服务器配置
  devServer: {
    port: 6060, // 开发服务器启动的端口号
    open: true, // 是否在启动后自动打开浏览器
    overlay: {
      warnings: false, // 是否在浏览器中显示警告
      errors: true // 是否在浏览器中显示错误
    },
    // 配置代理
    proxy: {
      '/WeBASE-Front': {
        target: 'http://192.168.47.12:5002',
        changeOrigin: true
      }
    }
  },
  // Webpack 的简单配置，可以覆盖默认的配置
  configureWebpack: {
    // 为项目提供一个名称，以便在页面标题或其他地方使用
    name: name,
    // 配置模块如何解析
    resolve: {
      // 创建 import 或 require 的别名，减少路径书写
      alias: {
        '@': resolve('src') // 使用 '@' 代表 'src' 目录
      }
    },
    // 模块规则配置，添加对特定文件的处理
    module: {
      rules: [
        {
          test: /\.js$/, // 匹配所有 .js 文件
          exclude: /node_modules/, // 排除 node_modules 目录
          use: {
            loader: 'babel-loader', // 使用 babel-loader 转译 ES6+ 语法
            options: {
              plugins: [
                '@babel/plugin-proposal-nullish-coalescing-operator', // 支持空值合并运算符 ??
                '@babel/plugin-proposal-optional-chaining' // 支持可选链操作符 ?.
              ]
            }
          }
        }
      ]
    }
  },
  // 对内部的 webpack 配置进行更细粒度的修改
  chainWebpack: config => {
    // 配置 preload 插件，可以改善首屏加载速度，建议在生产环境下开启
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // 排除指定的文件，避免过多的无意义请求
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial' // 只包含初始的 chunk
      }
    ])

    // 当有很多页面时，会导致太多无意义的请求，删除 prefetch 插件
    config.plugins.delete('prefetch')

    // 设置 svg-sprite-loader，用于处理项目中的 SVG 图标
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons')) // 排除 'src/icons' 目录
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/) // 对 .svg 文件应用此规则
      .include.add(resolve('src/icons')) // 只包含 'src/icons' 目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader') // 使用 svg-sprite-loader 进行处理
      .options({
        symbolId: 'icon-[name]' // 设置生成的 symbol 的 id
      })
      .end()

    // 仅在生产环境下的配置
    config.when(process.env.NODE_ENV !== 'development', config => {
      // 将 runtime 代码内联到 index.html 中，以减少请求数
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [{
          // 正则匹配 runtime 相关的 js 文件
          inline: /runtime\..*\.js$/
        }])
        .end()

      // 代码分割配置
      config.optimization.splitChunks({
        chunks: 'all', // 对所有的 chunks 进行分割
        cacheGroups: {
          // 提取第三方库
          libs: {
            name: 'chunk-libs', // 分离出的 chunk 名称
            test: /[\\/]node_modules[\\/]/, // 匹配 node_modules 目录
            priority: 10, // 优先级，数值越大优先级越高
            chunks: 'initial' // 仅打包初始时依赖的第三方
          },
          // 提取 element-ui 库
          elementUI: {
            name: 'chunk-elementUI', // 分离出的 chunk 名称
            priority: 20, // 优先级高于 libs
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // 匹配 element-ui
          },
          // 提取公共模块
          commons: {
            name: 'chunk-commons', // 分离出的 chunk 名称
            test: resolve('src/components'), // 匹配 src/components 目录
            minChunks: 3, // 最小共用次数
            priority: 5, // 优先级
            reuseExistingChunk: true // 复用已存在的 chunk
          }
        }
      })

      // 将 runtime 代码拆分成单独的 chunk
      config.optimization.runtimeChunk('single')
    })
  }
}
