<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="selectedWarehouse" placeholder="请选择仓库" @change="query">
          <el-option v-for="(item,index) in warehouseOptions" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-input v-model="searchKeyword" placeholder="请输入产品描述" @input="query" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loadingTable" :data="paginatedData" style="width: 100%" border :row-style="{ height: '64px' }">
      <el-table-column prop="goodKind" label="粮食种类" width="120" />
      <el-table-column prop="upStreamFirm" label="上游公司" width="200" />
      <el-table-column prop="origin" label="产地" width="120" />
      <el-table-column prop="enterWareHouse" label="仓库名称" width="150" />
      <el-table-column prop="inDepotDate" label="入库日期" width="180" />
      <el-table-column prop="harvestDate" label="收获日期" width="180" />
      <el-table-column prop="inspector" label="检验员" width="120" />
      <el-table-column prop="custodian" label="仓库负责人" width="150" />
      <el-table-column prop="description" label="描述" width="200" />
      <el-table-column prop="amount" label="数量" width="100" />
    </el-table>
    <div class="pageNumber">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="filteredData.length"
        :current-page.sync="currentPageNumber"
        :page-size="pageSize"
        @current-change="handlePageChange"
      />
    </div>
  </div>
</template>

<script>
import { getAllInDepotInfo, getDepotNames } from '@/api/Store'
export default {
  data() {
    return {
      loadingTable: false,
      warehouseOptions: [],
      selectedWarehouse: '',
      searchKeyword: '',
      allData: [], // 所有数据
      filteredData: [], // 过滤后的数据
      paginatedData: [], // 当前页的数据
      currentPageNumber: 1,
      pageSize: 10
    }
  },
  created() {
    this.getDepotNames() // 获取仓库名称
    this.fetchData() // 获取仓库信息
  },
  methods: {
    // 获取仓库名称
    async getDepotNames() {
      try {
        const result = await getDepotNames()
        if (result.data.code === 1) {
          this.warehouseOptions = result.data.data.map(item => ({
            id: +new Date(),
            value: item,
            label: item
          }))
          console.log('仓库选项:', this.warehouseOptions)
        } else {
          this.$message.error('获取仓库名称失败')
        }
      } catch (error) {
        console.error('获取仓库名称时出错:', error)
        this.$message.error('请求仓库名称时出错')
      }
    },
    // 获取入库数据
    async fetchData() {
      try {
        this.loadingTable = true
        const result = await getAllInDepotInfo()
        if (result.data.code === 1) {
          // 扁平化并格式化数据结构
          this.allData = result.data.data.map((item, index) => ({
            key: index + 1,
            goodKind: item.goodKind,
            upStreamFirm: item.inDepotDetail.upStreamFirm,
            origin: item.inDepotDetail.origin,
            enterWareHouse: item.inDepotDetail.enterWareHouse,
            inDepotDate: this.formatTimestamp(item.inDepotDetail.inDepotDate),
            harvestDate: this.formatTimestamp(item.inDepotDetail.harvestDate),
            inspector: item.inDepotDetail.inspector,
            custodian: item.inDepotDetail.custodian,
            description: item.inDepotDetail.description,
            amount: item.inDepotDetail.amount
          }))
          this.filteredData = this.allData
          this.paginateData()
          console.log('入库数据:', this.allData)
        } else {
          this.$message.error('获取入库数据失败')
        }
      } catch (error) {
        console.error('获取入库数据时出错:', error)
        this.$message.error('请求入库数据时出错')
      } finally {
        this.loadingTable = false
      }
    },
    // 格式化时间戳
    formatTimestamp(timestamp) {
      if (!timestamp) return '无'
      const date = new Date(timestamp)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const hours = String(date.getHours()).padStart(2, '0')
      const minutes = String(date.getMinutes()).padStart(2, '0')
      const seconds = String(date.getSeconds()).padStart(2, '0')
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    },
    // 查询过滤
    query() {
      this.filteredData = this.allData.filter(item => {
        const matchesWarehouse = this.selectedWarehouse
          ? item.enterWareHouse === this.selectedWarehouse
          : true
        const matchesKeyword = this.searchKeyword
          ? item.description.includes(this.searchKeyword) ||
          item.goodKind.includes(this.searchKeyword) ||
          item.upStreamFirm.includes(this.searchKeyword)
          : true
        return matchesWarehouse && matchesKeyword
      })
      this.currentPageNumber = 1
      this.paginateData()
    },
    // 处理分页变化
    handlePageChange(page) {
      this.currentPageNumber = page
      this.paginateData()
    },
    // 分页逻辑
    paginateData() {
      const start = (this.currentPageNumber - 1) * this.pageSize
      const end = start + this.pageSize
      this.paginatedData = this.filteredData.slice(start, end)
      console.log('当前页数据', this.paginatedData)
    }
  }
}
</script>

<style scoped>
.el-select {
  width: 17vw;
}

.pageNumber {
  height: 6vh;
  min-height: 6vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

.el-input {
  width: 17vw;
}

.app-container {
  position: relative;
  padding: 20px;
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
