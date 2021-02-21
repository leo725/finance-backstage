<template>
  <div>
    <el-menu class="navbar" mode="horizontal">
      <div class="hamburger-container">
        <i class="iconfont hamburger icon-shouqi" :class="sidebar.opened && 'is-active'" @click="toggleSideBar"></i>
      </div>
      <levelbar class="breadcrumb-container"></levelbar>
      <div class="right-menu">
        <error-log class="errLog-container right-menu-item" />
        <el-tooltip effect="dark" content="显示全屏" placement="bottom" v-if="device!=='mobile'">
          <screenfull class="screenfull right-menu-item"></screenfull>
        </el-tooltip>
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
            <span>{{nickName.userName || '虚假账号'}}</span>
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <el-dropdown-item @click.native="reset()">
              修改密码
            </el-dropdown-item>
            <el-dropdown-item divided>
              <div @click="logout">退出登录</div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-menu>

    <!-- 修改密码 -->
    <el-dialog title="修改密码" :visible.sync="dialogVisible" :close-on-click-modal="false" :append-to-body="true" center width="600px" :before-close="handleClose">
      <el-form label-position="left" label-width="80px" :rules="rules" ref="editRow" :model="PassWordBO">
        <el-form-item label="新密码" prop="password">
          <el-input v-model="PassWordBO.password" clearable></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" :disabled="isChangePwd" @click="_resetPassword">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import Screenfull from '@/components/Screenfull'
import ErrorLog from '@/components/ErrorLog'
import $vx from '@/utils/vx';
import { saveKrUser } from 'api/index'
export default {
  components: {
    Levelbar,
    Screenfull,
    ErrorLog,
  },
  data() {
    return {
      nickName: { userName: '' },
      dialogVisible: false,
      isChangePwd: false,
      PassWordBO: {},
      rules: {
        password: [{ required: true, message: '请输入密码', trigger: 'change' }, { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'change' }],
      }
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    },
    ...mapGetters([
      'sidebar',
    ])
  },
  created() {
    this.nickName = $vx.localStorage.getItem('user_info') || { userName: '' }
  },
  methods: {
    reset() {
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
      this.PassWordBO = {}
    },
    async _resetPassword() {
      this.$refs['editRow'].validate((valid) => {
        if (valid) {
          this.isChangePwd = true;
          let userInfo = $vx.localStorage.getItem('user_info');
          let {id} = userInfo;
          let params = Object.assign({id},this.PassWordBO);
          saveKrUser(params).then(res => {
            if (res.code == 0) {
              this.handleClose();
              this.logout();
              this.$message({ type: 'success', message: '修改密码成功！' });
            }
          })
          this.isChangePwd = false
        } else {
          return false;
        }
      });
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then((res) => {
        location.reload()// 为了重新实例化vue-router对象 避免bug
      })
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent
      var Agents = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod')
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
      }
      return flag
    }
  },
  mounted() {
    // this.nickName = this.$store.getters.getUserInfo.nickName;
    if (!this.IsPC()) {
      if (this.sidebar.opened) {
        this.toggleSideBar()
      }
    }
  }
}
</script>

<style rel="stylesheet/less" lang="less" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .hamburger {
      cursor: pointer;
      font-size: 18px;
      transform: rotate(180deg);
      transition: 0.38s;
      transform-origin: 50% 50%;
    }
    .hamburger.is-active {
      transform: rotate(0deg);
    }
  }
  .breadcrumb-container {
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  // .screenfull {
  //   position: absolute;
  //   right: 120px;
  //   top: 16px;
  //   color: red;
  //   line-height: 0;
  // }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus {
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
      vertical-align: middle;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>



