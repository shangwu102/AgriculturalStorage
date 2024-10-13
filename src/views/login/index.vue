<template>
  <div class="login-container">
    <el-container>
      <el-aside width="65vw" />
      <el-main>
        <div>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            auto-complete="on"
            label-position="left"
          >
            <div class="title-container">
              <h3 class="title">系统登录</h3>
            </div>

            <!-- 用户名输入框 -->
            <el-form-item :class="{ 'focused': isFocused1 }" prop="username">
              <span class="svg-container">
                <svg-icon icon-class="user" />
              </span>
              <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
                @focus="handleFocus1"
                @blur="handleBlur1"
              />
            </el-form-item>

            <!-- 密码输入框 -->
            <el-form-item :class="{ 'focused': isFocused2 }" prop="password">
              <span class="svg-container">
                <svg-icon icon-class="password" />
              </span>
              <el-input
                :key="passwordType"
                ref="password"
                v-model="loginForm.password"
                :type="passwordType"
                placeholder="密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
                @focus="handleFocus2"
                @blur="handleBlur2"
              />
              <span class="show-pwd" @click="showPwd">
                <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
              </span>
            </el-form-item>

            <!-- 地址输入框 -->
            <el-form-item :class="{ 'focused': isFocused3 }" prop="address">
              <span class="svg-container">
                <svg-icon icon-class="location" />
              </span>
              <el-input
                v-model="loginForm.address"
                placeholder="地址"
                name="address"
                tabindex="3"
                auto-complete="on"
                @focus="handleFocus3"
                @blur="handleBlur3"
              />
            </el-form-item>

            <el-checkbox v-model="checked">记住信息</el-checkbox>

            <el-button
              :loading="loading"
              type="primary"
              style="height:55px;width:100%;margin-bottom:30px;"
              @click.prevent="handleLogin"
            >登录</el-button>
          </el-form>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'
import { getUser, setUser, removeUser } from '@/utils/auth' // 引入封装好的方法

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }

    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度至少为6位'))
      } else {
        callback()
      }
    }

    const validateAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入地址'))
      } else {
        callback()
      }
    }

    return {
      loginForm: {
        address: '',
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        address: [{ required: true, trigger: 'blur', validator: validateAddress }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      checked: false,
      isFocused1: false,
      isFocused2: false,
      isFocused3: false
    }
  },

  mounted() {
    // 从封装的getUser方法中获取保存的用户信息
    const savedUser = getUser()
    if (savedUser) {
      const user = JSON.parse(savedUser)
      this.loginForm.username = user.username
      this.loginForm.password = user.password
      this.loginForm.address = user.address
      this.checked = true
    }
  },

  methods: {
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    async handleLogin() {
      try {
        // 验证表单
        const valid = await this.$refs.loginForm.validate()
        if (!valid) {
          console.log('表单验证失败!')
          return false
        }

        // 开启 loading 状态
        this.loading = true

        // 调用登录接口
        const result = await login(this.loginForm)
        console.log(result)

        // 根据返回结果判断登录是否成功
        if (result.data.code === 1) {
          // 成功，保存 token
          setToken(result.data.data)

          // 根据是否勾选 "记住信息" 来存储或移除用户信息
          if (this.checked) {
            const user = {
              username: this.loginForm.username,
              password: this.loginForm.password,
              address: this.loginForm.address
            }
            setUser(JSON.stringify(user)) // 使用封装好的setUser存储
          } else {
            removeUser() // 使用封装好的removeUser移除
          }

          // 跳转到主页
          this.$router.push('/ashome')
        } else {
          // 登录失败，显示错误消息
          this.$message.error(result.data.msg)
        }
      } catch (error) {
        // 捕获错误并处理
        console.error('登录请求失败:', error)
        this.$message.error('登录请求失败')
      } finally {
        // 无论成功与否，最终都关闭 loading 状态
        this.loading = false
      }
    },

    handleFocus1() {
      this.isFocused1 = true
    },
    handleBlur1() {
      this.isFocused1 = false
    },
    handleFocus2() {
      this.isFocused2 = true
    },
    handleBlur2() {
      this.isFocused2 = false
    },
    handleFocus3() {
      this.isFocused3 = true
    },
    handleBlur3() {
      this.isFocused3 = false
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */
.el-aside {
  background-image: url(../../assets/login.png);
  background-size: 100% 100%;
  // background-repeat: no-repeat;
  // background-size: contain;
  background-color: #5e1010;
}

.el-main {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-container {
  height: calc(100vh);
}

.el-checkbox {
  margin-bottom: 20px;
}

$bg: #283443;
$light_gray: #000000;
$cursor: #000000;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(0, 0, 0, 0.1);
    background: rgba(154, 146, 146, 0.1);
    border-radius: 10px;
    color: #454545;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .el-form-item.focused {
    border-color: #409eff;
    /* 聚焦时边框颜色变为蓝色 */
    box-shadow: 0 0 5px rgba(64, 158, 255, 0.5);
    /* 添加阴影效果 */
  }

}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #000000;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 80px 5px 100px;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;
    padding-bottom: 50px;

    .title {
      font-size: 50px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: left;
      font-weight: bold;
      font-family: '微软雅黑';
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
