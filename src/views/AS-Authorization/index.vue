<template>
  <div class="user-center">
    <!-- 用户信息卡片布局 -->
    <el-row :gutter="20">
      <!-- 第一个用户信息卡片 -->
      <el-col :span="12">
        <el-card
          :class="[role === 'admin' ? 'admin-card' : 'operator-card']"
          shadow="hover"
          style="max-height: 450px; height: 450px;"
        >
          <div slot="header">
            <span style="font-weight: bold;">{{ roleTitle }}</span>
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
                  <el-button
                    type="primary"
                    :class="[role === 'admin' ? 'admin-card' : 'operator-card-button']"
                    @click="openPasswordDialog"
                  >修改密码</el-button>
                </el-col>
                <!-- 只有角色是 'admin' 时显示授权用户按钮 -->
                <el-col v-if="role === 'admin'" :span="12">
                  <el-button type="primary" @click="openAuthorizeDialog">授权操作员</el-button>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>

      <!-- 第二个用户信息卡片 -->
      <el-col v-if="role === 'admin'" :span="12">
        <el-card class="user-card" shadow="hover" style="max-height: 450px;height: 450px;">
          <div slot="header">
            <span style="font-weight: bold;">操作员列表</span>
          </div>
          <el-form>
            <el-form-item>
              <el-table
                v-if="operators.length > 0"
                :data="operators"
                style="width: 100%; max-height: 350px; overflow-y: auto;"
              >
                <!-- 第一列：用户名 -->
                <el-table-column prop="username" label="用户名" width="100" />

                <!-- 第二列：区块链地址 -->
                <el-table-column prop="address" label="区块链地址" width="180">
                  <template slot-scope="scope">
                    <el-tooltip class="item" effect="dark" :content="scope.row.address" placement="top">
                      <span class="ellipsis-text">{{ scope.row.address || '无' }}</span>
                    </el-tooltip>
                  </template>
                </el-table-column>

                <!-- 第三列：操作 -->
                <el-table-column label="操作" width="200">
                  <template slot-scope="scope">
                    <div style="border: none;">
                      <el-button type="primary" size="mini" @click="showDetails(scope.row)">详情</el-button>
                      <el-button type="danger" size="mini" @click="removeOperator(scope.row)">删除</el-button>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
              <div v-else style="text-align: center; padding: 20px;">
                当前无操作员
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
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
    <el-dialog title="角色授权" :visible.sync="authorizeDialogVisible" width="50%">
      <el-form ref="authForm" :model="authForm" :rules="authFormRules" label-width="100px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="authForm.username" placeholder="请输入要授权的用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="authForm.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item label="区块链地址" prop="blockchainAddress">
          <el-input v-model="authForm.blockchainAddress" placeholder="请输入区块链地址" />
        </el-form-item>
        <!-- 主管仓库 -->
        <el-form-item label="主管仓库" prop="warehouse">
          <el-checkbox-group v-model="authForm.warehouse">
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

    <!-- Drawer 抽屉 -->
    <!-- <el-drawer title="操作员详情信息" :visible.sync="drawerVisible" direction="rtl" size="40%">
      <div v-if="currentOperator">
        <p><strong>用户名：</strong> {{ currentOperator.username }}</p>
        <p><strong>区块链地址：</strong> {{ currentOperator.address }}</p>
        <p><strong>管理的仓库：</strong> {{ currentOperator.warehouse.join(', ') || '无' }}</p>
      </div>
    </el-drawer> -->

    <el-drawer title="操作员详情信息" :visible.sync="drawerVisible" direction="rtl" size="40%">
      <div v-if="currentOperator" class="drawer-content">
        <el-row class="drawer-row">
          <el-col :span="8"><strong>用户名:</strong></el-col>
          <el-col :span="16">{{ currentOperator.username }}</el-col>
        </el-row>
        <el-divider />
        <el-row class="drawer-row">
          <el-col :span="8"><strong>区块链地址:</strong></el-col>
          <el-col :span="16">{{ currentOperator.address }}</el-col>
        </el-row>
        <el-divider />
        <el-row class="drawer-row">
          <el-col :span="8"><strong>所管仓库:</strong></el-col>
          <el-col :span="16">{{ currentOperator.warehouse.join(', ') || '无' }}</el-col>
        </el-row>
        <el-divider />
      </div>
    </el-drawer>
    <!-- 其他对话框和内容略... -->
  </div>
</template>

<script>
import { getUser } from '@/utils/auth'

export default {
  data() {
    return {
      userInfo: {
        username: '',
        address: '',
        role: ''
      },
      passwordDialogVisible: false,
      authorizeDialogVisible: false,
      drawerVisible: false,
      currentOperator: null,
      passwordForm: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
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
      authForm: {
        username: '',
        blockchainAddress: '',
        password: '',
        warehouse: []
      },
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
      },
      operators: JSON.parse(localStorage.getItem('AS-operators')) || []
    }
  },
  computed: {
    role() {
      const user = JSON.parse(getUser())
      return user ? user.role : ''
    },
    roleTitle() {
      return this.role === 'operator' ? '操作员信息' : '管理员中心'
    }
  },
  created() {
    const user = JSON.parse(getUser())
    this.userInfo = user || {}
  },
  methods: {
    openPasswordDialog() {
      this.passwordDialogVisible = true
    },
    openAuthorizeDialog() {
      this.authorizeDialogVisible = true
    },
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
    submitAuthForm() {
      this.$refs.authForm.validate((valid) => {
        if (valid) {
          this.operators.push({
            username: this.authForm.username,
            address: this.authForm.blockchainAddress,
            warehouse: Array.isArray(this.authForm.warehouse) ? this.authForm.warehouse : []
          })
          localStorage.setItem('AS-operators', JSON.stringify(this.operators))
          this.authorizeDialogVisible = false
          this.$message({
            type: 'success',
            message: '授权成功！'
          })
        } else {
          return false
        }
      })
    },
    removeOperator(operator) {
      this.operators = this.operators.filter(op => op.username !== operator.username)
      localStorage.setItem('AS-operators', JSON.stringify(this.operators))
      this.$message({
        type: 'success',
        message: '操作员已删除！'
      })
    },
    showDetails(operator) {
      this.currentOperator = operator
      this.drawerVisible = true
    }
  }
}
</script>

<style scoped>
.el-table::before,
.el-form-item::before {
  content: none;
  border: none;
}

.user-center {
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
}

.operator-card {
  position: relative;
  left: 50%;
}

.operator-card-button {
  position: relative;
  left: 50%;
  width: 80%;
}

.user-info-form {
  position: relative;
  margin-top: 7%;
  width: 100%;
}

.dialog-footer {
  text-align: right;
}

.ellipsis-text {
  display: inline-block;
  max-width: 90%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}

/* 每一行样式 */
.drawer-row {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

/* 设置文本样式 */
.drawer-row strong {
  font-size: 14px;
  color: #666;
}

.el-divider {
  margin: 15px 0;
}

/* 行内文本样式 */
.drawer-row el-col:nth-child(2) {
  font-size: 14px;
  color: #333;
}

.drawer-content {
  padding: 10px;
}

.drawer-content .el-row {
  margin-bottom: 15px;
}

.drawer-content .el-divider {
  margin: 10px 0;
}
</style>
