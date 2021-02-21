<template>
  <section class="app-main">
    <div>
        <!-- <keep-alive>
          <transition name="fade-transform" mode="out-in">
              <router-view v-if="$route.meta.keepAlive" ></router-view>
          </transition>
        </!--> 
      <transition name="fade-transform" mode="out-in">
        <router-view  :key="key"></router-view>
      </transition>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    }
  }
}
</script>

<style lang="less" scoped>
.app-main{
  min-height: 100%; 
  padding: 20px;
  box-sizing: border-box;
 
}
@media (max-width: 768px) {
  .app-main {
    padding: 10px;
  }
}
</style>
