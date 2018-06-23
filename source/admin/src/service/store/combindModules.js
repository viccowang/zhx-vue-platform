/**
 * 通过 webpack  require.context 来动态载入vuex store
 * modules目录中的文件名称必须和导出对象名称保持一致
 */
const requireModule = require.context('./modules/', false, /\.js$/)

let modules = {}

requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  modules[moduleName] = requireModule(fileName).default
})

export default modules
