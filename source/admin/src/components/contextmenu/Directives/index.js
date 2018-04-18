export default {
  bind (el, binding, vnode) {
    const contextmenu = vnode.context.$refs[binding.arg]

    if (Array.isArray(contextmenu.contextmenuReferences)) {
      contextmenu.contextmenuReferences.push({ el, binding, vnode })
    } else {
      contextmenu.contextmenuReferences = [{ el, binding, vnode }]
    }

    contextmenu.$contextmenuId = el.id || contextmenu._uid // eslint-disable-line no-underscore-dangle
  }
}
