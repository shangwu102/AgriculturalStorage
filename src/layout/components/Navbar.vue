<template>
  <div class="navbar">

    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <!-- <div style="position: absolute; left: 50%">hello</div> -->

      <el-dropdown class="avatar-container" trigger="click">

        <div class="avatar-wrapper">
          <div style="font-size: 14px; font-weight: bold;">当前角色：{{ username }}</div>
        </div>
        <div style="cursor: pointer;" @click="$router.push('/lshome')">
          <!-- <svg
            style="position: absolute; right: -30%; top: 20%; width: 24px; height: 24px;"
            t="1728870588733"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2685"
          >
            <path
              d="M897 800H130c-35.3 0-64-28.7-64-64V161.4c0-35.3 28.7-64 64-64h767c35.3 0 64 28.7 64 64V736c0 35.3-28.7 64-64 64z m-766.9-64H897l0.1-0.1V161.4l-0.1-0.1H130.1l-0.1 0.1 0.1 574.6c-0.1 0-0.1 0 0 0z"
              fill="#666666"
              p-id="2686"
            />
            <path
              d="M801.3 705h-97.7c-17.7 0-32-14.3-32-32s14.3-32 32-32h97.5v-94.8c0-17.7 14.3-32 32-32s32 14.3 32 32V641c0.1 35.3-28.6 64-63.8 64zM833.2 385c-17.7 0-32-14.3-32-32v-96.2h-96c-17.7 0-32-14.3-32-32s14.3-32 32-32h96.1c35.2 0 63.9 28.7 63.9 64V353c0 17.7-14.4 32-32 32z m-31.9-128.2zM193 385c-17.7 0-32-14.3-32-32v-96.2c0-35.3 28.7-64 63.9-64H321c17.7 0 32 14.3 32 32s-14.3 32-32 32h-96v96.3c0 17.6-14.3 31.9-32 31.9zM320.7 705H225c-35.2 0-63.9-28.7-63.9-64v-95c0-17.7 14.3-32 32-32s32 14.3 32 32v95h95.6c17.7 0 32 14.3 32 32s-14.3 32-32 32zM96.9 928c-17.7 0-32-14.3-32-32s14.3-32 32-32l831.5-0.7c17.7 0 32 14.3 32 32s-14.3 32-32 32l-831.5 0.7c0.1 0 0 0 0 0z"
              fill="#666666"
              p-id="2687"
            />
          </svg> -->
          <svg
            style="position: absolute; right: -30%; top: 20%; width: 24px; height: 24px;"
            t="1729074977256"
            class="icon"
            viewBox="0 0 1536 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5418"
            width="200"
            height="200"
          >
            <path
              d="M512 102.4V256H409.6V51.2A51.2 51.2 0 0 1 460.8 0h1024A51.2 51.2 0 0 1 1536 51.2v665.6a51.2 51.2 0 0 1-51.2 51.2H768v-102.4h665.6V102.4H512zM51.2 307.2h614.4a51.2 51.2 0 0 1 51.2 51.2v460.8a51.2 51.2 0 0 1-51.2 51.2H51.2A51.2 51.2 0 0 1 0 819.2V358.4a51.2 51.2 0 0 1 51.2-51.2zM256 921.6h204.8a51.2 51.2 0 1 1 0 102.4H256a51.2 51.2 0 1 1 0-102.4z m614.4-102.4h204.8a51.2 51.2 0 1 1 0 102.4h-204.8a51.2 51.2 0 1 1 0-102.4z"
              fill="#000000"
              p-id="5419"
            />
          </svg>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/ashome">
            <el-dropdown-item>
              首页
            </el-dropdown-item>
          </router-link>

          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { removeToken } from '@/utils/auth'
import { removeUser, getUser } from '@/utils/auth'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ]),
    username() {
      // 获取存储的用户对象
      const user = getUser()
      console.log(user)

      // 如果用户对象存在，解析它并返回 uname，否则返回空字符串
      return user ? JSON.parse(user).role : ''
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      removeToken()
      removeUser()
      localStorage.removeItem('companyInfo')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

  .hamburger-container {
    line-height: 20px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: width .3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 25px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: width .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
