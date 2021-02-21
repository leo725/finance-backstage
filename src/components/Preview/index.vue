<template >
  <div>
    <!-- 图片预览 -->
    <Viewer :options="ViewerOptions" :images="imgList" v-show="false" >
      <div v-for="(item,index) in imgList" :key="index"><img :id="item.id" :data-original="item.filePath" :alt="item.attachmentType?imgAltType[item.attachmentType]:imgAlt"  v-lazy="item.filePath" ></div>
    </Viewer>
  </div>
</template>

<script>
import {ViewerOptions} from 'utils/vx'
import Viewer from 'components/viewer'
export default {
  props:{
    imgList:{
      type:Array,
      default:[]
    },
    imgAltType:{
      type:Object
    },
    imgAlt:{
      type:String,
      default:''
    }
  },
  data () {
    return {
      ViewerOptions:ViewerOptions 
    }
  },
  components: { 
    Viewer
  },
}
</script>