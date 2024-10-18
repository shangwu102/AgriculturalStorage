<template>
  <div class="login-container">
    <el-container>
      <el-main>
        <div class="login-form-wrapper">
          <!-- 使用 <transition> 包裹表单以添加动画 -->
          <transition name="fade-slide" mode="out-in">
            <!-- 登录表单 -->
            <el-form
              v-if="!isRegisterFormVisible"
              key="login"
              ref="loginForm"
              :model="loginForm"
              :rules="loginRules"
              class="login-form"
              auto-complete="on"
              label-position="left"
            >
              <div class="title-container">
                <h3 class="title">面向区块链粮仓管理系统</h3>
              </div>

              <!-- 用户名输入框 -->
              <el-form-item :class="{ 'focused': isFocused1 }" prop="username">
                <div class="input-group">
                  <span class="svg-container">
                    <svg-icon icon-class="user" />
                  </span>
                  <el-input
                    ref="username"
                    v-model="loginForm.username"
                    placeholder="请输入用户名"
                    name="username"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                    class="custom-input"
                    @focus="handleFocus1"
                    @blur="handleBlur1"
                  />
                </div>
              </el-form-item>

              <!-- 密码输入框 -->
              <el-form-item :class="{ 'focused': isFocused2 }" prop="password">
                <div class="input-group">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input
                    :key="passwordType"
                    ref="password"
                    v-model="loginForm.password"
                    :type="passwordType"
                    placeholder="请输入密码"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    class="custom-input"
                    @keyup.enter.native="handleLogin"
                    @focus="handleFocus2"
                    @blur="handleBlur2"
                  />
                  <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </div>
              </el-form-item>

              <!-- 地址输入框 -->
              <el-form-item :class="{ 'focused': isFocused3 }" prop="address">
                <div class="input-group">
                  <span class="svg-container">
                    <svg-icon icon-class="block" style="font-size: 17px; color: aqua;" />
                  </span>
                  <el-input
                    v-model="loginForm.address"
                    placeholder="请输入区块链地址"
                    name="address"
                    tabindex="3"
                    auto-complete="on"
                    class="custom-input"
                    @focus="handleFocus3"
                    @blur="handleBlur3"
                  />
                </div>
              </el-form-item>

              <!-- 角色选择单选框 -->
              <el-form-item :class="{ 'focused': isFocused4 }" prop="role">
                <div class="role-and-remember">
                  <el-radio-group v-model="loginForm.role" class="role-selector">
                    <el-radio label="admin">管理员</el-radio>
                    <el-radio label="operator">操作员</el-radio>
                    <el-radio label="company">公司</el-radio>
                  </el-radio-group>
                  <el-checkbox v-model="checked" class="remember-me">记住信息</el-checkbox>
                </div>
              </el-form-item>
            </el-form>

            <!-- 注册表单 -->
            <el-form
              v-if="isRegisterFormVisible"
              key="register"
              ref="registerForm"
              :model="registerForm"
              :rules="registerRules"
              class="register-form"
              auto-complete="on"
              label-position="left"
            >
              <div class="title-container">
                <h3 class="title">注册公司</h3>
              </div>

              <!-- 公司名称输入框 -->
              <el-form-item :class="{ 'focused': isRegisterFocused1 }" prop="companyName">
                <div class="input-group">
                  <span class="svg-container">
                    <svg-icon icon-class="company" style="font-size: 17px;" />
                  </span>
                  <el-input
                    v-model="registerForm.companyName"
                    placeholder="请输入公司名称"
                    name="companyName"
                    type="text"
                    tabindex="1"
                    auto-complete="on"
                    class="custom-input"
                    @focus="handleRegisterFocus1"
                    @blur="handleRegisterBlur1"
                  />
                </div>
              </el-form-item>

              <!-- 密码输入框 -->
              <el-form-item :class="{ 'focused': isRegisterFocused2 }" prop="password">
                <div class="input-group">
                  <span class="svg-container">
                    <svg-icon icon-class="password" />
                  </span>
                  <el-input
                    :key="registerPasswordType"
                    ref="registerPassword"
                    v-model="registerForm.password"
                    :type="registerPasswordType"
                    placeholder="请输入密码"
                    name="password"
                    tabindex="2"
                    auto-complete="on"
                    class="custom-input"
                    @keyup.enter.native="handleRegister"
                    @focus="handleRegisterFocus2"
                    @blur="handleRegisterBlur2"
                  />
                  <span class="show-pwd" @click="showRegisterPwd">
                    <svg-icon :icon-class="registerPasswordType === 'password' ? 'eye' : 'eye-open'" />
                  </span>
                </div>
              </el-form-item>

              <!-- 地址输入框 -->
              <el-form-item :class="{ 'focused': isRegisterFocused3 }" prop="address">
                <div class="input-group">
                  <span class="svg-container">
                    <svg-icon icon-class="block" style="font-size: 17px;" />
                  </span>
                  <el-input
                    v-model="registerForm.address"
                    placeholder="请输入区块链地址"
                    name="address"
                    tabindex="3"
                    auto-complete="on"
                    class="custom-input"
                    @focus="handleRegisterFocus3"
                    @blur="handleRegisterBlur3"
                  />
                </div>
              </el-form-item>
            </el-form>
          </transition>

          <!-- 登录按钮或注册按钮 -->
          <el-button :loading="loading" type="primary" class="login-button" @click="handleSubmit">
            {{ isRegisterFormVisible ? '注册' : '登录' }}
          </el-button>

          <!-- 切换表单的链接放在按钮下方右侧 -->
          <div class="toggle-form">
            <span @click="toggleForm">
              {{ isRegisterFormVisible ? '返回登录' : '注册公司' }}
            </span>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { validUsername } from '@/utils/validate'
// import { login } from '@/api/user'
// import { setToken } from '@/utils/auth'
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

    const validateRole = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请选择角色'))
      } else {
        callback()
      }
    }

    const validatePhone = (rule, value, callback) => {
      const phoneRegex = /^[1]([3-9])[0-9]{9}$/
      if (!value) {
        callback(new Error('请输入手机号码'))
      } else if (!phoneRegex.test(value)) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }

    // 验证注册表单的公司名称
    const validateCompanyName = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入公司名称'))
      } else {
        callback()
      }
    }

    // 验证注册表单的密码
    const validateRegisterPassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码长度至少为6位'))
      } else {
        callback()
      }
    }

    // 验证注册表单的地址
    const validateRegisterAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入区块链地址'))
      } else {
        callback()
      }
    }

    return {
      isRegisterFormVisible: false, // 控制表单显示状态
      registerForm: {
        companyName: '',
        password: '',
        address: ''
      },
      registerRules: {
        companyName: [{ required: true, trigger: 'blur', validator: validateCompanyName }],
        password: [{ required: true, trigger: 'blur', validator: validateRegisterPassword }],
        address: [{ required: true, trigger: 'blur', validator: validateRegisterAddress }]
      },
      // 原始登录表单
      loginForm: {
        address: '',
        username: '',
        password: '',
        role: '' // 新增字段
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        address: [{ required: true, trigger: 'blur', validator: validateAddress }],
        role: [{ required: true, trigger: 'blur', validator: validateRole }] // 校验角色
      },
      rules: {
        companyName: [{ required: true, message: '请输入企业或个体户名称', trigger: 'blur' }],
        creditCode: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
        companyTypes: [{ required: true, type: 'array', message: '请选择企业类型', trigger: 'change' }],
        legalPerson: [{ required: true, message: '请输入法定代表人', trigger: 'blur' }],
        businessPlace: [{ required: true, message: '请输入营业场所', trigger: 'blur' }],
        businessTerm: [{ required: true, message: '请输入营业期限', trigger: 'blur' }],
        businessLicense: [{ required: true, message: '请上传营业执照', trigger: 'change' }],
        idCard: [{ required: true, message: '请上传身份证件', trigger: 'change' }],
        phone: [{ validator: validatePhone, trigger: 'blur' }],
        businessScope: [{ required: true, message: '请输入经营范围', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      loading: false,
      passwordType: 'password',
      registerPasswordType: 'password', // 控制注册表单密码显示
      redirect: undefined,
      checked: false,
      isFocused1: false,
      isFocused2: false,
      isFocused3: false,
      isFocused4: false,
      // 注册表单焦点状态
      isRegisterFocused1: false,
      isRegisterFocused2: false,
      isRegisterFocused3: false
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
      this.loginForm.role = user.role
      // 如果已保存，填充角色信息
      this.checked = true
    }
  },

  methods: {
    handleSubmit() {
      if (this.isRegisterFormVisible) {
        this.handleRegister()
      } else {
        this.handleLogin()
      }
    },
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showRegisterPwd() {
      this.registerPasswordType = this.registerPasswordType === 'password' ? 'text' : 'password'
      this.$nextTick(() => {
        this.$refs.registerPassword.focus()
      })
    },
    toggleForm() {
      this.isRegisterFormVisible = !this.isRegisterFormVisible
      console.log('切换表单状态:', this.isRegisterFormVisible ? '注册' : '登录') // 添加日志
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$message.success('提交成功')
        } else {
          this.$message.error('请检查输入项')
          return false
        }
      })
    },
    async handleLogin() {
      console.log('开始登录') // 添加日志

      try {
        const valid = await this.$refs.loginForm.validate()
        if (!valid) {
          console.log('表单验证失败!')
          return false
        }

        this.loading = true
        // const result = await login(this.loginForm)

        // if (result.data.code === 1) {
        //   setToken(result.data.data)

        //   if (this.checked) {
        //     const user = {
        //       username: this.loginForm.username,
        //       password: this.loginForm.password,
        //       address: this.loginForm.address,
        //       role: this.loginForm.role
        //     }
        //     setUser(JSON.stringify(user))
        //   } else {
        //     removeUser()
        //   }

        //   // 根据用户角色跳转
        //   if (this.loginForm.role === 'admin' || this.loginForm.role === 'operator') {
        //     this.$router.push('/ashome') // 管理员或操作员跳转 ashome
        //   } else if (this.loginForm.role === 'company') {
        //     this.$router.push('/ascompany') // 公司用户跳转 ascompany
        //   }
        // } else {
        //   this.$message.error(result.data.msg)
        // }
        // 根据用户角色跳转 临时测试代码-------------------------------------------------------------------
        // 使用 Vuex 调用 login action
        await this.$store.dispatch('user/login', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          address: this.loginForm.address,
          role: this.loginForm.role
        })

        // 获取用户信息并存入 Vuex
        const userInfo = {
          username: this.loginForm.username,
          address: this.loginForm.address,
          role: this.loginForm.role,
          password: this.loginForm.password
        }
        this.$store.dispatch('user/setUserInfo', userInfo)

        // 本地存储选项，根据是否勾选 "记住信息" 来决定是否存储
        if (this.checked) {
          setUser(JSON.stringify(userInfo)) // 存储到本地
        } else {
          removeUser() // 清除本地存储
        }

        const user = {
          username: this.loginForm.username,
          password: this.loginForm.password,
          address: this.loginForm.address,
          role: this.loginForm.role
        }
        setUser(JSON.stringify(user))
        if (this.loginForm.role === 'admin' || this.loginForm.role === 'operator') {
          this.$router.push('/ashome') // 管理员或操作员跳转 ashome
        } else if (this.loginForm.role === 'company') {
          this.$router.push('/company') // 公司用户跳转 ascompany
        }
      } catch (error) {
        console.error('登录请求失败:', error)
        this.$message.error('请检查输入项')
      } finally {
        this.loading = false
      }
    },
    async handleRegister() {
      console.log('开始注册') // 添加日志
      try {
        const valid = await this.$refs.registerForm.validate()
        if (!valid) {
          this.$message.error('请检查输入项')
          return false
        }

        this.loading = true
        // 在这里添加注册逻辑，例如调用注册 API
        console.log('注册成功')

        // 模拟注册成功后，切换回登录表单
        this.$message.success('注册成功，请登录')
        this.isRegisterFormVisible = false
      } catch (error) {
        console.error('注册请求失败:', error)
        this.$message.error('注册失败，请重试')
      } finally {
        this.loading = false
      }
    },

    // 登录表单焦点事件
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
    },
    handleFocus4() {
      this.isFocused4 = true
    },
    handleBlur4() {
      this.isFocused4 = false
    },

    // 注册表单焦点事件
    handleRegisterFocus1() {
      this.isRegisterFocused1 = true
    },
    handleRegisterBlur1() {
      this.isRegisterFocused1 = false
    },
    handleRegisterFocus2() {
      this.isRegisterFocused2 = true
    },
    handleRegisterBlur2() {
      this.isRegisterFocused2 = false
    },
    handleRegisterFocus3() {
      this.isRegisterFocused3 = true
    },
    handleRegisterBlur3() {
      this.isRegisterFocused3 = false
    }
  }

}
</script>
<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: right;
  justify-content: right;
  // background-color: #2d3a4b;
}

.el-main {
  position: relative;
  background-color: #88bd86;
  display: flex;
  justify-content: right;

  /* 调整为居中 */
  align-items: center;
  padding-right: 0;
  /* 移除右侧填充 */
  z-index: 1;
}

.el-main::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/login-bg-5.c0daa08c.jpg);
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.el-container {
  height: 100vh;
}

.login-form-wrapper {
  width: 450px;
  min-height: 530px; // 使用最小高度以保持一致
  background-color: #fff;
  border-radius: 15px;
  padding: 50px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between; // 分配空间以保持高度一致
    margin-right: 50px;
}

.el-form-item {
  margin-bottom: 25px;

  .input-group {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e0e0e0;
    padding: 5px 0;

    .svg-container {
      margin-right: 10px;
      color: #889aa4;
      display: flex;
      align-items: center;
    }

    .custom-input {
      flex: 1;
      border: none;
      font-size: 16px;
      color: #333;

      ::v-deep .el-input__inner {
        border: none;
        box-shadow: none;
      }

      ::v-deep .el-input__inner:focus {
        border: none;
        box-shadow: none;
      }
    }

    .show-pwd {
      cursor: pointer;
      color: #889aa4;
      margin-left: auto;
    }
  }
}

.title-container {
  display: flex;
  justify-content: space-between; // 左右对齐
  align-items: center;
  margin-bottom: 30px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  color: #333;
  font-family: '仿宋';
}

.toggle-link {
  cursor: pointer;
  color: #409EFF;
  text-decoration: underline;
  font-size: 14px;
  transition: color 0.3s;

  &:hover {
    color: #3071d1;
  }
}

.el-checkbox {
  margin-bottom: 12px;
}

.login-button {
  height: 50px;
  width: 100%;
  font-size: 18px;
  border-radius: 15px;
  margin-bottom: 10px; // 为按钮和切换链接之间添加间距
}

.role-and-remember {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-form {
  text-align: right; // 右对齐

  span {
    cursor: pointer;
    color: #409EFF;
    text-decoration: underline;
    font-size: 14px;
    transition: color 0.3s;

    &:hover {
      color: #3071d1;
    }
  }
}

/* 动画效果 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.5s ease;
}

.fade-slide-enter,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 保证注册表单与登录表单样式一致 */
.register-form {
  /* 如果注册表单需要特有样式，可以在这里添加 */
}

/* 响应式调整 */
@media (max-width: 500px) {
  .login-form-wrapper {
    width: 90%;
    padding: 30px;
    min-height: auto; // 取消固定高度
  }

  .title {
    font-size: 24px;
  }

  .login-button {
    font-size: 16px;
  }

  .toggle-link {
    font-size: 12px;
  }
}
</style>
