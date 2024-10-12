<template>
  <div class="app-container">
    <!-- 上方搜索框 -->
    <el-row class="search-row">
      <el-col :span="8" class="search-input">
        <el-input v-model="searchQuery" placeholder="请输入仓库名称或编号" />
      </el-col>
      <el-col :span="4" class="search-button">
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </el-col>
    </el-row>

    <!-- 下方列表框 -->
    <div class="house_data">
      <!-- 为每个仓库创建一个单独的列表 -->
      <div v-for="(item) in filteredData" :key="item.id" class="warehouse-list">
        <el-row class="align-items-center warehouse-item">
          <el-col :span="16" class="warehouse-name cursor-pointer" @click="openDrawer(item)">
            <strong>{{ item.name }}</strong>
          </el-col>
          <el-col :span="2" class="cursor-pointer info-icon" @click="openDrawer(item)">
            <strong aria-label="更多信息">></strong>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-row class="p-2">
              <el-col :span="10">编号</el-col>
              <el-col :span="14">{{ item.code }}</el-col>
            </el-row>
            <el-row class="p-2">
              <el-col :span="10">公司编号</el-col>
              <el-col :span="14">{{ item.companyCode }}</el-col>
            </el-row>
            <el-row class="p-2">
              <el-col :span="10">建立时间</el-col>
              <el-col :span="14">{{ item.creationTime }}</el-col>
            </el-row>
            <el-row class="p-2">
              <el-col :span="10">录入时间</el-col>
              <el-col :span="14">{{ item.intoTime }}</el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- Drawer 抽屉 -->
    <el-drawer title="仓库详细信息" :visible.sync="drawerVisible" direction="rtl" size="30%" custom-class="custom-drawer">
      <div v-if="selectedItem" class="drawer-content">
        <el-row>
          <el-col :span="8"><strong>仓库名称:</strong></el-col>
          <el-col :span="16">{{ selectedItem.name }}</el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8"><strong>编号:</strong></el-col>
          <el-col :span="16">{{ selectedItem.code }}</el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8"><strong>公司编号:</strong></el-col>
          <el-col :span="16">{{ selectedItem.companyCode }}</el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8"><strong>建立时间:</strong></el-col>
          <el-col :span="16">{{ selectedItem.creationTime }}</el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8"><strong>录入时间:</strong></el-col>
          <el-col :span="16">{{ selectedItem.intoTime }}</el-col>
        </el-row>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      drawerVisible: false, // 控制Drawer显示
      selectedItem: null, // 存储选中的仓库信息
      dataList: [
        { id: 1, name: '1号仓库', code: '42', companyCode: '37', creationTime: '2022-02-25 17:36:41', intoTime: '2024-02-25 17:36:41' },
        { id: 2, name: '2号仓库', code: '43', companyCode: '38', creationTime: '2022-02-26 17:36:41', intoTime: '2024-02-26 17:36:41' },
        { id: 3, name: '3号仓库', code: '44', companyCode: '39', creationTime: '2022-02-27 17:36:41', intoTime: '2024-02-27 17:36:41' },
        { id: 4, name: '4号仓库', code: '45', companyCode: '40', creationTime: '2022-02-28 17:36:41', intoTime: '2024-02-28 17:36:41' }
        // 仓库数据
      ]
    }
  },
  computed: {
    filteredData() {
      if (!this.searchQuery) {
        return this.dataList
      }
      // 根据仓库名称或编号进行过滤
      return this.dataList.filter(item =>
        item.name.includes(this.searchQuery) ||
        item.code.includes(this.searchQuery)
      )
    }
  },
  methods: {
    handleSearch() {
      console.log('Searching for:', this.searchQuery)
      // 添加其他逻辑API调用
    },
    openDrawer(item) {
      // 打开Drawer并存储选中的仓库信息
      this.selectedItem = item
      this.drawerVisible = true
    }
  }
}
</script>

<style scoped>
.app-container {
  padding: 20px;
  max-height: 100vh;
  overflow-y: auto;
  background-color: #f5f7fa;
}

.search-row {
  margin-bottom: 20px;
}

.search-input {
  display: flex;
  justify-content: flex-start;
}

.search-button {
  display: flex;
  justify-content: flex-start;
}

.house_data {
  border: 1px solid #ccc;
  border-radius: 10px;
  max-height: 80vh;
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;
}

.warehouse-list {
  border: 1px solid #eee;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  transition: background-color 0.3s;
}

.warehouse-list:hover {
  background-color: #f0f9ff;
}

.warehouse-name {
  font-weight: bold;
  font-size: 16px;
  color: #333;
  transition: color 0.3s;
}

.warehouse-name:hover {
  color: #409eff;
}

.cursor-pointer {
  cursor: pointer;
}

.custom-drawer {
  background-color: #f5f7fa;
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

.info-icon {
  text-align: right;
  font-size: 18px;
}
</style>
