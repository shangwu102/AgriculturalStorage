<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>公司认证管理</span>
      </div>
      <el-table v-loading="loading" :data="companies" style="width: 100%" :row-key="getRowKey">
        <el-table-column prop="companyName" label="企业名称" width="180" />
        <el-table-column prop="creditCode" label="统一社会信用代码" width="200" />
        <el-table-column prop="enterpriseType" label="企业类型" width="100">
          <template slot-scope="scope">
            <span>{{ getEnterpriseType(scope.row.enterpriseType) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="legalRepresentative" label="法定代表人" width="120" />
        <el-table-column prop="premises" label="经营场所" width="200" />
        <el-table-column prop="scope" label="经营范围" />
        <el-table-column prop="businessYear" label="营业期限(年)" width="120" />
        <el-table-column prop="verificationStatus" label="核验状态" width="100">
          <template slot-scope="scope">
            <el-tag :type="scope.row.verificationStatus ? 'success' : 'warning'">
              {{ scope.row.verificationStatus ? '已通过' : '未通过' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="联系电话" width="150" />
        <el-table-column prop="time" label="注册时间" width="180">
          <template slot-scope="scope">
            <span>{{ formatTime(scope.row.time) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button
              v-if="!scope.row.verificationStatus"
              type="primary"
              size="mini"
              @click="handleApprove(scope.row)"
            >审核通过</el-button>
            <el-button
              v-if="!scope.row.verificationStatus"
              type="danger"
              size="mini"
              @click="handleReject(scope.row)"
            >审核拒绝</el-button>
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
          <el-input v-model="currentCompany.businessYear" disabled />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="currentCompany.phoneNumber" disabled />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmApprove">通过</el-button>
        <el-button type="danger" @click="confirmReject">拒绝</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Authentication',
  data() {
    return {
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
        1: '有限责任公司',
        2: '股份有限公司',
        3: '合伙企业',
        4: '个人独资企业'
        // 根据实际情况添加更多类型
      }
      return types[type] || '其他'
    },
    // 格式化时间戳
    formatTime(timestamp) {
      if (!timestamp) return ''
      const date = new Date(timestamp)
      return date.toLocaleString()
    },
    // 获取用户角色（可选，用于权限控制）
    getUserRole() {
      const user = JSON.parse(localStorage.getItem('AS-user'))
      return user ? user.role : ''
    },
    // 获取公司列表，从本地存储获取数据
    fetchCompanies() {
      this.loading = true
      const companiesData = localStorage.getItem('companyInfo')
      if (companiesData) {
        try {
          const parsedData = JSON.parse(companiesData)
          this.companies = parsedData
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
    // 确认审核通过
    confirmApprove() {
      this.updateVerificationStatus(this.currentCompany.creditCode, true)
    },
    // 确认审核拒绝
    confirmReject() {
      this.updateVerificationStatus(this.currentCompany.creditCode, false)
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
        localStorage.setItem('companies', JSON.stringify(this.companies))
        if (status) {
          this.$message.success('审核通过')
        } else {
          this.$message.success('审核拒绝')
        }
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
.has-logo {
  display: flex;
  flex-direction: column;
}
</style>
