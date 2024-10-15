<template>
  <div class="user-center">
    <el-card class="user-card" shadow="hover">
      <div slot="header">
        <span style="font-weight: bold;">用户管理中心</span>
      </div>
      <el-form :model="userInfo" class="user-info-form" label-width="100px">
        <!-- 角色 -->
        <el-form-item label="角色">
          <el-row>
            <el-col :span="24">
              <el-input v-model="userInfo.role" disabled />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 用户名 -->
        <el-form-item label="用户名">
          <el-row>
            <el-col :span="24">
              <el-input v-model="userInfo.username" disabled />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 区块链地址 -->
        <el-form-item label="区块链地址">
          <el-row>
            <el-col :span="24">
              <el-input v-model="userInfo.address" disabled />
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 功能按钮 -->
        <el-form-item>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-button type="primary" @click="openPasswordDialog">修改密码</el-button>
            </el-col>
            <!-- 只有角色是 'admin' 时显示授权用户按钮 -->
            <el-col v-if="role === 'admin'" :span="12">
              <el-button type="primary" @click="openAuthorizeDialog">授权操作员</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 修改密码的对话框 -->
    <el-dialog title="修改密码" :visible.sync="passwordDialogVisible" width="30%">
      <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="100px">
        <el-form-item label="当前密码" prop="currentPassword">
          <el-input v-model="passwordForm.currentPassword" type="password" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="passwordForm.newPassword" type="password" />
        </el-form-item>
        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input v-model="passwordForm.confirmPassword" type="password" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passwordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitPasswordForm">确认修改</el-button>
      </div>
    </el-dialog>

    <!-- 角色授权的对话框 -->
    <el-dialog title="角色授权" :visible.sync="authorizeDialogVisible" width="30%">
      <el-form ref="authForm" :model="authForm" :rules="authFormRules" label-width="100px">
        <!-- 用户名输入框 -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="authForm.username" placeholder="请输入要授权的用户名" />
        </el-form-item>
        <!-- 密码输入框 -->
        <el-form-item label="密码" prop="password">
          <el-input v-model="authForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <!-- 区块链地址输入框 -->
        <el-form-item label="区块链地址" prop="blockchainAddress">
          <el-input v-model="authForm.blockchainAddress" placeholder="请输入区块链地址" />
        </el-form-item>
        <!-- 主管仓库 -->
        <el-form-item label="主管仓库" prop="supervisorWarehouse">
          <el-checkbox-group v-model="checkList">
            <el-row>
              <el-col :span="8">
                <el-checkbox label="一号仓库" />
              </el-col>
              <el-col :span="8">
                <el-checkbox label="二号仓库" />
              </el-col>
              <el-col :span="8">
                <el-checkbox label="三号仓库" />
              </el-col>
              <el-col :span="8">
                <el-checkbox label="四号仓库" />
              </el-col>
              <el-col :span="8">
                <el-checkbox label="五号仓库" />
              </el-col>
              <el-col :span="8">
                <el-checkbox label="六号仓库" />
              </el-col>
            </el-row>
          </el-checkbox-group>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="authorizeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitAuthForm">确认授权</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getUser } from '@/utils/auth' // 引入你封装的本地存储工具

export default {
  data() {
    return {
      // 主管仓库
      checkList: [],
      // 用户信息
      userInfo: {
        username: '',
        address: '',
        role: ''
      },

      // 修改密码对话框的可见状态
      passwordDialogVisible: false,

      // 授权用户对话框的可见状态
      authorizeDialogVisible: false,

      // 修改密码表单数据
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },

      // 修改密码表单验证规则
      passwordRules: {
        currentPassword: [
          { required: true, message: '请输入当前密码', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 6, message: '密码长度至少为 6 位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.passwordForm.newPassword) {
                callback(new Error('两次输入的密码不一致'))
              } else {
                callback()
              }
            },
            trigger: 'blur'
          }
        ]
      },

      // 授权用户表单数据
      authForm: {
        username: '',
        blockchainAddress: '',
        password: '',
        supervisorWarehouse: ''
      },

      // 授权用户表单验证规则
      authFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        blockchainAddress: [
          { required: true, message: '请输入区块链地址', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    // 从本地中获取用户的角色
    role() {
      const user = JSON.parse(getUser()) // 从 localStorage 中获取用户信息
      return user ? user.role : '' // 如果存在用户信息，则返回角色，否则返回空字符串
    }
  },
  created() {
    const user = JSON.parse(getUser())
    this.userInfo = user || {}
  },
  methods: {
    // 打开修改密码对话框
    openPasswordDialog() {
      this.passwordDialogVisible = true
    },

    // 打开授权用户对话框
    openAuthorizeDialog() {
      this.authorizeDialogVisible = true
    },

    // 提交修改密码表单
    submitPasswordForm() {
      this.$refs.passwordForm.validate((valid) => {
        if (valid) {
          console.log('密码修改成功:', this.passwordForm)
          this.passwordDialogVisible = false
          this.$message({
            type: 'success',
            message: '密码修改成功！'
          })
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    },

    // 提交授权表单
    submitAuthForm() {
      this.$refs.authForm.validate((valid) => {
        if (valid) {
          console.log('授权信息:', this.authForm)
          this.authorizeDialogVisible = false
          this.$message({
            type: 'success',
            message: '授权成功！'
          })
        } else {
          console.log('表单验证失败')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.user-center {
  width: 500px;
  margin: 50px auto;
}

.user-card {
  padding: 20px;
}

.user-info-form {
  width: 100%;
}

.dialog-footer {
  text-align: right;
}
.el-form-item .el-checkbox-group {
  display: flex;
  flex-wrap: wrap;
}

.el-form-item .el-checkbox-group .el-col {
  display: flex;
  align-items: center;
}
</style>
