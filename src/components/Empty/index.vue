<template>
  <div class="empty-container">
    <div class="empty-main">
      <i class="iconfont" :class="images[image]" v-if="images[image]"></i>
      <img v-else :src="image" alt="">
      <p class="empty-txt" v-if="description">{{description}}</p>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props:{
    image: {
      type: String,
      default: 'default'
    },
    description:{
      type: String,
    }
  },
  data:()=>({
    images: {
      default: 'icon-empty-default',
      error: 'icon-empty-error',
      search: 'icon-empty-search',
      network: 'icon-empty-network'
    }
  })
}
</script>

<style lang="less" scoped>
.empty-container{
  text-align: center;
  padding: 15px 0;
  .empty-main{
    .iconfont{
      color: #aaa;
      font-size: 100px;
    }
    .empty-txt{
      color: #999;
      margin-top: 15px;
    }
  }
}
</style>