<template>
  <div class="company-info-container">
    <el-card class="company-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span>公司信息</span>
      </div>

      <el-row :gutter="20">
        <!-- 企业名称 -->
        <el-col :span="12">
          <div class="info-item">
            <span class="info-label">企业名称：</span>
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
            <span class="info-label">企业类型：</span>
            <span class="info-content">{{ companyInfo.companyType }}</span>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" class="info-row">
        <!-- 经营场所 -->
        <el-col :span="12">
          <div class="info-item">
            <span class="info-label">经营场所：</span>
            <span class="info-content">{{ companyInfo.businessAddress }}</span>
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
            <span class="info-content">{{ companyInfo.businessScope }}</span>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      companyInfo: {
        companyName: '杭州某某科技有限公司',
        creditCode: '91330101012345678X',
        legalRepresentative: '张三',
        companyType: '有限责任公司',
        businessAddress: '浙江省杭州市钱塘区某某路888号',
        businessPeriod: '2020年1月1日至2030年12月31日',
        phoneNumber: '0571-88888888',
        businessScope: '科技研发、技术服务、技术转让、信息技术咨询等'
      }
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
</style>
