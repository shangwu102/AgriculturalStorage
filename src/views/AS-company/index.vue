<template>
  <div class="company-info-container">
    <el-card class="company-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>公司信息</span>
      </div>

      <!-- 根据认证状态显示认证按钮或公司信息 -->
      <div v-if="!hasCompanyInfo" class="verification-container">
        <el-button type="primary" @click="openRegisterDialog">请先认证公司</el-button>
      </div>

      <div v-else-if="companyInfo.status === 0" class="company-details">
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
              <span class="info-label">法定代表人：</span>
              <span class="info-content">{{ companyInfo.legalRepresentative }}</span>
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
              <span class="info-content">{{ companyInfo.businessPeriod }}</span>
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
              <span class="info-content">{{ statusText }}</span>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <!-- 注册公司弹窗 -->
    <el-dialog
      :visible.sync="registerDialogVisible"
      title="注册公司"
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
              <el-input v-model="registerForm.enterpriseName" :disabled="true" autocomplete="off" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="统一社会信用代码" prop="creditCode">
              <el-input v-model="registerForm.creditCode" autocomplete="off" />
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
                action="https://your-backend.com/api/upload"
                list-type="picture-card"
                :on-success="(response, file, fileList) => handleUploadSuccess(response, file, fileList, 'businessLicense')"
                :before-upload="beforeUpload"
                :file-list="registerForm.businessLicenseFiles"
                :auto-upload="true"
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
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRegisterDialog">取消</el-button>
        <el-button type="primary" @click="submitForm('registerFormRef')">提交</el-button>
      </div>
    </el-dialog>
    <pre style="background-color: aqua;">
      {{ companyInfo.status }}
    </pre>
  </div>
</template>

<script>
import { enterpriseVerify } from '@/api/login'
import { getCompany } from '@/utils/auth'
import { getCompanyInfoByAddress } from '@/api/login'

export default {
  data() {
    return {
      format: 'yyyy-MM-dd HH:mm:ss', // 显示格式
      valueFormat: 'timestamp', // 返回时间戳
      registerDialogVisible: false, // 控制注册对话框的显示
      companyInfo: {
        companyName: '',
        blockchainAddress: '',
        creditCode: '',
        legalRepresentative: '',
        enterpriseType: null, // Integer
        premises: '',
        businessPeriod: '',
        phoneNumber: '',
        scope: '',
        verificationStatus: false, // false 表示“未审核”，true 表示“已审核”
        time: null, // 认证日期
        status: 0 // 审核状态 表示已提交未审核
      },
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
        time: null // 时间戳
        // 不再需要 verificationStatus，因为认证状态由公司信息决定
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
      return !!this.companyInfo.companyName
    },
    /**
     * 计算显示的认证状态文本
     */
    statusText() {
      if (this.companyInfo.verificationStatus) {
        return '已审核'
      } else if (this.hasCompanyInfo) {
        return '审核中'
      } else {
        return '未认证'
      }
    },
    /**
     * 获取当前公司的名称
     */
    getCompanyName() {
      return JSON.parse(getCompany()).userName
    },
    /**
     * 获取当前公司的地址
     */
    getCompanyAddress() {
      return JSON.parse(getCompany()).userAddr
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
    async getCompanyInfo() {
      try {
        const result = await getCompanyInfoByAddress(this.getCompanyAddress)
        if (result.data.code === 1) {
          this.companyInfo = result.data.data
        }
        console.log(this.companyInfo)
      } catch (error) {
        console.error(error)
        this.$message.error(`获取公司信息失败: ${error.message || '未知错误'}`)
      }
    },
    /**
     * 打开注册对话框
     */
    openRegisterDialog() {
      this.registerDialogVisible = true
      // 初始化表单数据
      this.registerForm.enterpriseName = this.getCompanyName
      // 如果公司地址需要预填充，可以在这里设置
      // this.registerForm.someAddressField = this.getCompanyAddress
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
     * 处理上传成功事件
     * @param {Object} response - 后端响应
     * @param {Object} file - 上传的文件对象
     * @param {Array} fileList - 文件列表
     * @param {String} field - 字段名称
     */
    handleUploadSuccess(response, file, fileList, field) {
      // 假设后端返回文件的 URL 或其他标识
      const fileUrl = response.url || (file.response && file.response.url) || file.url

      if (fileUrl) {
        if (field === 'businessLicense') {
          this.registerForm.businessLicense = fileList.map(f => f.url || (f.response && f.response.url) || f.raw.url)
          this.registerForm.businessLicenseFiles = fileList
        }
        this.$message.success('上传成功')
      } else {
        this.$message.error('上传失败，请重试')
      }
    },
    /**
     * 上传前的校验
     * @param {File} file - 上传的文件
     * @returns {Boolean} - 是否允许上传
     */
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/')
      if (!isImage) {
        this.$message.error('只能上传图片文件')
      }
      return isImage
    },
    /**
     * 提交表单
     * @param {String} formName - 表单引用名称
     */
    submitForm(formName) {
      this.$refs[formName].validate(async(valid) => {
        if (valid) {
          console.log('提交的表单数据:', this.registerForm)

          // 准备提交的数据，确保字段名称与后端一致
          const payload = {
            enterpriseName: this.registerForm.enterpriseName,
            creditCode: this.registerForm.creditCode,
            enterpriseType: this.registerForm.enterpriseType, // Integer
            representative: this.registerForm.representative,
            premises: this.registerForm.premises,
            scope: this.registerForm.scope,
            businessYear: this.registerForm.businessYear,
            verificationStatus: false,
            phoneNumber: this.registerForm.phoneNumber,
            passWord: this.registerForm.passWord,
            time: this.registerForm.time,
            businessLicense: this.registerForm.businessLicense
          }

          try {
            // 调用后端 API 提交表单数据
            const result = await enterpriseVerify(payload)
            console.log(result)

            if (result.data.code === 1) {
              this.$message({
                type: 'success',
                message: '注册申请已提交，等待管理员审核。'
              })
              // 更新公司信息状态为未审核
              this.companyInfo = {
                ...payload,
                enterpriseType: this.getCompanyType(this.registerForm.enterpriseType), // 转换企业类型为字符串
                verificationStatus: false // 设置为 false 表示审核中
              }

              // 保存到 localStorage（如果需要）
              localStorage.setItem('companyInfo', JSON.stringify(this.companyInfo))
              this.getCompanyInfo()
              // 关闭对话框并重置表单
              this.closeRegisterDialog()
            } else {
              this.$message.error(result.data.msg)
            }
          } catch (error) {
            console.error(error)
            this.$message.error(`提交失败，请稍后再试。错误: ${error.message || '未知错误'}`)
          }
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
</style>
