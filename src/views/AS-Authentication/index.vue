<template>
  <div class="authentication-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>公司认证管理</span>
      </div>
      <el-table
        v-loading="loading"
        :data="companies"
        style="width: 100%; min-width: 1200px;"
        :row-key="getRowKey"
        border
      >
        <el-table-column prop="companyName" label="企业名称" width="180" />
        <el-table-column prop="creditCode" label="统一社会信用代码" width="200" />
        <el-table-column prop="enterpriseType" label="企业类型" width="100">
          <template slot-scope="scope">
            <span>{{ getEnterpriseType(scope.row.enterpriseType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="legalRepresentative" label="法定代表人" width="120" />
        <el-table-column prop="premises" label="经营场所" width="200" />
        <el-table-column prop="scope" label="经营范围" min-width="200" />
        <el-table-column prop="businessPeriod" label="营业期限(年)" width="120" />
        <el-table-column prop="verificationStatus" label="核验状态" width="120">
          <template slot-scope="scope">
            <el-tag :type="getTagType(scope.row.verificationStatus)">
              {{ getStatusText(scope.row.verificationStatus) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话" width="150" />
        <el-table-column prop="time" label="注册时间" width="180">
          <template slot-scope="scope">
            <span>{{ formatTime(scope.row.time) }}</span>
          </template>
        </el-table-column>
        <!-- 修改后的“操作”列 -->
        <el-table-column :label="label" width="180" fixed="right">
          <template slot-scope="scope">
            <template v-if="scope.row.verificationStatus === 'pending'">
              <el-button type="primary" size="mini" @click="handleApprove(scope.row)">审核通过</el-button>
              <el-button type="danger" size="mini" @click="handleReject(scope.row)">审核拒绝</el-button>
            </template>
            <template v-else>
              <el-tag :type="getTagType(scope.row.verificationStatus)">
                {{ getStatusText(scope.row.verificationStatus) }}
              </el-tag>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 审核操作对话框 -->
    <el-dialog title="审核公司" :visible.sync="dialogVisible" width="50%">
      <el-form :model="currentCompany" label-width="120px">
        <el-form-item label="企业名称">
          <el-input v-model="currentCompany.companyName" disabled />
        </el-form-item>
        <el-form-item label="统一社会信用代码">
          <el-input v-model="currentCompany.creditCode" disabled />
        </el-form-item>
        <el-form-item label="企业类型">
          <el-input :value="enterpriseTypeDescription" disabled />
        </el-form-item>
        <el-form-item label="法定代表人">
          <el-input v-model="currentCompany.legalRepresentative" disabled />
        </el-form-item>
        <el-form-item label="经营场所">
          <el-input v-model="currentCompany.premises" disabled />
        </el-form-item>
        <el-form-item label="经营范围">
          <el-input v-model="currentCompany.scope" disabled />
        </el-form-item>
        <el-form-item label="营业期限(年)">
          <el-input v-model="currentCompany.businessPeriod" disabled />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="currentCompany.phoneNumber" disabled />
        </el-form-item>
        <el-form-item label="注册时间">
          <el-input :value="formatTime(currentCompany.time)" disabled />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAction">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Authentication',
  data() {
    return {
      label: '66',
      companies: [],
      loading: false,
      dialogVisible: false,
      currentCompany: {},
      actionType: '' // 'approve' 或 'reject'
    }
  },
  computed: {
    // 计算属性，用于显示企业类型描述
    enterpriseTypeDescription() {
      return this.getEnterpriseType(this.currentCompany.enterpriseType)
    }

  },
  created() {
    this.fetchCompanies()
  },
  methods: {
    // 获取唯一键
    getRowKey(row) {
      return row.creditCode
    },
    // 获取企业类型描述
    getEnterpriseType(type) {
      const types = {
        0: '制造业',
        1: '零售',
        2: '物流',
        3: '餐饮'
        // 根据实际情况添加更多类型
      }
      return types[type] || '其他'
    },
    // 获取审核状态对应的标签类型
    getTagType(status) {
      if (status === 'approved') return 'success'
      if (status === 'rejected') return 'danger'
      return 'warning'
    },
    // 获取审核状态文本
    getStatusText(status) {
      if (status === 'approved') return '已通过'
      if (status === 'rejected') return '已拒绝'
      return '审核中'
    },
    // 格式化时间戳
    formatTime(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleString()
    },
    // 获取公司列表，从本地存储获取数据
    fetchCompanies() {
      this.loading = true
      const companyData = localStorage.getItem('companyInfo')
      if (companyData) {
        try {
          const parsedData = JSON.parse(companyData)
          // 如果存在多个公司，可以调整这里的逻辑
          // 这里假设只有一个公司信息
          this.companies = Array.isArray(parsedData) ? parsedData : [parsedData]
        } catch (error) {
          this.$message.error('解析本地公司数据失败')
        }
      } else {
        this.$message.warning('本地没有公司数据')
      }
      this.loading = false
    },
    // 审核通过
    handleApprove(company) {
      this.currentCompany = { ...company }
      this.dialogVisible = true
      this.actionType = 'approve'
    },
    // 审核拒绝
    handleReject(company) {
      this.currentCompany = { ...company }
      this.dialogVisible = true
      this.actionType = 'reject'
    },
    // 确认审核操作
    confirmAction() {
      if (this.actionType === 'approve') {
        this.updateVerificationStatus(this.currentCompany.creditCode, 'approved')
      } else if (this.actionType === 'reject') {
        this.updateVerificationStatus(this.currentCompany.creditCode, 'rejected')
      }
    },
    // 更新公司核验状态
    updateVerificationStatus(creditCode, status) {
      const index = this.companies.findIndex(company => company.creditCode === creditCode)
      if (index !== -1) {
        this.$set(this.companies, index, {
          ...this.companies[index],
          verificationStatus: status
        })
        // 更新本地存储
        // 如果有多个公司，存储整个数组
        localStorage.setItem('companyInfo', JSON.stringify(this.companies))
        this.$message({
          type: 'success',
          message: status === 'approved' ? '审核通过' : '审核拒绝'
        })
        this.fetchCompanies()
        this.dialogVisible = false
      } else {
        this.$message.error('未找到对应的公司')
      }
    }
  }
}
</script>

<style scoped>
.authentication-container {
  padding: 20px;
  margin: 20px auto;
}

/* 确保弹窗内容在固定列时不被遮挡 */
.el-dialog__body {
  overflow: auto;
}
</style>
