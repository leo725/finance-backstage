<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" :class="{openSideBar:sidebar.opened}" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <navbar></navbar>
        <tabs-view></tabs-view>
      </div>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/Layout'
import { mapGetters } from 'vuex'
import TabsView from './TabsView'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain,
    TabsView,
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar:this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@import '@/styles/color.less';
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  clear: both;
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .fixed-header{
    position: fixed;
    top: 0;
    right: 0;
    z-index: 10;
    width: calc(100% - 200px);
    transition: width .28s;
  }
  &.hideSidebar {
    .sidebar-container {
      width: 55px;
      overflow: inherit;
    }
    .main-container {
      margin-left: 55px;
    }
    .fixed-header{
      width: calc(100% - 54px);
    }
  }

  .sidebar-container {
    transition: width 0.28s ease-out;
    width: 200px;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .main-container {
    height: 100%;
    transition: margin-left 0.28s ease-out;
    margin-left: 200px;
    padding-top: 90px;
  }
  .tabs-container {
    padding-top: 10px;
  }
  @media (max-width: 768px) {
    .tabs-container {
      padding-top: 10px;
      display: none;
    }
  }
}
</style>
