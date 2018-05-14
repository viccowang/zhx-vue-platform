
import HeaderBreadcrumb from './breadcrumb'

const install = (Vue, options) => {
  Vue.component(HeaderBreadcrumb.name, HeaderBreadcrumb)
}
const breadcrumb = { HeaderBreadcrumb, install }

export default breadcrumb
export { HeaderBreadcrumb }
