/**
 * 整合所有图片的 options 
 */
const modulesFiles = require.context('./opts', true, /index.js$/)
let modules = {}
modulesFiles.keys().forEach(element => {
  modules = Object.assign({}, modules, modulesFiles(element).default)
});
console.log(modulesFiles)
export default modules