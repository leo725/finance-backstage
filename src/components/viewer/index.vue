<template>
  <div class="view">
    <slot :images="images" :options="options">
    </slot>
  </div>
</template>
<script>
import Viewer from 'viewerjs'
import 'viewerjs/dist/viewer.css';
import {ViewerOptions} from '../../utils/vx'
export default {
  props: {
    images: {
      type: Array,
      default:function(){
        return []
      }
    },
    trigger: {},
    options: {
      type: Object,
      default:function(){
        return ViewerOptions
      }
    }
  },

  data () {
    return {
    }
  },

  computed: {
  },

  methods: {
    createViewer () {
      this.$viewer && this.$viewer.destroy()
      this.$viewer = new Viewer(this.$el, this.options)
      this.$emit('inited', this.$viewer)
      
    }
  },

  watch: {
    images () {
      this.$nextTick(() => {
        this.createViewer()
      })
    },
    trigger: {
      handler: function () {
        this.$nextTick(() => {
          this.createViewer()
        })
      },
      deep: true
    },
    options: {
      handler: function () {
        this.$nextTick(() => {
          this.createViewer()
        })
      },
      deep: true
    }
  },

  mounted () {
    this.createViewer()
  },

  destroyed () {
    this.$viewer && this.$viewer.destroy()
  }
}
</script>

<style lang="less" scoped>
.view{
  height:100%;
}
</style>
