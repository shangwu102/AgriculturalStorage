<template>
  <div class="company-info-container">
    <el-card class="company-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>公司信息</span>
      </div>

      <!-- 仅在没有公司信息时显示认证按钮 -->
      <div v-if="!hasCompanyInfo" class="verification-container">
        <el-button type="primary" @click="openRegisterDialog">请先认证公司</el-button>
      </div>

      <!-- 有公司信息时显示公司详情 -->
      <div v-else class="company-details">
        <el-row :gutter="20">
          <!-- 企业名称 -->
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">公司名称：</span>
              <span class="info-content">{{ companyInfo.companyName }}</span>
            </div>
          </el-col>

          <!-- 统一社会信用代码 -->
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">社会信用代码：</span>
              <span class="info-content">{{ companyInfo.creditCode }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="info-row">
          <!-- 法定代表人 -->
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">链上地址：</span>
              <span class="info-content">{{ getCompanyAddress }}</span>
            </div>
          </el-col>

          <!-- 企业类型 -->
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">公司类型：</span>
              <span class="info-content">{{ getCompanyType(companyInfo.enterpriseType) }}</span>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="info-row">
          <!-- 经营场所 -->
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">经营场所：</span>
              <span class="info-content">{{ companyInfo.premises }}</span>
            </div>
          </el-col>

          <!-- 营业期限 -->
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">营业期限：</span>
              <span class="info-content">{{ companyInfo.businessPeriod }} 年</span>
            </div>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="info-row">
          <!-- 联系电话 -->
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">联系电话：</span>
              <span class="info-content">{{ companyInfo.phoneNumber }}</span>
            </div>
          </el-col>

          <!-- 经营范围 -->
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">经营范围：</span>
              <span class="info-content">{{ companyInfo.scope }}</span>
            </div>
          </el-col>

          <!-- 认证状态 -->
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">认证状态：</span>
              <el-tag
                :type="companyInfo.verificationStatus === 'approved' ? 'success' : (companyInfo.verificationStatus === 'rejected' ? 'danger' : 'warning')"
              >
                {{ statusText }}
              </el-tag>
            </div>

          </el-col>
          <el-col :span="12">
            <div class="info-item">
              <span class="info-label">法定代表人：</span>
              <span class="info-content">{{ companyInfo.legalRepresentative }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 认证公司弹窗 -->
    <el-dialog
      :visible.sync="registerDialogVisible"
      title="认证公司"
      width="80%"
      top="5vh"
      :modal="false"
      :fullscreen="false"
      class="register-dialog"
    >
      <el-form ref="registerFormRef" :model="registerForm" :rules="rules" label-width="150px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="公司名称" prop="enterpriseName">
              <el-input v-model="registerForm.enterpriseName" autocomplete="off" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="链上地址" prop="address">
              <el-input v-model="registerForm.address" disabled />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="企业类型" prop="enterpriseType">
              <el-radio-group v-model.number="registerForm.enterpriseType">
                <el-radio :label="0">制造业</el-radio>
                <el-radio :label="1">零售</el-radio>
                <el-radio :label="2">物流</el-radio>
                <el-radio :label="3">餐饮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="法定代表人" prop="representative">
              <el-input v-model="registerForm.representative" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第三行 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="经营场所" prop="premises">
              <el-input v-model="registerForm.premises" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="营业期限(年)" prop="businessYear">
              <el-input v-model.number="registerForm.businessYear" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第四行：上传图片 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="营业执照" prop="businessLicense">
              <el-upload
                class="upload-demo"
                action=""
                list-type="picture-card"
                :file-list="registerForm.businessLicenseFiles"
                :auto-upload="false"
                :on-remove="handleRemove"
                :before-upload="handleBeforeUpload"
                :on-change="handleFileChange"
              >
                <i class="el-icon-plus" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="认证日期" prop="time">
              <el-date-picker
                v-model="registerForm.time"
                type="datetime"
                placeholder="选择日期时间"
                :value-format="valueFormat"
                :format="format"
                @change="handleDateChange"
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第五行：手机号码、经营范围 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phoneNumber">
              <el-input v-model="registerForm.phoneNumber" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经营范围" prop="scope">
              <el-input v-model="registerForm.scope" type="textarea" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 第六行：密码 -->
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="密码" prop="passWord">
              <el-input v-model="registerForm.passWord" type="password" autocomplete="new-password" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="统一社会信用代码" prop="creditCode">
              <el-input v-model="registerForm.creditCode" autocomplete="off" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRegisterDialog">取消</el-button>
        <el-button type="primary" @click="submitForm('registerFormRef')">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      format: 'yyyy-MM-dd HH:mm:ss', // 显示格式
      valueFormat: 'timestamp', // 返回时间戳
      registerDialogVisible: false, // 控制注册对话框的显示
      companyInfo: {},
      registerForm: {
        enterpriseName: '',
        creditCode: '',
        enterpriseType: null, // Integer
        representative: '',
        premises: '',
        businessYear: null, // Number
        businessLicense: [], // 存储上传文件的 URL 或其他标识
        businessLicenseFiles: [], // 用于 el-upload 的 file-list
        phoneNumber: '',
        scope: '',
        passWord: '',
        time: null, // 时间戳
        address: ''
      },
      rules: {
        enterpriseName: [
          { required: true, message: '请输入企业或个体户名称', trigger: 'blur' }
        ],
        creditCode: [
          { required: true, message: '请输入统一社会信用代码', trigger: 'blur' }
          // { pattern: /^[0-9A-Z]+$/, message: '信用代码格式不正确', trigger: 'blur' }
        ],
        enterpriseType: [
          { required: true, message: '请选择公司类型', trigger: 'change' }
        ],
        representative: [
          { required: true, message: '请输入法定代表人', trigger: 'blur' }
        ],
        premises: [
          { required: true, message: '请输入经营场所', trigger: 'blur' }
        ],
        businessYear: [
          { required: true, message: '请输入营业期限', trigger: 'blur' }
          // { pattern: /^\d+$/, message: '营业期限必须为数字', trigger: 'blur' }
        ],
        phoneNumber: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
          // { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
        ],
        scope: [
          { required: true, message: '请输入经营范围', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
          // { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    /**
     * 判断是否存在公司信息
     */
    hasCompanyInfo() {
      return Object.keys(this.companyInfo).length > 0
    },
    // getCompanyName() {
    //   const name = JSON.parse(localStorage.getItem('company'))
    //   return name.userName
    // },
    /**
     * 计算显示的认证状态文本
     */
    statusText() {
      if (this.companyInfo.verificationStatus === 'approved') {
        return '已审核'
      } else if (this.companyInfo.verificationStatus === 'rejected') {
        return '审核拒绝'
      } else {
        return '审核中'
      }
    },
    /**
     * 获取当前用户的名称（模拟获取）
     */
    getCompanyName() {
      // 假设用户名称存储在 localStorage 中
      const user = JSON.parse(localStorage.getItem('company')) || {}
      return user.userName || '未命名公司'
    },
    /**
     * 获取当前用户的地址（模拟获取）
     */
    getCompanyAddress() {
      const user = JSON.parse(localStorage.getItem('company')) || {}
      return user.userAddr || ''
    }
  },
  created() {
    this.getCompanyInfo()
  },
  methods: {
    /**
     * 根据企业类型编号获取类型名称
     * @param {Number} type - 企业类型编号
     * @returns {String} - 企业类型名称
     */
    getCompanyType(type) {
      const types = {
        0: '制造业',
        1: '零售',
        2: '物流',
        3: '餐饮'
      }
      return types[type] || '未知类型'
    },
    /**
     * 处理日期变化
     * @param {Number} value - 时间戳
     */
    handleDateChange(value) {
      if (value) {
        this.registerForm.time = new Date(value).getTime()
      } else {
        this.registerForm.time = null
      }
    },
    /**
     * 获取公司信息
     */
    getCompanyInfo() {
      const storedInfo = localStorage.getItem('companyInfo')
      if (storedInfo) {
        this.companyInfo = JSON.parse(storedInfo)
      }
    },
    /**
     * 打开注册对话框
     */
    openRegisterDialog() {
      this.registerDialogVisible = true
      // 初始化表单数据
      this.registerForm.enterpriseName = this.getCompanyName
      // 其他字段可以根据需要预填充
      this.registerForm.address = this.getCompanyAddress
    },
    /**
     * 关闭注册对话框并重置表单
     */
    closeRegisterDialog() {
      this.registerDialogVisible = false
      this.$refs.registerFormRef.resetFields()
      // 清空上传文件列表
      this.registerForm.businessLicenseFiles = []
      this.registerForm.businessLicense = []
    },
    /**
     * 处理上传文件变化
     * @param {File} file
     * @param {Array} fileList
     */
    handleFileChange(file, fileList) {
      // 模拟文件上传，直接存储文件名
      this.registerForm.businessLicenseFiles = fileList.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file.raw)
      }))
      this.registerForm.businessLicense = this.registerForm.businessLicenseFiles.map(file => file.url)
    },
    /**
     * 处理上传前的校验
     * @param {File} file
     * @returns {Boolean}
     */
    handleBeforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        this.$message.error('只能上传图片文件')
      }
      return isImage
    },
    /**
     * 移除上传的文件
     * @param {File} file
      */
    handleRemove(file) {
      this.registerForm.businessLicense = this.registerForm.businessLicense.filter(url => url !== file.url)
    },
    /**
     * 提交表单
     * @param {String} formName - 表单引用名称
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 准备提交的数据
          const payload = {
            companyName: this.registerForm.enterpriseName,
            creditCode: this.registerForm.creditCode,
            enterpriseType: this.registerForm.enterpriseType, // Integer
            legalRepresentative: this.registerForm.representative,
            premises: this.registerForm.premises,
            businessPeriod: this.registerForm.businessYear,
            phoneNumber: this.registerForm.phoneNumber,
            scope: this.registerForm.scope,
            passWord: this.registerForm.passWord,
            time: this.registerForm.time,
            businessLicense: this.registerForm.businessLicense,
            verificationStatus: 'pending' // 审核中
          }

          // 保存到 localStorage
          localStorage.setItem('companyInfo', JSON.stringify(payload))

          // 更新本地数据
          this.companyInfo = payload

          this.$message({
            type: 'success',
            message: '注册申请已提交，等待管理员审核。'
          })

          // 关闭对话框并重置表单
          this.closeRegisterDialog()
        } else {
          this.$message.error('请完善表单信息')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>
.company-info-container {
  width: 80%;
  margin: 20px auto;
}

.company-card {
  padding: 20px;
}

.info-item {
  margin-bottom: 20px;
}

.info-label {
  font-weight: bold;
  color: #333;
}

.info-content {
  margin-left: 10px;
  color: #666;
}

.verification-container {
  text-align: center;
  padding: 40px 0;
}

/* 调整弹窗内表单的样式 */
.register-dialog .el-form {
  padding: 20px;
}

/* 调整弹窗内元素的间距 */
.register-dialog .el-form-item {
  margin-bottom: 20px;
}

.dialog-footer {
  text-align: right;
  padding: 10px;
}
.el-input.is-disabled>>>.el-input__inner {
  background-color: #cbc6c6;
  border-color: #E4E7ED;
  color: #281e35;
  cursor: not-allowed;
}
</style>
