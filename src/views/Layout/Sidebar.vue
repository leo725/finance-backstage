<template>
  <el-menu :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" mode="vertical" background-color="#304156" text-color="#eee" unique-opened active-text-color="#ffd640">
    <router-link to="/dashboard">
      <div style="overflow:hidden;background:#29384a;font-size:0;height:90px;display: flex;alignItems: center">
        <img :style="style" src="../../assets/index/logo.png" class="logo" alt="">
      </div>
    </router-link>
    <sidebar-item :routes='routers'></sidebar-item>
    <!-- <sidebar-item :routes='getRoutes'></sidebar-item> -->
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import routes from '@/router/routes'
import SidebarItem from './SidebarItem'
import $vx from '@/utils/vx'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar',
      'routers'
    ]),
    isCollapse() {
      this.style = this.sidebar.opened ? this.styleOne : this.styleTwo
      return !this.sidebar.opened;
    }
  },
  data() {
    return {
      getRoutes: routes,
      styleOne: {
        width:'200px',
      },
      styleTwo: {
        width:'120px',
      }
    }
  },
  methods: {
  },
  created(){
    // this.getRoutes = this.getRoutes.concat(this.addRouters)
    // console.log(this.routers)
  },
  mounted() {
    
  }
}
</script>
<style lang="less" scoped>
@import '@/styles/color.less';
</style>