const requireModule = require.context('./modules/', false, /\.js$/)

let Modules = {}

requireModule.keys().forEach(fileName => {
  const moduleName = fileName.replace(/(\.\/|\.js)/g, '')
  Modules[moduleName] = requireModule(fileName).default
})

export default Modules
