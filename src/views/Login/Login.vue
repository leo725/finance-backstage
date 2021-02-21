<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-12 13:35:49
 * @LastEditTime: 2019-08-12 09:35:56
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="login-container ">
    <div class="txt-box">
      <img src="../../assets/index/login-logo.png" alt="">
      <span>B端融资管理平台</span>
    </div>
    <div class="ad">
      <img class="img1" src="../../assets/index/loginb.png" alt="">
      <ul class="line-ul" id="line-ul">
        <li v-for="(item,index) in lineList" class="line" :style="{left: item.left,animationDuration: item.durTime,webkitAnimationDuration: item.durTime, width: item.width+'px'}" :data-index="index" @webkitAnimationEnd="removeDom2">
          <!-- <div class="line-item" :style="{ transform: item.transforms, webkitTransform: item.transforms}"></div> -->
          <img src="../../assets/index/login-line.png" alt="">
        </li>
      </ul>
    </div>
    <div class="box">
      <el-form class="card-box login-form " autocomplete="on" :rules="loginRules" :model="loginForm" ref="loginForm" label-position="left">
        <h3 class="title">欢迎使用</h3>
        <el-form-item prop="username">
          <MDinput v-model="loginForm.username" icon="icon-touxiang" @enter="goLogin" type="text" placeholder="输入用户名">用户名</MDinput>
        </el-form-item>
        <el-form-item prop="password">
          <MDinput v-model="loginForm.password" icon="icon-mima" @enter="goLogin" type="password" placeholder="输入密码">密 码</MDinput>
        </el-form-item>
        <el-form-item prop="yzm">
          <MDinput v-model="loginForm.yzm" name="yzm" @enter="goLogin" placeholder="输入图形验证码">图形验证码</MDinput>
          <img class="getyzm" @click="_getVerifyCode()" :src="code" alt="点击刷新">
        </el-form-item>

        <!-- <el-form-item prop="username">
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input name="password" type="password" v-model="loginForm.password" autoComplete="on" placeholder="密码" />
        </el-form-item>
        <el-form-item prop="yzm">
          <el-input name="yzm" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.yzm" autoComplete="on" placeholder="图形验证码" />
          <img class="getyzm" @click="_getVerifyCode()" :src="code" alt="点击刷新" >
        </el-form-item> -->

        <div class="gozc">
          <!-- <router-link to="/forget">忘记密码>></router-link> -->
        </div>
        <el-button type="primary loginbtn" :loading="loading" @click.native.prevent="handleLogin">登 录</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
const _import = require('@/router/_import_' + process.env.NODE_ENV)
import $vx from '@/utils/vx'
import Layout from '@/views/Layout/Layout'
import MDinput from '@/components/MDinput'
import { getVerifyCode, checkVerifyCode } from '@/api/login'
export default {
  components: { MDinput },
  name: 'login',
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        yzm: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'change' }],
        password: [{ required: true, message: '请输入密码', trigger: 'change' }, { min: 6, max: 18, message: '密码长度需要在 6 到 18 个字符', trigger: 'blur' }],
        yzm: [{ required: true, message: '请输入验证码', trigger: 'change' }, { min: 4, max: 4, message: '请输入正确的验证码', trigger: 'blur' }]
      },
      loading: false,
      code: '',
      lineList: [],
      liParams: [],
      duration: 10000,
      timer: null
    }
  },
  created() {
    this._getVerifyCode()
  },
  mounted() {
    this.startRedPacket();
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    // 获取验证码
    async _getVerifyCode() {
      let res = await getVerifyCode()
      // console.log(res)
      if (res.code === 0) {
        this.code = 'data:image/jpeg;base64,' + res.data
      } else {
        this.code = ''
      }
    },
    // 验证码-验证
    async _checkVerifyCode() {
      this.loading = true
      let { username, password, yzm } = this.loginForm;
      let params = { verifyCode: yzm }
      try {
        let res = await checkVerifyCode(params)
        if (res.code === 0) {
          var clientId = ''
          if (process.env.NODE_ENV === 'development') {
            clientId = 'fe2ba6db08aa4653ad678537049ba487'
          } else {
            clientId = window.g.clientId
          }
          let param = { clientId: clientId, password: password, userName: username }
          this.$store.dispatch('LoginByUsername', param).then((res) => {
            if (res.code == 0) {
              this.$router.push({ path: '/' })
            } else {
              this._getVerifyCode();
            }
            this.loading = false
          }).catch((e) => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      } catch (error) {
        this.loading = false
      }
    },
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this._checkVerifyCode()
        } else {
          return false
        }
      })
    },
    goLogin(e) {
      this.handleLogin();
    },
    /**
     * 开启动画
     */
    startRedPacket() {
      let win = document.documentElement.clientWidth || document.body.clientWidth
      let left = parseInt(Math.random() * (win - 50) + 0);
      let lineLeft = parseInt(Math.random() * (win - 50) + 0);
      let rotate = (parseInt(Math.random() * (45 - (-45)) - 45)) + "deg";  // 旋转角度
      let width = (Math.random() * (12 - 2 + 1) + 2);  // 图片尺寸
      let durTime = (Math.random() * (3 - 1.2 + 1) + 1.2) + 's'; // 时间  1.2和1.2这个数值保持一样
      this.lineList.push({ left: lineLeft + 'px', transforms: "", durTime: durTime, width })
      this.timer = setTimeout(() => {
        this.startRedPacket()
      }, 200)
    },
    /**
     * 回收dom节点
     */
    removeDom(e) {
      let target = e.currentTarget;
      document.querySelector('#red_packet').removeChild(target)
    },
    /**
     * 回收dom节点
     */
    removeDom2(e) {
      let target = e.currentTarget;
      document.querySelector('#line-ul').removeChild(target)
    },
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
@dark_gray: #889aa4;
@light_gray: #eee;
.login-container {
  position: relative;
  margin: 0 auto;
  height: 100vh;
  background: url("../../assets/index/login-bg.jpg") no-repeat;
  background-size: cover;
  overflow: hidden;
  .txt-box {
    padding: 30px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    span {
      color: #fff;
      font-size: 30px;
      padding-left: 20px;
      margin-left: 20px;
      border-left: 1px solid #fff;
    }
  }
  .ad {
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    .img1 {
      max-height: 100vh;
    }
    .line-ul {
      list-style-type: none;
      width: 100%;
      height: 100%;
      li {
        position: absolute;
        z-index: 1;
        transition: all 3s linear;
        top: 0;
        transform: translateY(-100%);
        animation: line_move 2s linear 1 forwards;
        img {
          width: 100%;
        }
      }
    }
  }
  input {
    background: transparent !important;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: @light_gray;
    height: 47px;
  }

  .loginbtn {
    width: 100%;
    font-size: 20px;
    margin-bottom: 20px;
    margin-top: 20px;
    height: 50px;
    background: linear-gradient(90deg, #00c9dc, #006eff);
  }
  .getyzm {
    position: absolute;
    width: 76px;
    right: 6px;
    bottom: 10px;
    height: 36px;
    cursor: pointer;
    border: 1px solid #ccc;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 100%;
    position: relative;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: @dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: #fff;
    text-align: center;
  }
  .login-form {
    position: absolute;
    right: 230px;
    top: 230px;
    width: 380px;
    padding: 30px 30px 15px 30px;
    border-radius: 8px;
    background: rgba(27, 41, 63, 0.66);
    z-index: 99;
    .gozc {
      text-align: right;
      margin-bottom: 20px;
      color: #fff;
      a:hover {
        color: #fff;
      }
    }
    /deep/.material-input__component {
      background: transparent;
      .material-label {
        color: #ccc;
      }
      .material-input-bar::before,
      .material-input-bar::after {
        background: #fff;
      }
      input {
        color: #fff;
        background: transparent !important;
      }
      input:-webkit-autofill {
        -webkit-text-fill-color: #fff !important;
        caret-color: #fff;/*光标颜色*/
        -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
        background-color: transparent;
        background-image: none;
        transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
      }
    }
  }
  @media screen and(max-width: 768px) {
    .login-form {
      width: 94%;
      left: 3%;
      top: 20vh;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: @dark_gray;
    cursor: pointer;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}

@keyframes line_move {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100vh);
    opacity: 0;
  }
}
</style>
