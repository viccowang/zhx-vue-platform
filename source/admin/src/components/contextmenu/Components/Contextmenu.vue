<template>
  <ul
    ref="contextmenu"
    :class="contextmenuCls"
    v-show="visible"
    :style="style">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'VContextmenu',
  provide () {
    return {
      $$contextmenu: this
    }
  },
  props: {
    eventType: {
      type: String,
      default: 'contextmenu'
    },
    theme: {
      type: String,
      default: 'default'
    },
    autoPlacement: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      contextmenuReferences: null,
      visible: false,
      style: {
        top: 0,
        left: 0
      }
    }
  },
  computed: {
    clickOutsideHandler () {
      return this.visible ? this.hide : () => {}
    },
    isClick () {
      return this.eventType === 'click'
    },
    contextmenuCls () {
      return [
        'v-contextmenu',
        `v-contextmenu--${this.theme}`
      ]
    }
  },
  watch: {
    visible (value) {
      if (value) {
        // @show hooks
        this.$emit('show', this)
        document.body.addEventListener('click', this.handleBodyClick)
      } else {
        // @hide hooks
        this.$emit('hide', this)
        document.body.removeEventListener('click', this.handleBodyClick)
      }
    },
    contextmenuReferences (contextmenuReferences) {
      if (window.$$VContextmenu) {
        window.$$VContextmenu[this.$contextmenuId] = this
      } else {
        window.$$VContextmenu = { [this.$contextmenuId]: this }
      }
      this.contextmenuReferences && this.contextmenuReferences.forEach((ref) => {
        ref.el.addEventListener(this.eventType, () => this.handleReferenceContextmenu(event, ref.binding.value))
      })
      document.body.appendChild(this.$el)
    }
  },
  mounted () {

  },
  beforeDestroy () {
    // @before destroy hooks
    this.$emit('beforeDestroy', this)
    document.body.removeChild(this.$el)
    delete window.$$VContextmenu[this.$contextmenuId]
    this.contextmenuReferences && this.contextmenuReferences.forEach((ref) => {
      ref.el.removeEventListener(this.eventType, this.handleReferenceContextmenu)
    })
    document.body.removeEventListener('click', this.handleBodyClick)
  },
  methods: {
    handleReferenceContextmenu (event, params) {
      // @beforeShow hooks
      this.$emit('beforeShow', this, event, params)
      event.preventDefault()
      const reference = this.contextmenuReferences.find(ref => ref.el.contains(event.target))
      this.$emit('contextmenu', reference ? reference.vnode : null)
      this.contextmenuParams = params
      const eventX = event.pageX
      const eventY = event.pageY
      this.show()
      this.$nextTick(() => {
        const contextmenuPosition = {
          top: eventY,
          left: eventX
        }
        if (this.autoPlacement) {
          const contextmenuWidth = this.$refs.contextmenu.clientWidth
          const contextmenuHeight = this.$refs.contextmenu.clientHeight
          if (contextmenuHeight + eventY >= window.innerHeight) {
            contextmenuPosition.top -= contextmenuHeight
          }
          if (contextmenuWidth + eventX >= window.innerWidth) {
            contextmenuPosition.left -= contextmenuWidth
          }
        }
        this.style = {
          top: `${contextmenuPosition.top}px`,
          left: `${contextmenuPosition.left}px`
        }
      })
    },
    handleBodyClick (event) {
      const notOutside = this.$el.contains(event.target) || (
        this.isClick && this.contextmenuReferences.some(ref => ref.el.contains(event.target))
      )
      if (!notOutside) {
        this.visible = false
      }
    },
    show (position) {
      Object.keys(window.$$VContextmenu)
        .forEach((key) => {
          if (key !== this.$contextmenuId) {
            window.$$VContextmenu[key].hide()
          }
        })
      if (position) {
        this.style = {
          top: `${position.top}px`,
          left: `${position.left}px`
        }
      }
      this.visible = true
    },
    hide () {
      this.visible = false
    },
    hideAll () {
      Object.keys(window.$$VContextmenu)
        .forEach((key) => {
          window.$$VContextmenu[key].hide()
        })
    }
  }
}
</script>
