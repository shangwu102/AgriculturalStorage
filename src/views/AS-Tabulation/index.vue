<template>
  <div class="app-container">
    <!-- 上方搜索框 -->
    <div class="row justify-content-between">
      <input v-model="searchQuery" type="text" class="form-control col-3 m-2" placeholder="请输入仓库名称或编号">
      <button class="btn btn-info m-2" style="position: relative; right: 70%;" @click="handleSearch">搜索</button>
    </div>

    <!-- 下方列表框 -->
    <div class="house_data mt-4 p-3">
      <!-- 为每个仓库创建一个单独的列表 -->
      <div v-for="(item) in filteredData" :key="item.id" class="warehouse-list">
        <div class="row align-items-center">
          <div class="col-3 pl-3 pb-3 cursor-pointer" @click="openDrawer(item)">
            <strong>仓库名称：{{ item.name }}</strong>
          </div>
          <div class="col-2 offset-6 pl-3 pb-3 d-flex justify-content-end cursor-pointer" @click="openDrawer(item)">
            <strong aria-label="更多信息">></strong>
          </div>
        </div>
        <div class="row">
          <div class="col-4">
            <div class="row p-2"><span class="col">编号</span><span class="col">{{ item.code }}</span></div>
            <div class="row p-2"><span class="col">公司编号</span><span class="col">{{ item.companyCode }}</span></div>
            <div class="row p-2"><span class="col">建立时间</span><span class="col">{{ item.creationTime }}</span></div>
            <div class="row p-2"><span class="col">录入时间</span><span class="col">{{ item.intoTime }}</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Drawer 抽屉 -->
    <el-drawer
      title="仓库详细信息"
      :visible.sync="drawerVisible"
      direction="rtl"
      size="30%"
    >
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
}

.house_data {
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.warehouse-list {
  border: 1px solid #eee;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
}

.row {
  border-bottom: 1px solid #eee;
}

.row:last-child {
  border-bottom: none;
}

.col {
  display: inline-block;
  margin-right: 10px;
}

.col-3 {
  width: 25%;
}

.cursor-pointer {
  cursor: pointer;
  transition: color 0.3s;
}

.cursor-pointer:hover {
  color: #007bff;
}

/* 优化Drawer内容样式 */
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

