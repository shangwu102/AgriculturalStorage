<template>
  <div class="login-container">
    <el-container>
      <!-- <el-aside width="65vw" /> -->
      <el-main>
        <div class="login-form-wrapper">
          <el-form
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
                  <svg-icon icon-class="block" style="font-size: 17px;" />
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
          <el-button
            :loading="loading"
            type="primary"
            class="login-button"
            style="position: relative;left: 25px;float: right;border-radius: 15px; width: 400px;"
            @click="handleLogin"
          >登录</el-button>
          <div style="position: relative;left: 10%;">
            <span
              style="position: absolute;cursor:pointer;left: 77%;padding-top: 17%; color: #409EFF;display: inline-block;"
              @click="showRegisterDialog"
            >注册公司</span>
          </div>
          <!-- 注册对话框 -->
          <el-dialog :visible.sync="registerDialogVisible" title="注册公司" width="80%" top="5vh">
            <el-form ref="registerFormRef" :model="registerForm" :rules="rules" label-width="150px">
              <!-- 第一行 -->
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业或个体户名称" prop="companyName">
                    <el-input v-model="registerForm.companyName" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="统一社会信用代码" prop="creditCode">
                    <el-input v-model="registerForm.creditCode" />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第二行 -->
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="企业类型" prop="companyTypes">
                    <el-checkbox-group v-model="registerForm.companyTypes">
                      <el-checkbox label="生产企业" />
                      <el-checkbox label="粮油经营户" />
                      <el-checkbox label="粮品电商" />
                      <el-checkbox label="餐饮企业" />
                      <el-checkbox label="粮食储备库" />
                      <el-checkbox label="仓储物流企业" />
                    </el-checkbox-group>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="法定代表人" prop="legalPerson">
                    <el-input v-model="registerForm.legalPerson" />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第三行 -->
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="经营场所" prop="businessPlace">
                    <el-input v-model="registerForm.businessPlace" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="营业期限(年)" prop="businessTerm">
                    <el-input v-model="registerForm.businessTerm" />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第四行：上传图片 -->
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="营业执照" prop="businessLicense">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card">
                      <i class="el-icon-plus" />
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="身份证件" prop="idCard">
                    <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" multiple>
                      <i class="el-icon-plus" />
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第五行：手机号码、经营范围 -->
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="registerForm.phone" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="经营范围" prop="businessScope">
                    <el-input v-model="registerForm.businessScope" type="textarea" />
                  </el-form-item>
                </el-col>
              </el-row>

              <!-- 第六行：密码和核验状态 -->
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-form-item label="密码" prop="password">
                    <el-input v-model="registerForm.password" type="password" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="核验状态" prop="verificationStatus">
                    <el-input v-model="registerForm.verificationStatus" disabled />
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="registerDialogVisible = false">取消</el-button>
              <el-button type="primary" @click="submitForm('registerFormRef')">提交</el-button>
            </div>
          </el-dialog>

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
    return {
      registerDialogVisible: false,
      registerForm: {
        companyName: '',
        creditCode: '',
        companyTypes: [],
        legalPerson: '',
        businessPlace: '',
        businessTerm: '',
        businessLicense: '',
        idCard: '',
        phone: '',
        businessScope: '',
        password: '',
        verificationStatus: '未核验'
      },
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
      redirect: undefined,
      checked: false,
      isFocused1: false,
      isFocused2: false,
      isFocused3: false,
      isFocused4: false
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
    showPwd() {
      this.passwordType = this.passwordType === 'password' ? '' : 'password'
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showRegisterDialog() {
      this.registerDialogVisible = true
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
      console.log(1111)

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
    }
  }

}

</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2d3a4b;
}

.el-main {
  background-color: #88bd86;
  background-image: url(../../assets/login.jpg);
  background-size: cover;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 10%;

}

.el-container {
  height: 100vh;
}

.login-form-wrapper {
  width: 450px;
  height: 530px;
  padding: 20px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 50px;
opacity: 0.9;
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
  text-align: center;
  margin-bottom: 30px;
}

.title {
  font-size: 30px;
  font-weight: bold;
  color: #333;
  font-family: '仿宋';
}

.el-checkbox {
  margin-bottom: 12px;
}

.login-button {
  height: 50px;
  width: 100%;
  font-size: 18px;
}

.role-and-remember {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
